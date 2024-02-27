import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Donut from './waterBar';
import { onValue } from 'firebase/database';
import { flowRate } from '../fireConfig';

const WaterProgressBar = () => {
  const [goal, setGoal] = useState(0);
  const [TotalConsumption, setTotalconsumption] = useState(0)
  //const [waterData, setWaterData] = useState(0);
  const [progress, setProgress] = useState(0);

  let data1=1;
  let data2=25.55
  


  const calculateProgress = (goal, TotalConsumption) => {
    if (goal > 0) {
      return (TotalConsumption /20) * 100;
    }
    return 0; 
  };

  const formatChartData1 = (rawData) => {
    const formattedData = rawData.map((item) => {
        const dateParts = item.date.split(' ');
        console.log(dateParts)
        const formattedDate = `${selectedMonth} ${dateParts[1]}`; // Format date as "Month Day"

        return {
            value: item.TotalConsumption,
            label: formattedDate,
        };
    });

    return formattedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://electrocode.onrender.com/getwaterData/Hydrowatt');
        const formattedData1 = formatChartData1(response.data.waterData.slice(1));
        //const data = formattedData1;
        console.log("data",formattedData1)
      } catch (error) {
        console.log("Error fetching WaterData", error);
      }
    };

    fetchData();
    if (goal > 0) {
        const calculatedProgress = calculateProgress(goal, TotalConsumption);
      setProgress(calculatedProgress);
      }
      onValue(flowRate,(snapshot)=>{
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
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>Actual Consumption: {TotalConsumption}</Text>
      </View>
      <View style={styles.donutContainer}>
        <Donut />
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