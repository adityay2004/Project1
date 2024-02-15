import { View, Text, ScrollView, KeyboardAvoidingView, SafeAreaView, StatusBar, StyleSheet, FlatList, Image, Platform, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card } from "react-native-shadow-cards";
import ImageApi from '../../assets/Api/ImageApi';
import Customheader from '../common/Customheader';
import Ionicons from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { addItemtoCard, addItemtoWishlist, removeItemFromCard, removeItemFromWishlist } from '../../redux/Action/Action';
import { getDataapi } from '../../redux-toolkit/getData';

const Showpic = () => {
  //  const [data, Setdata] = useState([])

    const cartdata = useSelector((state) => state.reducer)
    const wishlist = useSelector((state) => state.reducerWishlist)
    const data = useSelector((state) => state.getDatareducer)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDataapi())
        console.log(data)
        //Setdata(apiData)
    }, [])
    const _randerData = ({ item }) => {
        return (
            <Card style={[styles.cardnew, { height: 210, }]} key={item?.id}>
                <Image source={{ uri: item?.download_url }}
                    style={styles.imagestyle}
                />
                {
                    cartdata.length > 0 && cartdata.some(el => el.id === item.id) ? (
                        <View style={{}}>
                            <View style={styles.viewcard}>

                                <TouchableOpacity
                                    onPress={() => {
                                        dispatch(removeItemFromCard(item))
                                    }}
                                    style={{
                                        backgroundColor: "#D8D8D8",
                                        padding: 0,
                                        height: 20,
                                        alignSelf: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Ionicons name="minus" size={15} color='#666666' />
                                </TouchableOpacity>
                                <Text style={{
                                    backgroundColor: "white",
                                    paddingHorizontal: 12,
                                    paddingVertical: 3,
                                    marginLeft: 9,
                                }}>{cartdata.filter(x => x.id === item.id).length ? (cartdata.filter(x => x.id === item.id).length) : ('')}</Text>
                                <TouchableOpacity
                                    onPress={() => { dispatch(addItemtoCard(item)) }}
                                    style={{
                                        backgroundColor: "#D8D8D8",
                                        marginLeft: 9,
                                        height: 20,
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Ionicons name="plus" size={15} color='#666666' />
                                </TouchableOpacity>
                            </View>
                        </View>

                    ) : (
                        <View
                            style={styles.view2}
                        >
                            <TouchableOpacity style={styles.view2Pressable}
                                onPress={() => { dispatch(addItemtoCard(item)) }}
                            >
                                <Ionicons name="shoppingcart" size={18} color='black' />
                                <Text style={styles.text1}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                {
                    wishlist.length > 0 && wishlist.some(el => el.id === item.id) ? (

                        <View style={styles.wishlistView}>
                            <TouchableOpacity style={{}} onPress={() => {
                                dispatch(removeItemFromWishlist(item))
                            }}>
                                <Ionicons name="heart" size={20} color='#ff8080' />
                            </TouchableOpacity>
                        </View>

                    ) : (
                        <View style={styles.wishlistView}>
                            <TouchableOpacity style={{}} onPress={() => dispatch(addItemtoWishlist(item))}>
                                <Ionicons name="hearto" size={20} color='#ff8080' />
                            </TouchableOpacity>
                        </View>

                    )
                }

            </Card>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} />
            <Customheader tittle="Flatlist"></Customheader>
            <KeyboardAvoidingView behavior={Platform === "ios" ? "paddingLeft" : null} style={styles.container}>
                {
                    console.log("aa",data)
                }
                {
                    data?.loading ? <ActivityIndicator size="large" color="#00ff00" /> : (
                        <View style={styles.container}>
                            <FlatList
                                style={{ marginLeft: 10, marginRight: 10, }}
                                keyExtractor={(key) => key.index}
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                data={data.photos}
                                renderItem={_randerData} />
                        </View>
                    )
                }


            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    cardnew: {
        backgroundColor: "#f2f2f2",
        width: 335,

        marginTop: 20,
        paddingBottom: 50,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        borderRadius: 5,
        alignItems: 'center'
    },
    imagestyle: {
        height: 200,
        width: 325,
        resizeMode: "contain",
        // marginHorizontal:2,
        marginVertical: 5,
        backgroundColor: "white",
        borderRadius: 5,
    },
    tittleview: {
        height: 60,
        backgroundColor: "#FFFFFF",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tittletext: {
        color: '#9a0065',
        fontFamily: "Roboto-Regular",
        fontSize: 24,
        lineHeight: 30
    },
    viewcard: {
        flexDirection: 'row',
        paddingLeft: 3,
        paddingTop: 1,
        paddingBottom: 1,
        paddingRight: 8,
        borderWidth: 1,
        borderColor: '#E6E6E6',
        borderRadius: 5,
        marginTop: -40,
        marginLeft: 50,
        position: 'absolute',
        backgroundColor: '#fff',
    },

    view2: {
        borderWidth: 1,
        borderColor: '#e6ffe6',
        borderRadius: 7,

    },
    view2Pressable:
    {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 16,
        backgroundColor: '#fff',
        marginLeft: 55,
        position: 'absolute',
        marginTop: -40,
        borderRadius: 8
    },
    text1:
    {
        alignSelf: 'center',
        marginLeft: 17,
        color: '#595959',
        fontSize: 13,
        fontFamily: "Roboto-Regular",
    },
    wishlistView: {

        marginTop: -200,
        marginLeft: 250,
        backgroundColor: '#fff',
        padding: 4,
        borderRadius: 20
    },

})

export default Showpic