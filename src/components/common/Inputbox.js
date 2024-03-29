import { View, Text, Image, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const Inputbox = ({ tittle, text, textchange, placeholder, image, inputMode, secureTextEntry ,color,onBlur }) => {
    return (
        <View style={{ marginTop: 7, marginBottom: 5 }}>
            <Text style={[styles.tittle ,{color:color?(color):('#9a0065')}]}>{tittle}</Text>
            <View style={styles.viewstyle}>
                <Image source={image} style={styles.image} />
                <TextInput
                    value={text}
                    onChangeText={(text) => { textchange(text) }}
                    inputMode={inputMode}
                    secureTextEntry={secureTextEntry}
                    style={styles.textinput}
                    placeholder={placeholder}
                    placeholderTextColor="#888"
                
                />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    tittle: {
        paddingLeft: 16,
        color: '#9a0065',
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        lineHeight: 20
    },
    viewstyle: {
        borderBottomColor: "#1E1F20",
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    image: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        marginLeft: 4
    },
    textinput: {
        width: '97%',
        marginVertical: 1,
        height: 40,
        color: "#888",
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        marginLeft: 7
      

    }
})

export default Inputbox