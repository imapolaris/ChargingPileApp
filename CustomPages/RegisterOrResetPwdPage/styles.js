import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    },
    infoContainer: {
        flex: 7,
    },
    vcodeContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    vcodeButton: {
        width: 60,
        marginTop: 10,
    },
    vcodeTextInput: {
        flex: 1,
    },
    textInput:{
        borderWidth: 0.5,
        borderColor: '#C3C3C3',
        marginTop: 10,
    },
    buttonContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 200,
    },
    text: {
        marginTop: 10,
        color: '#00FFFF',
    },
    userAgreement: {
        textDecorationLine : 'underline',
    },
});

export default styles;