import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import colors from "../common/colors";
import {Divider} from 'react-native-elements';
import {screenWidth} from "../common/constants";

class KeyValPair extends Component{
    render() {
        const {horizontal} = this.props;

        return (
            <View style={[styles.container, this.props.containerStyle,
                            horizontal ? styles.containerHorizontal : null]}>
                <View style={horizontal ? styles.infoContainerHorizontal : styles.infoContainerVertical}>
                    <Text style={[styles.text, styles.titleStyle, this.props.titleStyle,
                                    horizontal ? styles.titleStyleHorizontal : null]}>
                        {this.props.title}
                    </Text>
                    <Text style={[styles.text, styles.valueStyle, this.props.valueStyle]}>
                        {this.props.val}
                    </Text>
                </View>
                {
                    horizontal ? <Divider style={{width: screenWidth}} /> : null
                }
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
    horizontal: false,
    title: '标题',
    val: '内容',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.transparent,
    },
    containerHorizontal: {
        alignItems: 'flex-start',
    },
    infoContainerVertical: {
        alignItems: 'center',
    },
    infoContainerHorizontal: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },
    text: {
        color: colors.white,
    },
    titleStyle: {
        fontSize: 16,
    },
    titleStyleHorizontal: {
        fontSize: 16,
        minWidth: 100,
    },
    valueStyle: {
        fontSize: 16,
    },
});