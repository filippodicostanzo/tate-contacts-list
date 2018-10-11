import React from 'react';
import {View, Text, Image} from "react-native";
import cards from '../assets/styles/cards';
import styles from '../assets/styles/styles';

export default class Details extends React.Component {
    constructor(props) {
        super(props);
    }
    renderPayments(users) {
        users.PaymentMethods.sort(function (a, b) {
            return (a.default === b.default) ? 0 : a.default ? -1 : 1;
        });

        return users.PaymentMethods.map((prop) => {

            if (prop.default === true) {

                return (<View style={[cards.payment, cards.paymentdefault]} key={prop.id}>
                    <Image source={require('../assets/img/payment-default.png')} style={cards.card}/>
                    <View style={styles.flexcenter}>
                        <Text style={cards.paymenttype}>{prop.type}
                        </Text>
                        <Text style={cards.paymentname}>{prop.name}</Text>
                        <Text style={cards.paymentcurrency}>{prop.currency}</Text>
                    </View>
                </View>)
            }
            else {
                return (<View style={[cards.payment, cards.paymentstandard]} key={prop.id}>
                    <Image source={require('../assets/img/payment-standard.png')} style={cards.card}/>
                    <View style={styles.flexcenter}>
                        <Text style={cards.paymenttype}>{prop.type}
                        </Text>
                        <Text style={cards.paymentname}>{prop.name}</Text>
                        <Text style={cards.paymentcurrency}>{prop.currency}</Text>
                    </View>
                </View>);
            }

        })

    }

    render() {
        return (
            <View>
                <View style={cards.user}>
                    <Image source={require('../assets/img/avatar-placeholder.png')}
                           style={cards.avatar}/>
                    <Text style={cards.title}>
                        {this.props.user.name} {this.props.user.surname}
                    </Text>
                    <Text style={cards.email}>{this.props.user.email}</Text>
                    <Text style={cards.username}>{this.props.user.username}</Text>

                </View>
                {this.renderPayments(this.props.user)}
            </View>
        );
    }
}