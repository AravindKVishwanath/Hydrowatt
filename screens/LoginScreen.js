import { Alert, StyleSheet, Text, View } from 'react-native';
import React  from 'react';
import {Button, Input, Image} from "react-native-elements";
import { useState, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({route}) => {
const [Email, setEmail] = useState("")
const [Password, setPassword] = useState("");
const navigation = useNavigation()
const { getdata } = route.params;
/*useEffect(()=>{
    const checkLoginStatus = async()=>{
      try{
        const token= await AsyncStorage.getItem("authToken")
      console.log(token)
        if(token){
          setTimeout(()=>{
            navigation.replace("Dashboard",{Email:Email})
          },1)
        }
      }catch(error){
        console.log("Error in checking login Status",error)
      }
    }
    checkLoginStatus()
},[Email]);*/
//console.log(getdata(Email))
const signIn =()=>{
   const user = {
    Email: Email,
    Password: Password
   }
   //const id = User.findOne({Email})
   //console.log("This is the id",id);
   axios.post("http://192.168.157.186:3000/login",user).then((response)=>{
    console.log("Signin response",response)
    const token = response.data.token
    console.log("login token",token)
    AsyncStorage.setItem("authToken",token);
    getdata(Email)
    navigation.replace("Dashboard",{Email:user.Email})
   }).catch((error)=>{
    Alert.alert("Login error");
    console.log("Error loggin in",error)
   })
}


  return (
    <KeyboardAvoidingView style={styles.container}>
    <View style={{height:100}}/>
    <Text style={{fontSize:35,fontWeight:500}}>Welcome to</Text>
        <View style={{flexDirection:"row"}}>
            <Text style={{fontSize: 45,fontWeight: "700", color:"#4D40D9"}}>Hydro</Text>
            <Text style={{fontSize: 45,fontWeight: "700", color:"#E15959"}}>Watt</Text>
        </View>
        <Text>Smart choice for a Greener Tomorrow</Text>
        <Text style={{fontSize:25,fontWeight:500, marginTop:80}}>Log In/Sign Up</Text>
        <View style={styles.inputContainer}>
            <Input placeholder='Email'
            autoFocus
            type="Email"
            value={Email}
            onChangeText={(text) => setEmail(text)}
            />
            <Input placeholder='Password'
            secureTextEntry
            type="password"
            value={Password}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={signIn}
            />
        </View>

      <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
      <Button onPress={() => navigation.navigate("Register")}
      containerStyle={styles.button}
      type="outline"
      title="Register"/>
      <View style={{height:100}}/>
      <View style={{ width:350}}>
        <Text style={{textAlign:"center",fontSize:16,fontWeight:400}}>“Every watt saved, every drop valued, paves the way for a brighter and more sustainable tomorrow.”
</Text>
      </View>  
    </KeyboardAvoidingView>
    
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:20,
        backgroundColor:"white",

    },
    inputContainer:{
            width: 300,
            marginTop: 20,
    },
    button:{
        width:200,
        marginTop:10,
        borderRadius:5,
    },
})