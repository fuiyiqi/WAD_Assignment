import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const SongDetailScreen = ({ route, navigation }) => {
  const { track } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  // Set up navigation header
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}>
            <MaterialCommunityIcons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={28}
              color={isFavorite ? '#1DB954' : '#fff'}
            />
          </TouchableOpacity>
        </View>
      ),
      title: '',
    });
  }, [navigation, isFavorite]);

  if (!track) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#704214', '#2C1E0F', '#121212']}
      style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <View style={styles.content}>
        {/* Album Artwork */}
        <Image
          source={{ uri: track.album?.images[0]?.url || 'https://via.placeholder.com/300' }}
          style={styles.albumCover}
          resizeMode="contain"
        />
        
        {/* Track Info */}
        <Text style={styles.trackName}>{track.name}</Text>
        <Text style={styles.artistName}>{track.artists.map(artist => artist.name).join(', ')}</Text>
        
        {/* Action Buttons */}
        <TouchableOpacity style={styles.addToPlaylistButton}>
          <Text style={styles.addToPlaylistText}>Add to playlist</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playButtonText}>I want to play this song</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  headerButton: {
    padding: 10,
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100, // Give space for the transparent header
    paddingHorizontal: 30,
  },
  albumCover: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 30,
  },
  trackName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  artistName: {
    fontSize: 20,
    color: '#B3B3B3',
    textAlign: 'center',
    marginBottom: 40,
  },
  addToPlaylistButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  addToPlaylistText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  playButton: {
    paddingVertical: 10,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default SongDetailScreen;