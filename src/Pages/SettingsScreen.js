import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SettingsScreen = ({ navigation }) => {
    return (
   
        <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('HomeAluno')}>
          <View style={styles.highlightBackground}>
            <Icon name="home" size={24} color="#000" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('LocationScreen')}>
          <Icon name="map-pin" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.highlightedTabButton} onPress={() => navigation.navigate('EditScreen')}>
          <Icon name="cog" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
      marginBottom: '24px',
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
       position: 'absolute',
      width: 85,
      height: 70,
      top: -5, 
      backgroundColor: '#D9D9D9',
      borderRadius: 35,
      shadowColor: 'rgba(0, 0, 0, 0.25)',
      shadowOffset: { width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 2,
    },
    highlightBackground: {
      position: 'absolute',
      top: -10,
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
  

export default SettingsScreen;
