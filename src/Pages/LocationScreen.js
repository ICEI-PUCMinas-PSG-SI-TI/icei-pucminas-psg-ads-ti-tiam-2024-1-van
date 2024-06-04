import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const LocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de localização negada');
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Atualizar a cada 5 segundos
          distanceInterval: 0,
        },
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          const userId = auth().currentUser.uid;
          firestore().collection('motoristas').doc(userId).set(
            {
              location: new firestore.GeoPoint(latitude, longitude),
            },
            { merge: true }
          );
        }
      );
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compartilhar Localização em Tempo Real</Text>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker coordinate={location} />
        </MapView>
      ) : (
        <Text>Obtendo localização...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  map: {
    width: '100%',
    height: '80%',
  },
});

export default LocationScreen;
