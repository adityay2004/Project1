
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
import Header from '../common/Header';
import Button from '../common/Button';
import Inputbox from '../common/Inputbox';

const Signup = () => {
    const [name, Setname] = useState("")
    const [email, Setemail] = useState("")
    const [password, Setpassword] = useState("")
    const [conpassword, Setconpassword] = useState("")
    const [imagetext, Setimagetext] = useState("")
    const [inputs, setInputs] = useState([{ key: 0, address: "" }]);
    const [data, Setdata] = useState("")

    useEffect(() => {

        (async () => {
            const userData = (AsyncStorage.getItem('user'));
            if (userData.length > 0)
                Setdata((userData))
            console.log("===>", data)
        })();

    }, [data.length])
    const handleAddInput = () => {
        setInputs([...inputs, { key: inputs.length, address: "" }]);
    };

    const handleChange = (value, index) => {

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
                Setimagetext(response.assets[0].fileName)
                console.log("Image insert", imagetext);
            }
        });
    }
    const validateForm = () => {
        let data = "";
        if (!name) data = data + "Name is required \n";
        if (!email) data = data + "Email address is required \n";
        if (!imagetext) data = data + "Image is required \n";
        if (!password) data = data + "Password is required \n";
        if (!conpassword) data = data + "Confirm Password is required \n";
        if (password != conpassword) data = data + "Password is not matched \n";
        if (data.length > 0) {
            Alert.alert("Error", data);
            return false;
        }
        else return true

    };

    const handleSubmit = () => {
        if (validateForm()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailRegex.test(email)) {
                //Setdata(JSON.parse(AsyncStorage.getItem('user')));
                console.log(data)
                if (data.length > 0) {
                    console.log(data);
                    let obj = data.find((o, i) => {
                        if (o.email === email) return true;
                    });
                    if (obj == undefined || obj == null) {
                        let id = "";
                        if (data.length > 0)
                            id = data.length + 1;

                        const userArray = [...data, { id: id, name: name, email: email, password: password, conpassword: conpassword, image: imagetext, address: inputs }]
                        console.log("2", userArray)
                        AsyncStorage.setItem('user', JSON.stringify(userArray));
                        Setdata(userArray);
                    }
                    else {
                        Alert.alert("Error", "This user aleardy exit .");
                        return;
                    }
                }
                else {
                    const userArray = [{ id: 1, name: name, email: email, password: password, conpassword: conpassword, image: imagetext, address: inputs }]
                    console.log("1", userArray);
                    AsyncStorage.setItem('user', JSON.stringify(userArray));
                    Setdata(userArray);
                }
                Alert.alert("Success", "Successfully Data Inserted.");
            } else {
                Alert.alert("Error", "Please enter a valid email address.");
            }


        }

    };

   
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} />
            <ScrollView>

                <KeyboardAvoidingView behavior={Platform === "ios" ? "paddingLeft" : null} style={styles.container}>
                    <View style={styles.container}>
                        <View style={{ height: 80, backgroundColor: "#FFFFFF", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ color: "#1E1F20", fontFamily: "Roboto-Regular", fontSize: 22, lineHeight: 30 }}>Welcome to </Text>
                            <Text style={{ color: '#9a0065', fontFamily: "Roboto-Regular", fontSize: 24, lineHeight: 30 }}>Krenai </Text>
                        </View>
                        <View style={styles.pinkMainContainer}>
                            <Header></Header>
                        </View>

                        <View style={[styles.whiteContainer]}>
                            <Inputbox tittle="Name" placeholder="Aditya Yadav" inputMode="text" secureTextEntry={false} image={require('../../assets/image/user-input-pink.png')} text={name} textchange={(text) => { Setname(text) }} ></Inputbox>
                            <Inputbox tittle="Email Address" placeholder="abc@gmail.com" inputMode="email" secureTextEntry={false} image={require('../../assets/image/mail-input-pink.png')} text={email} textchange={(text) => { Setemail(text) }}></Inputbox>
                            <View style={styles.uploadContainer}>
                                <Text style={styles.imagetittle}>Select Image</Text>
                                <TouchableOpacity onPress={selectPhotoTapped.bind()} style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Image source={require('../../assets/image/upload.png')} style={styles.uploadimagestyle} />
                                    <Text style={styles.imageupplace}>Choose Image</Text>
                                </TouchableOpacity>
                                <Text style={styles.uploadedimage} numberOfLines={1}>{imagetext}</Text>
                            </View>
                            <Inputbox tittle="Password" placeholder="****" inputMode="text" secureTextEntry={true} image={require('../../assets/image/lock-input-pink.png')} text={password} textchange={(text) => { Setpassword(text) }}></Inputbox>
                            <Inputbox tittle="Confirm Password" placeholder="****" inputMode="text" secureTextEntry={true} image={require('../../assets/image/lock-input-pink.png')} text={conpassword} textchange={(text) => { Setconpassword(text) }}></Inputbox>

                            {inputs.map((item, index) => (
                                <View key={index} style={{ width: '100%' }}>
                                    {inputs.length > 1 && index != 0 && (
                                        <TouchableOpacity onPress={() => handleDeleteInput(index)}>
                                            <Text style={styles.textdelete}>Delete</Text>
                                        </TouchableOpacity>

                                    )}
                                    <Inputbox tittle={`Add Address ${index == 0 ? ('') : (index + 1)}`} placeholder={`Add Address ${index == 0 ? ('') : (index + 1)}`} inputMode="text" secureTextEntry={false} image={require('../../assets/image/state-input-pink.png')} text={item.address} textchange={(text) => { handleChange(text, index) }}></Inputbox>


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
                            <Button onPress={() => {
                                handleSubmit()
                            }}
                            ></Button>
                        </View>
                    </View>
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
    }
})

export default Signup