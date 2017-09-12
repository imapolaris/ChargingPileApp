import {StyleSheet} from 'react-native';
import {NavButtonMarginN, NavButtonMarginW} from '../../Common/styles';
import colors from '../../Common/colors';

const styles = StyleSheet.create({
    navButton:{
        marginLeft: NavButtonMarginN,
        marginRight: NavButtonMarginW,
    },
    text: {
        fontSize: 16,
        color: colors.white,
    },
});

export default styles;