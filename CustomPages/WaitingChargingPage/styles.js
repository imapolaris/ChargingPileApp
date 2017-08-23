import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 30,
    },
    upperContainer: {

    },
    textContainer: {
        flexDirection: 'row',
    },
    lowerContainer: {
        padding: 30,
    },
    leftContainer: {
        flex: 4,
        alignItems: 'flex-end',
    },
    rightContainer:{
        flex: 6,
        alignItems: 'center',
    },
    button: {
        width: 150,
    },
    divider: {
        marginTop: 2,
        marginBottom: 15,
        /*marginLeft: 15,
        marginRight: 15,*/
        backgroundColor: '#419b3a',
    }
});

export default styles;