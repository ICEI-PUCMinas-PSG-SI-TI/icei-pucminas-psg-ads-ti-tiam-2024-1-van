import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { db, doc, onSnapshot, GeoPoint } from '../firebaseConfig';
import Icon from 'react-native-vector-icons/Feather';

const AlunoLocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [sharing, setSharing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = "test_user_id"; // ID do usuário simulado para testes

    const unsubscribe = onSnapshot(doc(db, 'motoristas', userId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.sharing) {
          setLocation({
            latitude: data.location.latitude,
            longitude: data.location.longitude,
          });
          setSharing(true);
        } else {
          setLocation(null);
          setSharing(false);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa em tempo real - Aluno</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        sharing && location ? (
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
        ) : (
          <Text>O motorista não está compartilhando a localização</Text>
        )
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
  marker: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 10,
    borderColor: '#FFF',
    borderWidth: 2,
