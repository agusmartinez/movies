import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {RootParamList} from '../../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useFetchMovieQuery} from '../store';

type MovieShowProps = NativeStackScreenProps<RootParamList, 'MovieShow'>;

const MovieShowScreen = ({route}: MovieShowProps): JSX.Element => {
  const id = route.params.id;

  const {data, error, isFetching} = useFetchMovieQuery(id);

  let movie = data;

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <SafeAreaView>
      {isFetching ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>Error loading movie</Text>
      ) : (
        <View>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.container}>
            <Image
              source={{uri: `${IMAGE_BASE_URL}${movie.poster_path}`}}
              style={styles.imageStyle}
            />
            <Text style={styles.text}>{movie.overview}</Text>
          </View>
          <View style={styles.container2}>
            <Text style={styles.text}>
              Originial Language: {movie.original_language}
            </Text>
            <Text style={styles.text}>Popularity: {movie.popularity}</Text>
            <Text style={styles.text}>Vote Count: {movie.vote_count}</Text>
            <Text style={styles.text}>Vote Average: {movie.vote_average}</Text>
            <Text style={styles.text}>Release Date: {movie.release_date}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  imageStyle: {
    width: 250,
    height: 140,
    borderRadius: 4,
    marginBottom: 5,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    fontSize: 14,
    marginBottom: 5,
  },
  container2: {
    marginLeft: 10,
  },
});

export default MovieShowScreen;
