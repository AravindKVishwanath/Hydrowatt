import { StyleSheet, View, TouchableOpacity, Text} from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AntDesign } from 'expo-vector-icons'
import { Image } from 'react-native-elements'
import { Dimensions } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { LineChart } from "react-native-gifted-charts";
import axios from 'axios';


const ElecSummary = ({ navigation }) => {

  const screenWidth = Dimensions.get("window").width - 11;
  //console.log(screenWidth);
  const ref = useRef(null);
  //const lineData = [];
  let lineData2=[]
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Number of days in each month
  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];
  console.log(currentMonth);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [lineData, setLineData] = useState([]);


  const formatChartData = (rawData) => {
    const formattedData = rawData.map((item) => {
        const dateParts = item.date.split(' ');
       // console.log("date parts",dateParts)
        const formattedDate = `${dateParts[0]} ${dateParts[1]}`; // Format date as "Month Day"
        console.log("date parts",formattedDate)
        return {
            value: item.current,
            label: formattedDate,
        };
    });

    return formattedData;
  };

  useEffect(() => {
    const getcurrentData = async () => {
        try {
            const response = await axios.get("https://electrocode.onrender.com/getCurrentData/Hydrowatt");
            const formattedData = formatChartData(response.data.currentData);
            //console.log("akjsdhkajsh",formattedData)
            setLineData(formattedData);
            console.log("jkhdfkj",lineData.filter(item => item.label.startsWith(selectedMonth)))
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    getcurrentData();
}, [selectedMonth]);

  // Generate data for each day over 12 months
  //let currentDate = new Date(2023, 0, 1); // Start date: January 1, 2023
  /*for (let i = 0; i < 12; i++) { // Loop for 12 months
    const days = daysInMonth[i]; // Number of days in the current month
    for (let j = 0; j < days; j++) { // Loop for each day in the month
      const value = Math.floor(Math.random() * 50) + 1; // Random value for demonstration
      const label = `${months[i]} ${j + 1}`; // Format: Month Day
      //lineData.push({ value, label }); // Add data for the current day
    }
  }
*/
  const showOrHidePointer = (month) => {
    const index = months.indexOf(month);
    ref.current?.scrollTo({ x: index - 20}); // adjust as per your UI
  };

  const UserInfo = () => {
    navigation.navigate("UserInfo");
  }
  const Home = () => {
    navigation.goBack();
  }

/*
  useEffect(()=>{
      const getcurrentData =async()=>{
        try{
          const response = await axios.get("https://electrocode.onrender.com/getCurrentData/Hydrowatt")
          console.log("res",response.data.currentData);
          lineData.push(response.data.currentData);
          lineData2 = [...lineData[0]]
          console.log("line",lineData2)
        }catch(error){
          console.log("currentData",error)
        }
        
      }
      getcurrentData()
  },[])
*/

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Electricity Summary",
      headerStyle: { backgroundColor: "white" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={Home} activeOpacity={0.5} style={{ marginRight: 37}}>
            <Image style={{ height: 45, width: 45 }} source={require('../assets/icon.png')} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 100}}>
          <TouchableOpacity onPress={UserInfo} activeOpacity={0.5} style={{ marginLeft: 50 }}>
            <AntDesign name='user' size={24} color='black' />
          </TouchableOpacity>
        </View>
      ),

    })

  }, [navigation])
  return (
    <View>
        <Picker 
          style={{ width: 150, marginLeft: 120, marginTop: 20, color: 'green', position: 'relative' }}
          selectedValue={selectedMonth}
          onValueChange={(itemValue) => {
            setSelectedMonth(itemValue);
            showOrHidePointer(itemValue);
          }}
        >
          {months.map((month, index) => (
            //console.log(month)
            <Picker.Item key={index} label={month} value={month}  style={{fontSize:14}}/>
          ))}
        </Picker>
      <LineChart style={{top: '20'}}
        scrollRef={ref}
        //data={lineData.filter(item => item.data.startsWith(selectedMonth))} // Filter data for selected month
        data={lineData.filter(item => item.label.startsWith(selectedMonth))}
        curved
        initialSpacing={0}
        hideDataPoints
      />
    </View>
  )
}

export default ElecSummary

const styles = StyleSheet.create({})