import React, { Component,useState, useEffect } from 'react';
import {TextInput, ScrollView,StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import PropTypes from 'prop-types';
import API from '../../service/api';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import Card from './card/card.component';
import DateTimePicker from '@react-native-community/datetimepicker';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles: s, constants: c } = bootstrapStyleSheet;



export default class Transactions extends Component {
    constructor(props) {
        super(props);
        const { route } = this.props;
        this.state = {
            // date: new Date().toISOString().slice(0, 10),
            userId: route.params?.userId || 10,
            token: route.params?.token,
            date: new Date(),
            transactions: [],
            loading: true,
            show: false,
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
    componentDidMount() {
        // {
        //     value: 10.10,
        //     type: 'r',
        //     createdAt: new Date(),
        // }
        API.get(`/releases/list/user/${this.state.userId}/${this.state.date.toISOString().slice(0, 10)}`).then((res) => {
            this.setState({
                transactions: res.data ,
                loading: false,
            })
            console.log(res.data);
        }).catch((error) => {
            alert(error);
        })
    }
    handleChange = () => {
        this.setState({ loading: true });
        API.get(`/releases/list/user/${this.state.userId}/${this.state.date.toISOString().slice(0, 10)}`).then((res) => {
            this.setState({
                transactions: res.data,
                loading: false,
            })
            this.setState({show: false})

        }).catch((error) => {
            this.setState({
                transactions: [],
                loading: true,
            })
            this.setState({show: false})
            alert(error);
        })

    };
    goTo(transaction){
        this.props.navigation.navigate('EditTransaction',
        {
            transaction: transaction,
            userId: this.state.userId, 
            token: this.state.token,
        });
        // this.props.navigation.navigate("EditTransaction",{ transaction: props, userId: this.state.userId, token: this.state.token})
    }
    render() {
        return (
            <View style={[s.col12,s.dFlex,s.textCenter,s.p3]}>
                <View style={[]}>
                    {/* <Text style={[s.h5]}>Escolher Data</Text> */}
                    <View style={[s.row]} >
                        <TouchableHighlight onPress={()=> this.setState({show: true})} style={[s.btnTouchable,s.mt3]}>
                            <View style={[s.btn, s.btnSecondary,{height: 40}]}>
                                <Text style={[s.btnText, s.btnPrimaryText]}>Escolher data</Text>
                            </View>
                        </TouchableHighlight>
                        {/* <TextInput
                            style={[s.formControl]}
                            keyboardType="number-pad"
                            selected={ this.state.date }
                            onChangeText={ (date) => this.handleChange(date) }
                        /> */}
                         {this.state.show && <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.date}
                            mode="date"
                            onChange={(date)=> this.handleChange(date) }
                        />}
                    </View>

                    <View style={[s.mt3]}>
                        <Text style={[s.h5]}>Total de transações nesta data: { this.state.transactions.length }</Text>
                    </View>
                </View>
                <ScrollView>

                    {
                        !this.state.loading
                            ? this.state.transactions.map((item) => {
                                return (
                                <View>
                                    <Card
                                    key={item.transaction.id}
                                    value={ item.value } 
                                    description={item.transaction.description} 
                                    type={ item.transaction.type } 
                                    date={ item.createdAt } 
                                    operationType={ item.operationType } 
                                    id={ item.transaction.id } />
                                    <TouchableHighlight onPress={()=> this.goTo(item.transaction)} style={[s.btnTouchable,s.mt0]}>
                                        <View style={[s.btn, s.btnWarning,{height: 40}]}>
                                            <Text style={[s.btnText, s.btnPrimaryText]}>Editar</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                )
                            })
                            : <View style={[s.spinnerBorder, s.mt5]}></View>
                    }
                </ScrollView>
            </View>
        )
    }
}

// {
//     "id": 7,
//     "operationType": "u",
//     "value": "15.50",
//     "createdAt": "2022-05-26T19:54:28.337Z",
//     "user": {
//       "id": 2,
//       "name": null,
//       "username": "filipe@email.com",
//       "status": "1",
//       "createdAt": "2022-05-26T06:47:32.096Z",
//       "updatedAt": "2022-05-26T06:47:32.096Z"
//     },
//     "transaction": {
//       "id": 4,
//       "type": "p",
//       "description": "ATUALIZADO",
//       "status": "1",
//       "value": "300.00",
//       "createdAt": "2022-05-26T03:29:45.964Z",
//       "updatedAt": "2022-05-26T21:30:47.703Z"
//     }
//   }
