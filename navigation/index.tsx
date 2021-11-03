/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { Root, Popup } from 'react-native-popup-confirm-toast';

import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import SplashScreenContainer from '../screens/SplashScreenContainer';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';




// tranaction screens
import QRCodeScreen from '../screens/transactions/QRCodeScreen';
import ReceiveForm from '../screens/transactions/ReceiveForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">      
      <Stack.Screen name="SplashScreenContainer" component={SplashScreenContainer} options={{headerShown:false}}/>
      <Stack.Screen name="OTPScreen" component={OTPScreen} options={{headerShown:false}}/>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="QRCodeScreen" component={QRCodeScreen} options = {{headerTitle:'Scan Route Slip QR Code'}}/>
      <Stack.Screen name="ReceiveForm" component={ReceiveForm}/>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      
      initialRouteName="TabOne"
      
      screenOptions={{
        keyboardHidesTabBar: true,
        tabBarActiveTintColor: Colors.color_palette.orange,
        position:'absolute'
        
        
        
              
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={HomeScreen}
        
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({

          
          title: 'My Documents',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color}/>,
          tabBarActiveTintColor: Colors.color_palette.orange,
          tabBarInactiveTintColor:Colors.dark.background,
          headerTransparent:true,
          headerTitleStyle:styles.homeTitle,
          headerRight: () => (
            
            <Pressable
              onPress={ async () => {
                    // AsyncStorage.clear();
                    // navigation.replace('SplashScreenContainer');


                    Popup.show({
                      type: 'confirm',
                      title: 'Warning',
                      textBody: 'Do you want to sign out?',
                      
                      buttonText: 'Sign Out',
                      confirmText:'Cancel',
                      callback: () => Popup.hide(),
                      okButtonStyle:styles.confirmButton,
                      okButtonTextStyle: styles.confirmButtonText
                    
                    })



                    
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="sign-out"
                size={25}
                color={Colors.color_palette.orange}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })
      }
        

       
      />
      <BottomTab.Screen
        name="TabTwo"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color}  />,
          tabBarActiveTintColor: Colors.color_palette.orange,
          tabBarInactiveTintColor:Colors.dark.background
          
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}


const styles = StyleSheet.create({
confirmButton:{
  backgroundColor:'white',
  color:Colors.new_color_palette.orange,
  borderColor:Colors.new_color_palette.orange,
  borderWidth:1
},
confirmButtonText:{  
  color:Colors.new_color_palette.orange,
  
  
},
homeTitle:{
  color:Colors.new_color_palette.orange,
  fontSize:20,
}

});