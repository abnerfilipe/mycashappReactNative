import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Routes from './Routes';
import {Component} from 'react';
import API from './service/api';
import { registerRootComponent } from 'expo';


export default class App extends Component{
    state = {
      username: null,
      password: null,
      userId: null,
      isLoggedIn: false,
      token: null,
      balance: (0).toFixed(2),
      transactions: [],
  } 

  logar = (username, password) =>{
    API.post('/users/login',{
      "username": username,
      "password": password,
    }).then((res)=>{
      this.setState({
        isLoggedIn: true, 
        username: res.data.username,
        password: res.data.password,
        userId: res.data.user.id,
        token: res.data.token,
      });
    }).catch((err)=>{
      alert(err);
      throw new Error(err);
    })

  }
  addTransaction = (transaction) => {
    this.setState({
      transactions: [...this.state.transactions,transaction]
    });
    console.log(transaction.value);
    this.updateBalance(transaction.value);
  }
  updateBalance =() => {
    API.post(`/transaction/user/${this.state.userId}/balance`,{date: new Date()}).then((res)=>{
      const value = res.data.balance;
      console.log(value);
      // const updated = parseFloat(this.state.balance) + parseFloat(value);
      const updated = parseFloat(value);
      this.setState({balance: updated.toFixed(2)})
    }).catch((error)=>{
      alert(error);
    })
  }

  render(){
    return (
      <SafeAreaProvider>
        <Routes 
          logar={this.logar} 
          isLoggedIn={this.state.isLoggedIn}
        />
        <StatusBar />
      </SafeAreaProvider>
      );
  }
}
registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
