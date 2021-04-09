import React from 'react';

import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Home = ({navigation}) => {
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      navigation.navigate( 'Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.screen}>
      <Text>Wlecome To Home Screen</Text>
      <TouchableOpacity
        style={styles.facebook_button}
        onPress={() => signOut()}>
        <Text style={{color: '#fff'}}>Logout in google</Text>
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

  facebook_button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1877f2',
    padding: 10,
    width: 150,
    marginVertical: 20,
    borderRadius: 8,
    flexDirection: 'row',
  },
});
export default Home;
