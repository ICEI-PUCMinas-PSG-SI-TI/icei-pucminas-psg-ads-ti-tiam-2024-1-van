import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore';

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setProfileUrl(userSnapshot.data().image);
        } else {
          console.log('No user data available');
        }
      }
    };
    fetchUserInfo();

    return () => locationSubscription?.remove();
  }, [locationSubscription]);

  const toggleLocationSharing = async () => {
    if (isSharingLocation) {
      locationSubscription?.remove();
      setIsSharingLocation(false);
      setLocation(null);
    } else {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const subscription = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 10000,
      }, (locationUpdate) => {
        setLocation(locationUpdate.coords);
        updateDoc(doc(db, 'users', auth.currentUser.uid), {
          latitude: locationUpdate.coords.latitude,
          longitude: locationUpdate.coords.longitude,
        });
      });

      setLocationSubscription(subscription);
      setIsSharingLocation(true);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.00422,
            longitudeDelta: 0.00421,
          }}>
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Your Location">
            {profileUrl ? (
              <Image
                source={{ uri: profileUrl }}
                style={styles.profilePic}
                onError={() => console.log('Error loading image')}
              />
            ) : (
              <Text>No Image Available</Text>
            )}
          </Marker>
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <Button
        title={isSharingLocation ? "Interromper Compartilhamento" : "Iniciar Compartilhamento"}
        onPress={toggleLocationSharing}
        color={isSharingLocation ? "red" : "green"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Espaço para a barra de navegação
  },
  map: {
    width: '100%',
    height: '85%', // Reduzir a altura para não sobrepor a barra de navegação
  },
  profilePic: {
    width: 40, // Tamanho reduzido
    height: 40, // Tamanho reduzido
    borderRadius: 20, // Circular
  },
});

export default LocationScreen;
