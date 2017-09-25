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
        minWidth: 60,
        alignItems: 'flex-end',
        paddingRight: 5,
    },
    buttonText: {
        fontSize: 16,
        color: colors.dkGreyBg,
    },
    itemContainer:{
        height: 50,
        flexDirection: 'row',
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#BBBBBB',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingRight: 10,
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