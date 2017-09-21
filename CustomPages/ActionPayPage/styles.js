import {StyleSheet} from 'react-native';
import {screenWidth} from "../../Common/styles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
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