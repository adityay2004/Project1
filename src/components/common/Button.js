import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,

} from 'react-native';
const Button = ({onPress ,color}) => {
    return (
        <View style={{
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <TouchableOpacity
                style={[styles.btn ,{backgroundColor:color?(color):('#9a0065')}]}
                onPress={() => { onPress()}}
            >
                <Text style={styles.buttontext}>
                    Submit
                </Text>

            </TouchableOpacity>
            

        </View>
    )
}

const styles = StyleSheet.create({
   
    btn: {
        height: 50,
        backgroundColor: '#9a0065',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        width: '80%'
    },
    buttontext: {
        color: "#FFFFFF",
        fontFamily: "Roboto-Bold",
        fontSize: 22,
        lineHeight: 30
    }
})

export default Button