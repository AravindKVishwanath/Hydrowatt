import { StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { AntDesign } from 'expo-vector-icons';
import { FirebaseRef4,FirebaseRef5 } from '../fireConfig';
import { onValue } from 'firebase/database';
import Goals1 from './WaterGoal'

const WaterMonitor = ({navigation}) => {

  var [data4 ,setData4] = useState(null);
  var [data5 ,setData5] = useState(null);
          
      useEffect(() => {
        const fetchData = async() => {
          try {
            await onValue(FirebaseRef4, (snapshot) => {
              if (snapshot.exists()) {
                setData4(snapshot.val());
              } else {
                console.log('No data available in the snapshot.');
              } 
            });
            await onValue(FirebaseRef5, (snapshot) => {
              if (snapshot.exists()) {
                setData5(snapshot.val());
              } else {
                console.log('No data available in the snapshot.');
              } 
            });
           
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
    
        fetchData();
    
      }, []);

    const Home = ()=>{
        navigation.goBack();
    }
    const UserInfo =()=>{
        navigation.navigate("UserInfo");
    }
    const WaterSummary=()=>{
      navigation.navigate("Hydro Summary")
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
          title:"WaterMonitor",
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
    <View style={{justifyContent:"center",alignItems:"center",flex:1,marginRight:170}}>
      <View>
        <TouchableOpacity style={{width:100,height:40,borderRadius:20, backgroundColor:"#D9D9D9",marginTop:-70,marginLeft:-100,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                <AntDesign name='wifi' size={18} color='green' style={{marginRight:10}}/>
                <Text>Online</Text>
        </TouchableOpacity>
      </View>
      <View style={{height:180}}/>  
      <View style={{height:200,width:200, backgroundColor:"#fff",borderRadius:150,borderColor:"#00A894", borderWidth:5,alignItems:"center",justifyContent:"center",marginTop:-80}}>
            <Text style={{fontSize:40,fontWeight:500}} >{data4}</Text>
            <Text style={{fontSize:20,fontWeight:400}} >Lts/min</Text>
      </View>
      <View style={{height:125,width:125, backgroundColor:"#fff",borderRadius:150,borderColor:"#00A894", borderWidth:3,alignItems:"center",justifyContent:"center",marginLeft:380,marginBottom:10,marginTop:-80}}>
            <Text style={{fontSize:25,fontWeight:500}} >{data5}</Text>
            <Text style={{fontSize:15,fontWeight:400}} >Water Level</Text>
      </View>
      
      <View style={{height:180}}/>
      <View style={{flexDirection:"row",marginLeft:150}}>
        <TouchableOpacity style={{width:150,height:50,backgroundColor:"#00A894",borderRadius:30,justifyContent:"center",alignItems:"center"}}
         onPress={() => navigation.navigate('WaterGoal')}>
                <Text>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={WaterSummary} style={{marginLeft:20,width:150,height:50,backgroundColor:"#00A894",borderRadius:30,justifyContent:"center",alignItems:"center"}}>
                <Text>Summary</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default WaterMonitor;

const styles = StyleSheet.create({})