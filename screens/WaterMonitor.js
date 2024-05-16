import { StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { AntDesign } from 'expo-vector-icons';
import { flowRate,Total_Consumption } from '../fireConfig';
import { onValue } from 'firebase/database';
import Goals1 from './WaterGoal'
import axios from 'axios';

const WaterMonitor = ({navigation}) => {

  const [Flowrate, setFlowrate]  = useState(0)
  const [TotalConsumption, setTotalconsumption] = useState(0)
  const [waterArray, setWaterArray] = useState([]);

  const fetchData=()=>{
    let data1=1;
    let data2=25.55
    onValue(flowRate,(snapshot)=>{
      data1 = snapshot.val();
      console.log(data1);
      setFlowrate(data1);     
      //console.log(CurrentArray)
    })
    onValue(Total_Consumption,(snapshot)=>{
      data2 = snapshot.val()
      console.log(data2)
      setTotalconsumption(data2);
    })
    const currentDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    setWaterArray((prevData)=>[...prevData,{flowRate:data1,TotalConsumption:data2,date:currentDate}])
    console.log(waterArray);
    let water = {flowRate:data1,TotalConsumption:data2,date:currentDate}
    updateWater(water);
  }
  
console.log(waterArray)
  const updateWater=async(water)=>{
    try{
      const response = await axios.put("https://electrocode.onrender.com/waterData/AravindK",water)
      console.log("heloo23",response.data)
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchData();
  },[])
  

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
            <Text style={{fontSize:40,fontWeight:500}} >{Flowrate.toFixed(2)}</Text>
            <Text style={{fontSize:20,fontWeight:400}} >Lts/min</Text>
      </View>
      <View style={{height:125,width:125, backgroundColor:"#fff",borderRadius:150,borderColor:"#00A894", borderWidth:3,alignItems:"center",justifyContent:"center",marginLeft:380,marginBottom:10,marginTop:-80}}>
            <Text style={{fontSize:25,fontWeight:500}} >{TotalConsumption.toFixed(2)}%</Text>
            <Text style={{fontSize:15,fontWeight:400}} >Water Level</Text>
      </View>
      
      <View style={{height:180}}/>
      <View style={{flexDirection:"row",marginLeft:150}}>
        {/*<TouchableOpacity style={{width:150,height:50,backgroundColor:"#00A894",borderRadius:30,justifyContent:"center",alignItems:"center"}}
         onPress={() => navigation.navigate('WaterGoal')}>
                <Text>Goals</Text>
  </TouchableOpacity>*/}
        <TouchableOpacity onPress={WaterSummary} style={{marginLeft:20,width:150,height:50,backgroundColor:"#00A894",borderRadius:30,justifyContent:"center",alignItems:"center"}}>
                <Text>Summary</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}
export default WaterMonitor;

const styles = StyleSheet.create({})