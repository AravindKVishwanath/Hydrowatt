import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { AntDesign } from 'expo-vector-icons'
import { Image } from 'react-native-elements'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Dimensions } from 'react-native';

const ElecSummary = ({ navigation }) => {

  const screenWidth = Dimensions.get("window").width -11;
  console.log(screenWidth)
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 89, 0,23,23,23,23,45,67,7,8,123],
        color: (opacity = 1) => `rgba(184, 95, 224, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const UserInfo = () => {
    navigation.navigate("UserInfo");
  }
  const Home = () => {
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Watt Summary",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: {
        color: "black",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
      },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity onPress={Home} activeOpacity={0.5} style={{ marginRight: 70 }}>
            <Image style={{ height: 45, width: 45 }} source={require('../assets/icon.png')} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: 80, marginRight: 20 }}>
          <TouchableOpacity onPress={UserInfo} activeOpacity={0.5} style={{ marginLeft: 50 }}>
            <AntDesign name='user' size={24} color='black' />
          </TouchableOpacity>
        </View>
      ),

    })

  }, [navigation])
  return (
    <View>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
      <BarChart
        data={data}
        width={screenWidth}
        height={220}
        yAxisLabel="Rainy Days"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>
  )
}

export default ElecSummary

const styles = StyleSheet.create({})