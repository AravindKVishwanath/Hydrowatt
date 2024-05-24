import React from 'react';
import { useEffect } from 'react';
const {calculatedProgress} = require('./WaterProgres.js')
import {
  Easing,
  TextInput,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Svg, { G, Circle, Rect } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function Donut({

 percentage=calculatedProgress,
  //percentage=80,
  radius = 70,
  strokeWidth = 10,
  duration = 500,
  color = "#000000",
  delay = 0,
  textColor,
  max = 100,
  
}) {
  const TotalConsumption = 0
  console.log(TotalConsumption)
  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;
  const getColorForPercentage = (percent) => {
    if (percent <= 30) {
      return ["#FF0000", "#FFFF00", 30]; 
    } else if (percent > 30 && percent <= 60) {
      return ["#FFFF00", "#00FF00", 60]; 
    } else {
      return ["#00FF00", "#00FFFF", 100]; 
    }
  };
  const colorRange = getColorForPercentage(percentage);
  const colorInterpolate = animated.interpolate({
    inputRange: [0, colorRange[2]],
    outputRange: [colorRange[0],colorRange[1]],
  });
  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay: 1000,
      toValue:percentage,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
    };
  

  useEffect(() => {
    animation(percentage);
    animated.addListener((v) => {
      const maxPerc = 100 * v.value / max;
      const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        });
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    }, [max, percentage]);

    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G
          rotation="-90"
          origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            ref={circleRef}
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          { fontSize: radius / 2,  color: textColor   ?? colorInterpolate },
          styles.text,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontWeight: '900', textAlign: 'center' },
});