import { Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ElectricityMonitor from './screens/Electricitymonitor';
import Goals from './screens/ElectricityGoal'
import WaterMonitor from './screens/WaterMonitor';
import Settings from './screens/Settings';
import Goals1 from './screens/WaterGoal';
import ElecSummary from './screens/ElecSummary';
import WaterSummary from './screens/WaterSummary';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import UserInfo from './screens/UserInfo';


export default function App() {
  const Stack = createNativeStackNavigator();
  const [email,setemail] = useState('')
  const [id,setid] = useState('')
  const getdata = async(email)=>{
    setemail(email)
    
  }
 

  //console.log(getdata)

  return (
    <NavigationContainer getdata={getdata}>
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name='Login' component={LoginScreen}   initialParams={{ getdata: getdata }}/>
            <Stack.Screen options={{ headerShown: false }} name='Register' component={RegisterScreen}/>
            <Stack.Screen name='Dashboard' component={HomeScreen}/>
            <Stack.Screen name='Electricity Monitor' component={ElectricityMonitor}/>
            <Stack.Screen name='ElectricityGoal' component={Goals} initialParams={{ email: email }}/>
            <Stack.Screen name='Watt Summary' component={ElecSummary}/>
            <Stack.Screen name='Water Monitor' component={WaterMonitor}/>
            <Stack.Screen name='WaterGoal' component={Goals1} initialParams={{ email: email }}/>
            <Stack.Screen name='Hydro Summary' component={WaterSummary}/>
            <Stack.Screen name='UserInfo' component={UserInfo} initialParams={{ email: email }}/>
            <Stack.Screen name='Settings' component={Settings} initialParams={{ email: email }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
