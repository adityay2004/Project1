import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { deleteLogindata, getLogindata } from '../../AsyncAction';
import Customheader from '../common/Customheader';
import { getDataapi } from '../../redux-toolkit/getData';
getDataapi
const Home = () => {
  const navigation = useNavigation();
  const [data, SetData] = useState([]);
  const logoutData = async () => {
    const user = await deleteLogindata()
    if (user)
      navigation.navigate('Login');
  }

  useEffect(() => {
     getdata();
  }, [])

  const getdata = async () => {
    const user = await getLogindata()
    if (user != null && user !== undefined) SetData(JSON.parse(user))
    else navigation.navigate('Login');

  }

  return (

    <SafeAreaView style={styles.container}>
     <StatusBar hidden={true} />
      <Customheader tittle="Home" />
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform === "ios" ? "paddingLeft" : null} style={styles.container}>
          <View style={styles.container3}>
            <View style={{ width: 180, alignItems: 'center' }}>
              <Image source={{ uri: data?.image }} style={{ width: 180, height: 150, resizeMode: 'contain' }} />
            </View>
            <View style={styles.textview}>
              <Text style={styles.text1}>Name : </Text>
              <Text numberOfLines={1} style={styles.text2}>{data?.name}</Text>
            </View>
            <View style={styles.textview}>
              <Text style={styles.text1}>Email : </Text>
              <Text numberOfLines={1} style={styles.text2}>{data?.email}</Text>
            </View>
            <View style={styles.textview}>
              <Text style={styles.text1}>Password : </Text>
              <Text numberOfLines={1} style={styles.text2}>{data?.password}</Text>
            </View>
            <View style={styles.textview}>
              <Text style={styles.text1}>Address : </Text>
              <View style={{ width: '65%' }}>
                {
                  data?.address && data?.address.map((prop, key) => {
                    return (
                      <Text numberOfLines={1} style={styles.text3} index={key}>{prop?.address}</Text>
                    )
                  })

                }
              </View>


            </View>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => { logoutData() }}
          >
            <Text style={styles.textbtn}>Log Out</Text>

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => { navigation.navigate('Showpic'); }}
          >
            <Text style={styles.textbtn}>Show Flatlist
            </Text>

          </TouchableOpacity>

        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textview: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    marginLeft: 30
  },
  container3: {
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#dcaed2',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: '80%',
    marginTop: '10%'
  },
  text1: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    fontWeight: '500',

  },
  text2: {
    width: '65%',
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    fontWeight: '500',
  },
  text3: {
    fontSize: 14,
    fontFamily: "Roboto-Regular",
    fontWeight: '500',

  },
  btn: {
    marginTop: 20,
    marginBottom: 20,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    width: '80%',
    alignSelf: 'center'
  },
  textbtn: {
    color: '#51539f',
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    lineHeight: 30
  }
})

export default Home