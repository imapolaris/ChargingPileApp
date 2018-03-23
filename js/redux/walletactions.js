import {
    aliPay, clearRechargeRecords, getWalletBalance, makeOneCharge, queryRechargeRecords,
    wxPay
} from "../common/webapi";
import * as WeChat from "react-native-wechat";
import Alipay from "react-native-yunpeng-alipay";
import {completeRequestWeb, startRequestWeb} from "./webactions";
import {ToastBS} from "../common/functions";
import {PayWay} from "../common/constants";

export const QUERY_WALLET_INFO_COMPLETED_ACTION = 'QUERY_WALLET_INFO_COMPLETED';// 查询钱包信息
export const PAY_BY_WX_COMPLETED_ACTION = 'PAY_BY_WX_COMPLETED';// 微信充值
export const PAY_BY_ZFB_COMPLETED_ACTION = 'PAY_BY_ZFB_COMPLETED';// 支付宝充值
export const SAVE_UNFINISHED_PAY_RECORD_ACTION = 'SAVE_UNFINISHED_PAY_RECORD';// 保存未推送成功的充值账单
export const PUSH_UNFINISHED_PAY_RECORD_ACTION = 'PUSH_UNFINISHED_PAY_RECORD';// 推送未完成的充值账单

function queryWalletInfoCompleted(data) {
    return {
        type: QUERY_WALLET_INFO_COMPLETED_ACTION,
        data
    };
}

export function doQueryWalletInfo() {
    return (dispatch, getState) => {
        //dispatch(startRequestWeb('正在加载钱包信息...'));
        const {userId} = getState().user;
        getWalletBalance(userId)
            .then(ret => {
                //dispatch(completeRequestWeb());
                if (ret.result === true) {
                    dispatch(queryWalletInfoCompleted(ret.data));
                } else {
                    ToastBS(ret.message);
                }
            })
            .catch(error => {
                console.log(error);
                //dispatch(completeRequestWeb());
            });
    }
}

export function doQueryRechargeRecords() {
    return (dispatch, getState) => {
        const {userId} = getState().user;

        dispatch(startRequestWeb());
        return queryRechargeRecords(userId)
            .then(ret=>{
                dispatch(completeRequestWeb());
                return ret;
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                ToastBS(`${err}`);
                console.log(err);
            })
    }
}

export function doClearRechargeRecords() {
    return (dispatch, getState) => {
        const {userId} = getState().user;

        dispatch(startRequestWeb('正在删除...'));
        return clearRechargeRecords(userId)
            .then(ret=>{
                dispatch(completeRequestWeb());
                if (ret.result) {
                    ToastBS('操作完成！')
                } else {
                    ToastBS('操作失败！');
                }

                return ret.result;
            })
            .catch(err=>{
                dispatch(completeRequestWeb());
                ToastBS(`${err}`);
                console.log(err);
            })
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
        wxPay(money, userId)
            .then(ret => {
                //dispatch(completeRequestWeb());
                if (ret.result) {
                    let resp = JSON.parse(ret.data);
                    let paydata = {
                        partnerId: resp.partnerid, /*商家向财付通申请的商家id*/
                        prepayId: resp.prepayid, /*预支付订单*/
                        nonceStr: resp.noncestr, /*随机串，防重发*/
                        timeStamp: resp.timestamp, /*时间戳，防重发*/
                        package: resp.package, /*商家根据财付通文档填写的数据和签名*/
                        sign: resp.sign, /*商家根据微信开放平台文档对数据做的签名*/
                    };
                    console.log(`预支付结果：${ret.data}`);
                    WeChat.pay(paydata)
                        .then(res => {
                            console.log(`调用微信接口返回：${JSON.stringify(res)}`);
                            let tradeno = resp.tradeno;
                            makeOneCharge(userId, money, PayWay.WxPay, tradeno)
                                .then(result => {
                                    if (result.result) {
                                        dispatch(payByWxCompleted(result.data));
                                    } else {
                                        ToastBS(result.message);
                                        // 保存充值账单，方便进行重传
                                        dispatch(saveUnfinishedPayRecord({userId, money, payway: PayWay.WxPay, tradeno}));
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    ToastBS(`${error}`);

                                    // 保存充值账单，方便进行重传
                                    dispatch(saveUnfinishedPayRecord({userId, money, payway: PayWay.WxPay, tradeno}));
                                });
                        }, err => {
                            console.log(`调用微信接口报错：${err}`);
                            //ToastBS(`${err}`);
                            ToastBS('支付失败！');
                        });
                } else {
                    console.log(ret.message);
                    ToastBS(ret.message);
                }
            })
            .catch(error => {
                console.log(error);
                ToastBS(`${error}`);
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
        const {userId} = getState().user;
        aliPay(money, userId)
            .then(pre => {
                console.log(`预支付结果：${JSON.stringify(pre)}`);
                if (pre.result) {
                    let tradeno = pre.data.OutTradeNo;
                    Alipay.pay(pre.data.Body)
                        .then(pay => {
                            console.log(`支付结果：${pay}`);
                            let status = JSON.parse(pay);
                            switch (status.resultStatus) {
                                case "9000":
                                    makeOneCharge(userId, money, PayWay.AliPay, tradeno)
                                        .then(ret => {
                                            //dispatch(completeRequestWeb());
                                            if (ret.result) {
                                                console.log('支付成功！');
                                                dispatch(payByZfbCompleted(ret.data));
                                            } else {
                                                ToastBS(ret.message);
                                                console.log(ret.message);

                                                // 保存充值账单，方便进行重传
                                                dispatch(saveUnfinishedPayRecord({userId, money, payway: PayWay.AliPay, tradeno}));
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            ToastBS(`${err}`);
                                            //dispatch(completeRequestWeb());

                                            // 保存充值账单，方便进行重传
                                            dispatch(saveUnfinishedPayRecord({userId, money, payway: PayWay.AliPay, tradeno}));
                                        });
                                    break;
                                case "8000":
                                    console.log('支付结果未知,请查询订单状态');
                                    break;
                                case "4000":
                                    console.log('订单支付失败');
                                    break;
                                case "5000":
                                    console.log('重复请求');
                                    break;
                                case "6001":
                                    console.log('用户中途取消');
                                    break;
                                case "6002":
                                    console.log('网络连接出错');
                                    break;
                                case "6004":
                                    console.log('支付结果未知,请查询订单状态');
                                    break;
                                default:
                                    console.log('其他失败原因');
                                    break;
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            ToastBS(`${err}`);
                        });
                } else {
                    ToastBS(`${pre.message}`);
                    console.log(data);
                }
            })
            .catch(err => {
                console.log(err);
                ToastBS(`${err}`);
            });
    }
}

function saveUnfinishedPayRecord(data) {
    return {
        type: SAVE_UNFINISHED_PAY_RECORD_ACTION,
        data
    }
}

function pushUnfinishedPayRecordsCompleted(data) {
    return {
        type: PUSH_UNFINISHED_PAY_RECORD_ACTION,
        data
    }
}

export function doPushUnfinishedPayRecords() {
    return (dispatch, getState) => {
        const {unfinishedPayRecords} = getState().wallet;
        if (!unfinishedPayRecords || unfinishedPayRecords.length <= 0)
            return;

        let succeed = [];
        for (let i = 0; i < unfinishedPayRecords.length; ++i) {
            let record = unfinishedPayRecords[i];
            const {userId, money, payway, tradeno} = record;
            makeOneCharge(userId, money, payway, tradeno)
                .then(ret=>{
                    if (ret.result) {
                        succeed.push(tradeno);
                    }
                })
                .catch(err=>{
                    ToastBS(`${err}`);
                    console.log(err);
                });
        }

        dispatch(pushUnfinishedPayRecordsCompleted(succeed));
    }
}