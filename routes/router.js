import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Users from '../views/Users';
import Details from '../views/Details';


export const UsersStack = createStackNavigator({
    Users:{
        screen:Users,
        navigationOptions:({navigation})=>({
            title:'Users'
        })

    },
    Details: {
        screen: Details,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.name} ${navigation.state.params.surname}`
        })
    }
});

