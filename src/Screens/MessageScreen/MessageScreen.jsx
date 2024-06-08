import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/colors';

const Message = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../../assets/images/avatar2.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native',
  },
  {
    id: '2',
    userName: 'Jenny Doe',
    userImg: require('../../assets/images/avatar1.png'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native',
  },
  {
    id: '4',
    userName: 'Jenny Doe',
    userImg: require('../../assets/images/avatar1.png'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native',
  },
  {
    id: '5',
    userName: 'Jenny Doe',
    userImg: require('../../assets/images/avatar2.jpg'),
    messageTime: '4 months ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native',
  },
];

const MessageScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={Message}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('DetailMessage', {userName: item.userName})
            }>
            <View style={styles.userInfo}>
              <View style={styles.userImgWrapper}>
                <Image source={item.userImg} style={styles.userImg} />
              </View>
              <View style={styles.textSection}>
                <View style={styles.userInfoText}>
                  <Text style={styles.userName}>{item.userName}</Text>
                  <Text style={styles.postTime}>{item.messageTime}</Text>
                </View>
                <Text style={styles.messageText}>{item.messageText}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImgWrapper: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 14,
    color: '#333333',
  },
  postTime: {
    fontSize: 12,
    color: COLORS.palette,
  },
});

export default MessageScreen;
