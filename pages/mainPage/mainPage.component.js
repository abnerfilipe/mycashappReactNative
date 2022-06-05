import PropTypes from 'prop-types';
import { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../../service/api';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles: s, constants: c } = bootstrapStyleSheet;

export default class MainPage extends Component{
    constructor(props) {
        super(props);
        const { route } = this.props;
        this.state = {
            error: null,
            userId: route.params?.userId,
            isLoggedIn: route.params?.isLoggedIn,
            token: route.params?.token,
            balance: (0).toFixed(2)
        }
        if(this.state.userId == null || this.state.userId == undefined){
          this.goToLogin(); 
        }
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
    componentDidMount(){
        this.updateBalance();
    }
    updateBalance = async () =>{
        if(this.state.userId !=null){
            try {
                 const res = await API.post(`/transaction/user/${this.state.userId}/balance`,{date: new Date()})
                 const value = res.data.balance;
                 console.log(res);
                 // const updated = parseFloat(this.state.balance) + parseFloat(value);
                 const updated = parseFloat(value);
                 this.setState({balance: updated.toFixed(2)})
            } catch (error) {
                 console .log(error);
                 this.setState({ error: (error?.response?.data?.message || error?.message) });
            }
             
         
        }
    }
    goTo(page){
        this.props.navigation.navigate(page,
            {
                userId: this.state.userId, 
                token: this.state.token,
            });
    }
    goToLogin = () => {
        this.setState({userId: null,token: null});
        this.props.navigation.reset({index: 0, routes: [{name: "Login"}]})
    }
    render() {
        return (
            <View style={[s.row, s.justifyContentCenter]}>
                <View style={[ s.col12]}  >
                    <View style={[s.row, s.my5]}>
                        <Text style={[s.h1, s.textCenter, s.mr2]}>Saldo: R${this.state.balance}</Text>
                        <Icon.Button size={25} color="green" name="refresh" backgroundColor={'transparent'} onPress={()=> this.updateBalance()}/>
                        {this.state.error !== null && <Text style={[s.textDanger,s.textCenter]}>{this.state.error}</Text>}
                    </View>
                </View>
                <View style={[ s.w80]}  >
                    <TouchableHighlight onPress={()=> this.goTo('EnviarPagamento')} style={[s.btnTouchable,s.mt3]}>
                        <View style={[s.btn, s.btnSecondary,{height: 40}]}>
                            <Text style={[s.btnText, s.btnPrimaryText]}>Enviar Pagamento</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> this.goTo("ReceberPagamento")} style={[s.btnTouchable,s.mt3]}>
                        <View style={[s.btn, s.btnSecondary,{height: 40}]}>
                            <Text style={[s.btnText, s.btnPrimaryText]}>Receber Pagamento</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> this.goTo("Transacoes")} style={[s.btnTouchable,s.mt3]}>
                        <View style={[s.btn, s.btnSecondary,{height: 40}]}>
                            <Text style={[s.btnText, s.btnPrimaryText]}>Transações</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={()=> this.goToLogin()} style={[s.btnTouchable,s.mt3]}>
                        <View style={[s.btn, s.btnDanger,{height: 40}]}>
                            <Text style={[s.btnText, s.btnPrimaryText]}>Sair</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
