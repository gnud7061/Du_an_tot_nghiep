import {StyleSheet, Text, View} from 'react-native';
// import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import {useCallback, useEffect, useState} from 'react';
import COLORS from '../../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icons} from '../../constants/images';

const DetailMessage = () => {
  const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: Icons.Avatar1,
//         },
//       },
//       {
//         _id: 2,
//         text: 'Hello World',
//         createdAt: new Date(),
//         user: {
//           _id: 1,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, messages),
//     );
//   }, []);

//   const scrollToBottomComponent = () => {
//     return <FontAwesome name="angle-double-down" size={22} color="#333" />;
//   };

//   const renderBubble = props => {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#2e64e5',
//           },
//         }}
//         textStyle={{
//           right: {
//             color: '#fff',
//           },
//         }}
//       />
//     );
//   };

  const renderSend = props => {
    return (
    //   <Send {...props}>
    //     <View>
    //       <MaterialCommunityIcons
    //         style={{marginBottom: 5, marginRight: 5}}
    //         name="send-circle"
    //         size={32}
    //         color="#2e64e5"
    //       />
    //     </View>
    //   </Send>
    <View>

    </View>
    );
  };

  return (
    // <GiftedChat
    //   messages={messages}
    //   onSend={message => onSend(message)}
    //   user={{
    //     _id: 1,
    //   }}
    //   renderBubble={renderBubble}
    //   alwaysShowSend
    //   renderSend={renderSend}
    //   scrollToBottom
    //   scrollToBottomComponent={scrollToBottomComponent}
    // />

    <View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default DetailMessage;
