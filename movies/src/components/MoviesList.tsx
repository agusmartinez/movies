import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import MovieDetail from './MovieDetail';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../../App';

interface Movie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Number[];
  id: Number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: Number;
  vote_count: Number;
  video: boolean;
  vote_average: Number;
}

interface Movies {
  movies: Movie[];
}

const MoviesList = ({movies}: Movies): JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootParamList, 'MovieShow'>>();

  const handlePressMovie = (movie: Movie) => {
    navigation.navigate('MovieShow', {id: movie.id});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={movie => movie.id.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => handlePressMovie(item)}>
              <MovieDetail movie={item.title} poster={item.poster_path} />
            </TouchableOpacity>
          );
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MoviesList;
