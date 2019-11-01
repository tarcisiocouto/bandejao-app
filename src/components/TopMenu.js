import React from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

const TopMenu = ({ nome, saldo, navigation }) => {

    function logout(){
        AsyncStorage.removeItem('idusuario');
        AsyncStorage.removeItem('nome');
        AsyncStorage.removeItem('matricula');
        navigation.navigate('Login');
    }

    return (
        <View style={styles.menu}>
            <View>
                <Text style={styles.text}>Olá, {nome}</Text>
                <Text style={styles.saldo}>Saldo atual: R$ {saldo}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={logout}>
                    <MaterialCommunityIcons name="logout" style={styles.icon}></MaterialCommunityIcons>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15
    },
    text: {
        fontWeight: "bold",
        color: '#238E21',
        fontSize: 18
    },
    saldo: {
        marginTop: 5,
        fontSize: 16
    },
    icon: {
        fontSize: 35,
        color: '#238E21',
    },
});

export default withNavigation(TopMenu);