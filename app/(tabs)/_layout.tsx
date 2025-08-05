import { Tabs } from "expo-router"

export default function _Layout () {
    return (
        <Tabs>
            <Tabs.Screen
            name="index"
            options={{
                headerShown: false,
            }}/>

            <Tabs.Screen
            name="profile"
            options={{
                headerShown: false,
            }}/>
            
        </Tabs>
    )
        
}