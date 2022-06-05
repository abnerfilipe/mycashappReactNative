import  { Component } from 'react';
import {TextInput, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import PropTypes from 'prop-types';
import API from '../../../service/api';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import { useRoute } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles: s, constants: c } = bootstrapStyleSheet;



export default class EditTransaction extends Component{
    constructor(props) {
        super(props);
        const { route } = this.props;

        this.state = {
            userId: route.params?.userId,
            token: route.params?.token,
            value: route.params.transaction.value,
            id: route.params.transaction.id,
            type: route.params.transaction.type,
            sended: false,
            error: null,
            description: route.params.transaction.description,
            status: route.params.transaction.status,
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
    onUpdateTransaction = async() => {
        const transaction = { 
            value: this.state.value, 
            type:  this.state.type,
            status: this.state.status,
            description: this.state.description,
        };
        console.log(transaction);
        try {
            const res = await API.patch(`/transaction/${this.state.id}/user/${this.state.userId}`,transaction);
            alert("Pagamento foi atualizado com sucesso!")
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
                            <View style={[s.formGroup,s.w100]}>
                                <Text style={[s.h4]}>Type</Text> 
                                <SelectDropdown
                                style={[s.dropdownMenu]}
                                defaultValue={{value: this.state.type}}
                                data={[{label: 'pagamento',value: 'p'},{label: 'recebimento',value: 'r'}]}
                                onSelect={(selectedItem, index) => {
                                    this.setState({status: selectedItem.value})
                                    console.log(selectedItem, index)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem.label
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item.label
                                }}/>
                            </View>
                        </View>
                        <View style={[s.row]}>
                            <View style={[s.formGroup,s.w100]}>
                                <Text style={[s.h4]}>Status</Text> 
                                <SelectDropdown
                                style={[s.dropdownMenu]}
                                defaultValue={{value: this.state.status}}
                                data={[{label: 'Ativo',value: '1'},{label: 'Inativo',value: '0'}]}
                                onSelect={(selectedItem, index) => {
                                    this.setState({status: selectedItem.value})
                                    console.log(selectedItem, index)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem.label
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item.label
                                }}/>
                            </View>
                        </View>
                        <View style={[s.row]}>
                            {this.state.error !== null && <Text style={[s.textDanger,s.textCenter]}>{this.state.error}</Text>}
                            <TouchableHighlight onPress={this.onUpdateTransaction} style={[s.btnTouchable,s.w100,s.mt3]} >
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

