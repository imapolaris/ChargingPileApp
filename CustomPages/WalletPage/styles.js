import {StyleSheet} from 'react-native';

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
        fontSize: 20,
        color: '#FF0000',
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 5,
    },
    charging:{
        color: '#0000FF',
        textDecorationLine: 'underline',
    },
});

export default styles;