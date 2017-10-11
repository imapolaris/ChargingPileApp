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
        paddingRight: 15,
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
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        paddingBottom: 3,
        paddingTop: 3,
        height: 80,
        alignItems: 'center',
    },
    infoLeftContainer: {
        flex: 1,
    },
    infoRightContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary1,
        borderRadius: 30,
        marginRight: 10,
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 15,
        color: colors.white,
    },
    info: {
        fontSize: 14,
    },
    divider: {
        backgroundColor: '#C3C3C3',
    },
});

export default styles;