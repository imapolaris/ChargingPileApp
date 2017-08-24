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
        paddingTop: 15,
        paddingBottom: 5,
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
});

export default styles;