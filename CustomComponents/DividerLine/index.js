import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Divider} from 'react-native-elements';

class DividerLine extends Component{
    render() {
        return (
            <Divider style={[styles.divider, this.props.style]} />
        );
    }
}

const styles = StyleSheet.create({
    divider: {
        backgroundColor: '#419b3a',
    }
});

export default DividerLine;