import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
const Verify = ({navigation, route}) => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  });

  const [code, setCode] = useState('');
  // const {confirm}=route.params
  // console.log("confirm",confirm);

  // const checkOtp= async()=>{
  //   try{

  //     let a=await confirm.confirm(code)
  //     if(a)
  //     {
  //       navigation.navigate('Home')
  // ToastAndroid.show('Successfully login...', ToastAndroid.SHORT);
  //     }
  //     else{
  //          ToastAndroid.show('Wrong Otp...', ToastAndroid.SHORT);
  //     }
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }
  const resendOtp = () => {
    ToastAndroid.show('OTP Send Successfully', ToastAndroid.SHORT);
  };
  return (
    <>
      <View style={styles.screen}>
        <View style={styles.input_box_container}>
          <View style={styles.enter_wrap}>
            <Text>Enter OTP</Text>
            <TextInput
              style={styles.input_line}
              onChangeText={setCode}></TextInput>
          </View>

          <TouchableOpacity
            style={styles.button}
            // onPress={() =>checkOtp()}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        </View>

        <View>
          {seconds === 0 ? (
            <TouchableOpacity>
              <Text onPress={() => resendOtp()} style={styles.resend}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.resend_count}>Resend OTP {seconds}</Text>
          )}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_box_container: {
    width: 280,
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#42d4f5',
    padding: 10,
    width: 100,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  input_line: {
    borderBottomWidth: 1,
  },
  enter_wrap: {
    padding: 5,
  },
  resend: {
    color: '#42d4f5',
    marginTop: 10,
    fontSize: 15,
  },
  resend_count: {
    marginTop: 10,
    fontSize: 15,
  },
});
export default Verify;
