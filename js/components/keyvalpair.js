import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import colors from "../common/colors";

class KeyValPair extends Component{
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <Text style={[styles.text, styles.titleStyle, this.props.titleStyle]}>
                    {this.props.title}
                </Text>
                <Text style={[styles.text, styles.valueStyle, this.props.valueStyle]}>
                    {this.props.val}
                </Text>
            </View>
        );
    }
}

export default KeyValPair;

KeyValPair.propTypes = {
    title: PropTypes.string.isRequired,
    //val: PropTypes.object.isRequired,
};

KeyValPair.defaultProps = {
    title: '标题',
    val: '内容'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.transparent,
    },
    text: {
        color: colors.white,
    },
    titleStyle: {
        fontSize: 16,
    },
    valueStyle: {
        fontSize: 16,
    },
});