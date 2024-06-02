import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firestore } from '../Database/firebaseConfig'; 
import profilealuno from '../img/profilealuno.png';
import mapsvan from '../img/mapsvan.png';

const HomeAluno = ({ route, navigation }) => {
  const [estudante, setEstudante] = useState("");
  const [van, setVan] = useState("");
  const [motorista, setMotorista] = useState("");
  const [statusIda, setStatusIda] = useState("");
  const [statusVolta, setStatusVolta] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const estudanteDoc = await firestore().collection('Estudante').doc('ID_DO_ESTUDANTE').get();
      const estudanteData = estudanteDoc.data();

      const vanDoc = await firestore().collection('Van').doc('ID_DA_VAN').get();
      const vanData = vanDoc.data();

      const motoristaDoc = await firestore().collection('Motorista').doc(vanData.ID_Motorista).get();
      const motoristaData = motoristaDoc.data();

      setEstudante(estudanteData);
      setVan(vanData);
      setMotorista(motoristaData);
    };

    fetchData();
  }, []);

  const handleStatusUpdate = (type, status) => {
    if (type === 'ida') {
      setStatusIda(status);
    } else if (type === 'volta') {
      setStatusVolta(status);
    }
    console.log(`Atualização de status: ${type} - ${status}`);
  };

  //if (!estudante || !van || !motorista) {
  //  return <Text>Carregando...</Text>;
 // }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      {/* <Image source={profilealuno} style={styles.profilePic} />
        <Text style={styles.greeting}>Olá, {estudante.Nome}</Text>
        <Text style={styles.vanInfo}>Passageiro da Van: {van.ID_Van}</Text>
        <Text style={styles.vanInfo}>Motorista: {motorista.Nome}</Text>*/}  
   
   <Image source={profilealuno} style={styles.profilePic} />
        <Text style={styles.greeting}>Olá, Ronielson</Text>
        <Text style={styles.vanInfo}>Passageiro da Van: SLH2008</Text>
        <Text style={styles.vanInfo}>Motorista: Fernando</Text>
      
      </View>
      
      <TouchableOpacity style={styles.mapContainer} onPress={() => navigation.navigate('Mapa')}>
        <Image source={mapsvan} style={styles.map} />
      </TouchableOpacity>

      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Atualize sua situação</Text>
        
        <View style={styles.statusButtons}>
          <Text style={styles.statusType}>Situação da ida</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.button,
                statusIda === 'confirmado' && styles.selectedButton
              ]}
              onPress={() => handleStatusUpdate('ida', 'confirmado')}
            >
              <Text style={styles.buttonText}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                statusIda === 'naovai' && styles.selectedButton
              ]}
              onPress={() => handleStatusUpdate('ida', 'naovai')}
            >
              <Text style={styles.buttonText}>✗</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                statusIda === 'atrasado' && styles.selectedButton
              ]}
              onPress={() => handleStatusUpdate('ida', 'atrasado')}
            >
              <Text style={styles.buttonText}>✋</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.statusType}>Situação da volta</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.button,
                statusVolta === 'confirmado' && styles.selectedButton
              ]}
              onPress={() => handleStatusUpdate('volta', 'confirmado')}
            >
              <Text style={styles.buttonText}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                statusVolta === 'naovolta' && styles.selectedButton
              ]}
              onPress={() => handleStatusUpdate('volta', 'naovolta')}
            >
              <Text style={styles.buttonText}>✗</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                statusVolta === 'atrasadovolta' && styles.selectedButton
              ]}
              onPress={() => handleStatusUpdate('volta', 'atrasadovolta')}
            >
              <Text style={styles.buttonText}>✋</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Location')}>
          <Icon name="map-pin" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  vanInfo: {
    fontSize: 16,
    color: '#777',
  },
  mapContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  map: {
    width: 300,
    height: 200,
    borderRadius: 15,
  },
  statusContainer: {
    paddingBottom: 5,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  statusButtons: {
    marginBottom: 5,
  },
  statusType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#ddd',
    borderWidth: 2,
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 24,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 59,
    backgroundColor: '#D9D9D9',
    borderTopColor: 'transparent',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeAluno;