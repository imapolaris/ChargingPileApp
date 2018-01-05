'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Avatar} from "react-native-elements";

class CPAAboutUsPage extends Component{
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
                        北京索英电气技术有限公司
                    </Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text>
                        联系电话：010-5800000{'\r\n'}
                        地址：北京市海淀区永丰产业基地孵化器1区{'\r\n'}
                        邮箱：service@soaring.com.cn{'\r\n'}
                    </Text>
                </View>
            </View>
        );
    }
}

export default CPAAboutUsPage;

CPAAboutUsPage.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
        alignItems: 'center',
    },
});