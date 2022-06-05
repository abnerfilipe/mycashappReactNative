import  { Component } from 'react';
import {TextInput, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import PropTypes from 'prop-types';
import API from '../../service/api';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { useRoute } from '@react-navigation/native';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles: s, constants: c } = bootstrapStyleSheet;



export default class PaymentReceive extends Component{
    constructor(props) {
        super(props);
        const { route } = this.props;

        this.state = {
            userId: route.params?.userId,
            token: route.params?.token,
            value: 0,
            sended: false,
            error: null,
            description: null,
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
    onChangeAmount = (value) => {
        this.setState({ value: value });
    }
    onChangeDescription = (description)=> {
        this.setState({description: description});
    }
    onSumitPayment = async() => {
        const transaction = { 
            value: this.state.value, 
            type: 'r' ,
            status: "1",
            description: this.state.description,
            user: `${this.state.userId}`
        };
        try {
            const res = await API.post('/transaction',transaction);
            alert("Pagamento foi recebido com sucesso!")
            this.props.navigation.navigate('MainPage');
        }catch (error) {
            alert(error);
            this.setState({ error: (error?.response?.data?.message || error?.message) });
        }
       
       
    }
    render() {
        return (
            <View style={[s.row,s.dFlex, s.justifyContentCenter,s.textCenter]}>
                <View style={[ s.col12]}  >
                    <View style={[ s.w80, s.pl5]}  >
                        <View style={[s.row,s.mt5]}>
                            <View style={[s.formGroup,s.w100]}>
                            <Text style={[s.h4]}>Descriçāo</Text>
                            <TextInput value={this.state.description } keyboardType='default' multiline={true} numberOfLines={4} style={[s.formControl]} onChangeText={ this.onChangeDescription }/>
                            </View>
                        </View>
                        <View style={[s.row]}>
                            <View style={[s.formGroup,s.w100]}>
                                <Text style={[s.h4]}>Valor</Text> 
                            <TextInput value={this.state.value} keyboardType='numeric' maxLength={5} style={[s.formControl]} onChangeText={ this.onChangeAmount } />
                            </View>
                        </View>
                        <View style={[s.row]}>
                            {this.state.error !== null && <Text style={[s.textDanger,s.textCenter]}>{this.state.error}</Text>}
                            <TouchableHighlight onPress={this.onSumitPayment} style={[s.btnTouchable,s.w100,s.mt3]} >
                                <View style={[s.btn, s.btnPrimary]}>
                                    <Text style={[s.btnText, s.btnPrimaryText]}>Enviar</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

