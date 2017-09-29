import {StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from "../../Common/styles";
import colors from '../../Common/colors';

export const SECTIONHEIGHT=30, ROWHEIGHT=40;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        paddingRight: 30,
        backgroundColor: colors.white,
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
        fontSize: 15,
    },
    search: {
        flex: 1,
    },
    searchInput: {
        backgroundColor: colors.white,
    },
    searchContainer: {
        flexDirection: 'row',
    },
    cancelSearch: {
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancel: {
        fontSize: 15,
        color: colors.theme1,
    },
    locationContainerWhole: {
        height: 45,
    },
    locationContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
    },
    title: {
        fontSize: 16,
        color: colors.black,
    },
    cityName: {
        fontSize: 14,
        backgroundColor: 'transparent',
    },
    locationButton: {
        backgroundColor: colors.theme1,
        height: 35,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 3,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
    },
    locationIcon: {
        marginLeft: 3,
    },
    currentCityContainer: {

    },
    currentCities: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        justifyContent: 'space-around',
        padding: 15,
    },
    currentCity: {
        borderWidth: 0.5,
        borderColor: 'grey',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: colors.white,
    },
    searchResultContainer: {
        flex: 1,
    },
    searchResult: {

    },
    searchResultItem: {

    },
});

export default styles;
