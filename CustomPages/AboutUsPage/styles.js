import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    avatar: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    company: {
        marginTop: 20,
        fontSize: 16,
    },
    detailsContainer:{
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
    },
});

export default styles;