import React from 'react';
import {
  AsyncStorage,
  Button,
  StatusBar,
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import * as Icon from '@expo/vector-icons'
import AnimatedLoader from "react-native-animated-loader";
import Customrow from '../constants/Customrow';
import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';

const CustomListview = ({ itemList }) => (
  <View style={styles.container}>
      <FlatList
          data={itemList}
          renderItem={({ item }) => <Customrow
              title={item.title}
              description={item.description}
          />}
      />

  </View>
);

export default class Notification extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
  
    this.state = {
      data:  [{title: '', description: ''}],
      data:  [{title: 'NIM', description: global.Variable.AUTH.nim},
              {title: 'Nama', description: global.Variable.AUTH.nama},
            ],
            
      isLoading:false,
      };
  }

  showLoader = () => {
    this.setState({ isLoading: true });
  };
  hideLoader = () => {
    this.setState({ isLoading: false });
  };
  
  render() {
    return (
      <View style={styles.container}>
      <View style={styles.bodyrow}>

        <View style={styles.containerLogo}>
          <TabBarIcon
            focused={false}
            name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'}
          />
        </View>
        

      </View>
    </View>
    );
  }

  _signOutAsync = async () => {
    //await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:23,
  }, 
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerrow: {
    flex: 1,
    backgroundColor: Colors.defaultBackground,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bodyrow: {
    flex: 9,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    color: "#fff",
    fontSize: 25,
    margin: 10,
  },
  buttonContainer:{
    backgroundColor: Colors.defaultBackground,
    margin: 5,
    padding: 10,
  },
  buttonText:{
    textAlign: 'center',
    color: 'white',
    fontWeight : 'bold',
    fontSize: 18
  },
});