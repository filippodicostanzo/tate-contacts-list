import {StyleSheet} from 'react-native';
import colors from '../styles/colors';


export default StyleSheet.create({

    flexcenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    fullheight: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    view: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: 'yellow',
        margin: 30,
        elevation: 4,
        shadowOffset: {width: 5, height: 5},
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderRadius: 5,

    },
    avatar: {
        marginBottom: 20,
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10
    },

    iconMenu: {
        fontSize: 20,
        width: 20,
        color: 'white'
    },

    buttons: {
        marginTop: 20,
    },

    warningicon: {
        width: 130,
        height: 130,
        marginBottom: 20
    },

    warningtext: {
        fontSize: 20,
        color: colors.primaryText
    }

})

