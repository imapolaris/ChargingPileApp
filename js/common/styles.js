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
    borderRadius: 25,
    paddingLeft: 25,
    backgroundColor: colors.white,
};

export const maskStyle = {
    backgroundColor: "#000000",
    opacity: 0.6,
    position: "absolute",
    width: screenWidth,
    height: screenHeight,
};