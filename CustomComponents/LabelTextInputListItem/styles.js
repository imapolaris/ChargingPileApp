import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = StyleSheet.create({
    container:{
        height: 50,
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#BBBBBB',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    text:{
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    textInput:{
        flex: 1,
        height: 40,
        fontSize: 16,
        textAlign:'right',
    },
});

export default styles;