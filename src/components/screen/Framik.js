
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
    Image,
    Alert

} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik'
import Header from '../common/Header';
import Button from '../common/Button';
import Inputbox from '../common/Inputbox';
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../Context/Index';
import { getdata, setData } from '../../AsyncAction';
import { Useuser } from '../../hooks/Useuser';


const Framik = () => {
    const navigation = useNavigation();
    const [imagetext, Setimagetext] = useState("")
    const [inputs, setInputs] = useState([{ key: 0, address: "" }]);
    const [data, Setdata] = Useuser()
   const [photo, setPhoto] = useState('https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg');

    const cloudinaryUpload = async (photo) => {
        const data = new FormData()
        data.append('file', photo)
        data.append('upload_preset', 'Demoexample')
        data.append("cloud_name", "dahai48fk")
       
        fetch("https://api.cloudinary.com/v1_1/dahai48fk/upload", {
            method: "post",
            body: data
        }).then(res => res.json()).
            then(data => {
                Setimagetext(data.secure_url)
                console.log(data.secure_url)
            }).catch(err => {
                Alert.alert("An Error Occured While Uploading")
            })
    }

    const loginValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Name is required'),
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        password: yup
            .string()
            .min(5, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
        conpassword: yup
            .string()
            .min(5, ({ min }) => `Confirm Password must be at least ${min} characters`)
            .required('Confirm Password is required')
            .oneOf([yup.ref('password')], 'Passwords must match')


    })

    useEffect(() => {
        (async () => {
            const userData = await getdata()
            if (userData)
                Setdata(JSON.parse(userData))
        })();

    }, [data.length])


    const handleAddInput = () => {
        setInputs([...inputs, { key: inputs.length, address: "" }]);
    };

    const handleChangecount = (value, index) => {

        let onChangeValue = [...inputs];
        onChangeValue[index]["address"] = value;
        setInputs(onChangeValue);

    };
    const handleDeleteInput = (index) => {
        const newArray = [...inputs];
        newArray.splice(index);
        setInputs(newArray);
    };
    const selectPhotoTapped = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            Setimagetext(" ");
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // Setimagetext(response.assets[0].fileName)
                console.log("Image insert", imagetext);

                const uri = response.assets[0].uri;
                const type = response.assets[0].type;
                const name = response.assets[0].fileName;
                const source = {
                    uri,
                    type,
                    name,
                }

               // Setimagetext(response.assets[0].uri)
                 console.log("Image ", source)
                 cloudinaryUpload(source)
            }
        });
    }


    const handleSubmitold = async (inputdata) => {
        if (data.length > 0) {
            console.log(data);
            let obj = data.find((o, i) => {
                if (o.email === inputdata.email) return true;
            });
            if (obj == undefined || obj == null) {
                let id = "";
                if (data.length > 0)
                    id = data.length + 1;

                const userArray = [...data, { id: id, name: inputdata.name, email: inputdata.email, password: inputdata.password, conpassword: inputdata.conpassword, image: imagetext, address: inputs }]
                console.log("2", userArray)
                setData(userArray)
                Setdata(userArray);
            }
            else {
                Alert.alert("Error", "This user aleardy exit .");
                return;
            }
        }
        else {
            const userArray = [{ id: 1, name: inputdata.name, email: inputdata.email, password: inputdata.password, conpassword: inputdata.conpassword, image: imagetext, address: inputs }]
            console.log("1", userArray)
            //   AsyncStorage.setItem('user', JSON.stringify(userArray));
            setData(userArray)
            Setdata(userArray);
        }
        Alert.alert("Success", "Successfully Data Inserted.");


    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} />
            <ScrollView>
                <KeyboardAvoidingView behavior={Platform === "ios" ? "paddingLeft" : null} style={styles.container}>
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{ name: '', email: '', password: '', conpassword: '', }}
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
                                    <Header tittle="Sign Up"></Header>
                                </View>

                                <View style={[styles.whiteContainer]}>
                                    <Inputbox tittle="Name" placeholder="Aditya Yadav" inputMode="text" secureTextEntry={false} image={require('../../assets/image/user-input-pink.png')} text={values.name} textchange={(text) => { setFieldValue("name", text) }}  ></Inputbox>
                                    {errors.name && touched.name ? (
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                                    ) : null}
                                    <Inputbox tittle="Email Address" placeholder="abc@gmail.com" inputMode="email" secureTextEntry={false} image={require('../../assets/image/mail-input-pink.png')} text={values.email} textchange={(text) => { setFieldValue("email", text) }}></Inputbox>
                                    {errors.email && touched.email ? (
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                    ) : null}
                                    <View style={styles.uploadContainer}>
                                        <Text style={styles.imagetittle}>Select Image</Text>
                                        <TouchableOpacity onPress={selectPhotoTapped.bind()} style={{ flexDirection: 'row', marginTop: 10 }}>
                                            <Image source={require('../../assets/image/upload.png')} style={styles.uploadimagestyle} />
                                            <Text style={styles.imageupplace}>Choose Image</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.uploadedimage} numberOfLines={1}>{imagetext}</Text>
                                    </View>
                                    <Inputbox tittle="Password" placeholder="****" inputMode="text" secureTextEntry={true} image={require('../../assets/image/lock-input-pink.png')} text={values.password} textchange={(text) => { setFieldValue("password", text) }}></Inputbox>
                                    {errors.password && touched.password ? (
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                    ) : null}
                                    <Inputbox tittle="Confirm Password" placeholder="****" inputMode="text" secureTextEntry={true} image={require('../../assets/image/lock-input-pink.png')} text={values.conpassword} textchange={(text) => { setFieldValue("conpassword", text) }}></Inputbox>
                                    {errors.conpassword && touched.conpassword ? (
                                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.conpassword}</Text>
                                    ) : null}

                                    {inputs.map((item, index) => (
                                        <View key={index} style={{ width: '100%' }}>
                                            {inputs.length > 1 && index != 0 && (
                                                <TouchableOpacity onPress={() => handleDeleteInput(index)}>
                                                    <Text style={styles.textdelete}>Delete</Text>
                                                </TouchableOpacity>

                                            )}
                                            <Inputbox tittle={`Add Address ${index == 0 ? ('') : (index + 1)}`} placeholder={`Add Address ${index == 0 ? ('') : (index + 1)}`} inputMode="text" secureTextEntry={false} image={require('../../assets/image/state-input-pink.png')} text={item.address} textchange={(text) => { handleChangecount(text, index) }}></Inputbox>


                                            {index === inputs.length - 1 && (
                                                <TouchableOpacity onPress={() => handleAddInput()}>
                                                    <Text style={styles.textadd}>Add</Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    ))
                                    }

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                                        <Text style={{ color: "#888", fontFamily: "Roboto-Regular", fontSize: 14, lineHeight: 22 }}>I agree to the<Text style={{ color: '#51539f', fontFamily: "Roboto-Regular", fontSize: 14, lineHeight: 22, textDecorationLine: 'underline' }} onPress={() => { }}> Terms & Conditions </Text></Text>
                                    </View>
                                    <Button color="#9a0065" onPress={() => {
                                        handleSubmit()
                                    }}
                                    ></Button>
                                    <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                                        <View style={{ marginTop: 36, justifyContent: 'center', flexDirection: 'row' }}>
                                            <Text style={styles.text1}>Already have an account? </Text>
                                            <Text style={styles.text2}>Log In</Text>
                                        </View>
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
        backgroundColor: '#dcaed2',
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


export default Framik