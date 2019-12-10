import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import Chat from "./containers/Chat";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Chart from "./containers/Charts";

export default function App() {
  return (
    <SafeAreaView>
      <View>
      <Chart/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
