import { SafeAreaView ,Switch } from "react-native"
import { useState } from "react";

const SettingNotificationScreen = () =>{
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
    return(
        <SafeAreaView>
            <Switch
                    trackColor={{false: '#767577', true: '#00E676'}}
                    thumbColor={isEnabled ? '#FFFFFF' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
        </SafeAreaView>
    )
}

export default SettingNotificationScreen;