import React from "react";
import { LinkingOptions, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Host } from "react-native-portalize";
import HomeContainer from "screens/Home/HomeContainer";
import WelcomeContainer from "screens/Welcome/WelcomeContainer";

const HomeStack = createNativeStackNavigator()

function APP_STACK() {

    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
                animationDuration: 200,
            }}>
            <HomeStack.Screen name="Welcome" component={WelcomeContainer} />
            <HomeStack.Screen name="Home" component={HomeContainer} />
        </HomeStack.Navigator >
    )
}

export default function App() {
    const linking: LinkingOptions<{}> = { prefixes: ['https://egdi.immigration.gov.kh'] }
    return (
        <NavigationContainer linking={linking} >
            <Host>
                <APP_STACK />
            </Host>
        </NavigationContainer>
    )
}
