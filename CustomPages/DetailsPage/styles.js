import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 3,
        paddingLeft: 5,
        paddingRight: 5,
    },
    contentContainer: {
        flex: 1,
    },
    stationTitleContainer: {
        height: 150,
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingLeft: 10,
        marginTop: 1,
        flexDirection: 'row',
    },
    stationImage:{
        height: 100,
        width: 100,
        backgroundColor: colors.grey3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stationTitleRightContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 20,
        height: 100,
    },
    stationTitleContentContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    stationAddressContainer: {
        marginTop: 10,
        backgroundColor: colors.white,
        height: 100,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    stationAddressLeftContainer: {
        flex: 1,
    },
    stationAddressRightContainer: {
        width: 60,
        height: 60,
        backgroundColor: colors.primary1,
        margin: 20,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stationInfoContainer: {
        flex: 1,
        backgroundColor: colors.white,
        marginTop: 10,
        paddingLeft: 10,
        paddingTop: 10,
        minHeight: 150,
    },
    title:{
        fontSize: 17,
        color: colors.primary1,
    },
    address: {
        fontSize: 15,
        color: colors.grey3,
    },
    navigate:{
        fontSize: 14,
        color: colors.white,
    },
    info: {
        fontSize: 15,
        color: colors.grey3,
    },
});

export default styles;