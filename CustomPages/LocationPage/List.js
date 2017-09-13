import React, {Component} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Modal,
    Text,
    ListView,
    Platform,
    Dimensions,
    StyleSheet,
    Alert,
    SectionList,
} from 'react-native';
import _ from 'lodash';
import data from '../../Resources/Data/city.json';
import styles from './styles';
import ToastUtil from "../../Demo/ToastUtil";

const SECTIONHEIGHT = 30,ROWHEIGHT = 40;
// 这是利用lodash的range和数组的map画出26个英文字母
const letters = _
    .range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1)
    .map(n => String.fromCharCode(n).substr(0));
    _.pull(letters,'O','V'); // 去掉o和V,这两个下面没有城市
let city=[]; // 城市的数组
let totalHeight=[]; // 每个字母对应的城市和字母的总高度
let that = null;

export default class List extends Component {
    constructor(props) {
        super(props);
        let getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };
        let getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[rowID];
        };
        this.state = {
            dataSource: new ListView.DataSource({
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }),
        };
        that = this
    }

    componentWillMount() {
        //把城市放到对应的字母中
        for (let j = 0; j < letters.length; j++) {
            let each = [];
            for (let i = 0; i < data.CITIES.length; i++) {
                if (letters[j] == data.CITIES[i].name_en.substr(0, 1)) {
                    each.push(data.CITIES[i].name);
                }
            }
            let _city = {};
            _city.index = letters[j];
            _city.name = each;
            city.push(_city);
        }
    }

    componentDidMount() {
        let dataBlob = {};
        let sectionIDs = [];
        let rowIDs = [];

        for (let ii = 0; ii < city.length; ii++) {
            let sectionName = 'Section ' + ii;
            sectionIDs.push(sectionName);
            dataBlob[sectionName] = letters[ii];
            rowIDs[ii] = [];

            for (let j = 0; j < city[ii].name.length; j++) {
                let rowName = ii + '-' + j;
                rowIDs[ii].push(rowName);
                dataBlob[rowName] = city[ii].name[j]
            }
            //计算每个字母和下面城市的总高度，递增放到数组中
            // var eachheight = this.props.sectionHeight+this.props.rowHeight*newcity.length
            let eachheight = SECTIONHEIGHT + ROWHEIGHT * city[ii].name.length;
            totalHeight.push(eachheight)
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        })
    }

    renderRow(rowData, rowId) {
        return (
            <TouchableOpacity
                key={rowId}
                style={{height: ROWHEIGHT, justifyContent: 'center', paddingLeft: 20, paddingRight: 30}}
                onPress={() => {
                    this._chooseCity.bind(this, rowData)
                }}>
                <View style={styles.rowData}>
                    <Text style={styles.rowDataText}>
                        {rowData}
                    </Text>
                </View>

            </TouchableOpacity>
        )
    }

    renderSectionHeader = (sectionData, sectionID) => {
        return (
            <View style={{height: SECTIONHEIGHT, justifyContent: 'center', paddingLeft: 5}}>
                <Text style={{color: 'rgb(40,169,185)', fontWeight: 'bold'}}>
                    {sectionData}
                </Text>
            </View>
        )
    };

    // render right index Letters
    renderLetters(letter, index) {
        return (
            <TouchableOpacity key={index} activeOpacity={0.6} onPress={() => {
                this.scrollTo(index)
            }}>
                <View style={styles.letter}>
                    <Text style={styles.letterText}>{letter}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    //回调改变显示的城市
    _chooseCity(cityName) {
        this.props.changeCity && this.props.changeCity(cityName)
    };

    //touch right indexLetters, scroll the left
    scrollTo = (index) => {


        let position = 0;
        for (let i = 0; i < index; i++) {
            position += totalHeight[i]
        }
        this._listView.scrollTo({
            y: position
        })
    };

    render() {
        return (
            <View style={{height: Dimensions.get('window').height, marginBottom: 10}}>
                <ListView
                    contentContainerStyle={styles.contentContainer}
                    ref={self => this._listView = self}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    enableEmptySections={true}
                    initialListSize={500}

                />
                <View style={styles.letters}>
                    {letters.map((letter, index) => this.renderLetters(letter, index))}
                </View>
            </View>
        );
    }
};