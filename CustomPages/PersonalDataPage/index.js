import React, {Component} from 'react';
import {View, FlatList, ToastAndroid} from 'react-native';

import styles from './styles';

import {List, ListItem, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import LabelTextInputListItem from "../../CustomComponents/LabelTextInputListItem/index";

class CPAPersonalDataPage extends Component{
    _renderItem = ({item}) => {
        return (
            <LabelTextInputListItem label={item.label}
                                    placeholderText={item.placeholder}
            />
        );
    };

    _onPress = () => {
        //alert('alert');
        ToastAndroid.showWithGravity('修改成功',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER);
    };

    _onChangePwd = () => {
        alert('pwd');
    };

    render() {
        const data = [
            {key:1, label:'用户名', placeholder:'孙辉'},
            {key:2, label:'昵称', placeholder:'alex'},
            {key:3, label:'性别', placeholder:'男'},
            {key:4, label:'联系电话', placeholder:'13000000000'},
        ];

        const list = [
            {
                title: '修改密码',
                icon: {name:'lock', type:'simple-line-icon'},
                callback: this._onChangePwd,
            },
        ];

        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <FlatList style={styles.flatlist}
                              data={data}
                              renderItem={this._renderItem}
                    />

                    <List style={styles.list}>
                        {
                            list.map((item, i) => (
                                <ListItem key={i}
                                          title={item.title}
                                          leftIcon={item.icon}
                                          hideChevron={false}
                                          onPress={() => item.callback && item.callback()}
                                />
                            ))
                        }
                    </List>
                </View>

                <View style={styles.buttonContainer}>
                    <Button style={styles.button}
                            title="确认修改"
                            onPress={this._onPress}
                    />
                </View>
            </View>
        );
    }
}

export default CPAPersonalDataPage;