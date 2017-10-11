import React, {Component} from 'react';
import {View, Animated, Text, Keyboard} from 'react-native';

import styles from './styles';
import NavButton from "../NavButton/index";
import {SearchBar} from 'react-native-elements';

class DefinedTitleBar extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            leftLabel: '北京',
        };
    }

    _toSearch = () => {
        this.props.search &&
        this.props.search();
    };

    _showLeftLabel(label) {
        if (label.length > 2)
        {
            return label.substring(0, 2) + "..";
        } else {
            return label;
        }
    };

    blur(){
        this._search.blur();
    };

    render() {
        const {style} = this.props;

        return (
            <Animated.View style={[styles.container, style]}>
                <View style={styles.appBar}>
                    <NavButton label={this._showLeftLabel.bind(this, this.state.leftLabel)()}
                               style={styles.leftButton}
                               onPress={this.props.toLocation && this.props.toLocation}
                               showIcon={true}
                               icon={this.props.icon} />
                    <SearchBar ref={self => this._search = self}
                               containerStyle={styles.search}
                               inputStyle={styles.searchInput}
                               lightTheme
                               round
                               placeholder='搜索...'
                               onFocus={this._toSearch}
                    />
                    <NavButton label={this.props.rightLabel}
                               style={styles.rightButton}
                               disabledStyle={this.props.disableRightLabel ? styles.disabled : null}
                               onPress={()=>{!this.props.disableRightLabel && this.props.toList && this.props.toList();}} />
                </View>
            </Animated.View>
        );
    }
}



export default DefinedTitleBar;