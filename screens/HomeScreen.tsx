import * as React from 'react';
import { StyleSheet,ScrollView,KeyboardAvoidingView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { Root, Popup } from 'react-native-popup-confirm-toast';
import { Fumi  } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <Root>
    <KeyboardAvoidingView style={styles.container}>
    
    <Fumi
        label={'Search by tracking number'}
        iconClass={FontAwesomeIcon}
        iconName={'search'}
        iconColor={Colors.new_color_palette.orange}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        style={styles.searchTextInput}                 
        keyboardType="email-address"
      />

    <View style={{flex:1}}>
      <View style={{position:'absolute', left: 0, right: 0, bottom: 0}}>
      <ScrollView style = {styles.documentsContainer}>


      </ScrollView>
      </View>
    </View>




    <FloatingAction
        showBackground={false}
        dismissKeyboardOnPress={true}
        color={Colors.color_palette.orange}
        floatingIcon={<Icon name="qrcode" size={20} color={Colors.light.background}/>}
        onPressMain= {()=>{
          navigation.push('QRCodeScreen');
        }}
      />      
    </KeyboardAvoidingView>
 
  </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:Colors.new_color_palette.blue_background
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  documentsContainer:{
    top:110,
    width:(Layout.window.width / 100) * 99,
    height:(Layout.window.height / 100) * 86,
    right:195,        
    borderTopLeftRadius:35,
    borderTopRightRadius:35,
    backgroundColor:Colors.new_color_palette.main_background,
    
    
  },
  searchTextInput:{
    top:100,
    borderRadius:40,
    width:(Layout.window.width / 100) * 80,
    position:'absolute'
  }
});
