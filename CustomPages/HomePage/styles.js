import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const Size = 39;
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    map: {
        flex: 1,
    },
    icon: {
        position: "absolute",
        backgroundColor: "transparent",
        elevation: 4,
    },
    location: {
        justifyContent: "flex-end",
        alignItems: 'flex-end',
        bottom: 6+100,
        left: 0,
        right: 6,
        top: 0,
    },
    iconContainer: {
        width: Size,
        height: Size,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.2,
        borderColor: colors.grey4,
    },
    traffic: {
        justifyContent: "flex-start",
        alignItems: 'flex-end',
        bottom: 0,
        left: 0,
        right: 6,
        top: 6+50,
    },
});

export default styles;