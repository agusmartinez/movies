import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface Props {
  movie: string;
  poster: string;
}
const MovieDetail = ({movie, poster}: Props): JSX.Element => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  return (
    <View style={styles.container}>
      <Text style={styles.nameStyle}>{movie}</Text>
      <Image
        source={{uri: `${IMAGE_BASE_URL}${poster}`}}
        style={styles.imageStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    marginBottom: 10,
  },
  imageStyle: {
    width: 250,
    height: 140,
    borderRadius: 4,
    marginBottom: 5,
  },
  nameStyle: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default MovieDetail;
