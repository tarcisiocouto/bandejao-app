import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, AsyncStorage } from 'react-native';
import { format, parseISO } from 'date-fns';
import TopMenu from '../components/TopMenu'
import api from '../services/api';

const ExtratoScreen = ({ navigation }) => {
    const [extrato, setExtrato] = useState([]);
    const [nome, setNome] = useState('');
    const [saldo, setSaldo] = useState('');
    const id = navigation.getParam('idcartao');
    const [error, setError] = useState('');

    AsyncStorage.getItem('nome', (err, item) => setNome(item));
    AsyncStorage.getItem('saldo', (err, item) => setSaldo(item));

    useEffect(() => {
        async function loadExtrato(){
            try{
                const response = await api.get('/users/extrato', {
                    headers: {
                        id_cartao: id
                    }
                });
    
                setExtrato(response.data.map(item => {
                    const date = parseISO(item.data);
                    item.data = format(date, 'dd/MM/yyyy');
                    return item;
                }));
            }catch(error){
                setError('Atenção: Servidor fora do ar.');
            }
        }

        loadExtrato();
        
    }, []);

    return (
        <SafeAreaView>
            <TopMenu nome={nome} saldo={saldo}></TopMenu>
        <Text style={styles.titulo}>extrato - últimos 30 dias</Text>
        <Text style={styles.error}>{error}</Text>
        <FlatList 
                    horizontal={false}
                    data={extrato}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.extratoList}>
                                <View>
                                    <Text style={styles.textExtratoData}>{item.data}</Text>
                                    <Text style={styles.textExtratoSaldo}>Saldo: R$ {item.saldo}</Text>
                                </View>
                                <View>
                                    { item.credito != 0.00 ? <Text style={styles.textExtrato}>Crédito: R$ {item.credito}</Text> : null}
                                    { item.debito != 0.00 ? <Text style={styles.textExtrato}>Débito: R$ {item.debito}</Text> : null}
                                </View>
                            </View>
                        );
                    }}
                />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    titulo: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#238E21',
        marginLeft: 15,
        paddingBottom: 15
    }, 
    extratoList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 350,
        marginTop: 15,
        marginLeft: 15,
        backgroundColor: '#FEFBF9',
        paddingLeft: 10,
        paddingTop: 7,
        paddingBottom: 7,
        paddingRight: 7,
        borderRadius: 5
    },
    textExtrato: {
        fontSize: 14,
        color: '#403E3F'
    },
    textExtratoData: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textExtratoSaldo: {
        color: '#403E3F'
    },
    error: {
        marginLeft: 15,
        fontSize: 16,
        color: 'red'
    }
});

export default ExtratoScreen;