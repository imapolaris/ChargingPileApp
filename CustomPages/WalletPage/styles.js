import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';
import {screenWidth} from "../../Common/styles";

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    listContainer:{
        flex: 7,
    },
    list:{
        flex: 1,
        paddingTop:0,
        marginTop: 1,
    },
    item: {
        backgroundColor: colors.white,
    },
    balanceContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    label:{
        fontSize:  14,
    },
    money:{
        fontSize: 36,
        color: '#FF0000',
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 5,
    },
    charging:{
        marginLeft: 10,
        fontSize: 16,
        color: '#0000FF',
        textDecorationLine: 'underline',
    },
    payContainer: {
        flex: 3,
        flexDirection: 'column',
        padding: 5,
    },
    moneyContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    moneyItem: {
        height: 45,
        width: 100,
        backgroundColor: colors.white,
        justifyContent: 'center',
    },
    chargeMoneyItem:{
        borderColor: colors.primary1,
        borderWidth: 1,
    },
    moneyItemText:{
        fontSize: 16,
        alignSelf: 'center',
    },
    chargeMoneyItemText:{
        color: colors.primary1,
    },
    payWayContainer:{
        flexDirection: 'column',
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
    },
    checkboxContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#C3C3C3',
        marginTop: 5,
        borderRadius: 25,
    },
    checkbox: {
        flex: 1,
        alignItems: 'center',
        //borderWidth: 0.5,
        //borderColor: '#C3C3C3',
        margin: 5,
    },
    submitButtonContainer: {
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton:{
        width: screenWidth - 20,
    },
});

export default styles;