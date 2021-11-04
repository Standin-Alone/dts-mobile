import React,{useState,useEffect} from 'react';
import { StyleSheet,Text,View,Pressable } from 'react-native';

import { RootStackScreenProps } from '../../types';
import Images from '../../constants/Images';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import { Formik } from 'formik';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi  } from 'react-native-textinput-effects';
import Button from 'apsl-react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import Timeline from 'react-native-timeline-flatlist';

export default  function  HistoryScreen({ navigation,route }: RootStackScreenProps<'HistoryScreen'>){


  const [isLoading,setLoading] = new useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned]             = useState(false);

  const params = route.params;

  const historyOptions = {
    headerTitle:'Transaction History',
    headerTransparent:true,
    headerTitleStyle:styles.bottomTitle,
    headerTintColor:Colors.new_color_palette.orange,

  };


  useEffect(() => {
    navigation.setOptions(historyOptions);
    
  }, []);


  const handleReceive = async ({ type, data }) => {

    

}
const timeData = [
    {time: '09:00', title:(<View> 
                            <Text style={styles.cardHeader}> <Icon name="user" size={20} color={Colors.color_palette.orange}/> Sender's Name {'\n'}</Text>
                            <Text style={styles.cardHeader}> <Icon name="building" size={20} color={Colors.color_palette.orange}/> Office {'\n'}</Text>
                            <Text style={styles.cardHeader}> <Icon name="wechat" size={20} color={Colors.color_palette.orange}/> Remarks {'\n'}</Text>                             
                        </View>
                        ), description: 'Event 1 Description'},
                        {time: '09:00', title:(<View> 
                            <Text style={styles.cardHeader}> <Icon name="user" size={20} color={Colors.color_palette.orange}/> Sender's Name {'\n'}</Text>
                            <Text style={styles.cardHeader}> <Icon name="building" size={20} color={Colors.color_palette.orange}/> Office {'\n'}</Text>
                            <Text style={styles.cardHeader}> <Icon name="wechat" size={20} color={Colors.color_palette.orange}/> Remarks {'\n'}</Text>                             
                        </View>
                        ), description: 'Event 1 Description'},  {time: '09:00', title:(<View> 
                            <Text style={styles.cardHeader}> <Icon name="user" size={20} color={Colors.color_palette.orange}/> Sender's Name {'\n'}</Text>
                            <Text style={styles.cardHeader}> <Icon name="building" size={20} color={Colors.color_palette.orange}/> Office {'\n'}</Text>
                            <Text style={styles.cardHeader}> <Icon name="wechat" size={20} color={Colors.color_palette.orange}/> Remarks {'\n'}</Text>                             
                        </View>
                        ), description: 'sample'},
    
  ]

  // design start here
  return (
    <View style={styles.container}>        
      <View style={styles.innerContainer}>
      
        



        <Timeline
          data={timeData}
          dotSize={10}
          
          
          showTime={false}
          innerCircle={'dot'}
          style={styles.timeline}
          detailContainerStyle= {styles.cards}
          listViewContainerStyle={{
                paddingTop:20,               
            }}
          
          />

      </View>
      <View style={{flex:1}}>
        <View style={{position:'absolute', left: 0, right: 0, bottom: 0}}>
        </View>        
      </View>
      
    </View>
  );
  
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
        
    padding: 10,
    backgroundColor:Colors.new_color_palette.main_background 
  },
  detailTitle:{
    
    fontSize:18,
    fontWeight:'200',
    color:Colors.new_color_palette.text,      
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
    
    backgroundColor:Colors.new_color_palette.blue_background,  
    width:(Layout.window.width / 100) * 95,
    height:(Layout.window.height / 100) * 80,
    borderRadius:15,
    minHeight: (Layout.window.height / 100) * 80,    
  },
  innerContainer:{
    top:80,    
    width:(Layout.window.width / 100) * 95,
    height:(Layout.window.height / 100) * 86,
    // backgroundColor:'yellow'
  },
  timeline:{
    // backgroundColor:'red',
    top:20,
    width:(Layout.window.width / 100) * 95,
  },
  cardHeader:{
      fontWeight:'bold',
      fontSize:16,
  },
  cards:{
    backgroundColor:Colors.new_color_palette.second_background,
    width:(Layout.window.width / 100) * 80,
    marginBottom:30,
    borderRadius:10,
    paddingLeft:20,
    elevation: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 20,}


});
