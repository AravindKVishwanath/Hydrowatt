import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { auth } from '../fireConfig';
import { signOut } from 'firebase/auth';
import { AntDesign } from 'expo-vector-icons'
import axios from 'axios';
import { useEffect } from 'react';

const UserInfo = ({ route, navigation }) => {
  const [userName, setUserName] = useState('')
  const [DailyStreak, setDailyStreak] = useState(0)
  const [MonthlyStreak, setMonthlyStreak] = useState(0)
  const [profile,setprofile] = useState('hello')
  const profile2 = "../assets/icon.png";
  const [Id, setId] = useState('');
  const { email } = route.params;
  console.log(email)
  const badge = [
    "require('../assets/Gold.png')","require('../assets/SilverBadge.png')"
  ]
  const currentDate = new Date();

  const updateDaily = async()=>{
    const date = currentDate.getDate();
    console.log(date)
  }

  const updateMonthly = async()=>{
    const month = currentDate.getMonth();
  }

  useLayoutEffect(()=>{
    navigation.setOptions({
      title:"UserInfo",
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


  useEffect(() => {
    const getUserInfo = async (Email) => {

      try {
        response = await axios.get(`https://electrocode.onrender.com/getUserInfo/${Email}`);
        setUserName(response.data.Name)
      } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
      }
    }
    const idget = async (Email) => {
      try {
        response = await axios.get(`https://electrocode.onrender.com/getIdbyEmail/${Email}`);
        setId(response.data._id)
        console.log(response.data._id)
      } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
      }
    }
    

    updateDaily();
    idget(email)
    getUserInfo(email)

  }, [])
  ///user data retrieval
  const profileuser = async (Id) => {
    const profile = {
      profilePicture:"https://cdn3.iconfinder.com/data/icons/cool-avatars-2/190/00-07-2-512.png"
    }
    try {
      response = await axios.put(`https://electrocode.onrender.com/profilePicture/${Id}`,profile);
      setprofile(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  }
  const Daily = async (Id) => {
    const daily = {
      DailyStreak: 3, ///this value shud be updated 
    }
    try {
      response = await axios.put(`https://electrocode.onrender.com/DailyStreak/${Id}`, daily);
      setDailyStreak(response.data.DailyStreak)
      console.log(response.data.DailyStreak)
    } catch (error) {
      console.error('iuError fetching user info:', error);
      return null;
    }
  }
  const Monthly = async (Id) => {
    const monthly = {
      MonthlyStreak: 1 ///this value shud be updated 
    }
    try {
      response = await axios.put(`https://electrocode.onrender.com/MonthlyStreak/${Id}`, monthly);
      setMonthlyStreak(response.data.MonthlyStreak)
      console.log(response.data.MonthlyStreak)
    } catch (error) {
      console.error('uiError fetching user info:', error)
      return null;
    }
  }
  
  profileuser(Id)
  Monthly(Id)
  Daily(Id)
  const Home = ()=>{
    navigation.navigate("Dashboard",email);}


  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    });
  };
  const settings = ()=>{
    navigation.navigate("Settings");
  }
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ height: "85%", alignItems: "center" }}>
        <View className="UserProfile" style={{ height: 150, width: 150, borderRadius: 150, backgroundColor: "#D9D9D9", alignItems: "center", justifyContent: "center", marginTop: 20,borderColor:"#87CEFA",borderWidth:5 }}>
          <Image style={{ height: 120, width: 120, borderRadius: 120 }} source={{ uri:profile}} />
        </View>
        <Text style={{ marginTop: 20, fontSize: 30 }}>{userName}</Text>
        <View style={{ alignItems: "center", justifyContent: "center", padding: 20, margin: 10 }}>
          <Text style={{ fontSize: 18, margin: 5 }}>Badges Earned</Text>
          <View style={{ height: 170, width: 441, backgroundColor: "#D9D9D9", flexDirection: "row", borderRadius: 40 }}>
              <Image source={require('../assets/Gold.png')} style={{ height: 140, width: 140, margin: 10 }}/>
             <Image source={require('../assets/SilverBadge.png')} style={{ height: 140, width: 140, margin: 10 }}/>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", marginLeft: 70, marginTop: 10 }}>
            <View style={{ height: 120, width: 180, margin: 5, backgroundColor: "#D9D9D9", alignItems: "center", borderRadius: 15 }}>
              <Text style={{ fontSize: 18, margin: 5 }}>Daily Streak ⚡</Text>
              <Text style={{ fontSize: 40, fontWeight: 400 }}>{DailyStreak}</Text>
            </View>
            <View style={{ height: 120, width: 180, margin: 5, backgroundColor: "#D9D9D9", alignItems: "center", borderRadius: 15 }}>
              <Text style={{ fontSize: 18, margin: 5 }}>Monthly Streak ⚡</Text>
              <Text style={{ fontSize: 40, fontWeight: 400 }}>{MonthlyStreak}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ alignItems: 'center', justifyContent: "center",marginTop:-40 }}>
        <Pressable style={{ height: 40, width: 300, backgroundColor: "#D9D9D9", borderRadius: 10, alignItems: 'center', justifyContent: "center",marginBottom:10 }} onPress={settings}><Text>Settings</Text></Pressable>
        <Pressable style={{ height: 40, width: 300, backgroundColor: "#D9D9D9", borderRadius: 10, alignItems: 'center', justifyContent: "center",marginBottom:10 }}><Text>Contact Us</Text></Pressable>
        <Pressable style={{ height: 40, width: 300, backgroundColor: "#D9D9D9", borderRadius: 10, alignItems: 'center', justifyContent: "center",marginBottom:10 }}><Text>About Us</Text></Pressable>
      </View>

    </View>
  )
}

export default UserInfo

const styles = StyleSheet.create({})
