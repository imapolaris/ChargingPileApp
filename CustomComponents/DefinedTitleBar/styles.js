import {StyleSheet, Platform} from 'react-native';

import {NavButtonMarginN, NavButtonMarginW} from '../../Common/styles';
import colors from '../../Common/colors';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

const styles = StyleSheet.create({
    container: {
        paddingTop: STATUSBAR_HEIGHT,
        backgroundColor: Platform.OS === 'ios' ? '#EFEFF2' : '#FFF',
        height: STATUSBAR_HEIGHT + APPBAR_HEIGHT,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: StyleSheet.hairlineWidth,
        },
        elevation: 4,
    },
    appBar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.theme1,
    },
    search:{
        flex: 1,
        backgroundColor:'transparent',
    },
    searchInput:{

    },
    leftButton:{
        alignItems:'flex-start',
        marginLeft: NavButtonMarginW,
        marginRight: NavButtonMarginN,
        justifyContent: 'center',
    },
    rightButton:{
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});

export default styles;