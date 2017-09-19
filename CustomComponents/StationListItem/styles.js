import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: colors.theme1,
    },
    title: {
        fontSize: 18,
        color: colors.white,
    },
    infoContainer: {
        height: 60,
        paddingLeft: 15,
        justifyContent: 'center',
    },
    info: {
        fontSize: 12,
    },
    actionContainer: {
        height: 45,
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 1,
        borderRightWidth: 0.5,
        borderRightColor: colors.grey4,
    },
    rightContainer: {
        flex: 1,
        borderLeftWidth: 0.5,
        borderLeftColor: colors.grey4,
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    buttonText: {
        fontSize: 16,
        color: colors.grey0,
    },
    divider: {
        backgroundColor: '#C3C3C3',
    }
});

export default styles;