import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import Chat from "./containers/Chat";
import Signup from "./containers/Signup";
import Login from "./containers/Login";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
      <Chat/>
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
