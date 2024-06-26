import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, collection, query, where, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';

const AlunoLocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchMotoristaInfo = async () => {
      try {
        const alunoRef = doc(db, 'users', auth.currentUser.uid);
        const alunoSnap = await getDoc(alunoRef);

        if (alunoSnap.exists()) {
          const alunoData = alunoSnap.data();
          const vanCode = alunoData.vanCode;

          const motoristaQuery = query(
            collection(db, 'users'),
            where('vanCode', '==', vanCode),
            where('userType', '==', 'motorista')
          );

          const unsubscribe = onSnapshot(motoristaQuery, (querySnapshot) => {
            if (!querySnapshot.empty) {
              const motoristaData = querySnapshot.docs[0].data();
              setLocation({
                latitude: motoristaData.latitude,
                longitude: motoristaData.longitude,
              });
              setProfileUrl(motoristaData.image);
              setDisplayName(motoristaData.displayName);
            } else {
              alert('No driver found for the given van code.');
            }
          });

          return () => unsubscribe();
        } else {
          alert('No student data found.');
        }
      } catch (error) {
        console.error('Error fetching driver info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotoristaInfo();
  }, [auth.currentUser.uid, db]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={location}
            title={displayName || "Motorista"}
            description="Localização do motorista"
          >
            {profileUrl ? (
              <Image source={{ uri: profileUrl }} style={styles.profilePic} />
            ) : (
              <Text style={styles.noImageText}>No Image Available</Text>
            )}
          </Marker>
        </MapView>
      ) : (
        <Text style={styles.noImageText}>No driver location available</Text>
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
  map: {
    width: '100%',
    height: '100%',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  noImageText: {
    color: 'white',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default AlunoLocationScreen;
