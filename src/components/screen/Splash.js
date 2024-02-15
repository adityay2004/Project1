import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getLogindata } from "../../AsyncAction";

const Splash = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(async() => {
            const user = await getLogindata()
            console.log("===>",user)
            if (user) {
                navigation.navigate('Home');
            }
            else {
                navigation.navigate('Login');
            }
        }, 3000)
    }, [])


    return (


        <View style={styles.container}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', height: 180, justifyContent: 'center', paddingTop: 20 }}>
                <View style={{ width: 120, alignItems: 'center' }}>
                    <Image source={{ uri: 'https://krenai.com/assets/img/KRENAI-LOGO-White.png' }} style={{ width: 210, height: 100, resizeMode: 'contain' }} />
                    <View style={styles.textview}>
                        <Text style={styles.text1}>Welcome to </Text>
                        <Text style={styles.text2}>Krenai </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe6e6',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textview: {
        marginTop: 20,
        flexDirection: 'row',
    },
    text1: {
        color: "#1E1F20",
        fontFamily: "Roboto-Regular",
        fontSize: 22,
        lineHeight: 30
    },
    text2: {
        color: '#9a0065',
        fontFamily: "Roboto-Regular",
        fontSize: 24,
        lineHeight: 30
    },
})

export default Splash;