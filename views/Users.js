/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Button,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicator,
    Alert, Image
} from 'react-native';
import {data} from '../services/getdata';
import List from '../components/list';
import {SearchBar} from 'react-native-elements'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../assets/styles/styles";
import colors from "../assets/styles/colors";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});


export default class Users extends React.Component {

    constructor(props) {
        super(props);

        this.loadMore = this.loadMore.bind(this);

        this.state = {
            data: [],
            dataclone: [],
            page: 1,
            error: null,
            refreshing: true,
            opened: true,
            iconrefresh: false
        };
    }


    componentDidMount() {

        this._loadData();

        this.props.navigation.setParams({orderByEmail: this._orderByEmail});
        this.props.navigation.setParams({orderByUsername: this._orderByUsername});
        this.props.navigation.setParams({orderByPayment: this._orderByPayment});
        this.props.navigation.setParams({saveData: this._saveData});
        this.props.navigation.setParams({getData: this._getData});
        this.props.navigation.setParams({error: this.state.error});

    }

    loadMore() {

        if (this.state.refreshing === true) {
            this.setState({page: this.state.page + 1}, () =>
                this.refreshData(this.state.page));
        }
    }

    refreshData(page) {

        this.setState({
            iconrefresh: true
        });

        data(page).then(data => {
            const users = data.Users;
            this.setState({
                data: this.state.data.concat(users),
                dataclone: this.state.data.concat(users),
            });


        }).catch(error => {
            this.setState({
                error: true, loading: false, refreshing: false
            });
            console.log(error)

        });

        setTimeout(() => {
            this.setState({
                iconrefresh: false
            });
        }, 2000);

    }


    static navigationOptions = ({navigation}) => {

        const {params = {}} = navigation.state;

        return {

            headerTintColor: '#ffffff',
            headerStyle: {
                backgroundColor: colors.primaryBackground,
            },
            headerTitleStyle: {
                fontSize: 18,
            },
            headerTitle: 'Users List',
            headerRight: (

                <Menu>
                    <MenuTrigger>
                        <Icon style={styles.iconMenu} name="ellipsis-v"/></MenuTrigger>
                    <MenuOptions style={{backgroundColor: '#2e354f', padding: 10}}>
                        <MenuOption onSelect={() => params.orderByEmail()}><Text style={{color: 'white'}}>• Order by
                            Email</Text></MenuOption>
                        <MenuOption onSelect={() => params.orderByUsername()}><Text style={{color: 'white'}}>• Order By
                            Username</Text></MenuOption>
                        <MenuOption onSelect={() => params.orderByPayment()}><Text style={{color: 'white'}}>• Order By
                            Payment</Text></MenuOption>
                        <MenuOption onSelect={() => params.saveData()} disabled={params.error}><Text
                            style={{color: 'white'}}>• Save Data
                            Locally</Text></MenuOption>
                    </MenuOptions>
                </Menu>
            )
        }
            ;
    };

    handleChange(text) {

        let itemsresults = this.state.dataclone;
        itemsresults = itemsresults.filter((item) => {
            return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });


        if (text === '') {
            this.setState({
                refreshing: true,
                iconrefresh: false,
            })
        }

        else {
            this.setState({
                refreshing: false,
                iconrefresh: false
            })
        }
        this.setState({
            data: itemsresults,

        })

    }

    _orderByEmail = () => {

        var obj = this.state.data.slice();

        obj.sort(function (a, b) {
            return a.email < b.email ? -1 : 1
        });

        this.setState({
            data: obj,
        });

    };

    _orderByUsername = () => {

        var obj = this.state.data.slice();

        obj.sort(function (a, b) {
            return a.username < b.username ? -1 : 1
        });

        this.setState({
            data: obj,
        });
    };


    _orderByPayment = () => {

        var obj = this.state.data.slice();
        obj.concat(obj);

        obj.map((prop) => {
            prop.PaymentMethods.sort(function (a, b) {
                return (a.default === b.default) ? 0 : a.default ? -1 : 1;
            })
        });

        obj.sort(function (a, b) {
            return a.PaymentMethods[0].type < b.PaymentMethods[0].type ? -1 : 1
        });

        this.setState({
            data: obj,
        });


    };


    _loadData = () => {


        this.setState({
            loading: true,

        });

        data(this.state.page).then(data => {
            var users = []

            if (!data.Users) {
                users = [];
                this.setState({
                    error: true,
                    refreshing: false,
                })
            }

            else {
                users = data.Users;
                this.setState({
                    error: false,
                    refreshing: true
                })
            }


            this.setState({
                data: users,
                dataclone: users,
                loading: false
            });


        }).catch(error => {
            this.setState({
                error, loading: false, refreshing: false
            })
        });
    };

    _loadDataAgain = () => {

        this.setState({page: 1}, () =>
            this._loadData());

    };

    _saveData = () => {

        var obj = this.state.data.slice();
        obj.concat(obj);
        if (obj.length === 0) {
            Alert.alert(
                'No Saved Data',
                'There aren\'t no items to save');
            return;
        }
        AsyncStorage.setItem('users', JSON.stringify(obj))
            .then(Alert.alert(
                'Saved Data correctly',
                `You saved ${this.state.data.length} items. For Save more items scroll down and get all data from API`))
            .catch(error => console.log(error))
    };

    _getData = () => {
        AsyncStorage.getItem('users')
            .then(req => {

                if (req != null) {
                    if (JSON.parse(req).length > 0) {
                        this.setState({
                            error: false,
                            data: JSON.parse(req)
                        })
                    }
                    else {
                        Alert.alert(
                            'No Saved Data',
                            'Unfortunately there are no saved data')
                    }
                }
                else {
                    Alert.alert(
                        'No Saved Data',
                        'Unfortunately there are no saved data')
                }

            })
            .then(json => console.log(json))
            .catch(error => console.log(error));

    };


    getDataOnline() {

        return (<TouchableOpacity style={styles.buttons}>
                <Button
                    style={styles.buttons}
                    onPress={this._loadDataAgain}
                    title="Try Again"
                    color={colors.primaryCard}
                    accessibilityLabel="Learn more about this purple button"
                /></TouchableOpacity>
        )
    }

    getDataLocally() {

        return (<TouchableOpacity style={styles.buttons}><Button
            onPress={this._getData}
            title="Get Data Saved"
            color={colors.primaryCard}
            disabled={this.state.disabled ? true : false}

        /></TouchableOpacity>)
    }

    renderList() {
        const usersdata = this.state.data;

        if (!this.state.error) {

            return (<View style={{flex: 1}}><SearchBar
                onChangeText={(text) => this.handleChange(text)}
                onClear={() => this.Delete()}
                icon={{type: 'font-awesome', name: 'search'}}
                containerStyle={{
                    backgroundColor: colors.primaryBackground, borderWidth: 0, width: '100%',
                    borderBottomColor: 'transparent',
                    borderTopColor: 'transparent', marginTop: 5
                }}
                placeholder={'Insert Text'}
                cancelIcon={{type: 'font-awesome', name: 'chevron-left'}}
            />
                <List data={usersdata} refresh={this.loadMore}
                      refreshing={this.state.refreshing} iconrefresh={this.state.iconrefresh}/></View>)
        }
        else if (this.state.error) {

            return (<View style={styles.flexcenter}>
                <Image style={styles.warningicon}
                       source={require('../assets/img/warning-icon.png')}/>
                <Text style={styles.warningtext}>There is an error with load
                    Data</Text>{this.getDataLocally()}{this.getDataOnline()}</View>)
        }
    }

    loadingController() {
        if (this.state.loading)
            return (<View style={styles.fullheight}><ActivityIndicator/></View>);
    }

    render() {

        return (

            <SafeAreaView style={{flex: 1, backgroundColor: colors.primaryBackground}}>
                <StatusBar
                    backgroundColor={colors.primaryBackground}
                    barStyle="light-content"
                />
                {this.loadingController()}
                {this.renderList()}
            </SafeAreaView>
        );
    }
}