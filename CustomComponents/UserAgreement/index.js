import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';

import styles from './styles';

class CPAUserAgreement extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render(){
        // for test.
        let content = '北京XXXX公司（以下简称“XXXX”）' +
            '在此特别提醒您（用户）在注册成为用户之前，' +
            '请认真阅读本《用户协议》（以下简称“协议”），' +
            '确保您充分理解本协议中各条款。' +
            '请您审慎阅读并选择接受或不接受本协议。' +
            '除非您接受本协议所有条款，' +
            '否则您无权注册、登录或使用本协议所涉服务。' +
            '您的注册、登录、使用等行为将视为对本协议的接受，' +
            '并同意接受本协议各项条款的约束。';
        for (let i=1; i<=10; i++){
            content += content;
        }


        return (
            <ScrollView style={styles.scrollview}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {this.props.title || '用户协议'}
                        </Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.content}>
                            {this.props.content || content}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default CPAUserAgreement;