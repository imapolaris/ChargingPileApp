import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';
import {List, ListItem} from 'react-native-elements';

class CPAWalletPage extends Component{
    // 查看充值记录
    _payRecords = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('PayRecords');
    };

    // 充值
    _actionPay = () => {
        const {navigate} = this.props.navigation;
        navigate && navigate('ActionPay');
    };

    render() {
        const list = [
            {
                title: '充值记录',
                icon: {name:'list', type:'simple-line-icon'},
                callback: this._payRecords,
            }
        ];

        return (
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <List style={styles.list}>
                        {
                            list.map((item, i) => (
                                <ListItem key={i}
                                          title={item.title}
                                          icon={item.icon}
                                          onPress={() => item.callback && item.callback()} />
                            ))
                        }
                    </List>
                </View>

                <View style={styles.balanceContainer}>
                    <Text style={styles.label}>
                        余额：
                    </Text>
                    <Text style={styles.money}>
                        {this.props.money || '89.32'}
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.charging}
                              onPress={this._actionPay}
                        >
                            充值
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
}

export default CPAWalletPage;