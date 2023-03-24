import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {useFetchMoviesQuery} from '../store';
import auth from '@react-native-firebase/auth';
import MoviesList from '../components/MoviesList';
import {RootParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type MoviesProps = NativeStackScreenProps<RootParamList, 'Movies'>;

const MoviesScreen = ({navigation}: MoviesProps): JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const {data, error, isFetching} = useFetchMoviesQuery(movieTitle);

  const handleLogOut = () => {
    auth()
      .signOut()
      .then(() => navigation.navigate('LogIn'));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMovieTitle(inputValue);
    }, 2000);
    return () => {
      clearTimeout(timer);
      setMovieTitle('');
    };
  }, [inputValue]);

  return (
    <>
      <SafeAreaView>
        <TouchableOpacity style={styles.button} onPress={handleLogOut}>
          <Text>Log Out</Text>
        </TouchableOpacity>
        <Text style={styles.titleStyle}>Welcome!</Text>
      </SafeAreaView>
      <View style={styles.backgroundStyle}>
        <FontAwesomeIcon icon={faSearch} style={styles.iconStyle} />
        <TextInput
          placeholder="Search..."
          autoCapitalize="none"
          autoCorrect={false}
          value={inputValue}
          onChangeText={setInputValue}
          style={styles.inputStyle}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setInputValue('')}>
          <FontAwesomeIcon icon={faXmark} style={styles.crossStyle} />
        </TouchableOpacity>
      </View>
      {isFetching ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>Error loading movies</Text>
      ) : (data && data.results.length) > 0 ? (
        <View style={styles.container}>
          <MoviesList movies={data.results} />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.textStyle}>No movies, look for some</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: '#D3D3D3',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
  crossStyle: {
    fontSize: 35,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  button: {
    margin: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 16,
    color: 'black',
  },
  titleStyle: {
    fontSize: 24,
    color: 'black',
    alignSelf: 'center',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MoviesScreen;
