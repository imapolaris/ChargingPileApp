import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const Size = 45;
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: "transparent",
        justifyContent: "flex-end",
        alignItems: 'center',
        elevation: 4,
    },
    button:{
        flexDirection: 'row',
        borderRadius: Size/2,
        height: Size,
        width: Size*3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.tintColor2,
        opacity: 1,
    },
    icon: {
        color: colors.white,
    },
    text:{
        fontSize: 16,
        color: colors.white,
        alignItems: 'center',
        marginLeft: 10,
    },
});

export default styles;