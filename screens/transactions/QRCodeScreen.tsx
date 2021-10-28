import React,{useState,useEffect} from 'react';
import { StyleSheet, TouchableOpacity,Image,TextInput,Icon  } from 'react-native';
import { Text, View } from '../../components/Themed';
import { RootStackScreenProps } from '../../types';
import Images from '../../constants/Images';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { Formik } from 'formik';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi  } from 'react-native-textinput-effects';
import Button from 'apsl-react-native-button';


export default  function  QRCodeScreen({ navigation }: RootStackScreenProps<'OTPScreen'>){

  const [isLoading,setLoading] = new useState(false);


  // OTP function
  const handleOTP = (values)=>{
    
      navigation.replace('Root');
  }

  


  // design start here
  return (
    <View style={styles.container}>        
          <View style={styles.login_form}>
            <Formik
              initialValues = {{otp:''}}
              onSubmit= {(values)=>handleOTP(values)}            
            >

            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) =>(
              <View style={styles.formBody}>
            
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

});
