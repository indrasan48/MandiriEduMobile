import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 18,
        color: '#000',
    },
    sks: {
        fontSize: 15,
        color: '#000',
    },
    nilaiangka: {
        fontSize: 15,
        color: '#000',
    },
});

const Customrow = ({ kodemk, namamk, sks, nilai, }) => (
    <View style={styles.container}>
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {kodemk}
            </Text>
            <Text style={styles.description}>
                {namamk}
            </Text>
            <Text style={styles.sks}>
                {sks}
            </Text>
            <Text style={styles.nilaiangka}>
                {nilai}
            </Text>
        </View>

    </View>
);

export default Customrow;