import React, { useState } from 'react';
import { Text, StyleSheet, AsyncStorage, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import api from '../services/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import md5 from 'md5';

const LoginScreen = ({ navigation }) => {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    var md5 = require('md5');
    // const [matricula, setMatricula] = useState('2156554');
    // const [senha, setSenha] = useState('accc9105df5383111407fd5b41255e23');
    const [errorMessage, setErrorMessage] = useState('');

    handleSenha= (senha) => {
        setSenha(senha);
    };

    async function efetuarLogin(){
        try{
            senhaHash = md5(senha);

            const response = await api.post('/login', {
                matricula,
                senha: senhaHash
            });


            const { idusuario, nome } = response.data;
            await AsyncStorage.setItem('idusuario', JSON.stringify(idusuario));
            await AsyncStorage.setItem('nome', nome);
            await AsyncStorage.setItem('matricula', matricula);
            navigation.navigate('Main');
        }catch(err){
            setErrorMessage('Usuário ou senha inválidos!');
        }
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <MaterialCommunityIcons name="food-variant" style={styles.logo}/>
            <Text style={styles.titulo}>seja bem-vindo</Text>
            <Text style={styles.titulo}>ao bandejao</Text>
            <Text>{errorMessage}</Text>
            <View style={styles.backgroundStyle}>
                <Text>{errorMessage}</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={'numeric'}
                    value={matricula}
                    onChangeText={setMatricula}
                    placeholder="USUÁRIO"
                    placeholderTextColor="white"
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={handleSenha}
                    placeholder="SENHA"
                    placeholderTextColor="white"
                />
                <TouchableOpacity onPress={efetuarLogin} style={styles.button}>
                    <Text style={styles.buttonText}>ACESSAR</Text>
                </TouchableOpacity>
                <Text style={styles.info}>Coordenação de TI - CPZR</Text>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#418B50',
    },
    backgroundStyle: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingHorizontal: 0,
        fontSize: 18,
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
        color: 'white'
      },
    button: {
        height: 42,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#238E21'
    },
    info: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 15,
        marginLeft: 70,
        color: 'white'
    },
    logo: {
        fontSize: 100,
        color: 'white',
        alignSelf: 'flex-start',
        marginLeft: 30
    },
    titulo: {
        color: 'white',
        alignSelf: 'flex-start',
        fontSize: 35,
        marginLeft: 30
    }
});

export default LoginScreen;