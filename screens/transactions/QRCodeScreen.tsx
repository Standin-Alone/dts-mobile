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
import { Camera } from 'expo-camera';
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from 'react-native-barcode-mask';
import {
  useNavigation,
  useNavigationState,
  useIsFocused,
} from "@react-navigation/native";

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

    // alert(data);
    navigation.replace('ReceiptForm');
    

  }

  


  // design start here
  return (
    <View style={styles.container}>        
      
        {scanned == false ? (        
        <Camera
        onBarCodeScanned={scanned ? handleQRCodeScanned : handleQRCodeScanned}
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
    backgroundColor:Colors.color_palette.base
    
  },
  formBody:{
    flex: 1,
    backgroundColor:Colors.color_palette.base
  },
  qrForm:{
    flex: 1,
  },
  


});