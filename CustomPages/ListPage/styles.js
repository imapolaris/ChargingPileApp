import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    content:{
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: colors.white,
    },
    item: {
        backgroundColor: colors.white,
    },
    separator: {
        height: 10,
    },
    bottomContainer: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        fontSize: 12,
        color: colors.grey3,
    },
    emptyContainer: {
        height: 250,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    empty: {
        fontSize: 14,
        color: colors.grey3,
    },
});

export default styles;