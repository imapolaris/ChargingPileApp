import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';

import styles from './styles';

class CPAApplyForInvoicePage extends Component{
    render(){
        return (
            <View>
                <Text>
                    申请发票
                </Text>
            </View>
        );
    }
}

export class CPAInvoiceRecordPage extends Component{
    render() {
        return (
            <View>
                <Text>
                    开票历史
                </Text>
            </View>
        )
    }
}

export default CPAApplyForInvoicePage;