import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { AntDesign } from 'expo-vector-icons';
import { Image } from 'react-native-elements';

const WaterSummary = ({navigation}) => {

    const UserInfo =()=>{
        navigation.navigate("UserInfo");
    }
    const Home = ()=>{
      navigation.goBack();
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
          title:"Hydro Summary",
          headerStyle: {backgroundColor : "#fff"},
            headerTitleStyle: {color:"black",
            textAlign:"center",
            alignItems:"center",
            justifyContent:"center"
          },
            headerTintColor: "black",
            headerLeft: ()=>(
              <View style={{marginLeft:10 }}>
              <TouchableOpacity onPress={Home} activeOpacity={0.5} style={{marginRight:70}}>
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
    <View>
      <Text>WaterSummary</Text>
    </View>
  )
}

export default WaterSummary

const styles = StyleSheet.create({})