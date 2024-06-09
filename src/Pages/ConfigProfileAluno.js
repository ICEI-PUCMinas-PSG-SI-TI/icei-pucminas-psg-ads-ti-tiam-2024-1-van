import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Platform, ScrollView  } from 'react-native';
import { auth, db, storage } from '../Database/firebaseConfig'; // Adjust the path if needed
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [codigoVan, setCodigoVan] = useState('');
  const [diasAula, setDiasAula] = useState('');
  const [turno, setTurno] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [endereco, setEndereco] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos de permissão da câmera para que isso funcione!');
        }
      }
    })();

    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setName(userData.displayName || '');
            setEmail(userData.email || '');
            setCodigoVan(userData.codigoVan || '');
            setDiasAula(userData.diasAula || '');
            setTurno(userData.turno || '');
            setFrequencia(userData.frequencia || '');
            setEndereco(userData.endereco || '');

            const imageRef = ref(storage, `profileImages/${user.uid}`);
            const imageUrl = await getDownloadURL(imageRef).catch(() => null); 
            setImage(imageUrl);
          }
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar dados do usuário.');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);

        // Upload image if changed
        if (image && !image.startsWith('https')) {
          const imageRef = ref(storage, `profileImages/${user.uid}`);
          const response = await fetch(image);
          const blob = await response.blob();
          await uploadBytes(imageRef, blob);
        }

        // Update user data in Firestore
        await updateDoc(userDocRef, {
          displayName: name,
          codigoVan,
          diasAula,
          turno,
          frequencia,
          endereco,
        });

        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar o perfil.');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => { /* Handle back navigation */ }}>
            </TouchableOpacity>
            <Text style={styles.headerText}>Editar Perfil</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
            {/* Image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.profileImage} />
                <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
                    <Icon name="camera" size={20} color="#FFDE59" />
                </TouchableOpacity>
            </View>

            {/* Inputs */}
            <Input label="Nome" value={name} onChangeText={setName} />
            <Input label="Email" value={email} onChangeText={setEmail} editable={false} />
            <Input label="Código da Van" value={codigoVan} onChangeText={setCodigoVan} />
            <Input label="Dias de Aula" value={diasAula} onChangeText={setDiasAula} />
            <Input label="Turno" value={turno} onChangeText={setTurno} />
            <Input label="Frequência" value={frequencia} onChangeText={setFrequencia} />
            <Input label="Endereço" value={endereco} onChangeText={setEndereco} />
            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar alterações</Text>
            </TouchableOpacity>
        </View>
</ScrollView>
    </View>
);
};

const Input = ({ label, value, onChangeText, editable = true }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={[styles.input, !editable && styles.disabledInput]} // Aplicar estilo disabled se não for editável
            value={value}
            onChangeText={onChangeText}
            editable={editable}
        />
    </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 45,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100, // Metade da largura e altura para criar um círculo perfeito
    marginBottom: 10,
    borderColor: '#FFDE59',
    borderWidth: 2,
    overflow: 'hidden', // Garante que a imagem não ultrapasse o círculo
  },
  editImageButton: {
    position: 'absolute',
    bottom: -10, 
    right: 100, 
    padding: 5,
  },
   // ... (outros estilos do header, imageContainer, etc., iguais ao exemplo anterior)
   formContainer: {
    flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, // Sombra para Android
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Cor do texto mais escura
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff', // Fundo branco para os inputs
  },
  disabledInput: {
    backgroundColor: '#f0f0f0', // Fundo cinza claro para inputs desabilitados
  },
  // ... (estilos do saveButton e saveButtonText) 
  saveButton: {
    backgroundColor: '#FFDE59',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default EditProfile;
