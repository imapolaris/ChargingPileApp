import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from "../../Common/styles";
import colors from '../../Common/colors';

export const Size = 250;
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
        justifyContent: 'center',
        height: 200,
        flexDirection: 'row',
    },
    inputContainer: {
        flex: 1,
    },
    lowerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 20,
        marginBottom: 0.5,
    },
    text: {
        color: '#00FF00',
        fontSize: 15,
        opacity: 1,
    },
    textContainer:{
        marginTop: 45,
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
        height: Size,
        width: Size,
        backgroundColor: 'transparent',
    },
    leftContainer: {
        flex: 1,
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'center',
    },
    leftButtonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    rightButtonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        width: screenWidth / 2 - 30,
    },
    buttonTitle: {
        fontSize: 14,
        color: colors.grey3,
        marginTop: 5,
    },
    scanStrip: {
        position: "absolute",
        backgroundColor: "transparent",
        elevation: 4,
        justifyContent: "flex-start",
        bottom: 0,
        left: 3,
        right: 3,
        top: 2,
    },
    strip: {
        width: Size-4,
        backgroundColor: colors.secondary3,
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
        flexDirection: 'row',
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
        opacity: 0.5,
        flex: 1,
        width: screenWidth,
    },
    middleContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent:'center',
        width: screenWidth,
    },
    icon: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    horizontalDivider: {
        backgroundColor: colors.secondary3,
        width: 20,
        height: 2,
    },
    verticalDivider: {
        backgroundColor: colors.secondary3,
        height: 20,
        width: 2,
    },
});

export default styles;