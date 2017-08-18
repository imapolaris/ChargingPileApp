import React, {Component} from 'react';
import {View, Animated, Text} from 'react-native';

import styles from './styles';
import NavButton from "../NavButton/index";

class DefinedTitleBar extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
    }

    render() {
        const {style} = this.props;

        return (
            <Animated.View style={[styles.container, style]}>
                <View style={styles.appBar}>
                    <NavButton label="北京" onPress={() => {
                        this.props.ToLocation();
                    }} />
                    <Text style={styles.title}>
                        Header
                    </Text>
                    <NavButton label="列表" onPress={() => {
                        this.props.ToList();
                    }} />
                </View>
            </Animated.View>
        );
    }
}

export default DefinedTitleBar;