import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../Common/colors';

export const {width, height} = Dimensions.get('window');
const [left, top] = [0, 0];
export const [aWidth] = [width];

const styles = StyleSheet.create({
    mask: {
        justifyContent: "center",
        backgroundColor: "#000000",
        opacity: 0.1,
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 200,
        width: aWidth,
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    titleContainer: {
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
    },
    title: {
        fontSize: 20,
    },
    infoContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingTop: 15,
        justifyContent: 'flex-start',
    },
    info: {
        fontSize: 16,
    },
    actionContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
        borderLeftWidth: 1,
        borderRightWidth: 0.5,
        borderColor: '#C3C3C3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: 5,
        fontSize: 20,
        padding: 10,
        color: colors.theme1,
    },
    divider: {
        backgroundColor: '#C3C3C3',
    }
});

export default styles;