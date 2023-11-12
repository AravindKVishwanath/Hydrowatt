import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign, SimpleLineIcons } from 'expo-vector-icons';
import { useLayoutEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';




const HomeScreen = ({route,navigation}) =>{
  const [userName , setUserName] = useState('')
  let response = ''
  let Email = ''
  //console.log("Email",Email)
 
  
Email = route.params;
const getUserInfo = async (Email) => {

try {
  response = await axios.get(`http://192.168.157.186:3000/getUserInfo/${Email.Email}`);
  setUserName(response.data.Name)
  console.log(userName)
} catch (error) {
  console.error('Error fetching user info:', error);
  return null;
}
};
getUserInfo(Email)
  
  
  /////time display
  const currentHour = new Date().getHours();
  let greetingMessage = '';

  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    greetingMessage = 'Good Afternoon';
  } else {
    greetingMessage = 'Good Evening';
  }

  const Home = ()=>{
      navigation.navigate("Dashboard",Email);
  }
  const ElectricityMonitor =() =>{
    navigation.navigate("Electricity Monitor")
  }
  const WaterMonitor = ()=>{
    navigation.navigate("Water Monitor")
  }
  const UserInfo =()=>{
    navigation.navigate("UserInfo");
}


  useLayoutEffect(()=>{
    navigation.setOptions({
      title:"Dashboard",
      headerStyle: {backgroundColor : "#fff"},
        headerTitleStyle: {color:"black",
        textAlign:"center",
        alignItems:"center",
        justifyContent:"center"
      },
        headerTintColor: "black",
        headerLeft: ()=>(
          <View style={{marginLeft:10 }}>
          <TouchableOpacity onPress={Home}  style={{marginRight:100}}>
                  <Image style={{height:45,width:45}} source={require('../assets/icon.png')}/>
          </TouchableOpacity>
          </View>
        ),
        headerRight: ()=>(
          <View style={{flexDirection:"row", justifyContent:"space-between",width:80,marginRight:20}}>
              <TouchableOpacity onPress={UserInfo} activeOpacity={0.5} style={{marginLeft:50}}>
              <AntDesign name='user' size={24} color='black'/>
              </TouchableOpacity>
              
          </View>
        ),

    })

  },[navigation])



  return (
    <SafeAreaView style={styles.container}>

        <Text style={styles.text1}>{greetingMessage}, {userName}</Text>
        <TouchableOpacity style={{backgroundColor: '#00A894DE',
              width: 310,
              height: 171,
              alignItems: 'center',
              justifyContent: 'center',marginTop:100,borderRadius:10 }} onPress={ElectricityMonitor}>
        <Text style={styles.text3} >Electricity Monitor</Text>
        <Text style={styles.text5}>Bill amount: ₹1000</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: '#00A894DE',
              width: 310,
              height: 171,
              alignItems: 'center',
              justifyContent: 'center',marginTop:20,borderRadius:10 }} onPress={WaterMonitor}>
        <Text style={styles.text4}>Water Monitor</Text>
        <Text style={styles.text6}>Bill amount: ₹1090</Text>
        </TouchableOpacity>
        <Text style={{width:300, marginTop:130,marginBottom:20, textAlign:"center"}}>"Turning Drops into Dreams and Watts into Wonders: Nurturing a Greener Future."</Text>
    </SafeAreaView>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,

  },
  text: {
    fontSize: 24,
},
topRight: {
  position: 'absolute',
  top: 3,
  right: 20,
},
topleft: {
  position: 'absolute',
  top: 3,
  left: 20,
},
text1: {
  fontSize: 26,
  fontWeight: 'bold',
},
green: {
  backgroundColor: '#00A894DE',
  width: 310,
  height: 171,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
  top: 100,

},
green1: {
  backgroundColor: '#00A894DE',
  width: 310,
  height: 171,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
  top: 150,

},
text3: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#FFFFFF',
  bottom:40,
  right:16,
},
text4: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#FFFFFF',
  bottom:40,
  right:44,
},
text5: {
  fontSize: 20,
  right:54,
  color: '#FAF69A',
  bottom: 20,
  fontWeight: 'bold',
},
text6: {
  fontSize: 20,
  right:54,
  color: '#FAF69A',
  bottom: 20,
  fontWeight: 'bold',
},

});
