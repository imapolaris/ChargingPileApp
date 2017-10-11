import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';
import {screenWidth} from "../../Common/styles";

const Size = 39;
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    map: {
        flex: 1,
    },
    icon: {
        position: "absolute",
        backgroundColor: "transparent",
        elevation: 4,
    },
    location: {
        justifyContent: "flex-end",
        alignItems: 'flex-start',
        bottom: 6,
        left: 6,
        right: 0,
        top: 0,
    },
    iconContainer: {
        width: Size,
        height: Size,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.2,
        borderColor: colors.grey4,
    },
    traffic: {
        justifyContent: "flex-end",
        alignItems: 'flex-end',
        bottom: 2*Size+20,
        left: 0,
        right: 6,
        top: 0,
    },
    refresh: {
        justifyContent: "flex-end",
        alignItems: 'flex-start',
        bottom: 6+Size,
        left: 6,
        right: 0,
        top: 0,
    },
    banner: {
        bottom: 0,
        left: 5,
        right: 5,
        top: 10,
        position: 'absolute',
        width: screenWidth - 10,
        height: 90,
        backgroundColor: colors.primary1,
        //borderRadius: 10,
        zIndex: 9999,
    },
    bannerContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    bannerTextColor: {
        color: colors.white,
    },
    bannerTitle: {
        fontSize: 16,
    },
    bannerAddress: {
        fontSize: 12,
    },
    bannerText: {
        fontSize: 16,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 45,
        alignItems: 'center',
    },
    titleLeftContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    titleRightContainer: {
        width: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    time: {
        fontSize: 20,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        backgroundColor: colors.tintColor2,
        borderRadius: 15,
    },
    divider: {
        backgroundColor: colors.white,
    },
    chargingBanner: {
        bottom: 0,
        left: 5,
        right: 5,
        top: 10,
        position: 'absolute',
        width: screenWidth - 10,
        height: 50,
        backgroundColor: colors.primary1,
        zIndex: 9999,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    chargingInfoLeftContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chargingInfoRightContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.tintColor2,
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    chargingBannerText: {
        fontSize: 16,
    },
});

export default styles;