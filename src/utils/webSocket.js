import {Message, Loading} from 'element-ui';
import qs from "qs";

let webSocket = null, timeOut = null;

if ('WebSocket' in window) {
    webSocket = new WebSocket("ws://localhost/websocket/348870fc570f4ce69b7bf54cd461eff9");
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


const socket = {
    send(data) {
        let val = qs.stringify(data);
        if (websock.readyState === websock.OPEN) {
            // ws开启状态
            webSocket.send(val);
        } else if (websock.readyState === websock.CONNECTING) {
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
    async message() {
        //接收消息
        webSocket.onmessage = await function (ev) {
            return JSON.parse(ev.data);
        };
    },
    close(){
        webSocket.close();
    }
};

export default socket;
