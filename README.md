# React Native Template

A custom React Native template with Expo, TypeScript, Firebase, WatermelonDB, and more pre-configured features.

## Features

- ✅ **Expo SDK** - Managed workflow with Expo modules
- ✅ **TypeScript** - Type-safe development
- ✅ **Firebase Integration** - Authentication, Firestore, Realtime Database, Storage, Functions, Messaging
- ✅ **WatermelonDB** - High-performance reactive database
- ✅ **React Navigation** - Navigation library
- ✅ **Custom Project Structure** - Organized folders for screens, services, modules, and more
- ✅ **Automated Renaming** - Automatic iOS and Android configuration

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Xcode** (for iOS development on macOS)
- **Android Studio** (for Android development)
- **CocoaPods** (for iOS dependencies)

```bash
# Install CocoaPods (macOS only)
sudo gem install cocoapods
```

## Creating a New Project

### Option 1: Using React Native Community CLI (Recommended)

```bash
npx @react-native-community/cli init MyProjectName --template https://github.com/MengHeangNai/TestRNTamplate
```

### Option 2: Using GitHub SSH URL

```bash
npx @react-native-community/cli init MyProjectName --template git@github.com:MengHeangNai/TestRNTamplate.git
```

### Option 3: Using npm Package (After Publishing)

```bash
# After publishing to npm
npx @react-native-community/cli init MyProjectName --template react-native-new-template
```

### Option 4: Using Local Template

```bash
# Clone the template repository
git clone git@github.com:MengHeangNai/TestRNTamplate.git

# Create a new project using the local template
npx @react-native-community/cli init MyProjectName --template file:///absolute/path/to/TestRNTamplate
```

> **Note:** The old `npx react-native init` command is deprecated. Always use `npx @react-native-community/cli init` instead.

## What Happens During Initialization

The template automatically performs the following setup:

1. **📱 iOS Configuration**
   - Renames Xcode project from `ProjectName` to your project name
   - Updates `ProjectName.xcodeproj` and `ProjectName.xcworkspace`
   - Updates `Podfile` with new target name
   - Updates `Info.plist` and `AppDelegate.swift`
   - Renames app directory structure

2. **🤖 Android Configuration**
   - Updates package name from `com.projectname` to `com.yourprojectname`
   - Renames Java/Kotlin package structure
   - Updates `build.gradle` namespace and applicationId
   - Updates `strings.xml` with app name
   - Updates `settings.gradle` project name

3. **📦 Dependencies Installation**
   - Installs all npm packages
   - Runs `pod install` for iOS (on macOS)

## Post-Installation Setup

### 1. Navigate to Your Project

```bash
cd MyProjectName
```

### 2. Install iOS Dependencies (macOS only)

```bash
cd ios
pod install
cd ..
```

### 3. Firebase Configuration

#### iOS Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Add an iOS app with bundle ID: `com.yourprojectname`
4. Download `GoogleService-Info.plist`
5. Replace the file in `ios/YourProjectName/GoogleService-Info.plist`

#### Android Setup
1. In Firebase Console, add an Android app with package name: `com.yourprojectname`
2. Download `google-services.json`
3. Replace the file in `android/app/google-services.json`

### 4. Run the Project

#### iOS
```bash
# Using npm
npm run ios

# Using yarn
yarn ios

# For specific simulator
npm run ios -- --simulator="iPhone 15 Pro"
```

#### Android
```bash
# Using npm
npm run android

# Using yarn
yarn android
```

#### Expo Development Build
```bash
# Start Metro bundler
npm start

# Or with Expo
npx expo start
```
## Available Scripts

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run tests
npm test

# Lint code
npm run lint

# Type check
npm run tsc
```

## Customization

### Changing App Name

The app name is automatically set during initialization, but you can change it later:

**iOS:** Update `CFBundleDisplayName` in `ios/YourProjectName/Info.plist`

**Android:** Update `app_name` in `android/app/src/main/res/values/strings.xml`

### Changing Package Name/Bundle ID

**iOS:** Update bundle identifier in Xcode project settings

**Android:** 
1. Update `namespace` and `applicationId` in `android/app/build.gradle`
2. Update package name in `MainActivity.kt` and `MainApplication.kt`
3. Move files to new package structure

## Troubleshooting

### iOS Build Issues

```bash
# Clean build folder
cd ios
rm -rf build
pod deintegrate
pod install
cd ..
```

### Android Build Issues

```bash
# Clean gradle
cd android
./gradlew clean
cd ..

# Clear cache
rm -rf android/app/build
```

### Metro Bundler Issues

```bash
# Clear Metro cache
npx react-native start --reset-cache

# Or
npm start -- --reset-cache
```

## Dependencies

### Main Dependencies
- React Native (with New Architecture support)
- Expo SDK
- React Navigation
- Firebase (Auth, Firestore, Database, Storage, Functions, Messaging)
- WatermelonDB
- React Native MMKV
- React Native Screens

### Dev Dependencies
- TypeScript
- Jest
- ESLint
- Babel

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

**MengHeang Nai**
- Email: naimengheang2001@gmail.com
- GitHub: [@MengHeangNai](https://github.com/MengHeangNai)

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/MengHeangNai/TestRNTamplate/issues).

---

**Happy Coding! 🚀**
