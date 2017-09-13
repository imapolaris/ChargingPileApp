import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from "../../Common/styles";

export const SECTIONHEIGHT=30, ROWHEIGHT=40;

const styles = StyleSheet.create({
    container: {

    },
    listContainer: {
        height: screenHeight,
        marginBottom: 10,
    },
    contentContainer: {
        width: screenWidth,
        backgroundColor: 'white',
    },
    header: {
        height: SECTIONHEIGHT,
        justifyContent: 'center',
        paddingLeft: 5
    },
    headerTitle: {
        color: 'rgb(40,169,185)',
        fontWeight: 'bold',
        fontSize: 18,
    },
    item: {
        height: ROWHEIGHT,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 30
    },
    letters: {
        position: 'absolute',
        height: screenHeight,
        top: 15,
        bottom: 0,
        right: 8,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    letter: {
        height: screenHeight*3.3/100,
        width: screenWidth*3/50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letterText: {
        textAlign: 'center',
        fontSize: screenHeight*1.1/50,
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
