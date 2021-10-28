import React,{useEffect,useState} from 'react';
import { StyleSheet, TouchableOpacity,Image} from 'react-native';
import { Text, View } from '../components/Themed';
import * as SplashScreen from 'expo-splash-screen';
import { RootStackScreenProps } from '../types';
import Images from '../constants/Images';
import Layout from '../constants/Layout';
import NetInfo from "@react-native-community/netinfo";

SplashScreen.preventAutoHideAsync().then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)).catch(console.warn);
export default function SplashScreenContainer({ navigation }: RootStackScreenProps<'SplashScreenContainer'>) {
  useEffect(()=>{


    setTimeout(()=>{
      NetInfo.fetch().then(async (response)=>{
          if(response.isConnected){

            navigation.replace('LoginScreen');
          }else{
            // alert('No Internet Connection.')
            navigation.replace('LoginScreen');
          }
      });
    },5000)
  },[]);
  
  return (
    <View style={styles.container}>
        <Image source={Images.splash_screen_logo} style={styles.logo} />
        <Text style={styles.title}>Document Tracking Mobile Application</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor:'#CDF2CA'
  },
  title: {
    marginVertical: (Layout.window.height / 100) * 10,
    fontSize: 25,    
    color:'black',
    fontWeight: 'bold',
    textAlign:'center'
  },
  logo:{
      width:200,
      height:200
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
