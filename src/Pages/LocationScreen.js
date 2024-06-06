import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Feather';

const LocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [sharing, setSharing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [watcher, setWatcher] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de localização negada');
        return;
      }
    })();

    return () => {
      stopSharingLocation();
    };
  }, []);

  const startSharingLocation = async () => {
    setLoading(true);
    const locationWatcher = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000, // Atualizar a cada 5 segundos
        distanceInterval: 0,
      },
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLoading(false); // Parar o carregamento quando a localização é obtida
      }
    );
    setWatcher(locationWatcher);
    setSharing(true);
  };

  const stopSharingLocation = () => {
    if (watcher) {
      watcher.remove();
    }
    setWatcher(null);
    setSharing(false);
    setLocation(null); // Remover a localização para que o mapa desapareça
  };

  const toggleSharing = () => {
    if (sharing) {
      stopSharingLocation();
    } else {
      startSharingLocation();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa em tempo real - Motorista</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        sharing && location && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker coordinate={location}>
              <View style={styles.marker}>
                <Icon name="user" size={20} color="#FFF" />
              </View>
            </Marker>
          </MapView>
        )
      )}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleSharing}>
        <Text style={styles.toggleButtonText}>
          {sharing ? 'Parar Compartilhamento' : 'Iniciar Compartilhamento'}
        </Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  map: {
    width: '100%',
    height: '80%',
  },
  marker: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 10,
    borderColor: '#FFF',
    borderWidth: 2,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#FFDE59',
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default LocationScreen;
