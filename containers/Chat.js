import React from "react";
import {Socket} from "phoenix"
import UserMessage from '../presentationals/UserMessage'
import ServerMessage from '../presentationals/ServerMessage';
import { StyleSheet, Text, View, Button } from 'react-native';

class Chat extends React.Component {

  
  constructor() {
    super();
    this.state = {
      inputMessage: "",
      messages: []
    }
    let socket = new Socket("http://localhost:4000/socket", {params:
      {token: window.userToken}
    });
    socket.connect();
    this.channel = socket.channel("room:lobby", {});
  }


  componentWillMount() {
    this.channel.join()
      .receive("ok", response => { console.log("Joined successfully", response) })

    this.channel.on("new_msg", payload => {
      this.setState({
        messages: this.state.messages.concat(payload.body)
      })
    })
  }


  handleInputMessage(event) {
    this.setState({
      inputMessage: event.target.value
    })
  }


  handleSubmit(event) {
    event.preventDefault();
    this.channel.push("new_msg", {body: this.state.inputMessage})
    this.setState({
      messages: this.state.messages.concat(this.state.inputMessage),
      inputMessage: ""
    })
  }


  render() {
    const messages = this.state.messages.map((message, index) => {
      if(index % 2 == 0) {
        return (
          <UserMessage
            key = { index }
            username = { "GenericUsername" }
            message = { message }
          />
        )
      } else {
        return (
          <ServerMessage
            key = { index }
            username = { "Server" }
            message = { message }
          />
        )
      }
    });
    
  return (
    <View>
    <View>
      <View onSubmit={this.handleSubmit.bind(this)} >
      <View className="field">
        <View
          className="label"
          style={{
            textAlign: "left"
          }}
        >
        <Text>GenericUsername:</Text>
        </View>
        <View className="control">
          <View
            className="input"
            type="text"
            value = {this.state.inputMessage}
            onChange = {this.handleInputMessage.bind(this)}
          />
        </View>
      </View>
      <Button
        title='Press me'
        type="submit"
        value="Submit"
        className="button is-primary"
        style={{
          marginTop: "10px"
        }}
      >
        Submit
        </Button>
      </View>
      <View
  className="flex-container"
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flexStart",
    justifyContent: "flexStart",
    margin: "auto",
    width: "100%"
  }}
>
{messages}
</View>

    </View>
    </View>
  )
  }
}
export default Chat