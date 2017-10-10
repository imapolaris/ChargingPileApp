import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
        //backgroundColor: colors.theme1,
    },
    title: {
        fontSize: 18,
        color: colors.primary1,
    },
    infoContainer: {
        height: 80,
        paddingLeft: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    infoLeftContainer:{
        flex: 1,
    },
    infoRightContainer: {
        width: 55,
        height: 55,
        backgroundColor: colors.primary1,
        margin: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        fontSize: 13,
    },
    navigate:{
        fontSize: 14,
        color: colors.white,
    },
    divider: {
        backgroundColor: '#C3C3C3',
    }
});

export default styles;