import React, {Component} from 'react';
import {View, Animated, Text} from 'react-native';

import styles from './styles';
import NavButton from "../NavButton/index";
import {SearchBar} from 'react-native-elements';

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
                    <NavButton label="北京"
                               style={styles.leftButton}
                               onPress={() => {
                        this.props.ToLocation();
                    }} />
                    <SearchBar ref={self => this._search = self}
                               containerStyle={styles.search}
                               inputStyle={styles.searchInput}
                               lightTheme
                               round
                               onChangeText={()=>{}}
                               placeholder='搜索...'
                               clearIcon={{color:'#86939e', name: 'clear'}}
                    />
                    <NavButton label='列表'
                               style={styles.rightButton}
                               onPress={() => {
                        this.props.ToList();
                    }} />
                </View>
            </Animated.View>
        );
    }
}

export default DefinedTitleBar;