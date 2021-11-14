import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable,ScrollView} from 'react-native';

import { RootStackScreenProps } from '../../types';
import Images from '../../constants/Images';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import { Root, Popup } from 'react-native-popup-confirm-toast';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import * as ipConfig from '../../ipconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';


export default function ReleaseForm({ navigation, route }: RootStackScreenProps<'ReleaseForm'>) {


  const [isLoading, setLoading] = new useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const params = route.params;


  const get_recipients = () => {

    axios.get(ipConfig.ipAddress + 'MobileApp/Mobile/get_offices').then((response) => {

      setRecipients(response.data['offices'])


    });

    
  }



  const receiveFormOptions = {
    headerTitle: 'Receive Document',
    headerTransparent: true,
    headerTitleStyle: styles.bottomTitle,
    headerTintColor: Colors.new_color_palette.orange,
    headerRight: () => (

      <Pressable
        onPress={async () => {
          navigation.navigate('HistoryScreen', { document_info: params.document_info });
        }}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}>
        <FontAwesome
          name="history"
          size={25}
          color={Colors.color_palette.orange}
          style={{ marginRight: 15 }}
        />
      </Pressable>
    ),

  };
  useEffect(() => {
    navigation.setOptions(receiveFormOptions);
    get_recipients()

    
  }, []);


  // handle release button
  const handleRelease = async () => {
    console.warn(selectedRecipients);
    if (selectedRecipients.length != 0 ) {
      // show confirmation before receive the document
      Popup.show({
        type: 'confirm',
        title: 'Confirmation',
        textBody: 'Are you sure you want to release this document?',
        buttonText: 'Confirm',
        confirmText: 'Cancel',
        okButtonStyle: styles.confirmButton,
        okButtonTextStyle: styles.confirmButtonText,
        callback: () => {

          NetInfo.fetch().then(async (response) => {
            let data = {
              document_number: params.document_info[0].document_number,
              office_code: await AsyncStorage.getItem('office_code'),
              user_id: await AsyncStorage.getItem('user_id'),
              full_name: await AsyncStorage.getItem('full_name'),
              info_division: await AsyncStorage.getItem('division'),
              info_service: await AsyncStorage.getItem('service'),
              recipients_office_code : selectedRecipients
            }

            if (response.isConnected) {
              // perform axios here
              axios.post(ipConfig.ipAddress + 'MobileApp/Mobile/release_document', data).then((response) => {

                if (response.data['Message'] == 'true') {


                  Popup.show({
                    type: 'success',
                    title: 'Success!',
                    textBody: 'Successfully released the document',
                    buttonText: 'Go back to My Documents.',
                    okButtonStyle: styles.confirmButton,
                    okButtonTextStyle: styles.confirmButtonText,
                    modalContainerStyle: styles.confirmModal,
                    callback: () => {
                      Popup.hide()
                      navigation.replace('Root');
                    },
                  })


                } else {
                  console.warn(response.data);
                  Popup.show({
                    type: 'danger',
                    title: 'Error!',
                    textBody: 'Sorry you are not valid to release this document.',
                    buttonText: 'I understand',
                    okButtonStyle: styles.confirmButton,
                    okButtonTextStyle: styles.confirmButtonText,
                    modalContainerStyle: styles.confirmModal,
                    callback: () => {
                      Popup.hide()
                    },
                  })
                }
              }).catch((err) => {
                console.warn(err.response.data)
                Popup.hide()
              })

            } else {

              Popup.show({
                type: 'danger',
                title: 'Error!',
                textBody: 'No Internet Connection. Please try again. ',
                confirmText: 'I understand',
                okButtonStyle: styles.confirmButton,
                okButtonTextStyle: styles.confirmButtonText,
                modalContainerStyle: styles.confirmModal,
                callback: () => {

                  Popup.hide()
                },
              })


            }
          });




        },

        modalContainerStyle: styles.confirmModal

      })
    }else{

      Popup.show({
        type: 'danger',
        title: 'Error!',
        textBody: 'Select recipients first.',
        confirmText: 'I understand',
        okButtonStyle: styles.confirmButton,
        okButtonTextStyle: styles.confirmButtonText,
        modalContainerStyle: styles.confirmModal,
        callback: () => {

          Popup.hide()
        },
      })

    }


  }


  const handleSelectedChange = (value) => {
    console.warn(value)
    setSelectedRecipients(value)
  }



  // validation function 
  const validation = Yup.object({
    recipient_office_code: Yup.string().required("Please select"),


  });


  const multiSelectStyle = {scrollView:{height:20},
                            chipContainer:{left:15,width:(Layout.window.width / 100) * 85},
                            chipsWrapper:{top:30,height:1000},                            
                            button:{backgroundColor:Colors.new_color_palette.yellow},                      
                            selectToggle:{width: (Layout.window.width / 100) * 85,left:20,borderWidth:1,borderColor:Colors.new_color_palette.orange}
                            
                          }     
  // design start here
  return (

    <View style={styles.container}>


      <Formik
        initialValues={{ recipients_office_code: [] }}
        validationSchema={validation}
        onSubmit={(values) => handleRelease(values)}
      // validateOnChange={false}           
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit, setFieldValue }) => (
          <View style={styles.innerContainer}>
            <View>
              <Text style={styles.docuInfo}> <Icon name="file" size={20} color={Colors.color_palette.orange} />   Document Information</Text>
            </View>
         {params.document_info && params.document_info.map((item)=>(

            <ScrollView style={styles.infoCard}>

              <View>
                <Text style={styles.detailTitle}>Document Number:</Text>
              </View>
              <View style={styles.titleView}>
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
                <Text style={styles.titleValue}>{item.remarks}</Text>
              </View>


              <ScrollView style={styles.recipient_office_select}>
                <SectionedMultiSelect
                  items={recipients}
                  IconRenderer={MaterialIcons}
                  uniqueKey="id"
                  subKey="children"
                  selectText="Select recipients..."
                  showDropDowns={true}
                  readOnlyHeadings={true}
                  onSelectedItemsChange={setSelectedRecipients}
                  selectedItems={selectedRecipients}
                  highlightChildren={true}
                  styles={multiSelectStyle}
                  
                />
              </ScrollView>
              
              

        
            {/*release button */}
     


            </ScrollView>
         ))} 


                <View style={{ flex: 1 }}>
              <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top:(Layout.window.height / 100) * 3  }}>
                <Button
                  textStyle={styles.saveText}
                  style={styles.saveButton}
                  activityIndicatorColor={Colors.light.background}
                  activeOpacity={100}
                  isLoading={isLoading}
                  disabledStyle={{ opacity: 1 }}
                  onPress={handleRelease}
                >
                  Release Document
                </Button>
              </View>
              </View>

          </View>


        )}
      </Formik>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
    backgroundColor: Colors.new_color_palette.blue_background
  },
  detailTitle: {

    fontSize: 18,
    fontWeight: '200',
    color: Colors.new_color_palette.text,
    padding: 20,
    top: 5,
  },
  docuInfo: {

    fontSize: 18,
    fontWeight: '200',
    color: Colors.new_color_palette.orange,
  },
  detailValue: {

    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.new_color_palette.orange,
    left: 20,
    width: (Layout.window.width / 100) * 80
  },
  saveButton: {
    borderColor: Colors.new_color_palette.orange,
    backgroundColor: Colors.new_color_palette.orange
  },
  saveText: {
    fontWeight: 'bold',
    color: Colors.light.background,
  },
  titleValue: {

    fontSize: 18,
    fontWeight: '200',
    color: Colors.new_color_palette.orange,
    left: 20,
    width: (Layout.window.width / 100) * 80

  },
  titleView: {
    width: (Layout.window.width / 100) * 30
  },
  infoCard: {
    top: 20,
    backgroundColor: Colors.new_color_palette.main_background,

    width: (Layout.window.width / 100) * 95,
    height: (Layout.window.height / 100) * 75,
    borderRadius: 15,
    minHeight: (Layout.window.height / 100) * 72,
    overflow:'hidden',
    paddingBottom:100
  },
  innerContainer: {
    top: 100,
    
  },
  bottomTitle: {
    color: Colors.new_color_palette.orange,
    fontSize: 20,
    
  },
  confirmButton: {
    backgroundColor: 'white',
    color: Colors.new_color_palette.orange,
    borderColor: Colors.new_color_palette.orange,
    borderWidth: 1
  },
  confirmButtonText: {
    color: Colors.new_color_palette.orange,
  },
  confirmModal: {
    
  },
  recipient_office_select:{
    top:30,
    height: (Layout.window.height / 100) * 75,
   
    
    
  }


});
