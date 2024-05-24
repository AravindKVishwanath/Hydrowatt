import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Donut from './waterBar';
import { onValue } from 'firebase/database';
import { flowRate,Total_Consumption } from '../fireConfig';

const WaterProgressBar = () => {
  const [goal, setGoal] = useState(0);
  const [TotalConsumption, setTotalconsumption] = useState(0)
  //const [waterData, setWaterData] = useState(0);
  const [progress, setProgress] = useState(0);
  const [id,setid] = useState('')

  let data1=1;
  let data2=25.55
  


  const calculateProgress = async (goal, TotalConsumption) => {
    
    if (goal > 0) {
      return (TotalConsumption /20) * 100;
    }
    return 0; 
  };

  // const formatChartData1 = (rawData) => {
  //   const formattedData = rawData.map((item) => {
  //       const dateParts = item.date.split(' ');
  //       console.log(dateParts)
  //       const formattedDate = `${selectedMonth} ${dateParts[1]}`; // Format date as "Month Day"

  //       return {
  //           value: item.TotalConsumption,
  //           label: formattedDate,
  //       };
  //   });

  //   return formattedData;
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://electrocode.onrender.com/getwaterData/Hydrowatt');
        // const formattedData1 = formatChartData1(response.data.waterData.slice(1));
        // //const data = formattedData1;
        goal = await axios.get(`/WaterConsumptionGoal/${id}`)
        console.log("asjdh",goal)
      } catch (error) {
        console.log("Error fetching WaterData", error);
      }
    };

    fetchData();

    const getnewdata=async()=>{
      const response = await axios.get(`https://electrocode.onrender.com/getIdbyEmail/${email}`)
      setid(response.data._id)
    }
    
        const calculatedProgress = calculateProgress(goal, TotalConsumption);
      setProgress(calculatedProgress);
      onValue(Total_Consumption,(snapshot)=>{
        data1 = snapshot.val();
        console.log(data1);
        setTotalconsumption(data1);     
        //console.log(CurrentArray)
      })
  }, [goal, TotalConsumption]);

 /* useEffect(() => {
    if (goal > 0) {
      const calculatedProgress = (waterData / goal) * 100;
      setProgress(calculatedProgress);
    }
  }, [goal, waterData]);*/


  return (
    <View >
      <View >
        <Text style={styles.boldText}>Actual Consumption: {TotalConsumption}</Text>
      </View>
      <View style={styles.donutContainer}>
        <Donut percentage={TotalConsumption}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 10,
  },
  donutContainer: {
    marginBottom: 70, 
  },

});

export default WaterProgressBar;
/*<Text style={styles.boldText}>Goal: {goal}</Text>
      <Text style={styles.boldText}>Actual Consumption: {waterData}</Text>*/