import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button,StyleSheet, BackHandler,Text,Image,View,TouchableOpacity,TextInput,Clipboard,ScrollView} from 'react-native';
//imporoting for Stack Navigator
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

//creating navigation
var toi=''
var k=''
var rt=''
const Stack=createStackNavigator();
var encrypt_flag=0;
function crypt(flag,text,key)
{
  var init=0;
  var output='';
  key=parseInt(key);
  for (var i=0; i<text.length;i++)
  {
    init=text.charCodeAt(i);
    if (flag==1)
    {
      init=init+key;
    }
    else if(flag==0)
    {
      init=init-key;
    }
    output=output+String.fromCharCode(init);
  }
  rt=output;
  Clipboard.setString(rt)
  console.log(output)
}

const results=({navigation})=>{
  alert('Ouput Text copied')
  return(
    <ScrollView style={{backgroundColor:'#000',flex:1}}>
      <View style={{backgroundColor:'#000',flex:1}}>
      <Image source={require('./assets/logo.png')} style={{width: 250, height: 250, borderRadius: 50/2,marginLeft:'auto',marginRight:'auto'}}/>
        <Text style={{color:'#0f0',borderWidth:1,borderColor:'#fff',width:350, height:200}}>{rt}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Main Menu')} style={{marginLeft:'auto',marginRight:'auto',alignItems: 'center',color: "transparent",  borderBottomColor: '#fff',borderWidth:1,borderRadius: 20,width: 100,height: 50}}>
            <Text style={body_styles.text_container}>Proceed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>BackHandler.exitApp()} style={{marginLeft:'auto',marginRight:'auto',alignItems: 'center',color: "transparent",  borderBottomColor: '#fff',borderWidth:1,borderRadius: 20,width: 100,height: 50}}>
            <Text style={body_styles.N_text_container}>Quit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const encryption=({navigation})=>{
  console.log(encrypt_flag)
  return(
    <ScrollView style={{backgroundColor:'#000',flex:1}}>
      <View style={{backgroundColor:'#000',flex:1}}>
        <TextInput style={{color:'#fff',width:300,height:350,borderWidth:1,borderColor:'#fff',marginTop:30,marginLeft:30,borderRadius:20,textAlign: 'center'}} placeholder='Text of Interest' placeholderTextColor="#fff" multiline={true} onChangeText={(text)=>toi=text}/>
        <TextInput style={{color:'#fff',width:100,height:50,borderWidth:1,borderColor:'#fff',marginTop:30,marginLeft:30,borderRadius:10,textAlign: 'center'}} placeholder=' Key' placeholderTextColor="#fff" multiline={true} onChangeText={(text)=>k=text}/>
        <TouchableOpacity onPress={()=>{crypt(encrypt_flag,toi,k);navigation.navigate('Results')}} style={{marginTop:30,marginLeft:30,alignItems: 'center',color: "transparent",borderBottomColor: '#0f0',borderWidth:1,borderRadius: 20,width: 100,height: 50,}}>
            <Text style={body_styles.text_container}>Crypt it!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const main_menu1=({navigation})=>
{

return(

  <View style={body_styles.container}>
  <View style={{marginleft:0,width:400,height:0,backgroundColor:'#000',marginRight:25,marginLeft:50}}>
    <Image source={require('./assets/logo.png')} style={{width: 150, height: 180, borderRadius: 50/2}}/>
    </View>
    <StatusBar style="auto" />
    <TouchableOpacity onPress={()=>{encrypt_flag=1; navigation.navigate('Encrypt/Decrypt')}} style={body_styles.Button_container_1}>
        <Text style={body_styles.text_container}>Encrypt</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>{encrypt_flag=0; navigation.navigate('Encrypt/Decrypt')}} style={body_styles.Button_container_1}>
        <Text style={body_styles.text_container}>Decrypt</Text>
    </TouchableOpacity>
  </View>
);
}

const main_menu=({navigation})=>{

  return(
    <View style={body_styles.container}>
      <Image source={require('./assets/logo.png')} style={{width: 250, height: 350, borderRadius: 50/2}}/>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={()=>navigation.navigate('Main Menu')} style={body_styles.Button_container}>
          <Text style={body_styles.text_container}>Proceed</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>BackHandler.exitApp()} style={body_styles.Button_container}>
          <Text style={body_styles.N_text_container}>Quit</Text>
      </TouchableOpacity>
    </View>
  );
}
export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Crypter' component={main_menu} />
        <Stack.Screen name='Main Menu' component={main_menu1} />
        <Stack.Screen name='Encrypt/Decrypt' component={encryption} />
        <Stack.Screen name='Results' component={results} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const body_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button_container:{
    marginTop:10,
    alignItems: 'center',
    color: "transparent",
    borderBottomColor: '#fff',
    borderWidth:1,
    borderRadius: 20,
    width: 100,
    height: 50,

  },
  Button_container_1:{
    marginTop:30,
    marginLeft:150,
    alignItems: 'center',
    color: "transparent",
    borderBottomColor: '#fff',
    borderWidth:1,
    borderRadius: 20,
    width: 100,
    height: 50,

  },
  text_container:{
    alignItems:'center',
    top: 10,
    color:'#0f0'
  },
  N_text_container:{
    alignItems:'center',
    top: 10,
    color:'#f00'
  },
});
