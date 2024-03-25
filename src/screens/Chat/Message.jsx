import React, {useState, useRef, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextInputBase,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import avatar from '../../assets/Images/profileImg.jpg';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Mutation,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import moment from 'moment';
import {io} from 'socket.io-client';
import {Colors} from '../../constants/theme';
import apiRequest from '../../api/apiRequest';
import urlType from '../../constants/UrlConstants';
const MessageBox = () => {
  const bottomRef = useRef();
  const route = useRoute();
  const {chatRoomId, username} = route.params;
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['user']);
  const usr_id = userData?.user?.useraccount_id;
  const [socket, setSocket] = useState(io('http://192.168.100.34:5000/'));
  const [message, setmessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    // Event listener for 'typing' event

    socket.on('connection');
    socket.on('typing', () => {
      setIsTyping(true);
    });

    socket.on('message', data => {
      queryClient.setQueryData(['messages', chatRoomId], prevData => {
        // Concatenate the new message with the existing messages data
        return [...prevData, data];
      });
    });

    return () => {
      socket.off('typing', () => {
        console.log('data');
        setIsTyping(false);
      });
      socket.off('connect');
      socket.off('message', data => {
        console.log('hammad ko apis nhi ati', data);
      });
    };
  }, [socket]);
  const messagesData = useQuery({
    queryKey: ['messages', chatRoomId],
    queryFn: async () => {
      const response = await apiRequest('http://192.168.100.34:5000/api/', {
        method: 'get',
        url: `messages?chatroom_id=${chatRoomId}`,
      });
      return response.data;
    },
  });
  const emitTypingEvent = () => {
    socket.emit('typing', chatRoomId);
  };
  const sendMessage = () => {
    socket.emit('send-message', {
      user: usr_id,
      chatroom_id: chatRoomId,
      msg_text: message,
    });
    setmessage(''); // Clear the input field after sending message
    setIsTyping(false);
  };

  const handleTyping = txt => {
    setmessage(txt);
    if (txt) {
      setIsTyping(true);
      emitTypingEvent();
    } else {
      setIsTyping(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 0,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 15,
            alignContent: 'center',
          }}>
          <View>
            {false ? (
              <Image
                style={styles.imgAvatar}
                source={{uri: itemData?.prof_pic}}
              />
            ) : (
              <Image style={styles.imgAvatar} source={avatar} />
            )}
          </View>
          {/* {result[0]?.receiver_name} */}
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.paragraph}>{username}</Text>
          </View>
        </View>
      </View>
      {/* <CdlAppHeader name={result[0]?.receiver_name}/> */}

      <FlatList
        ref={bottomRef}
        // ref={ref => this.flatList = ref}
        onContentSizeChange={async () => {
          await bottomRef.current?.scrollToEnd({animated: true});
        }}
        style={styles.flat}
        showsVerticalScrollIndicator={false}
        data={messagesData.data}
        renderItem={({item, index}) =>
          usr_id === item.useraccount_id ? (
            <View style={styles.receiverrow} key={index}>
              <View style={styles.receiverchat}>
                <View style={styles.receivercol}>
                  <View>
                    <Text style={styles.view1}>
                      {item?.user_account?.user_name}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.view2}>{item?.msg_text}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={styles.view3}>
                    {moment(item?.created_at).format('YY-MM-DD HH:mm a')}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.senderrrow} key={index}>
              <View style={styles.senderchat}>
                <View style={styles.sendercol}>
                  <View>
                    <Text style={styles.sview1}>
                      {item?.user_account?.user_name}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.sview2}>{item?.msg_text}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Text style={styles.sview3}>
                    {moment(item?.created_at).format('YY-MM-DD HH:mm a')}
                  </Text>
                </View>
              </View>
            </View>
          )
        }
      />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text>{isTyping ? '...typing' : null}</Text>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          marginLeft: 8,
          marginRight: 8,
          borderRadius: 20,
          marginBottom: 8,
          borderColor: '#FA4415',
          borderWidth: 2,
        }}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              padding: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '90%',
                width: '88%',
                backgroundColor: 'white',
                borderColor: '#FA4415',
                marginLeft: 6,
                padding: 10,
              }}
              value={message}
              onChangeText={e => {
                handleTyping(e);
              }}
              placeholder="  Message.."></TextInput>
            <TouchableOpacity onPress={sendMessage}>
              <MaterialCommunityIcons
                name={'send-outline'}
                size={30}
                color={Colors.primary.darkgray}
              />
            </TouchableOpacity>
            {/* <Ionicons
              style={styles.sendicon}
              name="send-outline"
              size={32}
              color="#FA4415"
              onPress={() => sendChatFun(message)}
            /> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MessageBox;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 15,
    backgroundColor: 'rgb(239 239 239 / 40%)',
  },
  paragraph: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginLeft: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  sendicon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  receiverrow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  receivercol: {
    flexDirection: 'column',
    width: '100%',
  },
  receiverchat: {
    justifyContent: 'flex-end',
    width: '50%',
    borderRadius: 6,
    padding: 15,
    marginTop: 8,
    marginBottom: 2,
    marginRight: 5,
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#dcdcdc',
  },
  view1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FA4415',
    // color: "black",
    textTransform: 'capitalize',
  },
  view2: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  view3: {
    fontSize: 12,
    fontWeight: '500',
    color: 'grey',
  },
  senderrow: {
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center',
    marginTop: 10,
  },
  sendercol: {
    flexDirection: 'column',
    width: '100%',
  },
  senderchat: {
    justifyContent: 'flex-start',
    width: '50%',
    borderRadius: 6,
    padding: 5,
    marginTop: 8,
    marginBottom: 2,
    marginLeft: 5,
    shadowColor: '1px 1px 4px 0px #00000040',
    backgroundColor: '#ffffff',
  },
  sview1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FA4415',
    // color: "black",

    textTransform: 'capitalize',
  },
  sview2: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  sview3: {
    fontSize: 12,
    fontWeight: '500',
    color: 'grey',
  },
  img: {
    height: 30,
    width: 30,
    borderWidth: 1,
  },

  imgAvatar: {
    height: 50,
    width: 50,
    borderWidth: 1,
    borderRadius: 100 / 2,
    backgroundColor: '#FA4415',
    borderColor: '#737373',
  },
});
