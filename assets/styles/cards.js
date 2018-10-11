import {StyleSheet} from 'react-native';
import colors from '../styles/colors';

export default StyleSheet.create({

    user: {
        justifyContent: 'center',
        alignItems:'center',
        padding: 30,
        backgroundColor: colors.infoCard,
        margin: 30,
        elevation: 4,
        shadowOffset: {width: 5, height: 5},
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderRadius: 5,

    },
    avatar: {
        marginBottom:20,
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    title: {
        justifyContent: 'center',
        alignItems:'center',
        fontSize: 20,
        fontWeight: '900',
        color: colors.primaryText
    },
    email: {
        fontSize: 14,
        color: colors.secondText,
    },
    username: {
        fontSize: 12,
        color: colors.secondText,
    },

    payment: {
        justifyContent: 'center',
        alignItems:'center',
        padding: 30,
        margin:30,
        marginTop:0,
        elevation: 4,
        shadowOffset: {width: 5, height: 5},
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderRadius: 5,
    },

    paymentdefault: {
        backgroundColor: colors.primaryCard,
    },

    paymentstandard: {
        backgroundColor: colors.secondaryCard,
    },

    paymenttype: {
        color: colors.primaryText,
        fontSize: 18,
        fontWeight: '700'
    },

    paymentname:{
        color: colors.primaryText,
        fontSize: 16,
        fontWeight: '300'
    },

    paymentcurrency: {
      color: colors.secondText,
      fontSize: 14,
      fontWeight: '300'
    },

    card: {
        marginBottom:20,
        width: 120,
        height: 74
    },



})

