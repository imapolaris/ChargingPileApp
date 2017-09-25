import React, {Component} from 'react';
import {View, FlatList, ToastAndroid} from 'react-native';

import styles from './styles';
import LabelTextInputListItem from "../../CustomComponents/LabelTextInputListItem/index";
import {Button} from 'react-native-elements';

class CPAChangePwdPage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            oldPwd: '',
            oldPwdAgain: '',
            newPwd: '',
        };
    }

    _renderItem = ({item}) => {
        return (
            <LabelTextInputListItem label={item.label}
                                    placeholderText={item.placeholder}
                                    isSecure={item.secure}
            />
        );
    };

    _onPress = () => {
        ToastAndroid.show('修改成功！',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER);

        const {goBack} = this.props.navigation;
        goBack && goBack();
    };

    render() {
        const data = [
            {key:1, label:'原密码', placeholder:'', secure:true},
            {key:2, label:'新密码', placeholder:'', secure:true},
            {key:3, label:'再输一遍', placeholder:'', secure:true},
        ];

        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <FlatList data={data}
                              renderItem={this._renderItem}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="确认修改"
                            onPress={this._onPress}
                            />
                </View>
            </View>
        );
    }
}

export default CPAChangePwdPage;