import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import ListaAlunos from './components/listaAluno'; // Importe o componente ListaAlunos
import alunos from './components/alunos'; // Importe a lista de alunos fictícios

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    color: 'gray',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 12,
    color: 'black',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  fotoPerfil: {
    width: 80,
    height: 80,
    borderRadius: 50,
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: 20,
    marginTop: 20,
  },
  conteudo: {
    flex: 1,
  },
  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  itemLista: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fotoAluno: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoAluno: {
    flex: 1,
  },
  nomeAluno: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    flexDirection: 'row',
  },
  statusIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  SubtituloLista: {    
    position: 'absolute',
    top: 40,
    right: 30,
    fontWeight: 'bold'
  },
  icone: {
    width: 20,
    height: 20,
    
    position: 'absolute',
    top: 0,
    right: 0,
    left: 145 ,
  },
  icones: {
    width: 20,
    height: 20,
    
    position: 'absolute',
    top: 0,
    right: 0,
    left: 170 ,
  },
   historicoContainer: {
    marginTop: 20,
  },
  historicoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  rota: {
    marginBottom: 5,
  },
});

const App = () => {

  const historicoRotas = [
    {  imagem: require('./components/tela.png') },
    {  imagem: require('./components/tela.png') },
    {  imagem: require('./components/tela.png') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Olá, Fernando!</Text>
          <Text style={styles.subtitulo}>Veículo cadastrado: SLH2008</Text>
        </View>
        <Image
          source={require('./components/iconTeste.png')} 
          style={styles.fotoPerfil}
        />
      </View>

      <View style={styles.conteudo}>
        <Text style={styles.tituloLista}>Situação dos Alunos</Text>
        <Text style={styles.SubtituloLista}>Ida  Volta</Text>
        <ScrollView>
          {alunos.map((aluno, index) => (
            <View key={index} style={styles.itemLista}>
              <Image source={aluno.foto} style={styles.fotoAluno} />
              <View style={styles.infoAluno}>
                <Text style={styles.nomeAluno}>{aluno.nome}</Text>
                <View style={styles.status}>
                  <View style={styles.statusIcon}>
                    {aluno.ida ? (
                      <Image
                        source={require('./components/iconVe.png')} 
                        style={styles.icone}
                      />
                    ) : (
                      <Image
                        source={require('./components/iconVe.png')} 
                        style={styles.icone}
                      />
                    )}
                    
                  </View>
                  <View style={styles.statusIcon}>
                    {aluno.volta ? (
                      <Image
                        source={require('./components/iconX.png')} 
                        style={styles.icones}
                      />
                    ) : (
                      <Image
                        source={require('./components/iconX.png')} 
                        style={styles.icones}
                      />
                    )}
                    
                  </View>
                </View>
              </View>
            </View>
          ))}
           <View style={styles.historicoContainer}>
            <Text style={styles.historicoTitulo}>Histórico de Rotas</Text>
            {historicoRotas.map((rota, index) => (
              <View key={index} style={styles.rota}>
                <Image source={rota.imagem} style={styles.rotaImagem} />
                <Text style={styles.rotaTexto}>{rota.data}</Text>
              </View>
          ))}
        </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default App;
