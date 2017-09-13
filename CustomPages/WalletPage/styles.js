import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    listContainer:{
        flex: 7,
    },
    list:{
        flex: 1,
        paddingTop:0,
        marginTop: 1,
    },
    item: {
        backgroundColor: colors.white,
    },
    balanceContainer:{
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label:{
        fontSize:  14,
    },
    money:{
        fontSize: 26,
        color: '#FF0000',
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 5,
    },
    charging:{
        marginLeft: 10,
        fontSize: 16,
        color: '#0000FF',
        textDecorationLine: 'underline',
    },
});

export default styles;