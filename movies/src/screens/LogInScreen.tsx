import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {Input} from 'react-native-elements';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {RootParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type LogInProps = NativeStackScreenProps<RootParamList, 'LogIn'>;

const LogInScreen = ({navigation}: LogInProps): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email) {
      Alert.alert('Please fill Email');
      return;
    }
    if (!password) {
      Alert.alert('Please fill Password');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          navigation.navigate('Movies');
          setPassword('');
          setEmail('');
        }
      })
      .catch(err => {
        if (
          err.code === 'auth/invalid-email' ||
          err.code === 'auth/user-not-found'
        ) {
          Alert.alert('Invalid email');
        } else if (err.code === 'auth/wrong-password') {
          Alert.alert('Invalid password');
        } else {
          Alert.alert(err.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text>Log in</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 15,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

/*  {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
*/
export default LogInScreen;
