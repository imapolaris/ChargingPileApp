import React, {Component} from 'react';
import {StyleSheet, View, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import CPAStackNavigator from "./components/navigators";
import WaitingNotice from "./components/waitingnotice";
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import * as WeChat from 'react-native-wechat';
import {WxAppId} from "./common/constants";

class Root extends Component{
    componentWillMount() {
        this._registerWeChat();
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);

        WeChat.removeAllListeners();
    }

    _registerWeChat = () => {
        WeChat.registerApp(WxAppId);

        WeChat.addListener('PayReq.Resp', this._payResp);
    };

    _payResp = (response) => {
        alert(JSON.stringify(response));
    };

    _onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        const {isFetching, dispatch, nav} = this.props;
        console.log(nav);

        return (
            <View style={styles.container}>
                <CPAStackNavigator navigation={addNavigationHelpers({dispatch, state:nav})} />

                <WaitingNotice visible={isFetching}/>
            </View>
        );
    }
}

Root.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isFetching: state.web.isFetching,
        nav: state.nav,
    }
}

export default connect(mapStateToProps)(Root);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});