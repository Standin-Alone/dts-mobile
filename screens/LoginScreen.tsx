import React,{useState,useEffect} from 'react';
import { StyleSheet, TouchableOpacity,Image } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import Images from '../constants/Images';
import Layout from '../constants/Layout';


export default function LoginScreen({ navigation }: RootStackScreenProps<'LoginScreen'>) {

  return (
    <View style={styles.container}>
        <Image source={Images.splash_screen_logo} style={styles.logo} />        
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
    fontSize: 24,
    fontWeight: 'bold',
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
