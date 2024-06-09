import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
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

  const handleLogout = () => {
    console.log('Iniciar processo de logout');
      navigation.navigate('Welcome');

    //try {
     // await auth().signOut();
    //  console.log("Logout realizado");
    //  navigation.replace('Welcome'); // Navegar para a tela de login após logout
  //  } catch (error) {
   //   console.error("Erro ao fazer logout: ", error);
  //  }
  };


  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View>  
          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Welcome')}>
            <Icon name="sign-out" size={0} color="rgba(34, 0, 0, 0.533333)" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="sign-out" size={30} color="rgba(34, 0, 0, 0.533333)" />
          </TouchableOpacity>
          </View>
        <View style={styles.header}>
          {/* <Image source={profilealuno} style={styles.profilePic} />
        <Text style={styles.greeting}>Olá, {estudante.Nome}</Text>
        <Text style={styles.vanInfo}>Passageiro da Van: {van.ID_Van}</Text>
        <Text style={styles.vanInfo}>Motorista: {motorista.Nome}</Text>*/}


          <View style={styles.textContainer}>
            <Text style={styles.greeting}>Olá, Ronielson</Text>
            <Text style={styles.vanInfo}>Passageiro da Van: SLH2008</Text>
            <Text style={styles.vanInfo}>Motorista: Fernando</Text>
            <View style={styles.separatorLine} />
          </View>
          <Image source={profilealuno} style={styles.profilePic} />
        </View>

        <TouchableOpacity style={styles.mapContainer} onPress={() => navigation.navigate('LocationScreen')}>
          <Image source={mapsvan} style={styles.map} />
        </TouchableOpacity>

        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Atualize sua situação</Text>
          <View style={styles.buttonContainer1}>
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
                  <Text style={styles.buttonText}>✅</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    statusIda === 'naovai' && styles.selectedButton
                  ]}
                  onPress={() => handleStatusUpdate('ida', 'naovai')}
                >
                  <Text style={styles.buttonText}>❌</Text>
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
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Text style={styles.statusType}>Situação da volta</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[
                  styles.button,
                  statusVolta === 'confirmado' && styles.selectedButton
                ]}
                onPress={() => handleStatusUpdate('volta', 'confirmado')}
              >
                <Text style={styles.buttonText}>✅</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  statusVolta === 'naovolta' && styles.selectedButton
                ]}
                onPress={() => handleStatusUpdate('volta', 'naovolta')}
              >
                <Text style={styles.buttonText}>❌</Text>
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

      </ScrollView>

      <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('LocationScreen')}>
        <View style={styles.tabButton}>
          <Icon name="map-pin" size={24} color="#000" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.highlightedTabButton} onPress={() => navigation.navigate('HomeAluno')}>
        <Icon name="home" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('EditProfile')}>
        <Icon name="cog" size={24} color="#000" />
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoutButton: {
    padding: 10,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderColor: '#FFDE59',
    borderWidth: 5,
    marginRight: 5,
  },
  greeting: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'rgba(34, 0, 0, 0.533333)',
  },
  vanInfo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#595D60',
  },
  separatorLine: {
    height: 1,
    backgroundColor: "#595D60",
    marginVertical: 10,
  },
  mapContainer: {
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  map: {
    width: '90%',
    height: 200,
    borderRadius: 15,
    borderColor: '#FFDE59',
    borderWidth: 2,
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingBottom: 60,
  },
  statusTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#595D60',
  },
  statusButtons: {
    marginBottom: 20,
  },
  statusType: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#595D60',
  },
  buttonContainer1: {
    borderRadius: 15,
    borderColor: '#595D60',
    borderWidth: 2,
    marginBottom: 24,
  },
  buttonContainer: {
    borderRadius: 15,
    borderColor: '#595D60',
    borderWidth: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
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
    borderWidth: 5,
    borderColor: '#FFDE59',
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
  highlightedTabButton: {
    width: 85,
    height: 70,
    top: -15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
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
  highlightBackground: {
    width: 80,
    height: 80,
    backgroundColor: '#D9D9D9',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
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


export default HomeAluno;
