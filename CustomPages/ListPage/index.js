import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

import {StackNavigator} from 'react-navigation';

class CPAListPage extends Component{
    _onDetialsPress = () => {
        const {navigate} = this.props.navigation;
        navigate('Details');
    };

    _onNavPress = () => {
        const {navigate} = this.props.navigation;
        navigate('MapNav');
    };

    render() {
        return (
            <View>
                <Text>
                    Here is List Page!!!
                </Text>

                <Button title="详情"
                        onPress={this._onDetialsPress}/>

                <Button title="导航"
                        onPress={this._onNavPress} />
            </View>
        );
    }
}

export default CPAListPage;