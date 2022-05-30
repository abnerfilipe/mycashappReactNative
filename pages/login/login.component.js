import  { Component } from 'react';
import {TextInput, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import PropTypes from 'prop-types';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { StackActions, NavigationActions } from 'react-navigation';
import API from '../../service/api';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles: s, constants: c } = bootstrapStyleSheet;

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            loading: true,
        }
        // this.handleCreateAccountPress= this.handleCreateAccountPress.bind(this);
    }
    static navigationOptions = {
        header: null,
      };
    
    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
            dispatch: PropTypes.func,
        }).isRequired,
    };
    onChangeUsername = (username) => {
        this.setState({ username: username });
    }
    onChangePassword = (password) => {
        this.setState({ password: password });
    }
    handleCreateAccountPress = () => {
        this.props.navigation.navigate("Criar Nova Conta");
    };
    logarOnSubmit = async () => {
        this.setState({ error: null});
        if (this.state.username.length === 0 || this.state.password.length === 0) {
            this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
          } else {
            try {
                const res =  await API.post('/users/login',{
                    "username": this.state.username,
                    "password": this.state.password,
                })
                console.log(res);
                this.setState({
                    isLoggedIn: true, 
                    userId: res.data.user.id,
                    token: res.data.token,
                });
                this.props.navigation.reset({index: 0, routes: [{name: "MainPage"}]})
            } catch (error) {
                console.log(error);
                this.setState({ error: (error?.response?.data?.message || error?.message) });
            }
          }
    }
    render() {
        return (
        <View style={ style.formSignin }>
            <Text style={ [ s.text,s.textCenter,{fontSize: 20} ] }>My Cash App</Text>
            <View style={[{marginBottom: 10}]}> 
            <Text style={[s.text,s.textCenter,s.mt2]}>Faça seu registro e realize o login com email e senha cadastrado</Text>
            </View>
            <View style={[ s.mb1 ]}>
                        <Text style={ [ s.formLabelText ] } >E-mail</Text>
                        <TextInput 
                            autoComplete="email"  
                            style={[s.formControl, style.formInputEmail]} 
                            onChangeText={ this.onChangeUsername }  
                            autoCapitalize="none"
                            autoCorrect={false}
                        ></TextInput>   
                    </View>
                    <View style={[s.formFloating, s.clearfix ]}>
                        <Text style="{[s.formLabelText]}" >Senha</Text>
                        <TextInput 
                            autoComplete="password" 
                            style={[s.formControl, style.formInputPassword]}  
                            onChangeText={ this.onChangePassword } 
                            autoCapitalize="none"
                            autoCorrect={false}
                        ></TextInput>
                    </View>
                        {this.state.error !== null && <Text style={[s.textDanger,s.textCenter]}>{this.state.error}</Text>}
                        {this.state.success !== null && <Text style={[s.text,s.textCenter]}>{this.state.success}</Text>}
            <TouchableHighlight onPress={this.logarOnSubmit} style={[s.btnTouchable]}>
                <View style={[s.btn, s.btnPrimary,{height: 40}]}>
                    <Text style={[s.btnText, s.btnPrimaryText]}>Login</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.handleCreateAccountPress} style={[s.btnTouchable,s.mt3]}>
                <View style={[s.btn, s.btnSecondary,{height: 40}]}>
                    <Text style={[s.btnText, s.btnPrimaryText]}>Registrar-se</Text>
                </View>
            </TouchableHighlight>
        </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formSignin: {
        "width": "100%",
        "maxWidth": 330,
        "paddingTop": 15,
        "paddingRight": 15,
        "paddingBottom": 15,
        "paddingLeft": 15,
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto"
    },
    formFloating: {
        "zIndex": 2
    },
    formInputEmail: {
        "marginBottom": -1,
        "borderBottomRightRadius": 0,
        "borderBottomLeftRadius": 0,
    },
    formInputPassword: {
        "marginBottom": 10,
        "borderTopLeftRadius": 0,
        "borderTopRightRadius": 0
    }
})
