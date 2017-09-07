import React, {Component} from 'react';
import {View, Animated, Text} from 'react-native';

import styles from './styles';
import NavButton from "../NavButton/index";
import {SearchBar} from 'react-native-elements';

let inputSearchText = '';

class DefinedTitleBar extends Component{
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
                    <NavButton label="北京"
                               style={styles.leftButton}
                               onPress={()=>this.props.toLocation && this.props.toLocation()} />
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
                    <NavButton label='列表'
                               style={styles.rightButton}
                               onPress={()=>this.props.toList && this.props.ToList()} />
                </View>
            </Animated.View>
        );
    }
}

export default DefinedTitleBar;