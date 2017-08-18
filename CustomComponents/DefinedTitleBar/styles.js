import {StyleSheet, Platform} from 'react-native';


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
        justifyContent: 'center',
        alignItems:'center',
    },
    title:{
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    }
});

export default styles;