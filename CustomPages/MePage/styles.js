import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoContainer:{
        height: 200,
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
        backgroundColor: 'transparent',
        color: '#FFFFFF',
    },
    login: {
        color: '#397af8',
    },
    register:{
        color: '#397af8',
    }
});

export default styles;