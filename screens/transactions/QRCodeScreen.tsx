import React,{useState,useEffect} from 'react';
import { StyleSheet  } from 'react-native';
import { Text, View } from '../../components/Themed';
import { RootStackScreenProps } from '../../types';
import Colors from '../../constants/Colors';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from 'react-native-barcode-mask';
import {  
  useNavigationState,
} from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import * as ipConfig from '../../ipconfig';
import { Root, Popup,Toast} from 'react-native-popup-confirm-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default  function  QRCodeScreen({ navigation }: RootStackScreenProps<'OTPScreen'>){

  const navigation_state = useNavigationState(
    (state) => state.routes[state.index].name
  );
  const [isLoading,setLoading] = new useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned]             = useState(false);

  useEffect(() => {
    (async () => {
      navigation.addListener("focus", () => {
        if (navigation.isFocused()) {
          setScanned(false);
        } else {
          setScanned(true);
        }
      });

      if (navigation_state != "QRCodeScreen") {
        setScanned(true);
      } else {
        setScanned(false);
      }
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [navigation_state]);

  // QR Code function
  const handleQRCodeScanned = async ({ type, data }) => {

      let payload = {
        document_number : data,
        office_code : await AsyncStorage.getItem('office_code'),              
      } 

      
    
      NetInfo.fetch().then( (response)=>{
        if(response.isConnected){
          axios.post(ipConfig.ipAddress+'MobileApp/Mobile/get_scanned_document',payload).then((response)=>{
                        
            if(response.data['Message'] == 'true'){


              
              Popup.show({
                type: 'success',              
                title: 'Success!',
                textBody: 'Sucessfully scanned the QR code.',                
                buttonText:'Ok',
                okButtonStyle:styles.confirmButton,
                okButtonTextStyle: styles.confirmButtonText,
                callback: () => {                  
                  Popup.hide()
                  if(response.data['type'] == 'receive'){
                    navigation.replace('ReceiveForm',{document_info:response.data['doc_info']})
                  }else if(response.data['type'] == 'release'){
                    navigation.replace('ReleaseForm',{document_info:response.data['doc_info']})
                  }
                  
                  
                },              
              })
  
            }else if(response.data['Message'] == 'Not Authorize'){

              Popup.show({
                type: 'danger',              
                title: 'Error!',
                textBody: "You don't have authorize to receive this document or you already received this document.",                
                buttonText:'Ok',
                okButtonStyle:styles.confirmButton,
                okButtonTextStyle: styles.confirmButtonText,
                callback: () => {                  
                  Popup.hide()                                    
                },              
              })
            }else{
              Popup.show({
                type: 'danger',              
                title: 'Error!',
                textBody: "Something went wrong.",                
                buttonText:'Ok',
                okButtonStyle:styles.confirmButton,
                okButtonTextStyle: styles.confirmButtonText,
                callback: () => {                  
                  Popup.hide()                                    
                },              
              })
            } 
          }).catch((err)=>{
            console.warn(err.response.data);
            
          });
      }else{
        alert('No internet connection');
      }
    });

    
    

  }

  


  // design start here
  return (
    
      <View style={styles.container}>        
        
          {scanned == false ? (        
          <Camera
          onBarCodeScanned={scanned ? undefined : handleQRCodeScanned}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          ratio='16:9'
          style={[StyleSheet.absoluteFillObject,styles.container]}
          >        

          
            <BarcodeMask edgeColor={Colors.color_palette.orange} showAnimatedLine={false}/>                
          
          </Camera>

          ) : (
          <Text> No Access camera</Text>
          )}
      </View>
  
  );
  
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor:Colors.new_color_palette.blue_background
    
  },
  formBody:{
    flex: 1,
    backgroundColor:Colors.new_color_palette.blue_background
  },
  qrForm:{
    flex: 1,
    backgroundColor:Colors.new_color_palette.blue_background,
  },
  confirmButton:{
    backgroundColor:'white',
    color:Colors.new_color_palette.orange,
    borderColor:Colors.new_color_palette.orange,
    borderWidth:1
  },
  confirmButtonText:{  
    color:Colors.new_color_palette.orange,    
  },


});
