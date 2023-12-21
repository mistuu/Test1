import React, { Node, useEffect, useState } from 'react';

import {
    Alert,
    BackHandler,
    StyleSheet,
    Text,
    Image,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Svg,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { Button, Provider as PaperProvider, TextInput } from 'react-native-paper';
import Toast from 'react-native-simple-toast'

import AppStyle from '../common/AppStyle';
import AppColors from '../common/AppColor';
import { getItem, storeItem } from '../utils/AsyncConfig';
import ProgressDialog from '../components/ProgressDialog';
import images from '../assets';
import { useFocusEffect } from '@react-navigation/native' 


const Login = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    //   const user = auth().currentUser;
    const [icon, setIcon] = useState('eye');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [fadeAnim, setfadeAnim] = useState(new Animated.Value(0));
    const [fadeAnim2, setfadeAnim2] = useState(new Animated.Value(0));
    const [fadeAnim3, setfadeAnim3] = useState(new Animated.Value(0));
    const [duration, setduration] = useState(3000);
    const [durationn, setdurationn] = useState(3000);
    const [userInfo, setUserInfo] = useState([]);

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    useEffect(() => {
        getData();
        
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to exit?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'EXIT', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };
        fadeIn();
        // fadeAnim22();
        fadeAnim33();
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => {
            backHandler.remove();
        };
    }, []);
    useFocusEffect(
        React.useCallback(() => {
          //Below alert will fire every time when profile screen is focused
            getData()
        }, [])
      );
    const getData = async () => {
        const userinfo = await getItem("UserInfo")
        setUserInfo(userinfo)
        console.log('User:', userinfo);
    };

    const fadeIn = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 255,
                    duration: duration,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: duration,
                }),
            ]),
        ).start();
    };

    const fadeAnim33 = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim3, {
                    toValue: 255,
                    duration: durationn,
                }),
                Animated.timing(fadeAnim3, {
                    toValue: 0,
                    duration: durationn,
                }),
            ]),
        ).start();
    };
    const getLogin = async () => {
        console.log("user Info==", userInfo[0]);
        try {
            setLoading(true);
            userInfo?.filter(user => {
                console.log("=====", user.email);
                console.log(user.password);

                if (user.email == email && user.password == password) {
                    navigation.navigate('Dashboard');
                    setLoading(false)

                }
                else {
                    Toast.show("Invalid username or password")
                    setLoading(false)

                }
                
            })
            setLoading(false)
        } catch (error) {

        }


    };
    const _changeIcon = () => {
        icon !== 'eye-off'
            ? (setIcon('eye-off'), setPasswordVisible(false))
            : (setIcon('eye'), setPasswordVisible(true));
    };
    const loginHandler = () => {
        if (email === '') {
            setEmailError('Enter email');
            return;
        } else if (reg.test(email) === false) {
            setEmailError('Email is not valid');
            return;
        }
        if (password === '') {
            setPassError('Enter Password');
            return;
        }
        getLogin();
    };

    const checkEmail = e => {
        setEmail(e.target.value);
    };

    const checkPassword = e => {
        setPassword(e.target.value);
    };

    return (
        <View style={styles.container}>
            {ProgressDialog.CustomProgressBar(isLoading)}
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
                            padding: 20,
                            justifyContent: 'center',
                            color: AppColors.colorAccent,
                            backgroundColor: AppColors.primary,
                        }}>
                        <Animated.View
                            style={[
                                // { width: '10%'},
                                {
                                    // Bind opacity to animated value
                                    transform: [{ translateX: fadeAnim }],
                                    opacity: fadeAnim,
                                },
                            ]}>
                            <Image
                                source={images.rect2}
                                style={{ marginBottom: 50, height: 50, width: 50 }}
                            />
                        </Animated.View>
                        <View
                            style={{
                                padding: 15,
                                justifyContent: 'center',
                                color: AppColors.colorAccent,
                                backgroundColor: AppColors.white,
                                borderRadius: 10,
                            }}>
                            <Text
                                style={{
                                    ...AppStyle.TextStyle.titleExtraLarge,
                                    paddingHorizontal: 5,
                                    textAlign: 'center',
                                }}>
                                Login
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'column',
                                }}>
                                <TextInput
                                    placeholder="Email"
                                    value={email}
                                    mode="outlined"
                                    keyboardType="email-address"
                                    onChangeText={text => {
                                        setEmail(text);
                                        checkEmail;
                                    }}
                                    style={styles.input}
                                />
                                <Text style={{ fontSize: 13, color: 'red' }}>
                                    {email === '' ? (
                                        <>{emailError}</>
                                    ) : reg.test(email) === false ? (
                                        <>{emailError}</>
                                    ) : (
                                        ''
                                    )}
                                </Text>
                                <TextInput
                                    // label="Password"
                                    placeholder="Password"
                                    value={password}
                                    secureTextEntry={passwordVisible}
                                    right={
                                        <TextInput.Icon
                                            name={passwordVisible ? 'eye' : 'eye-off'}
                                            size={15}
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
                                />
                                <Text style={{ fontSize: 13, color: 'red' }}>
                                    {password === '' || password.length < 5 ? (
                                        <>{passError} </>
                                    ) : (
                                        ''
                                    )}
                                </Text>

                                <Button
                                    raised
                                    mode="contained"
                                    theme={{ roundness: 5 }}
                                    labelStyle={{
                                        color: AppColors.white,
                                    }}
                                    onPress={() => {
                                        loginHandler();
                                    }}
                                    style={{
                                        marginTop: 20,
                                        marginBottom: 5,
                                        backgroundColor: AppColors.primary,
                                    }}>
                                    Login
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
                                        marginTop: 15,
                                    }}>
                                    <Text style={styles.text}>Don't have an account ? </Text>
                                    <Button
                                        color="#555"
                                        onPress={() => navigation.navigate('Register')}
                                        style={{ position: 'relative', bottom: 10 }}>
                                        Register
                                    </Button>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        marginTop: 15,
                                    }}>
                                    <Button
                                        color="#555"
                                        // onPress={() => navigation.navigate('ForgetPassword')}
                                        style={{ position: 'relative', bottom: 10, fontSize: 10 }}>
                                        Forget Password ?
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <Animated.View
                            style={[
                                // { width: '10%'},
                                {
                                    // Bind opacity to animated value
                                    transform: [{ translateX: fadeAnim3 }],
                                    opacity: fadeAnim3,
                                },
                            ]}>
                            <Image
                                source={images.rect2}
                                style={{
                                    marginTop: 50,
                                    //   marginLeft: 'auto',
                                    marginRight: 20,
                                    height: 50,
                                    width: 50,
                                }}
                            />
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.primary
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
        marginTop: 10,
        borderEndWidth: 0,
        borderBottomWidth: 0,
        textDecorationLine: 0,
        height: 50,
        fontSize: 15,
        // borderWidth: 1,
        borderRadius: 10,
        borderColor: AppColors.borderColor,
        backgroundColor: 'white',
        // borderBottomColor: '#000',
    },

    outlineBtn: {
    },

    imageStyle: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2
    },
});

export default Login;