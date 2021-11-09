import React,{useState,useEffect} from 'react';
import { StyleSheet,Text,View,Pressable,RefreshControl} from 'react-native';

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
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import * as ipConfig from '../../ipconfig';
export default  function  HistoryScreen({ navigation,route }: RootStackScreenProps<'HistoryScreen'>){


  const [isLoading,setLoading] = new useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [refreshing, setRefreshing]             = useState(false);
  const [history, setHistory]             = useState([]);

  const params = route.params;

  const historyOptions = {
    headerTitle:'Document History',
    headerTransparent:true,
    headerTitleStyle:styles.bottomTitle,
    headerTintColor:Colors.new_color_palette.orange,

  };

  const get_history = () =>{

    let document_number =  params.document_info[0].document_number;
   

    
      axios.get(ipConfig.ipAddress+'MobileApp/Mobile/get_history/'+document_number).then((response)=>{        
        let history_data = [];


        setHistory(response.data['history'])
        setRefreshing(false);
      }).catch((error)=>{
        console.warn(error.response.data);
      });
 

  }

  useEffect(() => {
    navigation.setOptions(historyOptions);
    get_history()
    
  }, []);



  const onEndReached = ()=>{
    //fetch next data
  }
  
  const renderFooter = ()=>{

  }

  
  const render = (rowData)=>{


    return (<View style={{flex:1}}>
              <Text style={styles.cardHeader}> <Icon name="user" size={10} color={Colors.color_palette.orange}/> {rowData.transacting_user_fullname} {'\n'}</Text>
              <Text style={styles.cardHeader}> <Icon name="building" size={10} color={Colors.color_palette.orange}/> {rowData.INFO_SERVICE} {'\n'} {rowData.INFO_DIVISION} {'\n'}</Text>
              <Text style={styles.cardHeader}> <Icon name="wechat" size={10} color={Colors.color_palette.orange}/> {rowData.remarks} {'\n'}</Text>      
              <Text style={styles.cardHeader}> <Icon name="superpowers" size={10} color={Colors.color_palette.orange}/> {rowData.type} {'\n'}</Text>      
            </View>);
  }
  // design start here
  return (
    <View style={styles.container}>        
      <View style={styles.innerContainer}>
      
        



        <Timeline
          data={history}
          dotSize={10}
          
          options={{
            refreshControl: (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={get_history}
              />
            ),
            renderFooter: renderFooter,
            onEndReached: onEndReached
       
          }}

          renderDetail = {render}
          showTime={true}
          innerCircle={'dot'}
          style={styles.timeline}
          detailContainerStyle= {styles.cards}
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          listViewContainerStyle={{
            paddingTop:20
          }}

          timeStyle = {styles.time}
          
          />

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
      fontSize:10,
      color:Colors.new_color_palette.text
  },
  cards:{
    backgroundColor:Colors.new_color_palette.second_background,
    width:(Layout.window.width / 100) * 60,
    marginBottom:30,
    borderRadius:10,
    paddingLeft:20,
    elevation: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 20,
},

time:{
  fontSize:10,
  width:90,
  
  textAlign:'center',
  backgroundColor:Colors.new_color_palette.yellow,
   color:'white', 
   padding: 7, 
   borderRadius:13
}

});
