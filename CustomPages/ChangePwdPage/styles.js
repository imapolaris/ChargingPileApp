import {StyleSheet} from 'react-native';
import colors from '../../Common/colors';

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            paddingTop: 10,
        },
        listContainer:{

        },
        hintContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            height: 25,
        },
        buttonContainer:{
            justifyContent: 'center',
        },
        textInput: {
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
        },
        text: {
            color: colors.tintColor2,
        },
    }
);

export default styles;