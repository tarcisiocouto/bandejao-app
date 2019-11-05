import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, AsyncStorage, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import api from '../services/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import md5 from 'md5';

const LoginScreen = ({ navigation }) => {
    // const [matricula, setMatricula] = useState('');
    // const [senha, setSenha] = useState('');
    var md5 = require('md5');
    const [matricula, setMatricula] = useState('2156554');
    const [senha, setSenha] = useState('tt');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('idusuario').then(idusuario => {
            if(idusuario){
                navigation.navigate('Main');
            }
        })
    }, []);

    handleMatricula = (matricula) => {
        setMatricula(matricula);
        setErrorMessage('');
    };

    handleSenha= (senha) => {
        setSenha(senha);
        setErrorMessage('');
    };

    async function efetuarLogin(){
        senhaHash = md5(senha);
        try{
            const response = await api.post('/login', {
                matricula,
                senha: senhaHash
            });
            if(!response.data.message){
                const { idusuario, nome } = response.data;
                await AsyncStorage.setItem('idusuario', JSON.stringify(idusuario));
                await AsyncStorage.setItem('nome', nome);
                await AsyncStorage.setItem('matricula', matricula);
                setErrorMessage('');
                navigation.navigate('Main');
            }else{
                setErrorMessage(response.data.message);
            }
        }catch(err){
            return setErrorMessage('ATENÇÃO: Servidor fora do ar!');
        }
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <MaterialCommunityIcons name="food-variant" style={styles.logo}/>
            <Text style={styles.titulo}>seja bem-vindo</Text>
            <Text style={styles.titulo}>ao bandejao</Text>
            <Text style={styles.error}>{errorMessage}</Text>
            <View style={styles.backgroundStyle}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={'numeric'}
                    value={matricula}
                    onChangeText={handleMatricula}
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
        alignSelf: 'center',
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
    },
    error: {
        marginTop: 15,
        fontSize: 16,
        color: 'white'
    }
});

export default LoginScreen;