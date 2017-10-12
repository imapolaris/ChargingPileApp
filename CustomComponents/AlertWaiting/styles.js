import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';
import {screenHeight, screenWidth} from "../../Common/styles";

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContainer: {
        backgroundColor: colors.transparent,
        //opacity: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        //height: screenWidth / 2,
        //width: screenWidth / 2,
        //borderRadius: screenWidth / 4,
    },
    centering: {

    },
    info: {
        fontSize: 15,
        color: colors.white,
        marginTop: 20,
        marginBottom: 10,
        opacity: 1,
    },
    close: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 5,
        backgroundColor: colors.transparent,
    },
});

export default  styles;