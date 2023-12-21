/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Node, useEffect, useState } from 'react';
import AppColors from '../common/AppColor';

import {
    Alert,
    BackHandler,
    StyleSheet,
    Text,
    Modal,
    Image,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import Toast from 'react-native-simple-toast'
import AppStyle from '../common/AppStyle';
import images from '../assets';
import { storeItem } from '../utils/AsyncConfig';

const Register = ({ navigation }) => {
    const [icon, setIcon] = useState('eye');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [lastName, setLastName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [roleId, setRoleId] = useState(0);
    const [firstNameErr, setFirstNameErr] = useState('');
    const [lastNameErr, setLastNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const [rollIdErr, setRollIdErr] = useState('');
    const [termsErr, setTermsErr] = useState('');
    

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    const registerHandler = e => {
        let isValid = true;
        if (firstName === '') {
            setFirstNameErr('First Name is required');
            isValid = false;
            return;
        }
        if (lastName === '') {
            setLastNameErr('Last Name is required');
            isValid = false;
            return;
        }
        if (email === '') {
            setEmailErr('Enter email');
            isValid = false;
        } else if (reg.test(email) === false) {
            setEmailErr('Email is not valid');
            isValid = false;
            return;
        }
        if (password === '') {
            setPassErr('Enter password');
            isValid = false;
        } else if (password.length < 5) {
            setPassErr('password must be at least 5 characters long');
            isValid = false;
            return;
        }
       addItem()
      
    };

    const changeName = () => {
        setFirstName(e.target.value);
    };
    const changelastName = () => {
        setLastName(e.target.value);
    };
    const checkEmail = e => {
        setEmail(e.target.value);
    };
    const checkPassword = e => {
        setPassword(e.target.value);
    };

    
    const _changeIcon = () => {
        icon !== 'eye-off'
            ? (setIcon('eye-off'), setPasswordVisible(false))
            : (setIcon('eye'), setPasswordVisible(true));
    };

    const addItem=()=>{
        let userInfo=[]
        userInfo.push({firstName:firstName,lastName:lastName,email:email,password:password})
        storeItem("UserInfo",userInfo)
        Toast.show("Register successfully")
        navigation.goBack('Login')
    }
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={{
                    width: '100%',
                    height: '100%',
                }}>
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                    accessible={false}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}>
                    <View
                        style={{
                            flex: 1,
                            paddingVertical: 35,
                            paddingHorizontal: 10,
                            justifyContent: 'center',
                            color: AppColors.colorAccent,
                            backgroundColor: AppColors.primary,
                        }}>
                       
                        <View
                            style={{
                                paddingVertical: 15,
                                paddingHorizontal: 15,
                                justifyContent: 'center',
                                color: AppColors.colorAccent,
                                backgroundColor: AppColors.white,
                                borderRadius: 10,
                            }}>
                            <ScrollView
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}>
                                <Text
                                    style={{
                                        ...AppStyle.TextStyle.titleExtraLarge,
                                        textAlign: 'center',
                                        elevation: 3,
                                        paddingVertical: 10,
                                    }}>
                                    Sign Up
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                    }}>
                                    <TextInput
                                        label="First Name"
                                        // placeholder="First Name"
                                        value={firstName}
                                        mode="outlined"
                                        autoFocus={false}
                                        blurOnSubmit={true}
                                        clearButtonMode="never"
                                        keyboardType="text"
                                        outlineColor={AppColors.accent}
                                        onChangeText={text => {
                                            setFirstName(text);
                                            changeName;
                                        }}
                                        style={styles.input}
                                    />
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {firstName === '' ? <>{firstNameErr}</> : ''}
                                    </Text>

                                    <TextInput
                                        label="Last Name"
                                        // placeholder="Last Name"
                                        value={lastName}
                                        mode="outlined"
                                        keyboardType="text"
                                        onChangeText={text => {
                                            setLastName(text);
                                            changelastName;
                                        }}
                                        style={styles.input}
                                        outlineColor={AppColors.accent}
                                    />
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {lastName === '' ? <>{lastNameErr}</> : ''}
                                    </Text>
                                    <TextInput
                                        label={'Email'}
                                        // placeholder="Email"
                                        value={email}
                                        mode="outlined"
                                        keyboardType="email-address"
                                        onChangeText={text => {
                                            setEmail(text);
                                            checkEmail;
                                        }}
                                        style={styles.input}
                                        outlineColor={AppColors.accent}
                                    />
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {email === '' ? (
                                            <>{emailErr}</>
                                        ) : reg.test(email) === false ? (
                                            <>{emailErr}</>
                                        ) : (
                                            ''
                                        )}
                                    </Text>
                                    <TextInput
                                        label={'Password'}
                                        // placeholder="Password"
                                        value={password}
                                        secureTextEntry={passwordVisible}
                                        right={
                                            <TextInput.Icon
                                                name={passwordVisible ? 'eye' : 'eye-off'}
                                                size={20}
                                                onPress={_changeIcon}
                                            />
                                        }
                                        mode="outlined"
                                        keyboardType="default"
                                        onChangeText={text => {
                                            setPassword(text);
                                            checkPassword;
                                        }}
                                        style={styles.input}
                                        outlineColor={AppColors.accent}
                                    />
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {password === '' || password.length < 5 ? (
                                            <>{passErr} </>
                                        ) : (
                                            ''
                                        )}
                                    </Text>
                        
                                    <Text style={{ fontSize: 12, color: 'red' }}>
                                        {roleId === 0 ? <>{rollIdErr} </> : ''}
                                    </Text>
                             
                                    <Button
                                        raised
                                        mode="contained"
                                        theme={{ roundness: 5 }}
                                        labelStyle={{
                                            color: AppColors.white,
                                        }}
                                        onPress={() => registerHandler()}
                                        style={{
                                            marginTop: 3,

                                            backgroundColor: AppColors.primary,
                                        }}>
                                        Submit
                                    </Button>
                                    <Text
                                        style={{
                                            textAlign: 'center',
                                            fontWeight: '500',
                                            color: AppColors.accent,
                                            paddingVertical: 3,
                                        }}>
                                        Or
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
                                    <TouchableOpacity style={styles.outlineBtn}>
                                        <Image source={images.google} style={styles.imageStyle} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.outlineBtn}>
                                        <Image source={images.facebook} style={styles.imageStyle} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.outlineBtn}>
                                        <Image source={images.apple} style={styles.imageStyle} />
                                    </TouchableOpacity>
                                </View>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 12,
                                        }}>
                                        <Text style={styles.text}>Already have an account ? </Text>
                                        <Button
                                            color="#555"
                                            onPress={() => navigation.navigate('Login')}
                                            style={{ position: 'relative', bottom: 10 }}>
                                            Login
                                        </Button>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: AppColors.accentDark,
        fontSize: 14,
    },
    input: {
        borderEndWidth: 0,
        borderBottomWidth: 0,
        textDecorationLine: 0,
        height: 50,
        fontSize: 15,
        borderRadius: 10,
        borderColor: AppColors.borderColor,
        outlineColor: AppColors.borderColor,
        backgroundColor: 'white',
    },
   
    label: {
        margin: 8,
    },
    outlineBtn: {
        marginVertical: 1,
    },
    imageStyle: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2
    },
    title: {
        fontSize: 16,
        color: '#000',
        marginLeft: 5,
        fontWeight: '600',
    },
   
});

export default Register;
