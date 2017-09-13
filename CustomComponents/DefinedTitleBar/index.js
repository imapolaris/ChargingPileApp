import React, {Component} from 'react';
import {View, Animated, Text} from 'react-native';

import styles from './styles';
import NavButton from "../NavButton/index";
import {SearchBar} from 'react-native-elements';

let inputSearchText = '';

class DefinedTitleBar extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            leftLabel: '北京',
            rightLabel: '附近',
        };
    }

    _toSearch = () => {
        if ((inputSearchText || '').length <= 0)
            return;

        this.props.search &&
        this.props.search(inputSearchText);
    };

    render() {
        const {style} = this.props;

        return (
            <Animated.View style={[styles.container, style]}>
                <View style={styles.appBar}>
                    <NavButton label={this.state.leftLabel}
                               style={styles.leftButton}
                               onPress={this.props.toLocation && this.props.toLocation} />
                    <SearchBar ref={self => this._search = self}
                               containerStyle={styles.search}
                               inputStyle={styles.searchInput}
                               lightTheme
                               round
                               onChangeText={(e)=>inputSearchText=e}
                               placeholder='搜索...'
                               clearIcon={{color:'#86939e', name: 'clear'}}
                               onSubmitEditing={this._toSearch}
                    />
                    <NavButton label={this.state.rightLabel}
                               style={styles.rightButton}
                               onPress={this.props.toList && this.props.toList} />
                </View>
            </Animated.View>
        );
    }
}

export default DefinedTitleBar;