import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    titleContainer: {
        flexDirection: 'row',
        paddingLeft: 15,
        height: 30,
        alignItems: 'center',
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    rightContainer: {
        paddingRight: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 14,
        color: colors.primary1,
    },
    infoContainer: {
        paddingLeft: 15,
        paddingBottom: 3,
        paddingTop: 3,
    },
    info: {
        fontSize: 14,
    },
    divider: {
        backgroundColor: '#C3C3C3',
    },
});

export default styles;