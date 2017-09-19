import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

export const SECTIONHEIGHT=30, ROWHEIGHT=40;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search:{
        flex: 1,
        backgroundColor:'transparent',
    },
    searchInput:{
        backgroundColor: colors.white,
    },
    cancel: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginLeft: 5,
    },
    searchResultContainer: {

    },
    searchHistoryContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    searchOptionsContainer: {

    },
    searchResult: {
    },
    item: {
        height: ROWHEIGHT,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 30,
        backgroundColor: colors.white,
    },
    rowData:{
        borderBottomColor:'#faf0e6',
        borderBottomWidth:0.5,
        justifyContent: 'center',
        flex: 1,
    },
    rowDataText:{
        color:'gray',
        fontSize: 15,
    },
    historyTitle: {
        alignItems: 'center',
    },
});

export default styles;