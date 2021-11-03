import React,{useState,useEffect} from 'react';
import { StyleSheet, TouchableOpacity,Image,TextInput,Text,View  } from 'react-native';

import { RootStackScreenProps } from '../../types';
import Images from '../../constants/Images';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { Formik } from 'formik';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi  } from 'react-native-textinput-effects';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';


export default  function  ReceiveForm({ navigation,route }: RootStackScreenProps<'ReceiveForm'>){


  const [isLoading,setLoading] = new useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned]             = useState(false);

  const params = route.params;

  useEffect(() => {
    navigation.setOptions({title: 'Receive Document'});
  }, []);


  const handleReceive = async ({ type, data }) => {

    

}

  // design start here
  return (
    <View style={styles.container}>        
      <View>
        <Text style={styles.docuInfo}> <Icon name="file" size={20} color={Colors.color_palette.orange}/>   Document Information</Text>
      </View>
        {params.document_info && params.document_info.map((item)=>


        <View style={styles.infoCard}>
         
          <View>
            <Text style={styles.detailTitle}>Tracking Number:</Text>
          </View>
          <View  style={styles.titleView}>
            {/* <Text style={styles.detailValue}>DA-CO-IAS-MO20211025-00001</Text> */}
            <Text style={styles.detailValue}>{item.document_number}</Text>
          </View>

          <View>
            <Text style={styles.detailTitle}>Title:</Text>
          </View>
          <View style={styles.titleView}>
            {/* <Text style={styles.titleValue}>RFFA-IMC-On-Boarding-File-Structure </Text> */}
            <Text style={styles.titleValue}>{item.subject} </Text>
          </View>


          <View >
            <Text style={styles.detailTitle}>From:</Text>
          </View>
          <View style={styles.titleView}>
            {/* <Text style={styles.titleValue}>ICTS SysAdd</Text> */}
            <Text style={styles.titleValue}>{item.INFO_DIVISION}{'\n'}{item.INFO_SERVICE}</Text>
          </View>


          <View >
            <Text style={styles.detailTitle}>Remarks:</Text>
          </View>
          <View style={styles.titleView}>
            <Text style={styles.titleValue}>None</Text>
          </View>      

        </View>
       )}

      <View style={{flex:1}}>
        <View style={{position:'absolute', left: 0, right: 0, bottom: 0}}>
        <Button  
          textStyle={styles.saveText} 
          style={styles.saveButton} 
          activityIndicatorColor={Colors.light.background}
          activeOpacity={100}
          isLoading={isLoading}
          disabledStyle={{opacity:1}}
          onPress ={()=>{setLoading(false)}}
          >
            Receive
        </Button>
        </View>        
      </View>
    </View>
  );
  
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor:Colors.new_color_palette.main_background  
  },
  detailTitle:{
    
    fontSize:18,
    fontWeight:'200',
    color:Colors.fade,      
    padding:20,
    top:5,
  },
  docuInfo:{
    
    fontSize:18,
    fontWeight:'200',
    color:Colors.new_color_palette.orange,      
  },
  detailValue:{
    
    fontSize:20,
    fontWeight:'bold',
    color:Colors.new_color_palette.orange,    
    left:20,  
    width:(Layout.window.width / 100) * 80
  },
  saveButton:{
    borderColor:Colors.new_color_palette.orange,
    backgroundColor:Colors.new_color_palette.orange
  },
  saveText:{
    fontWeight:'bold',
    color:Colors.light.background,
  },  
  titleValue:{
    
    fontSize:18,
    fontWeight:'200',
    color:Colors.new_color_palette.orange,    
    left:20,   
    width:(Layout.window.width / 100) * 80
  
  },
  titleView:{
    width:(Layout.window.width / 100) * 30
  },
  infoCard:{
    top:20,
    backgroundColor:'white',
    width:(Layout.window.width / 100) * 90,
    height:(Layout.window.height / 100) * 50,
    borderRadius:15,
    minHeight: (Layout.window.height / 100) * 72,    
  }




});
