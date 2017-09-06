import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    upperContainer: {
        flex: 1,
    },
    scanContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
    },
    lowerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 15,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 20,
    },
    text: {
        color: '#00FF00',
        fontSize: 14,
    },
    textContainer:{
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 1,
    },
    button: {
        width: 100,
    },
    okButton: {
        width: 200,
    },
    scan: {

    },
    textInput:{
        borderWidth: 0.5,
        borderColor: '#C3C3C3',
    },
    textInputContainer:{
        marginLeft: 30,
        marginRight: 30,
    },
    buttonContainer:{
        alignItems: 'center',
        marginTop: 30,
    }
});

export default styles;