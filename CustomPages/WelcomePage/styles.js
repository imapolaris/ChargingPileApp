import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.theme1,
    },
    wholeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    appInfo: {
        color: colors.white,
        fontSize: 22,
        marginTop: 15,
        textAlign: 'center',
    },
    infoContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    companyInfo: {
        color: colors.white,
        fontSize: 14,
        textAlign: 'center',
    },
});

export default styles;