'use strict';

import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import colors from '../common/colors';
import {connect} from "react-redux";
import {doLoadHomePage} from "../redux/navactions";

class CPAWelcomePage extends Component{
    componentDidMount() {
        this._timer = setTimeout(() => {
            const {loadWelcomePage} = this.props;
            loadWelcomePage && loadWelcomePage();
        }, 1000);
    }

    componentWillUnmount() {
        this._timer && clearTimeout(this._timer);
    }

    render() {
        return (
            <ImageBackground source={require('../assets/images/background.png')} style={styles.container}>
                <View style={styles.wholeContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/tabIcons/welcomelogo.png')} style={styles.appLogo} />
                    </View>
                    <View style={{flex:1}} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.sloganInfo}>
                        EV无忧，绿色领跑
                        {'\r\n'}
                        <Text style={styles.companyInfo}>
                            www.evfort.com
                        </Text>
                    </Text>
                </View>
            </ImageBackground>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadWelcomePage: () => dispatch(doLoadHomePage()),
    }
}

export default connect(state=>state, mapDispatchToProps)(CPAWelcomePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wholeContainer: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appLogo: {
        width: 200,
        height: 60,
    },
    infoContainer: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sloganInfo: {
        color: colors.white,
        fontSize: 18,
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    companyInfo: {
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: 'normal',
    },
});