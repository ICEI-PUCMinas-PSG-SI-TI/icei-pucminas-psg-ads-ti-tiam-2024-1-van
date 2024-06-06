import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Platform } from 'react-native';
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
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => { /* Handle back navigation */ }}>
                <Icon name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Editar Perfil</Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
            {/* Image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.profileImage} />
                <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
                    <Text style={styles.editImageText}>Editar</Text>
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
        padding: 20,
        backgroundColor: '#F2F2F2', 
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75, // Metade da largura e altura para criar um círculo perfeito
        marginBottom: 10,
        overflow: 'hidden', // Garante que a imagem não ultrapasse o círculo
    },
    profileImageBorder: { // Novo estilo para a borda
        borderWidth: 3,
        borderColor: '#007BFF',
        borderRadius: 81, // Ajuste para acomodar a borda
    },
    // ... (outros estilos do header, imageContainer, etc., iguais ao exemplo anterior)
    formContainer: {
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
});

export default EditProfile;
