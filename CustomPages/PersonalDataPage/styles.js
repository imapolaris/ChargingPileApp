import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        flexDirection: 'column',
        justifyContent:'flex-start',
    },
    flatList: {
    },
    list: {
        justifyContent: 'flex-start',
        marginBottom: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#BBBBBB',
        marginTop: 30,
    },
    item: {
        backgroundColor: colors.white,
    },
    buttonContainer: {
        marginTop: 20,
        justifyContent: 'center',
    },
    button: {

    },
});

export default styles;