import {Message, Notification } from 'element-ui';

let sipUA = null;
let rtcSession = null;
let password = "a123456";
window.phone = phone;
const phone = {
    //初始化
    init() {
        let socket = new JsSIP.WebSocketInterface(pre + '://' + phoneIp + ':' + phonePort);
        let configuration = {
            sockets: [socket],
            uri: 'sip:' + extNo + '@' + phoneIp,
            password: password,
            connection_recovery_max_interval: 60,
            connection_recovery_min_interval: 30
        };
        sipUA = new JsSIP.UA(configuration);
        //把事件监听暴露出去
        return sipUA;
    },

    //签入点击事件
    connect() {
        if (sipUA === null) {
            this.init();
        }
        sipUA.start();
    },
    //签出点击事件
    disconnect() {
        sipUA.stop();
    },
    //拨打电话
    async call(phoneNumber) {
        if (sipUA !== null) {
            let eventHandlers = {
                'peerconnection': function peerconnection(e) {
                    // 处理远端媒体流
                    addRemoteStream(e.peerconnection);
                },
                'progress': await function progress(e) {
                    //false：红色电话
                    return false;
                },
                'failed': function failed(e) {
                    Message.error("拨打失败！");
                },
                'ended': await function ended(e) {
                    //false：绿色电话
                    return true;
                }
            };
            sipUA.call('sip:nroad' + phoneNumber + '@nroad.com.cn', {
                mediaConstraints: {
                    audio: true,
                    video: false
                },
                sessionTimersExpires: 120,
                eventHandlers: eventHandlers
            });
        }
    },
    //挂断电话
    hangup() {
        if (rtcSession !== null) {
            rtcSession.terminate();
            return true;
        }
    },
    //应答电话
    answer() {
        if (rtcSession !== null) {
            rtcSession.answer({
                sessionTimersExpires: 120,
                mediaConstraints: {
                    audio: true,
                    video: false
                }
            });
        }
    },
    addRTCSessionEventListener(session) {
        session.on('peerconnection', peerconnection);
        session.on('progress', progress);
        session.on('accepted', accepted);
        session.on('ended', ended);
        session.on('failed', failed);
        session.on('getusermediafailed', getusermediafailed);
    },
    newRTCSession(event) {
        addRTCSessionEventListener(event.session);
        rtcSession = event.session; // 判断此次回话是由本地发起，还是远端发起

        if (event.originator === 'remote') {
            Notification.$notify({
                title: '来电显示',
                position: 'bottom-right',
                message: event.request.from._display_name,
                duration: 0
            });
            //this.showPhone(event);
        }

        if (event.originator === 'local') {
            addRemoteStream(event.session.connection);
        }
    },
    registered() {
        console.log('registered');
    },
    unregistered() {
        console.log('unregistered');
    },
    registrationFailed() {
        console.log('registrationFailed');
    },
    peerconnection(event) {
        addRemoteStream(event.peerconnection);
    },
    progress(event) {
        if (event.originator === 'local') {
            $('#callStatus').text('来电');
        }

        if (event.originator === 'remote') {
            $('#callStatus').text('外呼');
        }
    },

    ended() {
        $('.phone-tab-bottom .phone-tab-bottom2').attr({
            'src': '' + basePath + '/static/images/system/zIcon/phoneGreen.png'
        });
    },

    getusermediafailed() {
        alert('请检查耳机和麦克风的设置');
    },

    addRemoteStream(peerconnection) {
        var _this = this;

        var remoteStream = peerconnection.getRemoteStreams();

        if (remoteStream[0]) {
            this.handleRemoteStream(remoteStream[0]);
        }

        peerconnection.addEventListener('addstream', function (e) {
            _this.handleRemoteStream(e.stream);
        });
    },

    handleRemoteStream(stream) {
        let telAudio = document.getElementById('phone'); // Display remote stream
        telAudio.srcObject = stream;
        stream.addEventListener('addtrack', function (event) {
            console.log('remote track "addtrack" event', event);
            let track = event.track;

            if (telAudio.srcObject !== stream) {
                return;
            } // Refresh remote video

            telAudio.srcObject = stream;
            track.addEventListener('ended', function () {
                console.log('remote track "ended" event [track:%o]', track);
            });
        });
        stream.addEventListener('removetrack', function (event) {
            console.log('remote track "removetrack" event', event);

            if (telAudio.srcObject !== stream) {
                return;
            } // Refresh remote video

            telAudio.srcObject = stream;
        });
    }
};

export default phone;
