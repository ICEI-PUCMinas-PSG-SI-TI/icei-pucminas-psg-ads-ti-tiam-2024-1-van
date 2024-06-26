import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { auth, db, storage } from "../Database/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL,uploadBytesResumable  } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import unnamed from '../img/unnamed.png';


const EditProfile = ({ navigation }) => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    vanCode: "",
    diasAula: "",
    turno: "",
    frequencia: "",
    endereco: "",
    image: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFormData({
              ...userData,
              image: userData.image || null,
            });
          } else {
            console.warn("Documento do usuário não encontrado.");
          }
        } else {
          navigation.replace("Login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Erro", "Erro ao buscar dados do usuário.");
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
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        // Upload da imagem (se alterada)
        let imageUrl = formData.image; 
        if (formData.image && !formData.image.startsWith("https")) {
          const imageRef = ref(storage, `profileImages/${user.uid}`);
          
          const response = await fetch(formData.image);
          const blob = await response.blob();
          const metadata = {
            contentType: blob.type,
          };

          const uploadTask = uploadBytesResumable(imageRef, blob, metadata);

          uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
              console.error('Erro ao fazer upload da imagem:', error);
              Alert.alert("Erro", "Erro ao fazer upload da imagem. Tente novamente mais tarde.");
              return; 
            }, 
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              setFormData({ ...formData, image: imageUrl });

              // Atualiza o documento no Firestore com a nova URL da imagem ou mantém a anterior
              await updateDoc(userDocRef, {
                ...formData,
                image: imageUrl || formData.image, 
              });

              Alert.alert(
                "Sucesso",
                "Perfil atualizado com sucesso!",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      navigation.replace("HomeAluno", { studentData: formData }); 
                    },
                  },
                ]
              ); 
            }
          );
        } else {
          await updateDoc(userDocRef, {
            ...formData,
            image: imageUrl || formData.image || "", 
          });

          Alert.alert(
            "Sucesso",
            "Perfil atualizado com sucesso!",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.replace("HomeAluno", { studentData: formData }); 
                },
              },
            ]
          ); 
        }
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao atualizar o perfil.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.headerText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: formData.image }} style={styles.profileImage} />
            <TouchableOpacity
              style={styles.editImageButton}
              onPress={pickImage}
            >
              <Icon name="camera" size={20} color="#FFDE59" />
            </TouchableOpacity>
          </View>
          <Input
            label="Nome"
            value={formData.displayName}
            onChangeText={(text) => setFormData({ ...formData, displayName: text })}
          />
          <Input
            label="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            editable={false}
          />
          <Input
            label="Código da Van"
            value={formData.vanCode}
            onChangeText={(text) => setFormData({ ...formData, vanCode: text })}
          />
          <Input
            label="Dias de Aula"
            value={formData.diasAula}
            onChangeText={(text) => setFormData({ ...formData, diasAula: text })}
          />
          <Input
            label="Turno"
            value={formData.turno}
            onChangeText={(text) => setFormData({ ...formData, turno: text })}
          />
          <Input
            label="Frequência"
            value={formData.frequencia}
            onChangeText={(text) => setFormData({ ...formData, frequencia: text })}
          />
          <Input
            label="Endereço"
            value={formData.endereco}
            onChangeText={(text) => setFormData({ ...formData, endereco: text })}
          />
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
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 45,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100, // Metade da largura e altura para criar um círculo perfeito
    marginBottom: 10,
    borderColor: "#FFDE59",
    borderWidth: 2,
    overflow: "hidden", // Garante que a imagem não ultrapasse o círculo
  },
  editImageButton: {
    position: "absolute",
    bottom: -10,
    right: 100,
    padding: 5,
  },
  // ... (outros estilos do header, imageContainer, etc., iguais ao exemplo anterior)
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
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
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333", // Cor do texto mais escura
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff", // Fundo branco para os inputs
  },
  disabledInput: {
    backgroundColor: "#f0f0f0", // Fundo cinza claro para inputs desabilitados
  },
  // ... (estilos do saveButton e saveButtonText)
  saveButton: {
    backgroundColor: "#FFDE59",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: "#000",
  },
});

export default EditProfile;
