import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer:{
        height: 150,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    backgroundImage:{
        flex: 1,
        resizeMode: 'cover',
        height: undefined,
        width: undefined,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list:{
        paddingTop:0
    },
    settings:{
        justifyContent: 'flex-start',
        marginBottom: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#BBBBBB',
        marginTop: 30,
    },
    text: {
        fontSize: 16,
        margin: 5,
        color: '#FFFFFF',
        backgroundColor: 'transparent',
    },
    login: {
        color: '#FFFFFF',
    }
});

export default styles;