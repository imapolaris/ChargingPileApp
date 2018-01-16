import {aliPay, getWalletBalance, makeOneCharge, wxPay} from "../common/webapi";
import * as WeChat from "react-native-wechat";
import Alipay from "react-native-yunpeng-alipay";

export const QUERY_WALLET_INFO_COMPLETED_ACTION = 'QUERY_WALLET_INFO_COMPLETED';// 查询钱包信息
export const PAY_BY_WX_COMPLETED_ACTION = 'PAY_BY_WX_COMPLETED';// 微信充值
export const PAY_BY_ZFB_COMPLETED_ACTION = 'PAY_BY_ZFB_COMPLETED';// 支付宝充值

function queryWalletInfoCompleted(data) {
    return {
        type: QUERY_WALLET_INFO_COMPLETED_ACTION,
        data
    };
}

export function doQueryWalletInfo() {
    return (dispatch, getState) => {
        //dispatch(startRequestWeb());
        const {userId} = getState().user;
        getWalletBalance(userId)
            .then(ret => {
                //dispatch(completeRequestWeb());
                if (ret.result === true) {
                    dispatch(queryWalletInfoCompleted(ret.data));
                } else {

                }
            })
            .catch(error => {
                console.log(error);
                //dispatch(completeRequestWeb());
            });
    }
}

function payByWxCompleted(money) {
    return {
        type: PAY_BY_WX_COMPLETED_ACTION,
        money,
    };
}

export function doPayByWx(money) {
    return (dispatch, getState) => {
        //dispatch(startRequestWeb());
        const {userId} = getState().user;

        wxPay()
            .then(ret => {
                //dispatch(completeRequestWeb());
                let resp = JSON.parse(ret);
                let paydata = {
                    partnerId: resp.partnerid, /*商家向财付通申请的商家id*/
                    prepayId: resp.prepayid, /*预支付订单*/
                    nonceStr: resp.noncestr, /*随机串，防重发*/
                    timeStamp: resp.timestamp, /*时间戳，防重发*/
                    package: resp.package, /*商家根据财付通文档填写的数据和签名*/
                    sign: resp.sign, /*商家根据微信开放平台文档对数据做的签名*/
                };
                console.log(`预支付结果：${ret}`);
                WeChat.pay(paydata)
                    .then(res => {
                        console.log(`调用微信接口返回：${res}`);
                        makeOneCharge(userId, money, "微信支付")
                            .then(result => {
                                dispatch(payByWxCompleted(result.data));
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }, err => {
                        console.log(`调用微信接口报错：${err}`);
                    });


            })
            .catch(error => {
                console.log(error);
                //dispatch(completeRequestWeb());
            });
    }
}

function payByZfbCompleted(money) {
    return {
        type: PAY_BY_ZFB_COMPLETED_ACTION,
        money
    };
}

export function doPayByZfb(money) {
    return (dispatch, getState) => {
        //dispatch(startRequestWeb());
        aliPay()
            .then(data => {
                Alipay.pay(data)
                    .then(ret => {
                            console.log(JSON.stringify(ret));

                            const {userId} = getState().user;
                            makeOneCharge(userId, money, "支付宝支付")
                                .then(res => {
                                    //dispatch(completeRequestWeb());
                                    if (res.result) {
                                        dispatch(payByZfbCompleted(res.data));
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    //dispatch(completeRequestWeb());
                                });
                        },
                        err => console.log(err)
                    )
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }
}