import React from 'react';
import { Text, Image, TouchableWithoutFeedback,
    Button, StatusBar, TextInput,
    AsyncStorage, SafeAreaView, Keyboard,
    View, TouchableOpacity, KeyboardAvoidingView, ImageBackground,
    StyleSheet, position, Alert, ActivityIndicator, PermissionsAndroid
} from 'react-native';
import FormData from 'FormData';
import { createStackNavigator } from 'react-navigation';
import AnimatedLoader from "react-native-animated-loader";


export default class SignInScreen extends React.Component {
    static navigationOptions = {
      title: 'Education Mobile',
    };

    constructor(props){
      super(props);
      console.disableYellowBox = true; 

      this.state={
          isLoading:false,
          dataSource: 'default',
          DeviceIMEI: '',
          userid: '1401001',
          password: '03081996',
      }
    }

    showLoader = () => {
      this.setState({ isLoading: true });
    };
    hideLoader = () => {
      this.setState({ isLoading: false });
    };
  
    _signInAsync = async () => {
      this.showLoader();
      let formData = new FormData();
      formData.append('username', this.state.userid);
      formData.append('password', this.state.password);
      formData.append('action', 'login');

      let data = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'SECRETKEY': global.Variable.SECRET_KEY,
              'Content-Type': 'multipart/form-data',
              'X-Requested-With': 'XMLHttpRequest',
          },
          body: formData
      }
      try {
          const response = await fetch(global.Variable.LINK_WS, data);
          const responseJSON = await response.json();
          this.setState({
              //isLoading: false,
              dataSource: responseJSON,
          });
          //await AsyncStorage.setItem('access_token', responseJSON.access_token);
          if(responseJSON.message == "Success"){
            global.Variable.AUTH = responseJSON.data;
            this.props.navigation.navigate('Main');
          }else{
            Alert.alert(responseJSON.message);
          }
          this.hideLoader();
      }
      catch (error) {
          console.log(error);
          this.hideLoader();
          Alert.alert(error.toString());
      }
    }

    checkMultiPermissions = async () => {
      const { Permissions } = Expo;
      const { status, expires, permissions } = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
      }else{
        (async () => {
          await this._signInAsync();
        })();
      }
    }

    render() {
      if(this.state.isLoading){
        return (
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
              <ImageBackground source={require('../images/background.jpeg')} style={styles.backgroundImage} >
              <View style={styles.container}>
                <View style={styles.logoContainer}>
                  <Image style={styles.logo} source={require('../images/appicon.gif')}/>
                  <Text style={styles.title}>Education Mobile</Text>       
                  <Text style={styles.title2}>Supported by Bank Mandiri</Text>             
                </View>
                <AnimatedLoader
                  visible={true}
                  overlayColor="rgba(255,255,255,0.75)"
                  source={require("../constants/Loader.json")}
                  animationStyle={styles.lottie}
                  speed={1}
                />
              </View>
              </ImageBackground>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

          </SafeAreaView>
        );
      }else{
        return (
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <ImageBackground source={require('../images/background.jpeg')} style={styles.backgroundImage} >
              <View style={styles.container}>
                <View style={styles.logoContainer}>
                  <Image style={styles.logo} source={require('../images/appicon.gif')}/>
                  <Text style={styles.title}>Education Mobile</Text>       
                  <Text style={styles.title2}>Supported by Bank Mandiri</Text>         
                </View>

                <View style={styles.infoContainer}>
                    <TextInput style={styles.input} 
                        placeholder="Userid"
                        placeholderTextColor='black'
                        keyboardType='number-pad'
                        returnKeyType='next'
                        autoCorrect={false}
                        onSubmitEditing={()=> this.refs.txtPassword.focus()}
                        onChangeText={userid => this.setState({userid})}
                        >{this.state.userid}</TextInput>

                    <TextInput style={styles.input} 
                        placeholder="Password"
                        placeholderTextColor='black'
                        keyboardType='default'
                        secureTextEntry={true}
                        autoCorrect={false}
                        ref={"txtPassword"}
                        onChangeText={password => this.setState({password})}
                        >{this.state.password}</TextInput>    

                    <TouchableOpacity style={styles.buttonContainer} onPress={this._signInAsync} >
                      <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
              </View>
              </ImageBackground>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

          </SafeAreaView>
        );
      }
    }
  
  }

  
const AuthStack = createStackNavigator({ SignIn: SignInScreen });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  logoContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
  logo:{
    width:256,
    height:112,
    resizeMode: 'contain'
  },
  title:{
    color: '#f7c744',
    fontSize: 26,
    textAlign: 'center',
    shadowColor: '#f00',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  title2:{
    color: '#459EDA',
    fontSize: 12,
    textAlign: 'center',
    shadowColor: '#f00',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoContainer:{
    position: 'absolute',
    left:0,
    right:0,
    bottom:0,
    height:160,
    padding:20,
  },
  input:{
    height:30,
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal : 10,
    marginBottom: 10,
    borderColor: '#000',
    borderWidth: 1,
    shadowColor: '#f00',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonContainer:{
    backgroundColor: '#459EDA',
    paddingVertical: 15,
    shadowColor: '#f00',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText:{
    textAlign: 'center',
    color: 'white',
    fontWeight : 'bold',
    fontSize: 18
  },
  lottie: {
    width: 200,
    height: 200
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: null,
    height: null,
  }
});