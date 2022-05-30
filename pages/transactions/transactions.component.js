/* eslint-disable react-hooks/rules-of-hooks */
import { Component } from 'react';
import { Navigate, SafeAreaView } from 'react-router-native';
import API from '../../../api';
import Card from './card/card.component';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

export default class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // date: new Date().toISOString().slice(0, 10),
            date: new Date(),
            transactions: [],
            loading: true,
        }

    }
    componentDidMount() {
        API.get(`/releases/list/user/${this.props.userId}/${this.state.date.toISOString().slice(0, 10)}`).then((res) => {
            this.setState({
                transactions: res.data,
                loading: false,
            })
        }).catch((error) => {
            alert(error);
        })
    }
    handleChange = (date) => {
        this.setState({ loading: true });
        API.get(`/releases/list/user/${this.props.userId}/${date.toISOString().slice(0, 10)}`).then((res) => {
            this.setState({
                transactions: res.data,
                date: date,
                loading: false,
            })

        }).catch((error) => {
            this.setState({
                transactions: [],
                date: date,
                loading: true,
            })
            alert(error);
        })

    };
    render() {
        return (
            <SafeAreaView>
                <View className='container'>
                    <View className='mb-5'>
                        <h4>Transações </h4>
                        <View className='row'>
                            <TextInput
                                keyboardType="date"
                                selected={ this.state.date }
                                onChangeText={ (date) => this.handleChange(date) }
                            />
                        </View>

                        <View className='mt-3'>
                            <h6>Total: { this.state.transactions.length }</h6>
                        </View>
                    </View>
                    <View>

                        {
                            !this.state.loading
                                ? this.state.transactions.map((item) => {
                                    return <Card value={ item.transaction.value } type={ item.transaction.type } date={ item.transaction.createdAt } />
                                })
                                : <View class="spinner-border mt-5" role="status">
                                    <span class="sr-only"></span>
                                </View>
                        }
                    </View>
                </View>
            </SafeAreaView>
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
