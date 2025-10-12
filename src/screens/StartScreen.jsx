import React from 'react'
import {View, Text, StyleSheet, Image } from 'react-native';
import hostelimage from '../../assets/hostelimage.jpg'
import footerimg1 from '../../assets/footerimg1.png'
import footerimg2 from '../../assets/footerimg2.png'
import footerimg3 from '../../assets/footerimg3.png'
import { SafeAreaView } from 'react-native-safe-area-context';

const StartScreen = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.appTitle}>OUSL{"\n"}StaySmart</Text>
            <Text style={styles.text}>Smart your stay</Text>

            <Image source={hostelimage} style={styles.image1}/>

            <View style={styles.footer}>
                <Image source={footerimg1} style={styles.footerImage1}/>
                <Image source={footerimg2} style={styles.footerImage2}/>
                <Image source={footerimg3} style = {styles.footerImage3}/>
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:"flex-start",
        backgroundColor:'#FFFFFF',
    },
    appTitle:{
        color: '#E74C3C',
        fontSize:42,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:80,
    },
    text:{
        color: '#333',
        fontSize:16,
        fontWeight:'500',
        textAlign:'center',
        marginTop:5,
    },
    image1:{
        width:250,
        height:300,
        marginTop:30,
        marginBottom:20,
        alignSelf:'center',
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

export default StartScreen;