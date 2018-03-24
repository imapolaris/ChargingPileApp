import {StyleSheet} from "react-native";
import colors from "./colors";
import {screenHeight, screenWidth} from "./constants";

export const shadowStyle = {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
        height: StyleSheet.hairlineWidth,
    },
    elevation: 10,
};

export const textInputStyle = {
    borderWidth: 0.5,
    borderColor: '#C3C3C3',
    borderRadius: 6,
    paddingLeft: 25,
    backgroundColor: colors.white,
    paddingTop: 8,
    paddingBottom: 8,
};

export const maskStyle = {
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
};