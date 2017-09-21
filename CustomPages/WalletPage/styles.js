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
    },
    label:{
        fontSize:  14,
    },
    money:{
        fontSize: 30,
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
        padding: 15,
    },
    inputContainer:{
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput:{
        flex: 1,
    },
    text:{
        marginLeft: 5,
        marginRight: 5,
    },
    payWayContainer:{
        flexDirection: 'column',
        marginTop: 15,
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