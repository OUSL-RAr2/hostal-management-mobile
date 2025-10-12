import React from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native'
import footerimg1 from '../../assets/footerimg1.png'
import footerimg2 from '../../assets/footerimg2.png'
import footerimg3 from '../../assets/footerimg3.png'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.appTitle}>OUSL{"\n"}StaySmart</Text>
            <Text style={styles.text}>Login to your account</Text>

            <TextInput style={styles.username} placeholder='Enter your username'></TextInput>

            <TextInput style={styles.password} placeholder='Enter your Password'>
            </TextInput>

            <TouchableOpacity>
                <Text style={styles.forgotPass}>Forgot Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonName}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.signupText}>
                If you don't have a account?
                <Text style={styles.signupLink}>Sign Up</Text>
            </Text>
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
    username:{
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