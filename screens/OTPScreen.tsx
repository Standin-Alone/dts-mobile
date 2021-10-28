import React,{useState,useEffect} from 'react';
import { StyleSheet, TouchableOpacity,Image,TextInput,Icon  } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import Images from '../constants/Images';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { Formik } from 'formik';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi  } from 'react-native-textinput-effects';
import Button from 'apsl-react-native-button';
import axios from 'axios';
import * as ipConfig from '../ipconfig';
import * as Yup from 'yup';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default  function  OTPScreen({ navigation,route}: RootStackScreenProps<'OTPScreen'>){

  const [isLoading,setLoading] = new useState(false);
  const [isResendLoading,setResendLoading] = new useState(false);
  const [error,setError] = new useState(false);
  const params = route.params;

  // OTP function
  const handleOTP = (values)=>{
     
    let data = {
      user_id:params.user_id,
      otp:values.otp
      
  }
      setLoading(true);
      setError(false);      
      // axios post here

      NetInfo.fetch().then(async (response)=>{
        if(response.isConnected){
          axios.post(ipConfig.ipAddress+'MobileApp/Mobile/verify_otp',data).then((response)=>{
            console.warn(response.data);                  
            if(response.data['Message'] == 'true'){
              
              setError(false);
              setLoading(false);
              navigation.replace('Root',{})
            }else{
              setLoading(false);
              setError(true);
            } 
          }).catch((err)=>{
            console.warn(err.response.data);
            setLoading(false);
          });
      }else{
        alert('No internet connection');
      }
    });
  }


   // Resend OTP function
   const handleResendOTP = (values)=>{
     
    let data = {
      user_id:params.user_id,
      
  }
      setResendLoading(true);
      setError(false);      
      // axios post here

      NetInfo.fetch().then(async (response)=>{
        if(response.isConnected){
          axios.post(ipConfig.ipAddress+'MobileApp/Mobile/resend_otp',data).then((response)=>{
            console.warn(response.data);                  
            if(response.data['Message'] == 'true'){
              alert('Successfully resend new OTP to your email.');
              setError(false);
              setResendLoading(false);              
            }else{
              setResendLoading(false);
              setError(true);
            } 
          }).catch((err)=>{
            console.warn(err);
            setResendLoading(false);
          });
      }else{
        alert('No internet connection');
        setResendLoading(false);
      }
    });
  }

  // validation function 
  const validation = Yup.object({
    otp: Yup.number().required("Please enter your otp."),
  });
  
  


  // design start here
  return (
    <View style={styles.container}>
        <Image source={Images.splash_screen_logo} style={styles.logo} />        
          <View style={styles.otp_form}>

            <Formik
              initialValues = {{otp:''}}
              onSubmit= {(values)=>handleOTP(values)}      
              validationSchema = {validation}      
            >

            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) =>(
              <View style={styles.formBody}>
                  <View style={styles.formBody}>
                    <Text style={styles.otp}>One Time Pin</Text>
                    <Text style={styles.otp_desc}>
                      Your one time pin has been sent to your email {'\n'}
                      <Text style={[styles.otp_desc,{color:Colors.warning}]}> {params.email}</Text>
                    </Text>
                  </View>
                   <Fumi
                      label={'OTP'}
                      iconClass={FontAwesomeIcon}
                      iconName={'key'}
                      iconColor={Colors.color_palette.orange}
                      iconSize={20}
                      iconWidth={40}
                      inputPadding={16}
                      style={styles.loginTextInput}
                      onChangeText={handleChange('otp')}           
                      secureTextEntry={true}
                      keyboardType={'numeric'}
                      maxLength={6}
                    />

                    <Button 
                      textStyle={styles.textButton} 
                      style={{borderColor:Colors.color_palette.orange}} 
                      activityIndicatorColor={Colors.color_palette.orange} 
                      isLoading={isLoading}
                      onPress ={handleSubmit}
                    > 
                      Verify OTP
                    </Button>

                    <Button 
                      textStyle={styles.resendButton} 
                      style={{borderColor:Colors.success}} 
                      activityIndicatorColor={Colors.success} 
                      isLoading={isResendLoading}
                      onPress={handleResendOTP}
                    > 
                     Resend OTP
                    </Button>
              </View>  
              )}
            </Formik>


          </View>
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
  otp_form:{      
    marginVertical: (Layout.window.height / 100) * 10
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
  otp: { textAlign: "center", fontSize: 25,color:Colors.dark.background },
  otp_desc: { textAlign: "center", fontSize: 18,marginBottom:20,color:Colors.dark.background},
  loginTextInput:{  
    color:Colors.color_palette.orange_smoke,
    width: (Layout.window.width / 100 ) * 90,
    borderRadius:5,
    alignSelf:'center', 
    marginBottom:20
       
  },
  formBody:{
    backgroundColor:Colors.color_palette.base
  },
  textButton:{
    fontSize: 18,
    color:Colors.color_palette.orange,
    height:50,
    paddingTop:10,    
    width: (Layout.window.width / 100 ) * 120,
  },
  resendButton:{
    fontSize: 18,
    color:Colors.success,
    height:50,
    paddingTop:10,    
    width: (Layout.window.width / 100 ) * 120,
  }

});
