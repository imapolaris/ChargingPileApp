import {StyleSheet} from 'react-native';
import {screenWidth} from "../../Common/styles";
import colors from '../../Common/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    },
    infoContainer:{
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    avatarContainer:{
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    WelcomeTitle: {
        fontSize: 24,
        color: colors.theme1,
    },
    textInput:{
        borderWidth: 0.5,
        borderColor: '#C3C3C3',
        marginTop: 10,
        fontSize: 14,
    },
    buttonContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    button:{
        width: screenWidth-20,
    },
    shortCutContainer: {

        flexDirection: 'row',
    },
    quickLoginContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'flex-start',
    },
    forgotPwdContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        alignItems: 'flex-end',
    },
    text:{
        marginTop: 15,
        color: '#00FFFF',
        fontSize: 15,
    },
});

export default styles;