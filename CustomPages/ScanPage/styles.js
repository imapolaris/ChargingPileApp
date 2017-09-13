import {StyleSheet, Dimensions} from 'react-native';
import {screenHeight, screenWidth} from "../../Common/styles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    upperContainer: {
        flex: 1,
    },
    scanContainer: {
        alignItems: 'center',
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
        opacity: 0.8,
        marginBottom: 0.5,
    },
    text: {
        color: '#00FF00',
        fontSize: 15,
    },
    textContainer:{
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
    },
    rectangleContainer: {
        flex: 1,
        flexDirection: 'column',
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rectangle: {
        height: 280,
        width: 280,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 1,
    },
    button: {
    },
    okButton: {
        width: screenWidth - 30,
    },
    scan: {
    },
    textInput:{
        borderWidth: 0.5,
        borderColor: '#C3C3C3',
    },
    textInputContainer:{
        marginLeft: 15,
        marginRight: 15,
    },
    buttonContainer:{
        alignItems: 'center',
        marginTop: 30,
    },
    camera: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    fillArea: {
        backgroundColor: '#000000',
        opacity: 0.8,
        flex: 1,
        width: screenWidth,
    },
    middleContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent:'center',
        width: screenWidth,
    }
});

export default styles;