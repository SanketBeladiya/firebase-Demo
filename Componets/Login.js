import React, {useState} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from 'react-native';

import {GoogleSignin} from '@react-native-community/google-signin';

import {LoginManager, AccessToken} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
const Login = ({navigation}) => {
  const [confirm, setConfirm] = useState(null);
  const [phoneNo, setphoneNo] = useState('');

  // Handle the button press
  const signInWithPhoneNumber = async () => {
    console.log('enter');
    console.log(phoneNo);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNo);
      setConfirm(confirmation);
      navigation.navigate('Verify', {
        confirm: confirmation,
      });
      console.log('confirmtion===>', confirmation);
    } catch (err) {
      console.log(err);
    }
  };
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result) {
      navigation.navigate('Home');
      ToastAndroid.show('Login Successfull..', ToastAndroid.SHORT());
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    console.log('credentila', facebookCredential);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  GoogleSignin.configure({
    webClientId:
      '967394214959-7gbu523486avfodqn05u054n5hd11iuf.apps.googleusercontent.com',
  });

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    let data = auth().signInWithCredential(googleCredential);

    if (data) {
      navigation.navigate('Home');
      ToastAndroid.show('Login Successfull..', ToastAndroid.SHORT());
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.input_box_container}>
        <View style={styles.enter_wrap}>
          <Text>Name</Text>
          <TextInput style={styles.input_line}></TextInput>
        </View>
        <View style={styles.enter_wrap}>
          <Text>Mobile No</Text>
          <TextInput
            onChangeText={(text) => setphoneNo(text)}
            style={styles.input_line}></TextInput>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => signInWithPhoneNumber()}>
          <Text>Get OTP</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.facebook_button}
        onPress={() => onFacebookButtonPress()}>
        <Text style={styles.facebook_icon}>f</Text>
        <Text style={{color: '#fff'}}>Login with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.facebook_button}
        onPress={() => onGoogleButtonPress()}>
        <Text style={styles.facebook_icon}>G</Text>

        <Text style={{color: '#fff'}}>Login with google</Text>
      </TouchableOpacity>
    </View>
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
  facebook_button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1877f2',
    // padding: 10,
    width: 150,
    marginVertical: 20,
    borderRadius: 8,
    flexDirection: 'row',
  },
  facebook_icon: {
    fontSize: 35,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
});
export default Login;
