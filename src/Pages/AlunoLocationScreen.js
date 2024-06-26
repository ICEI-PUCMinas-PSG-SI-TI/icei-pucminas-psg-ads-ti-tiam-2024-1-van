import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getAuth } from 'firebase/auth';
import Icon from "react-native-vector-icons/FontAwesome";
import { doc, getFirestore, collection, query, where, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';

const AlunoLocationScreen = ({ route, navigation }) => {
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
              alert('Nenhum motorista encontrado para o código da van fornecido.');
              setLocation(null);
            }
          }, (error) => {
            console.error('Erro no onSnapshot:', error);
            alert('Erro ao ouvir as atualizações do motorista.');
          });

          return () => unsubscribe();
        } else {
          alert('Nenhum dado de aluno encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar informações do motorista:', error);
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
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.highlightedTabButton}
          //onPress={() => navigation.navigate("AlunoLocationScreen")}
        >
          <View style={styles.tabButton}>
            <Icon name="map-pin" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} 
        //onPress={() => navigation.navigate("HomeAluno")}
        >
          <Icon name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Icon name="cog" size={24} color="#000" />
        </TouchableOpacity>
      </View>
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
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 59,
    backgroundColor: "#D9D9D9",
    borderTopColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  highlightedTabButton: {
    width: 85,
    height: 70,
    top: -15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AlunoLocationScreen;
