import { Alert, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import {Button, Input, Image, Text} from "react-native-elements";
import { KeyboardAvoidingView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [Name , setName] = useState('');
  const [Email , setEmail] = useState('');
  const [Password , setPassword] = useState('');
  
  
  const register=()=>{
      const user = {
        Name: Name,
        Email: Email,
        Password: Password,
      };
      axios.post("http://192.168.157.186:3000/register",user).then((response)=>{
        console.log(response)
        Alert.alert("registration successful")
        setName("")
        setEmail("")
        setPassword("")
      }).catch((error)=>{
        Alert.alert("Registration error")
        console.log("Register error",error)
      })
 }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{flexDirection:"row"}}>
            <Text style={{fontSize: 45,fontWeight: "700", color:"#4D40D9"}}>Hydro</Text>
            <Text style={{fontSize: 45,fontWeight: "700", color:"#E15959"}}>Watt</Text>
        </View>
        <Text>Smart choice for a Greener Tomorrow</Text>
      <Text h3 style={{margin: 60, textAlign: "center"}}>
        Create an Account
      </Text>
      <View style={styles.inputContainer}>
          <Input placeholder="Full Name" autofocus type='text' value={Name} onChangeText={(text) => setName(text)}/>
          <Input placeholder="Email" type='text' value={Email} onChangeText={(text) => setEmail(text)}/>
          <Input placeholder="Password" secureTextEntry type='text' value={Password} onChangeText={(text) => setPassword(text)}/>
      </View>
      <Button containerStyle={styles.button} title="Register" onPress={register} raised/>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",

},
inputContainer: {
    width: 300,
    marginTop: 20,
},
button: {
    width: 200,
    marginTop:10,
    borderRadius:4,
}
})