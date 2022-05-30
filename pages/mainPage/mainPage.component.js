import React, { Component } from 'react';
import { View, Text } from "react-native";
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles: s, constants: c } = bootstrapStyleSheet;

export default class MainPage extends Component{
    constructor(props) {
        super(props);
        
    }
    componentDidMount(){
       if(this.props.userId !=null){
        this.props.updateBalance();
       }
    }
    render() {
        return (
            <View style={[s.row, s.justifyContentCenter]}>
                <View style={[ s.col6, s.colMd4, s.colSm4 , s.colXl4 ]}  >
                    <View style={[s.row, s.my5]}>
                        <Text >Saldo: <Text>R$ {this.props.balance}</Text></Text>
                    </View>
                    <View style={[s.row, s.my3]}>
                        <Text style={[s.btn, s.btnPrimary]}  >Enviar Pagamento</Text> 
                    </View>
                    <View style={[s.row, s.my3]}>
                        <Text style={[s.btn, s.btnPrimary]} >Receber Pagamento</Text>
                    </View>
                    <View style={[s.row, s.my3]}>
                        <Text style={[s.btn, s.btnPrimary]}  >Transações</Text>
                    </View>
                    <View style={[s.row, s.my3]}>
                        <Text style={[s.btn, s.btnDanger]}  >Sair</Text>
                    </View>
                </View>
            </View>
        );
    }
}
