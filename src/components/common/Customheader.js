import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Customheader = ({tittle}) => {
    const navigation=useNavigation();
    const cartdata = useSelector((state) => state.reducer)
    const wishlist = useSelector((state) => state.reducerWishlist)
    return (
        <View style={styles.headerStyle}>
            <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image source={{ uri: 'https://th.bing.com/th/id/R.757dcae10509bdbcbbbe7231f9cec8ab?rik=7RO2A7Du7jYBww&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fleft-arrow-png-left-icon-1600.png&ehk=nQr%2fWbRJHtKEaV53ijq71OpNptgpG4FZxnChrIO0fBI%3d&risl=&pid=ImgRaw&r=0' }}
                    style={{ height: 30, width: 30 }}
                />
                </TouchableOpacity>
               
                <Text style={styles.tittle}>{tittle}</Text>
            </View>

            <View style={styles.secondView}>
                <TouchableOpacity onPress={()=>navigation.navigate('Wishlist')}>
                <Ionicons name="hearto" style={{ marginLeft: 1 }} size={22} color='#666666' />
                </TouchableOpacity>
                
                <View style={styles.view1}>
                    <Text style={{ color: '#ffffff', fontWeight: '700' }}>{wishlist.length}</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('Carddata')}>
                <Ionicons name="shoppingcart" style={{ marginLeft: 18 }} size={22} color='#666666' />
                </TouchableOpacity>
                <View style={styles.view2}>
                    <Text style={{ color: '#ffffff', fontWeight: '700' }}>{cartdata.length}</Text>
                </View>
            </View>

        </View>
    )
}

export default Customheader

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#E6E6E6',
        padding: 15,
        alignItems: 'center',
        elevation: 0,
        justifyContent: 'space-between'
    },
    tittle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#808080',
        marginLeft: 10,
        alignSelf: 'center',
        fontFamily: "Roboto-Regular",
    },
    secondView: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        paddingRight: 10,
        width: 65
    },
    view1: {
        position: 'absolute',
        backgroundColor: '#47d147',
        height: 18,
        width: 18,
        borderRadius: 30,
        marginLeft: 18,
        marginTop: -6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    view2:
    {
        position: 'absolute',
        backgroundColor: '#47d147',
        height: 18,
        width: 18,
        borderRadius: 30,
        marginLeft: 59,
        marginTop: -6,
        justifyContent: 'center',
        alignItems: 'center'
    }
})