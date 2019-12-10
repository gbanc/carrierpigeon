import React,{ useState, useEffect } from "react";
import {Socket} from "phoenix"
import UserMessage from '../presentationals/UserMessage'
import ServerMessage from '../presentationals/ServerMessage';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

/* BTW EXPO ip changes */
const socket = new Socket("http://192.168.1.134:4000/socket", {params:
{token: window.userToken}
});
socket.onOpen(event => console.log('Connected.'))
socket.onError(event => console.log('Cannot connect.'))
socket.onClose(event => console.log('Goodbye.'))
socket.connect({})
const channel = socket.channel("room:lobby", {});
channel.join()
.receive("ok", response => { console.log("Joined successfully", response) })


function Chat() {
  const [inputMessage, setInputMessage] = useState(0);
  const [messages, setMessages] = useState([]);

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
        <Text style={styles.title}>GenericUsername:</Text>
        </View>
        <View className="control">
          <TextInput
            style={styles.nameInput}
            type="text"
            onChangeText={text => setInputMessage(text)}
          />
        </View>
      </View>
      <TouchableOpacity
        title='Press me'
        type="submit"
        value="Submit"
        color='orange'
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
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
  const offset = 24;
  const styles = StyleSheet.create({
    title: { // 4.
      marginTop: offset,
      marginLeft: offset,
      fontSize: offset,
    },
    nameInput: { // 3. <- Add a style for the input
      height: offset * 2,
      margin: offset,
      paddingHorizontal: offset,
      borderColor: '#111111',
      borderWidth: 1,
    },
    buttonText: { // 5.
      marginLeft: offset,
      fontSize: offset,
    },
  })
  
export default Chat