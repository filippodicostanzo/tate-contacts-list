import React from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    FlatList,
    TouchableHighlight,
    Image
} from 'react-native';

import {withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import lists from '../assets/styles/lists';
import colors from '../assets/styles/colors'

class List extends React.Component {

    constructor(props) {
        super(props);
    }

    renderFooter() {
        if (!this.props.iconrefresh) {
            return null;
        }
        else {
            return (
                <View style={{paddingVertical: 20, borderTopWidth: 1, borderColor: '#CECECE'}}>
                    <ActivityIndicator animating size="large"/></View>
            )
        }
    }

    render() {

        const {navigate} = this.props.navigation;

        let arraycolors = [colors.primaryCard, colors.secondaryCard];

        return (

            <View style={{flex: 1, width: '100%'}}>
                <FlatList
                    data={this.props.data}
                    renderItem={({item, index}) =>
                        <TouchableHighlight onPress={() => navigate('Details', item)} underlayColor='#262f49'>
                            <View style={[lists.row, {backgroundColor: arraycolors[index % arraycolors.length]}]}>
                                <Image source={require('../assets/img/avatar-placeholder.png')} style={lists.avatar}/>
                                <View>
                                    <Text style={lists.name}>{item.name} {item.surname}</Text>
                                    <Text style={lists.email}> <Icon name="envelope"/> {item.email}</Text>

                                    {item.PaymentMethods.map((prop) => {

                                        if (prop.default === true) {

                                            return (
                                                <Text style={lists.payment} key={prop.id}>
                                                    <Icon name="credit-card"/> {prop.type}
                                                </Text>
                                            );
                                        }
                                    })}

                                </View>
                                <View style={lists.arrowContainer}>
                                    <Icon style={lists.arrowRight} name="info-circle"/>
                                </View>
                            </View>
                        </TouchableHighlight>}
                    keyExtractor={(item, index) => item.username}
                    refreshing={true}
                    ListFooterComponent={this.renderFooter()}
                    onEndReached={this.props.refresh}
                    onEndThreshold={50}
                />
            </View>
        )
    }
}

export default withNavigation(List)

