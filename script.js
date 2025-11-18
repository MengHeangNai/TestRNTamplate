#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Get the project name from process.argv or environment
const projectName = process.argv[2] || "ProjectName";

console.log(
  `Post init script: Renaming iOS and Android files for project "${projectName}"`
);

const iosPath = path.join(process.cwd(), "ios");
const androidPath = path.join(process.cwd(), "android");
const oldAppName = "ProjectName";

// ========== iOS Renaming ==========
try {
  console.log("\n📱 Processing iOS files...");

  // Rename directories
  const oldAppDir = path.join(iosPath, oldAppName);
  const newAppDir = path.join(iosPath, projectName);

  const oldXcodeProjDir = path.join(iosPath, `${oldAppName}.xcodeproj`);
  const newXcodeProjDir = path.join(iosPath, `${projectName}.xcodeproj`);

  const oldXcworkspaceDir = path.join(iosPath, `${oldAppName}.xcworkspace`);
  const newXcworkspaceDir = path.join(iosPath, `${projectName}.xcworkspace`);

  // Rename app directory
  if (fs.existsSync(oldAppDir)) {
    fs.renameSync(oldAppDir, newAppDir);
    console.log(`✓ Renamed ${oldAppName}/ to ${projectName}/`);
  }

  // Rename .xcodeproj directory
  if (fs.existsSync(oldXcodeProjDir)) {
    fs.renameSync(oldXcodeProjDir, newXcodeProjDir);
    console.log(
      `✓ Renamed ${oldAppName}.xcodeproj to ${projectName}.xcodeproj`
    );
  }

  // Rename .xcworkspace directory
  if (fs.existsSync(oldXcworkspaceDir)) {
    fs.renameSync(oldXcworkspaceDir, newXcworkspaceDir);
    console.log(
      `✓ Renamed ${oldAppName}.xcworkspace to ${projectName}.xcworkspace`
    );
  }

  // Update Podfile
  const podfilePath = path.join(iosPath, "Podfile");
  if (fs.existsSync(podfilePath)) {
    let podfileContent = fs.readFileSync(podfilePath, "utf8");
    podfileContent = podfileContent.replace(
      new RegExp(`target '${oldAppName}'`, "g"),
      `target '${projectName}'`
    );
    fs.writeFileSync(podfilePath, podfileContent);
    console.log(`✓ Updated Podfile`);
  }

  // Update Info.plist
  const infoPlistPath = path.join(newAppDir, "Info.plist");
  if (fs.existsSync(infoPlistPath)) {
    let infoPlistContent = fs.readFileSync(infoPlistPath, "utf8");
    infoPlistContent = infoPlistContent.replace(
      new RegExp(`<string>${oldAppName}</string>`, "g"),
      `<string>${projectName}</string>`
    );
    fs.writeFileSync(infoPlistPath, infoPlistContent);
    console.log(`✓ Updated Info.plist`);
  }

  console.log(`✓ iOS app files renamed successfully!`);
} catch (error) {
  console.error(`Error renaming iOS files:`, error.message);
  process.exit(1);
}

// ========== Android Renaming ==========
try {
  console.log("\n🤖 Processing Android files...");

  // Update settings.gradle
  const settingsGradlePath = path.join(androidPath, "settings.gradle");
  if (fs.existsSync(settingsGradlePath)) {
    let settingsContent = fs.readFileSync(settingsGradlePath, "utf8");
    settingsContent = settingsContent.replace(
      new RegExp(`rootProject.name = '${oldAppName}'`, "g"),
      `rootProject.name = '${projectName}'`
    );
    fs.writeFileSync(settingsGradlePath, settingsContent);
    console.log(`✓ Updated settings.gradle`);
  }

  // Update strings.xml
  const stringsXmlPath = path.join(
    androidPath,
    "app/src/main/res/values/strings.xml"
  );
  if (fs.existsSync(stringsXmlPath)) {
    let stringsContent = fs.readFileSync(stringsXmlPath, "utf8");
    stringsContent = stringsContent.replace(
      new RegExp(`<string name="app_name">${oldAppName}</string>`, "g"),
      `<string name="app_name">${projectName}</string>`
    );
    fs.writeFileSync(stringsXmlPath, stringsContent);
    console.log(`✓ Updated strings.xml`);
  }

  // Generate new package name from project name
  const newPackageName = `com.${projectName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")}`;
  const oldPackageName = "com.projectname";

  // Update build.gradle
  const buildGradlePath = path.join(androidPath, "app/build.gradle");
  if (fs.existsSync(buildGradlePath)) {
    let buildGradleContent = fs.readFileSync(buildGradlePath, "utf8");
    buildGradleContent = buildGradleContent.replace(
      new RegExp(`namespace "${oldPackageName}"`, "g"),
      `namespace "${newPackageName}"`
    );
    buildGradleContent = buildGradleContent.replace(
      new RegExp(`applicationId "${oldPackageName}"`, "g"),
      `applicationId "${newPackageName}"`
    );
    fs.writeFileSync(buildGradlePath, buildGradleContent);
    console.log(`✓ Updated build.gradle with package: ${newPackageName}`);
  }

  // Update Kotlin files
  const oldJavaPath = path.join(
    androidPath,
    "app/src/main/java/com/projectname"
  );
  const newJavaPath = path.join(
    androidPath,
    `app/src/main/java/${newPackageName.replace(/\./g, "/")}`
  );

  if (fs.existsSync(oldJavaPath)) {
    // Create new directory structure
    const newDir = path.dirname(newJavaPath);
    if (!fs.existsSync(newDir)) {
      fs.mkdirSync(newDir, { recursive: true });
    }

    // Move files
    fs.renameSync(oldJavaPath, newJavaPath);
    console.log(
      `✓ Moved Java/Kotlin files to ${newPackageName.replace(/\./g, "/")}`
    );

    // Update package declarations in Kotlin files
    const ktFiles = ["MainActivity.kt", "MainApplication.kt"];
    ktFiles.forEach((file) => {
      const filePath = path.join(newJavaPath, file);
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, "utf8");
        content = content.replace(
          new RegExp(`package ${oldPackageName}`, "g"),
          `package ${newPackageName}`
        );
        // Update main component name in MainActivity
        if (file === "MainActivity.kt") {
          content = content.replace(
            /override fun getMainComponentName\(\): String = "[^"]+"/g,
            `override fun getMainComponentName(): String = "${projectName}"`
          );
        }
        fs.writeFileSync(filePath, content);
      }
    });
    console.log(`✓ Updated package declarations in Kotlin files`);

    // Clean up old directory structure
    const comDir = path.join(androidPath, "app/src/main/java/com");
    const entries = fs.readdirSync(comDir);
    if (entries.length === 1 && entries[0] !== "projectname") {
      // Successfully moved, can remove old structure if it exists
      const oldProjectNameDir = path.join(comDir, "projectname");
      if (!fs.existsSync(oldProjectNameDir)) {
        console.log(`✓ Cleaned up old package structure`);
      }
    }
  }

  console.log(`✓ Android app files renamed successfully!`);
} catch (error) {
  console.error(`Error renaming Android files:`, error.message);
  process.exit(1);
}

console.log(
  `\n✅ All files renamed successfully for project "${projectName}"!`
);
