import {Dimensions, StyleSheet} from 'react-native';


export const NavButtonMarginW = 15;
export const NavButtonMarginN = 10;

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const shadowStyle = {
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
        height: 5,
    },
};
