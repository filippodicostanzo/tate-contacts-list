import React from 'react';
import {ScrollView, SafeAreaView, StatusBar} from "react-native";
import colors from '../assets/styles/colors';
import Card from '../components/card';

export default class Details extends React.Component {

    static navigationOptions = ({navigation}) => {

        return {

            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: colors.primaryBackground,
            },
            headerTitleStyle: {
                fontSize: 18,
            },
            headerTitle: `${navigation.state.params.name} ${navigation.state.params.surname}`,
        }
            ;
    };

    render() {

        const users = this.props.navigation.state.params;
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: colors.primaryBackground}}>
                <StatusBar
                    backgroundColor={colors.primaryBackground}
                    barStyle="light-content"
                />
                <ScrollView style={{BackgroundColor: colors.primaryBackground}}>
                    <Card user={users}> </Card>

                </ScrollView>
            </SafeAreaView>
        );
    }

}