import React,{ useState, useEffect } from "react";
import {Socket} from "phoenix"
import UserMessage from '../presentationals/UserMessage'
import ServerMessage from '../presentationals/ServerMessage';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

function Chat() {
  const [inputMessage, setInputMessage] = useState(0);
  const [messages, setMessages] = useState("");
  let socket = new Socket("http://localhost:4000/socket", {params:
    {token: window.userToken}
  });
  socket.connect();
  const channel = socket.channel("room:lobby", {});
  channel.join()
  .receive("ok", response => { console.log("Joined successfully", response) })

  useEffect(() => {

    channel.on("new_msg", payload => {
      setMessages(messages.concat(payload.body))
    })
  }, []);


  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`Submitting message ${inputMessage}`)
    channel.push("new_msg", {body: inputMessage})
    setMessages(messages.concat(inputMessage))
    setInputMessage(0)
  };
  
  
  setMessages(Array.isArray(messages) && messages.map((message, index) => {
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
  });)
    
  return (
    <View>
    <View>
      <View>
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
          <TextInput
            className="input"
            type="text"
            // value = {inputMessage}
            //onChangeText = {() => setInputMessage(inputMessage)}
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
        onPress={handleSubmit}
      >
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
<Text>{messages}</Text>
</View>

    </View>
    </View>
  )
  }

export default Chat