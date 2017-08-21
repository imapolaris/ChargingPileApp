import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
    },
    infoContainer:{
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    avatarContainer:{
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    textInput:{
        borderWidth: 0.5,
        borderColor: '#C3C3C3',
        marginTop: 10,
    },
    buttonContainer:{
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button:{
        width: 200,
    },
    text:{
        marginTop: 5,
        color: '#00FFFF',
    },
});

export default styles;