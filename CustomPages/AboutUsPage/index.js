import React, {Component} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import {Avatar} from 'react-native-elements';

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