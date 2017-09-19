import React, {Component} from 'react';
import {View, Animated, Text} from 'react-native';
import styles from './styles';
import {Avatar} from 'react-native-elements';
import colors from '../../Common/colors';
import {screenHeight, screenWidth} from "../../Common/styles";
import {NavigationActions} from 'react-navigation';

class CPAWelcomePage extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
    }

    componentWillMount() {
        this._animatedColorValue = new Animated.Value(0);
        this._animatedRotateValue = new Animated.Value(0);
        this._animatedMovingValue = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.timing(this._animatedColorValue, {
            toValue: 100,
            duration: 1000,
        }).start();

        Animated.timing(this._animatedRotateValue, {
            toValue: 100,
            delay: 1000,
            duration: 1000,
        }).start();

        Animated.timing(this._animatedMovingValue, {
            toValue: 100,
            duration: 1000,
        }).start();

        this._timer = setTimeout(() => {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Home'})
                ]
            });
            this.props.navigation.dispatch(resetAction);
        }, 2000);
    }

    componentWillUpdate() {
        clearTimeout(this._timer);
    }

    render() {
        let interpolatedColorAnimation = this._animatedColorValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['#000000', colors.theme1]
        });

        let interpolatedRotateAnimation = this._animatedRotateValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '360deg']
        });

        let startX = screenWidth/2;
        let endX = 0;
        let interpolatedMovingXAnimation = this._animatedMovingValue.interpolate({
            inputRange: [0, 100],
            outputRange: [startX, endX]
        });

        return (
            <View style={styles.container}>
                <Animated.View style={[styles.wholeContainer, {backgroundColor: interpolatedColorAnimation}]}>
                    <Animated.View style={[styles.logoContainer,
                        {transform: [{translateX: interpolatedMovingXAnimation}]}]}>
                        <Animated.View style={[styles.logo, {transform: [{rotate: interpolatedRotateAnimation}]}]}>
                            <Avatar width={130} height={130}
                                    rounded
                                    onPress={this._changeAvatar}
                                    activeOpacity={0.7}
                                    source={require('../../Resources/Images/homebk.png')}
                            />
                        </Animated.View>
                        <Text style={styles.appInfo}>
                            充电桩APP
                        </Text>
                    </Animated.View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.companyInfo}>
                            北京索英电气技术有限公司
                            {'\r\n'}
                            <Text>
                                CopyRight©2002-2017
                            </Text>
                        </Text>
                    </View>
                </Animated.View>
            </View>
        );
    }
}

export default CPAWelcomePage;