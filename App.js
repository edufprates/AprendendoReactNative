import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity ,View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

import logo from './assets/logo.png';

export default function App() {

  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if(permissionResult.granted === false) {
      alert("Solicitação de permissão para acessar a galeria");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if(pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri});
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert('Ops! Não disponível neste dispositivo');
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if(selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image 
          source={{ uri: selectedImage.localUri}}
          style={styles.thumbnail}  
        />
        <TouchableOpacity
         onPress={openShareDialogAsync}
         style={styles.button}>
           <Text style={styles.buttonText}>Compartilhar Imagem</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      {/* <Image source={{ uri: "https://app3.saudeevidabr.com/assets/new_template/imagens/logo/logo-saude-e-vida.png"}} style={{ width: 305, height: 159 }} / > */}
      
      <Text style={styles.instructions}> 
        Para compartilhar uma imagem do seu telefone com um amigo, aperte o botão abaixo!
      </Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style= {styles.button}>
          <Text style={styles.buttonText}> Escolher Imagem </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: "#2a7d00",
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }

});
