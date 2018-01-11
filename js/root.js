import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import CPAStackNavigator from "./components/navigators";
import WaitingNotice from "./components/waitingnotice";

class Root extends Component{
    render() {
        const {isFetching} = this.props;

        return (
            <View style={styles.container}>
                <CPAStackNavigator />

                <WaitingNotice visible={isFetching}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.web.isFetching,
    }
}

export default connect(mapStateToProps)(Root);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});