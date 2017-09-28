import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Platform,
    SectionList,
} from 'react-native';
import data from '../../Resources/Data/city';
import styles from './styles';
import {ToastAndroidCS} from "../../Common/functions";


// 26个英文字母（去掉O和V,这两个下面没有城市）
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"];

export default class List extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        that = this;
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity
                key={item.key}
                style={styles.item}
                onPress={()=>{
                    that._chooseCity(item.name);
                }}>
                <View style={styles.rowData}>
                    <Text style={styles.rowDataText}>
                        {item.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };

    _renderSectionHeader = ({section}) => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    {section.title}
                </Text>
            </View>
        )
    };

    // render right index Letters
    _renderLetters = (letter, index) => {
        return (
            <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => {
                this.scrollTo(index)
            }}>
                <View style={styles.letter}>
                    <Text style={styles.letterText}>{letter}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    //回调改变显示的城市
    _chooseCity = (cityName) => {
        this.props.chooseCity && this.props.chooseCity(cityName)
    };

    //touch right indexLetters, scroll the left
    scrollTo = (index) => {
        ToastAndroidCS(letters[index]);

        //alert(index);
        //this._sectionList.scrollToLocation({sectionIndex: 3, itemIndex: 0});
    };

    render() {
        return (
            <View style={styles.listContainer}>
                <SectionList
                    ref={self => this._sectionList=self}
                    refreshing={false}
                    sections={data}
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderSectionHeader}
                    enableEmptySections={true}
                />
               {/*<View style={styles.letters}>
                    {
                        letters.map((letter, index) => this._renderLetters(letter, index))
                    }
                </View>*/}
            </View>
        );
    }
};