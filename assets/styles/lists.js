import colors from "./colors";
import {StyleSheet} from "react-native";

export default StyleSheet.create({
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: 'white'
    },

    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8,
        elevation: 4,
        shadowOffset: {width: 5, height: 5},
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.primaryText
    },

    arrowContainer: {
        flex: 1
    },

    arrowRight: {
        fontSize: 20,
        alignSelf: 'flex-end',
        color: colors.secondText
    },

    username: {
        fontSize: 10,
        color:colors.secondText,
        marginTop: 5
    },
    email: {
        fontSize: 10,
        color:colors.secondText,
        marginTop: 5
    },
    payment: {
        fontSize: 10,
        color:colors.secondText,
        marginTop: 5
    },


})