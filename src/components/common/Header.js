import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const Header = ({tittle}) => {
    return (
        <View style={styles.pinkContainer}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', height: 180, justifyContent: 'center', paddingTop: 20 }}>
                    <View style={{ width: 120, alignItems: 'center' }}>
                        <Image source={{uri:'https://krenai.com/assets/img/KRENAI-LOGO-White.png'}} style={{ width: 210, height: 100, resizeMode: 'contain' }} />
                        <Text style={{ color: "#fff", fontFamily: "Roboto-Regular", fontSize: 22, lineHeight: 30,fontWeight:'700' }}>{tittle}</Text>
                    </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    pinkContainer:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        marginTop:-20
    },
})
export default Header