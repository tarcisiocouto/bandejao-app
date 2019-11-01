import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TopMenu from '../components/TopMenu';
import api from '../services/api';

const MainScreen = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [idusuario, setIdUsuario] = useState('');
    const [saldo, setSaldo] = useState('');
    
    AsyncStorage.getItem('nome', (err, item) => setNome(item));
    AsyncStorage.getItem('matricula', (err, item) => setMatricula(item));

    useEffect(() => {
        
        async function loadExtrato(){
            let id = await AsyncStorage.getItem('idusuario');
            setIdUsuario(id);

            const resposta = await api.get('/users/saldo', {
                headers: {
                    user_id: id
                }
            });

            setSaldo(resposta.data.saldo);
            await AsyncStorage.setItem('saldo', resposta.data.saldo);
            
        }

        loadExtrato();

    }, []);

    function extratoScreen(idcartao){
        navigation.navigate('Extrato', { idcartao });
    }

    function cartaoScreen(matricula){
        navigation.navigate('Cartao', { matricula });
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopMenu nome={nome} saldo={saldo}></TopMenu>
            <View style={styles.boxContainer}>
                <TouchableOpacity onPress={() => extratoScreen(idusuario)}>
                    <View style={styles.boxMenu}>
                        <MaterialCommunityIcons name="format-list-bulleted" style={styles.icon}></MaterialCommunityIcons>
                        <Text style={styles.textMenu}>extrato</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => cartaoScreen(matricula)}>
                    <View style={styles.boxMenu}>
                        <MaterialCommunityIcons name="barcode" style={styles.icon}></MaterialCommunityIcons>
                        <Text style={styles.textMenu}>código de barra</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F4F0ED',
        flex: 1
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    boxMenu: {
        backgroundColor: '#FEFBF9',
        height: 120,
        width: 160,
        marginLeft: 15,
        marginTop: 15,
        marginRight: 15,
        paddingTop: 35,
        paddingLeft: 20
    },
    textMenu: {
        fontWeight: 'bold',
        fontSize: 16
    },
    icon: {
        fontSize: 36,
        color: '#238E21'
    },
});

export default MainScreen;