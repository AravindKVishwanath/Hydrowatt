import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Settings = () => {
  return (
    <View>
        <Text style={styles.container}>
            Here the options to update user info like name email password profile pic(image link from browser only for now)
        </Text>
        <Text style={styles.container}>
            other settings as well (2 to 3 other settings enough)
        </Text>
        <Text style={styles.container}>
            Then at last option for user to sign out...small sign out button at the bottom of page...or if required we can also have a delete account also
        </Text>
    </View>
  );
};
export default Settings
const styles = StyleSheet.create({
    container:{
        margin:10,
        fontSize:20
    }
})