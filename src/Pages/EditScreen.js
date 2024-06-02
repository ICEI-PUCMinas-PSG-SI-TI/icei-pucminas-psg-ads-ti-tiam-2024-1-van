import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditScreen = ({ navigation }) => {
    return (

        <View style={styles.tabBar}>
            <TouchableOpacity style={styles.tabBar} onPress={() => navigation.navigate('HomeAluno')}>
                <Icon name="home" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('LocationScreen')}>
                    <Icon name="map-pin" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('EditScreen')}>
                <View style={styles.highlightBackground}>
                <Icon name="cog" size={24} color="#000" />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 59,
        backgroundColor: '#D9D9D9',
        borderTopColor: 'transparent',
        shadowColor: '#000',
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
        top: -5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
    },
    highlightBackground: {
        top: -10,
        width: 85,
        height: 85,
        backgroundColor: '#D9D9D9',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});


export default EditScreen;
