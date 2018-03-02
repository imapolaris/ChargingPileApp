'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from "react-native-elements";
import colors from "../common/colors";
import {makeCall, prompt2, sendEmail} from "../common/functions";

const CompanyName = '北京索英电气技术有限公司';
const CompanyAddress = '北京市海淀区永丰产业基地孵化器1区';
const ContactNumber = '13269734774';
const Email = 'service@soaring.com.cn';
class CPAAboutUsPage extends Component{
    _makeOneCall = (phoneNumber) => {
        prompt2('提示', `要呼叫 ${phoneNumber} 吗？`,
            ()=>{},
            ()=>{
                makeCall(phoneNumber);
            });
    };

    _sendEmail = (email) => {
        prompt2('提示', `发送邮件到 ${email}？`,
            ()=>{},
            ()=>{
                sendEmail(email);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <Avatar xlarge
                            rounded
                            source={require('../../Resources/Images/homebk.png')}
                            activeOpacity={0.7}
                    />

                    <Text style={styles.company}>
                        {CompanyName}
                    </Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.info}>
                        联系电话：
                        <Text style={styles.contact}
                              onPress={()=>this._makeOneCall(ContactNumber)}>
                            {ContactNumber}
                        </Text>
                        {'\r\n'}
                    </Text>
                    <Text style={styles.info}>地址：{CompanyAddress}{'\r\n'}</Text>
                    <Text style={styles.info}>
                        邮箱：
                        <Text style={styles.email} onPress={()=>this._sendEmail(Email)}>
                            {Email}
                        </Text>
                        {'\r\n'}
                        </Text>
                </View>
            </View>
        );
    }
}

export default CPAAboutUsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        margin: 5,
        alignItems: 'center',
    },
    avatar: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    company: {
        marginTop: 20,
        fontSize: 16,
    },
    detailsContainer:{
        flex: 1,
        alignItems: 'flex-start',
    },
    info: {
        textAlign: 'left',
        fontSize: 15,
        marginTop: 5,
    },
    contact: {
        color: colors.primary2,
        textDecorationLine:'underline',
    },
    email: {
        color: colors.primary2,
        textDecorationLine:'underline',
    },
});