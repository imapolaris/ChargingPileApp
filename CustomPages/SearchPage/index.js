import React, {Component} from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native';
import DefinedTitleBar from "../../CustomComponents/DefinedTitleBar/index";

class CPASearchPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            searchState: false,
            searchResult: [],
        };
    }

    _toCancel = ()=>{

    };

    _renderItem = ({item})=>{

    };

    render() {
        return (
            <View>
                <DefinedTitleBar/>

                <View>
                    <FlatList />
                </View>
            </View>
        );
    }
}

export default CPASearchPage;