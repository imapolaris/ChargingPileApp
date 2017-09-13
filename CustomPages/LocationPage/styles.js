import {StyleSheet, Dimensions} from 'react-native';

const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {

    },
    contentContainer: {
        width: width,
        backgroundColor: 'white',
    },
    letters: {
        position: 'absolute',
        height: height,
        top: 15,
        bottom: 0,
        right: 8,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    letter: {
        height: height*3.3/100,
        width: width*3/50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letterText: {
        textAlign: 'center',
        fontSize: height*1.1/50,
        color:'rgb(40,169,185)'
    },
    rowData:{
        borderBottomColor:'#faf0e6',
        borderBottomWidth:0.5,
        justifyContent: 'center',
        flex: 1,
    },
    rowDataText:{
        color:'gray',
    },
});

export default styles;
