import { StatusBar } from 'expo-status-bar';    
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AntDesign } from 'expo-vector-icons';
import axios from 'axios';


const Goals = ({ route,navigation }) => {
  const [currentMonth, setCurrentMonth] = useState('');
  const [goalText, setGoalText] = useState('');
  const [id,setid] = useState('')
  const {email} = route.params
  const UserInfo =()=>{
    navigation.navigate("UserInfo")
  }
const Home = ()=>{
  navigation.goBack();
}
const updateGoal=async()=>{
  const goal ={
    ElectricityConsumptionGoal:goalText
  }
  const response = await axios.put(`http://192.168.157.186:3000/ElectricityConsumptionGoal/${id}`,goal)
  alert("Electricity Consumption Goal set successfully")
  console.log(response)
}

  useEffect(() => {
    const getCurrentMonth = () => {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const currentDate = new Date();
      return months[currentDate.getMonth()];

    };
    const getnewdata=async()=>{
      const response = await axios.get(`http://192.168.157.186:3000/getIdbyEmail/${email}`)
      setid(response.data._id)
    }
    getnewdata();
    setCurrentMonth(getCurrentMonth());
  }, [email]);

  useLayoutEffect(()=>{
    navigation.setOptions({
      title:"Watt Goals",
      headerStyle: {backgroundColor : "#fff"},
        headerTitleStyle: {color:"black",
        textAlign:"center",
        alignItems:"center",
        justifyContent:"center",
        
      },
        headerTintColor: "black",
        headerLeft: ()=>(
          <View style={{marginLeft:10 }}>
          <TouchableOpacity onPress={Home}  style={{marginRight:90}}>
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
  },[navigation]);

  return (
    <View style={styles.container}>
      
        <Text style={styles.text1}>{currentMonth}</Text>
        <View style={styles.centeredInputBox}>
        <TextInput
        style={styles.inputBox}
        placeholder="Enter your goal" 
        value={goalText}
        onChangeText={(text) => setGoalText(text)}
      />
</View>
      <TouchableOpacity
        style={styles.button}
        onPress={updateGoal} >
         <Text style={styles.buttonText}>Update Goals</Text>
      </TouchableOpacity>
      <View style={styles.green}>
    <Text style={styles.textInBox}> Monthly goal</Text>
  </View>
  <View style={styles.green1}>
    <Text style={styles.textInBox}>Progress</Text>
  </View>
      <StatusBar style="auto" />
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50, 
   
  },
  textInBox: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    right:90,
    bottom:60,
  },
  text: {
    fontSize: 24,
},
  image: {
  width: 20, 
  height: 20, 
  marginTop: 55,  
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
  top:30,
  fontWeight: 'bold',
  right: 100,
  
},
buttonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',  
  alignItems: 'center',
},
inputBox: {
  width: '100%',
  height: 40,
  backgroundColor: 'white',
  borderRadius: 10,
  paddingHorizontal: 100,
  marginBottom: 20,
  top:70,
  left:0,
  borderColor:'black',
  borderWidth:2,
},
centeredInputBox: {
  alignItems: 'center', 
},
button: {
  backgroundColor: '#00A894DE',
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 20,
 top:60,
  
},

green: {
  backgroundColor: '#EEEEEE',
  width: 310,
  height: 171,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  top: 100,
},
green1: {
  backgroundColor: '#EEEEEE',
  width: 310,
  height: 171,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  top: 120,
},
}
);

export default Goals;