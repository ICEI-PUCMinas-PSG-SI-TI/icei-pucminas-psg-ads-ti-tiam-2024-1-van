import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    return () => locationSubscription?.remove();  // Cleanup location watcher on unmount
  }, [locationSubscription]);

  const toggleLocationSharing = async () => {
    if (isSharingLocation) {
      locationSubscription?.remove();
      setIsSharingLocation(false);
      setLocation(null);  // Optionally reset the location when stopping
    } else {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const subscription = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 10000,  // Update interval in milliseconds
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
          region={{  // Changed from initialRegion to region for dynamic updates
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Your Location"
            description="Here is your current location">
            {profileUrl ? (
              <Image source={{ uri: profileUrl }} style={styles.profilePic} />
            ) : (
              <Text style={styles.noImageText}>No Image Available</Text>  // Text when no image
            )}
          </Marker>
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      <Button
        title={isSharingLocation ? "Stop Sharing Location" : "Start Sharing Location"}
        onPress={toggleLocationSharing}
        color={isSharingLocation ? "red" : "green"}
      />
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
    height: '90%',  // Adjusted height to ensure button visibility
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  noImageText: {  // Style for text when no image is available
    color: 'white',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

export default LocationScreen;
