import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

class UserMessage extends React.Component {
  render() {
    return (
      <View className="box" >
        <View className="media">
          <View className="media-content">
            <View className="content">
              
                <Text>{this.props.username}</Text>
                <Text>{this.props.message}</Text>
              
            </View>
          </View>
        </View>
      </View>
    )
  }
}
export default UserMessage