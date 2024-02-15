import React, { useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

const setData = async (obj) => {
    try {
        const data1 = await AsyncStorage.setItem('user', JSON.stringify(obj))
    } catch (e) {
        console.log(e);
    }
}

const getdata = async () => {
    try {
        const data1 = await AsyncStorage.getItem('user');
        return data1;
    } catch (e) {
        console.log(e);
    }
}

const addLogindata = async (obj) => {
    try {
        const data = await AsyncStorage.setItem('data', JSON.stringify(obj))
    } catch (e) {
        console.log(e);
    }
}
const getLogindata = async () => {
    try {

        const data1 = await AsyncStorage.getItem('data');
        return data1;
    } catch (e) {
        console.log(e);
    }
}

const deleteLogindata = async () => {
    try {
        const data = await AsyncStorage.removeItem('data')
        return true
    } catch (e) {
        console.log(e);
    }
}


export { setData, getdata, addLogindata, getLogindata, deleteLogindata }