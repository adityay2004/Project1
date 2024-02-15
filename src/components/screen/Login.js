
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert

} from 'react-native';
import { Formik } from 'formik'
import Header from '../common/Header';
import Button from '../common/Button';
import Inputbox from '../common/Inputbox';
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native';
import { addLogindata, deleteLogindata, getdata } from '../../AsyncAction';

const Login = () => {
  const navigation = useNavigation();
  const [data, Setdata] = useState([])
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(5, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  })

  useEffect(() => {
    callData();
    console.log("===>", data)
  }, [])

  async function callData() {
    const userData = await getdata()
    if (userData)
      Setdata(JSON.parse(userData))
  }


  const handleSubmitold = async (inputdata) => {
    callData();
    console.log("1", inputdata);
    console.log("2", data)
    if (data.length > 0) {
      let obj = data.find((o, i) => {
        if (o.email === inputdata.email && o.password === inputdata.password) return true;
      });
      console.log("Login Data", obj)
      if (obj !== undefined && obj !== '') {
        const status = await deleteLogindata()
        if (status)
          addLogindata(obj)
        navigation.navigate('Home')
      }
      else
        Alert.alert("Error", "User id not Found.")
    } else
      Alert.alert("Error", "User id not Found.")


  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <ScrollView>
        <KeyboardAvoidingView behavior={Platform === "ios" ? "paddingLeft" : null} style={styles.container}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: '', password: '', }}
            onSubmit={values => handleSubmitold(values)}
          >
            {({
              values,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
            }) => (
              <View style={styles.container}>
                <View style={{ height: 80, backgroundColor: "#FFFFFF", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                  <Text style={{ color: "#1E1F20", fontFamily: "Roboto-Regular", fontSize: 22, lineHeight: 30 }}>Welcome to </Text>
                  <Text style={{ color: '#9a0065', fontFamily: "Roboto-Regular", fontSize: 24, lineHeight: 30 }}>Krenai </Text>
                </View>
                <View style={styles.pinkMainContainer}>
                  <Header tittle="Sign In"></Header>
                </View>
                <View style={[styles.whiteContainer]}>
                  <Inputbox tittle="Email Address" placeholder="abc@gmail.com" inputMode="email" secureTextEntry={false} image={require('../../assets/image/user-input.png')} text={values.email} textchange={(text) => { setFieldValue("email", text) }} color="#51539f"></Inputbox>

                  {errors.email && touched.email ? (
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                  ) : null}
                  <Inputbox tittle="Password" placeholder="****" inputMode="text" secureTextEntry={true} image={require('../../assets/image/lock-input.png')} text={values.password} textchange={(text) => { setFieldValue("password", text) }} color="#51539f"></Inputbox>

                  {errors.password && touched.password ? (
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                  ) : null}
                  <TouchableOpacity
                    onPress={() => { }}
                  >
                    <Text style={[styles.text1, { textAlign: 'right', fontSize: 15 }]}>Forgot Password ?</Text>
                  </TouchableOpacity>
                  <Button color="#ee1c24" onPress={() => {
                    handleSubmit()
                  }}
                  ></Button>
                  <TouchableOpacity
                    style={{
                      marginTop: 20,
                      height: 50,
                      backgroundColor: "#FFFFFF",
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      elevation: 5,
                      width: '80%',
                      alignSelf: 'center'
                    }}
                    onPress={() => { navigation.navigate('Signup') }}
                  >
                    <Text style={{ color: '#51539f', fontFamily: "Roboto-Bold", fontSize: 18, lineHeight: 30 }}>Create an Account
                    </Text>

                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  pinkMainContainer: {
    height: 230,
    padding: 15,
    backgroundColor: '#0047b3',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  whiteContainer: {
    marginTop: -40,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15
  },
  textdelete: {
    marginTop: 5,
    marginLeft: 260,
    color: 'red',
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 20,
    paddingBottom: -0
  },
  textadd: {
    marginTop: 0,
    position: 'absolute',
    marginLeft: 260,
    paddingLeft: 16,
    color: 'green',
    fontFamily: "Roboto-Regular",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700'
  },
  uploadContainer: {
    width: '100%',
    height: 68,
    borderRadius: 5,
    marginBottom: 15,
    elevation: 0,
    borderBottomColor: "#1E1F20",
    borderBottomWidth: 1,
  },
  imagetittle: {
    paddingLeft: 16,
    color: '#9a0065',
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5
  },
  uploadimagestyle: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginLeft: 0,
    marginTop: 2,
    tintColor: '#9a0065'
  },
  imageupplace: {
    width: '97%',
    marginVertical: 1,
    height: 40,
    color: "#888",
    fontFamily: "Roboto-Regular",
    fontSize: 14,
    marginLeft: 7,
  },
  uploadedimage: {
    position: 'absolute',
    marginTop: 35,
    alignSelf: 'flex-end',
    width: '40%'
  },
  text1: {
    color: '#51539f',
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 22
  },
  text2: {
    color: '#51539f',
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold'
  },
})



export default Login