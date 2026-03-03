import React, { useState } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native'
import * as SecureStore from 'expo-secure-store';
import footerimg1 from '../../assets/footerimg1.png'
import footerimg2 from '../../assets/footerimg2.png'
import footerimg3 from '../../assets/footerimg3.png'
import { SafeAreaView } from 'react-native-safe-area-context'


const LoginScreen = ({onNavigate}) => {


    const [loginData, setLoginData] = useState({
        nic: '',
        password: '',
    });

    const handleSubmit = async () => {
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/sign-in', { //replace localhost with your server IP
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {

                alert(data.message);

                console.log(data, typeof data);

                await SecureStore.setItemAsync('token', JSON.stringify(data.token));

                console.log('Login successful:', data);

                onNavigate();
            }

        } catch (error) {
            console.error('Error logging in:', error);
        }
    }
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.appTitle}>OUSL{"\n"}StaySmart</Text>
            <Text style={styles.text}>Login to your account</Text>


            <TextInput style={styles.nic} placeholder='Enter your NIC' value={loginData.nic} onChangeText={(value) => setLoginData({...loginData, nic: value})}></TextInput>

            <TextInput style={styles.password} placeholder='Enter your Password' value={loginData.password} onChangeText={(value) => setLoginData({...loginData, password: value})} >
            </TextInput>

            <TouchableOpacity>
                <Text style={styles.forgotPass}>Forgot Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                <Text style={styles.loginButtonName}>Login</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Image source={footerimg1} style={styles.footerImage1}/>
                <Image source={footerimg2} style={styles.footerImage2}/>
                <Image source={footerimg3} style = {styles.footerImage3}/>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:"flex-start",
        backgroundColor:'#FFFFFF',
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