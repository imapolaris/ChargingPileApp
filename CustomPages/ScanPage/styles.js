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
        padding: 30,
    },
    text: {
        color: '#00FF00',
        fontSize: 12,
    },
    textContainer:{
        marginTop: 30,
        marginBottom: 10,
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
        width: 150,
    },
    scan: {
        margin: 30,
    },
    textInput:{
        borderWidth: 0.5,
        borderColor: '#C3C3C3',
    },
    textInputContainer:{
        margin: 30,
    },
    buttonContainer:{
        alignItems: 'center',
    }
});

export default styles;