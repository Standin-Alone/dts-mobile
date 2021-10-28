import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

const actions = [
  {
    text: "Scan QR Code",
    icon: <Icon name="qrcode" size={20}/>,
    name: "qr_code_screen",
    buttonSize:50, 
    color:Colors.color_palette.orange,
    position: 1,
    

  },
];


export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
        <FloatingAction
            actions={actions}
            color={Colors.color_palette.orange}
            
            onPressItem={name => {
              if(name == 'qr_code_screen'){
                navigation.push('QRCodeScreen');
              }
            }}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
