import {StyleSheet, Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');
const [left, top] = [0, 0];
export const [aWidth] = [width];
export const [middleLeft] = [(width - aWidth) / 2];

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },
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
    // 提示标题
    tipTitleView: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10
    },
    // 提示文字
    tipTitleText: {
        color: "#999999",
        fontSize: 14,
    },
    // 分割线
    tipContentView: {
        width: aWidth,
        height: 56,
        backgroundColor:'#fff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    item:{
        width: aWidth,
        height: 56,
        backgroundColor:'#fff',
        justifyContent: 'center',
        borderRadius: 5,
    },
    button: {
        height: 57,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 5,
    },
    // 取消按钮
    buttonText: {
        fontSize: 17,
        color: "#0084ff",
        textAlign: "center",
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    cancelButton:{
        width:aWidth,
        alignSelf:'center',
        marginTop:8
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
});

export default styles;