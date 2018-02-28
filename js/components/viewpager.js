'use strict';

import React, {Component} from 'react';
import {StyleSheet, ViewPagerAndroid, ScrollView, Platform, View} from 'react-native';
import {IOSPlatform} from "../common/constants";

class ViewPager extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: this.props.selectedIndex,
            initialSelectedIndex: this.props.selectedIndex,
        };
    }

    renderIOS = () => {
        return (
            <ScrollView style={styles.container}
                        contentOffset={{x: 0, y: 0}}
                        horizontal={true}
                        pagingEnabled={true}
                        scrollsToTop={false}

                        onLayout={()=>{}} />
        )
    };

    renderAndroid = () => {
        const {renderContent} = this.props;

        return (
            <ViewPagerAndroid style={styles.container}
                              initialPage={0}
                              onPageSelected={()=>{}}>
                {renderContent}
            </ViewPagerAndroid>
        );
    };

    render() {
        if (Platform.OS === IOSPlatform)
            return this.renderIOS();
        else
            return this.renderAndroid();
    }
}

export default ViewPager;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
