import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        marginTop: 1,
    },
    item: {
        backgroundColor: colors.white,
    },
    buttonContainer:{
        padding: 30,
    },
    button: {
        width: 150,
    },
});

export default styles;