import {Message} from 'element-ui';
import qs from "qs";

let webSocket = null;

function init(url, aId) {
    if ('WebSocket' in window) {
        webSocket = new WebSocket(url+"/websocket/"+aId);
    } else {
        Message.error("当前浏览器不支持，网页通知");
    }

//连接发生错误的回调方法
    webSocket.onerror = function () {
        console.log("WebSocket连接发生错误");
    };

//连接成功建立的回调方法
    webSocket.onopen = function () {
        console.log("WebSocket连接成功");
    };

//连接关闭的回调方法
    webSocket.onclose = function () {
        console.log("WebSocket连接关闭");
    };

    webSocket.onmessage = function (ev) {
        socket["message"](JSON.parse(ev.data));
    };
}

const socket = {
    init: init,
    send(data) {
        let val = qs.stringify(data);
        if (webSocket.readyState === webSocket.OPEN) {
            // ws开启状态
            webSocket.send(val);
        } else if (webSocket.readyState === webSocket.CONNECTING) {
            // 正在开启状态，则等待1s后重新调用
            setTimeout(function () {
                this.send(val);
            }, 1000)
        } else {
            // 若未开启,则等待1s后重新调用
            setTimeout(function () {
                this.send(val);
            }, 1000)
        }
    },
    close(){
        webSocket.close();
    }
};

export default socket;
