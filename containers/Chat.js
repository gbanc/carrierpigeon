import React,{ useState, useEffect } from "react";
import {Socket} from "phoenix"
import UserMessage from '../presentationals/UserMessage'
import ServerMessage from '../presentationals/ServerMessage';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

function Chat() {
  const [inputMessage, setInputMessage] = useState(0);
  const [messages, setMessages] = useState([]);
  const socket = new Socket("http://192.168.1.148:4000/socket", {params:
  {token: window.userToken}
  });
  socket.onOpen(event => console.log('Connected.'))
  socket.onError(event => console.log('Cannot connect.'))
  socket.onClose(event => console.log('Goodbye.'))
  socket.connect({})
  const channel = socket.channel("room:lobby", {});
  channel.join()
  .receive("ok", response => { console.log("Joined successfully", response) })

  useEffect(() => {
    channel.on("new_msg", payload => {
      setMessages(messages.concat(payload.body))
    })
  }, []);


  handleSubmit = (evt) => {
    evt.preventDefault();
    //alert(`Submitting message ${inputMessage}`)
    channel.push("new_msg", {body: inputMessage})
    .receive('ok', (msg) => console.log('sent'))
    .receive('error', (reasons) => console.log('flop', reasons))
    .receive('timeout', () => console.log('slow much?'))
    setMessages(messages.concat(inputMessage))
    setInputMessage(0)
  };
  
  


    const newmessages = messages.map((message, index) => {
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
    })

    
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
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            className="input"
            type="text"
            onChangeText={text => setInputMessage(text)}
          />
        </View>
      </View>
      <Button
        title='Press me'
        type="submit"
        value="Submit"
        color='orange'
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
{newmessages}
</View>

    </View>
    </View>
  )
  }

export default Chat