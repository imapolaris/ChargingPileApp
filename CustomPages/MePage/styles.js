import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const Size = 39;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer:{
        height: 150,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    backgroundImage:{
        flex: 1,
        height: undefined,
        width: undefined,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list:{
        paddingTop:0,
        marginTop: 1,
    },
    item: {
        backgroundColor: colors.white,
    },
    settings:{
        justifyContent: 'flex-start',
        //marginBottom: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#BBBBBB',
        marginTop: 10,
    },
    text: {
        fontSize: 18,
        backgroundColor: 'transparent',
        color: '#FFFFFF',
    },
    login: {
        color: colors.white,
        //fontStyle: "italic",
        fontSize: 16,
    },
    register:{
        color: '#397af8',
    },
    iconContainer: {
        width: Size,
        height: Size,
        backgroundColor: colors.transparent,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.2,
        borderColor: colors.transparent,
    },
    icon: {
        position: "absolute",
        backgroundColor: "transparent",
        elevation: 4,
    },
    bell: {
        justifyContent: "flex-start",
        alignItems: 'flex-end',
        bottom: 0,
        left: 0,
        right: 10,
        top: 10,
    }
});

export default styles;