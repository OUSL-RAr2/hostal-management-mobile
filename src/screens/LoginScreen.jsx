import React, { useEffect, useRef } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform, Keyboard, Animated} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import footerimg1 from '../../assets/footerimg1.png'
import footerimg2 from '../../assets/footerimg2.png'
import footerimg3 from '../../assets/footerimg3.png'
import { SafeAreaView } from 'react-native-safe-area-context'
import { buildUrl, API_CONFIG } from '../config/api.config';


const LoginScreen = ({onNavigate}) => {


    const [loginData, setLoginData] = React.useState({
        nic: '',
        password: '',
    });

    const footerAnim = useRef(new Animated.Value(1)).current;

    const hideFooter = () => Animated.timing(footerAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
    }).start();

    const showFooter = () => Animated.timing(footerAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
    }).start();

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
        const showSub = Keyboard.addListener(showEvent, hideFooter);
        const hideSub = Keyboard.addListener(hideEvent, showFooter);
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const handleSubmit = async () => {
        
        try {
            const response = await fetch(buildUrl(API_CONFIG.ENDPOINTS.AUTH.SIGN_IN), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data, typeof data);

                // Store token (data.token is already a string, no need to stringify)
                await SecureStore.setItemAsync('token', data.token);

                console.log('Login successful:', data);

                // Navigate to dashboard after successful login
                onNavigate();
            } else {
                // Show error message if login fails
                alert(data.message || 'Login failed. Please check your credentials.');
            }

        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred during login. Please try again.');
        }
    }
    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.appTitle}>OUSL{"\n"}StaySmart</Text>
                    <Text style={styles.text}>Login to your account</Text>

                    <TextInput
                        style={styles.nic}
                        placeholder='Enter your NIC'
                        value={loginData.nic}
                        onChangeText={(value) => setLoginData({...loginData, nic: value})}
                        autoCapitalize='characters'
                        autoCorrect={false}
                        textContentType='username'
                    />

                    <TextInput
                        style={styles.password}
                        placeholder='Enter your Password'
                        value={loginData.password}
                        onChangeText={(value) => setLoginData({...loginData, password: value})}
                        secureTextEntry
                        autoCapitalize='none'
                        autoCorrect={false}
                        textContentType='password'
                    />

                    <TouchableOpacity>
                        <Text style={styles.forgotPass}>Forgot Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                        <Text style={styles.loginButtonName}>Login</Text>
                    </TouchableOpacity>

                    {/* spacer so button isn't hidden behind footer */}
                    <View style={{ height: 180 }} />
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Footer fades out when keyboard opens, fades back in when it closes */}
            <Animated.View
                style={[styles.footer, { opacity: footerAnim, transform: [{ translateY: footerAnim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }] }]}
                pointerEvents='none'
            >
                <Image source={footerimg1} style={styles.footerImage1}/>
                <Image source={footerimg2} style={styles.footerImage2}/>
                <Image source={footerimg3} style={styles.footerImage3}/>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    appTitle:{
        color: '#E74C3C',
        fontSize:36,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:80,
    },
    text:{
        color: '#333',
        fontSize:16,
        fontWeight:'500',
        textAlign:'center',
        marginTop:20,
        marginBottom:'15%',
    },
    nic:{
        width: '75%',
        borderWidth: 1,
        borderColor: '#C25B00',
        borderRadius: 25,
        padding: 10,
        marginVertical: 8,
        alignSelf:'center',
    },
    password:{
        width: '75%',
        borderWidth: 1,
        borderColor: '#C25B00',
        borderRadius: 25,
        padding: 10,
        marginVertical: 8,
        alignSelf:'center',
    },
    forgotPass:{
        color: 'gray',
        marginBottom: 20,
        textAlign:'center',
        fontWeight:500,
    },
    loginButton:{
        backgroundColor: '#C25B00',
        borderRadius: 25,
        marginBottom: 20,
        marginTop:30,
        width:'50%',
        alignSelf:'center'
    },
    loginButtonName:{
        textAlign:'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        padding:10,
    },
    signupText:{
        fontSize: 14,
        textAlign:'center'
    },
    signupLink:{
        color: '#C25B00',
        fontWeight: 'bold'
    },
    footer: {
        width: '100%',
        height: 160,
        position: 'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    footerImage1: {
        position:'absolute',
        zIndex:1,
    },
      footerImage2: {
        position:'absolute',
        zIndex:2,
    },
      footerImage3: {
        position:'absolute',
        zIndex:3,
        bottom:45,
    },
});

export default LoginScreen;