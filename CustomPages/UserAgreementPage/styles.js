import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    scrollview:{
        flex: 1,
    },
    container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop:20,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 20,
    },
    titleContainer:{
        height: 45,
        //padding: 10,
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    contentContainer:{
        flex: 1,
    },
    content:{
        fontSize: 12,
    },
});

export default styles;