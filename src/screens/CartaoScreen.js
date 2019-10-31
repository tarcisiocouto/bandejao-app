import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, AsyncStorage } from 'react-native';
import TopMenu from '../components/TopMenu';
import { SafeAreaView } from 'react-navigation';
import Barcode from 'react-native-barcode-builder';

const CartaoScreen = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [saldo, setSaldo] = useState('');
    const matricula = navigation.getParam('matricula');

    useEffect(() => {
        AsyncStorage.getItem('nome', (err, item) => setNome(item));
        AsyncStorage.getItem('saldo', (err, item) => setSaldo(item));
    }, []);

    return (
        <SafeAreaView>
            <TopMenu nome={nome} saldo={saldo}></TopMenu>
            <Text style={styles.titulo}>cartão</Text>
            <Barcode value={matricula} format="CODE128" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    titulo: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#238E21',
        marginLeft: 15,
        paddingBottom: 15,
        alignSelf: 'center'
    }, 
});

export default CartaoScreen;