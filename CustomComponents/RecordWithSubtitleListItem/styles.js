import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#C3C3C3',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: colors.white,
    },
    titleContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title:{
        fontSize: 14,
    },
    subtitle:{
        fontSize: 12,
    },
    contentContainer:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    content:{
        fontSize: 16,
    },
});

export default styles;