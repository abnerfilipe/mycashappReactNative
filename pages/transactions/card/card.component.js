import PropTypes from 'prop-types';
import { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { styles: s, constants: c } = bootstrapStyleSheet;


// const Card = (props) => {
export default class Card extends Component {
    constructor(props) {
        super(props);
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
    goTo(){
        this.props.navigation.navigate('MainPage');
        // this.props.navigation.navigate('EditTransaction',
        //     {
        //         userId: this.state.userId, 
        //         token: this.state.token,
        //     });
        // this.props.navigation.navigate("EditTransaction",{ transaction: props, userId: this.state.userId, token: this.state.token})
    }
    render(){
        return (
            <View style={[s.card,s.mt4]}>
                <View style={[s.cardBody]}>
                    {this.props.type === 'r' &&  <Text style={[s.cardSubtitle, s.mb2, s.textSuccess]} > Recebido </Text>}
                    {this.props.type === 'p' &&  <Text style={[s.cardSubtitle, s.mb2, s.textDanger]} > Enviado </Text>}
                    <Text style={[s.text,s.textRegular]}> Valor: R${(+this.props.value).toFixed(2)} </Text>
                    <Text style={[s.text,s.textRegular]}> Descriçāo: {this.props.description} </Text>
                    <Text style={[s.text,s.textRegular]}> Operaçāo: {this.props.operationType} </Text>
                  
                </View>
                <View style={[s.cardFooter]}> 
                    <Text style={[s.textMuted]}>Data da Transaçāo: { new Intl.DateTimeFormat('en-US',
                                { 
                                    year: 'numeric', 
                                    month: '2-digit', 
                                    day: '2-digit', 
                                    hour: '2-digit', 
                                    minute: '2-digit', 
                                    second: '2-digit' 
                                }).format(new Date(this.props.date)) }
                    </Text> 
                </View>
            </View>
        )
    }    
}
