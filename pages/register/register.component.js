import { Component } from 'react';
import {TextInput, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import PropTypes from 'prop-types';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import api from '../../service/api';
import { StackActions, NavigationActions } from 'react-navigation';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles: s, constants: c } = bootstrapStyleSheet;

export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            error: null,
            success: null,
            registrado: false,
        }
    }   
    static navigationOptions = {
        header: null,
    };
    static propTypes = {
        navigation: PropTypes.shape({
          navigate: PropTypes.func,
          dispatch: PropTypes.func,
          goBack: PropTypes.func,
        }).isRequired,
    };
    onChangeUsername = (username) =>{
        this.setState({username: username,error: null});
    }
    onChangePassword = (password) =>{
        this.setState({password: password,error: null});
    }
    registrarOnSubmit = async() =>{
        if (
            this.state.username == null ||
            this.state.password == null
        ) {
            this.setState({ error: 'Preencha todos os campos para continuar!' });
        } else {   
            try {
                const body = { username: this.state.username,password: this.state.password};
                await api.post('/users/register', body);
    
                this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: null });
                setTimeout(this.goToLogin(),3000);
            } catch (error) {
                console.log(error);
                this.setState({ error: (error?.response.data.message || error.message) });
            }     
        }
    }

    goToLogin = () => {
        this.props.navigation.navigate("Login");
    }

    render() {
        return (
            <View  style={ style.formSignin }>
                <View >
                    <Text  style={[s.h2,s.textCenter]}>Crie Sua Conta </Text>
                    <View style={[ s.mb1 ]}>
                        <Text style={ [ s.formLabelText ] } >E-mail</Text>
                        <TextInput 
                            autoComplete='email'  
                            style={[s.formControl, style.formInputEmail]} 
                            onChangeText={ this.onChangeUsername }  
                            autoCapitalize="none"
                            autoCorrect={false}
                        ></TextInput>   
                    </View>
                    <View style={[s.formFloating, s.clearfix, {marginBottom: 20} ]}>
                        <Text style="{[s.formLabelText]}" >Senha</Text>
                        <TextInput 
                            autoComplete="password" 
                            style={[s.formControl, style.formInputPassword]}  
                            onChangeText={ this.onChangePassword } 
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                        ></TextInput>
                    </View>
                        {this.state.error !== null && <Text style={[s.textDanger,s.textCenter]}>{this.state.error}</Text>}
                        {this.state.success !== null && <Text style={[s.text,s.textCenter]}>{this.state.success}</Text>}
                    <TouchableHighlight onPress={this.registrarOnSubmit} style={[s.btnTouchable]}>
                        <View style={[s.btn, s.btnPrimary,{height: 40}]}>
                            <Text style={[s.btnText, s.btnPrimaryText]}>Criar Conta</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.goToLogin} style={[s.btnTouchable,s.mt4]}>
                        <View style={[s.btn, s.btnSecondary,{height: 40}]}>
                            <Text style={[s.btnText, s.btnPrimaryText]}>Voltar ao Login</Text>
                        </View>
                    </TouchableHighlight>
                </View>
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


