import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const TopMenu = ({ nome, saldo }) => {

    return (
        <View>
            <View style={styles.alinhamento}>
                <Text style={styles.text}>Olá, {nome}</Text>
                <Text style={styles.saldo}>Saldo atual: R$ {saldo}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    alinhamento:{
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 15
    },
    text: {
        fontWeight: "bold",
        color: '#238E21',
        fontSize: 18
    },
    saldo: {
        marginTop: 5,
        fontSize: 16
    }
});

export default TopMenu;