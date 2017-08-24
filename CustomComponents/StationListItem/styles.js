import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10,
    },
    titleContainer: {
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    title: {
        fontSize: 18,
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
        height: 30,
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 1,
    },
    button: {
        height: 30,
    },
    divider: {
        backgroundColor: '#C3C3C3',
    }
});

export default styles;