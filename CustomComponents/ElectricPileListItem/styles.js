import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        paddingLeft: 15,
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
    },
    status: {
        fontSize: 14,
    },
    infoContainer: {
        paddingLeft: 15,
    },
    info: {
        fontSize: 12,
    },
    divider: {
        backgroundColor: '#C3C3C3',
    },
});

export default styles;