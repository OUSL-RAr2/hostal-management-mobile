import React, { useEffect, useMemo, useRef } from 'react'
import {View, Text, StyleSheet, Image, ActivityIndicator, Animated, Easing } from 'react-native';
import hostelimage from '../../assets/hostelimage.jpg'
import footerimg1 from '../../assets/footerimg1.png'
import footerimg2 from '../../assets/footerimg2.png'
import footerimg3 from '../../assets/footerimg3.png'
import { SafeAreaView } from 'react-native-safe-area-context';

const StartScreen = ({ onNavigate }) => {
    const hasNavigatedRef = useRef(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const floatAnim = useRef(new Animated.Value(0)).current;

    const imageTranslateY = useMemo(() => {
        return floatAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -6],
        });
    }, [floatAnim]);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Navigate to login screen after short splash duration
        const timer = setTimeout(() => {
            if (onNavigate && !hasNavigatedRef.current) {
                hasNavigatedRef.current = true;
                onNavigate();
            }
        }, 2800);

        return () => clearTimeout(timer);
    }, [fadeAnim, floatAnim, onNavigate]);

    return(
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}> 
            <Text style={styles.appTitle}>OUSL{"\n"}StaySmart</Text>
            <Text style={styles.text}>Smart your stay</Text>

            <Animated.Image
                source={hostelimage}
                style={[styles.image1, { transform: [{ translateY: imageTranslateY }] }]}
            />

            <View style={styles.loaderRow}>
                <ActivityIndicator size="small" color="#C25B00" />
                <Text style={styles.loaderText}>Preparing your app...</Text>
            </View>
            </Animated.View>

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
        justifyContent:'space-between',
        backgroundColor:'#FFFFFF',
    },
    content: {
        paddingTop: 42,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    appTitle:{
        color: '#E74C3C',
        fontSize:42,
        fontWeight:'bold',
        textAlign:'center',
    },
    text:{
        color: '#333',
        fontSize:16,
        fontWeight:'500',
        textAlign:'center',
        marginTop:8,
    },
    image1:{
        width:250,
        height:300,
        marginTop:28,
        marginBottom:18,
        alignSelf:'center',
        borderRadius: 16,
    },
    loaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    loaderText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    footer: {
        width: '100%',
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
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