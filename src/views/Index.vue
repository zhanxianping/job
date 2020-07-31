<template>
    <div id="app">
        <div id="sideNav"
             :style="headerNav.sideNavOn ? 'width: 70px;':'width:220px;' + 'background:'+sideNav.color.navSideColor">
            <el-menu
                    :collapse="headerNav.sideNavOn"
                    class="el-menu-vertical-demo"
                    :collapse-transition="false"
                    unique-opened
                    @select="handleOpen"
                    background-color="transparent"
                    :text-color="sideNav.color.fontColor"
                    :active-text-color="sideNav.color.allLiColor">
                <li id="logo">
                    <img :src="headAjaxData.logoImg" alt="">
                </li>
                <div v-for="(item,index) in sideNav.data" :key="item.id">
                    <el-submenu :index="String(index)" v-if="item.nodes !== undefined && item.nodes.length >= 1">
                        <template slot="title">
                            <i :class="'icon iconfont '+item.icon"></i>
                            <span v-show="!headerNav.sideNavOn">{{item.name}}</span>
                        </template>
                        <SideNavList v-if="item.nodes !== undefined && item.nodes.length >= 1" :dataList="item.nodes"
                                     :listIndex="index"/>
                    </el-submenu>
                    <el-menu-item v-else
                                  :data-name="item.name"
                                  :data-url="item.resUrl + '?menu=' + item.id"
                                  :index="String(index)">
                        <i :class="'icon iconfont '+item.icon"></i>
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                </div>

            </el-menu>
        </div>
        <div id="rightBox" :style="headerNav.sideNavOn ? 'margin-left: 70px;':'margin-left: 220px;'">
            <div id="headerNav" :style="'background:'+sideNav.color.navHeaderColor">
                <div id="nav-title">
                    <i @click="navIconOn" style="cursor: pointer"
                       :class="headerNav.sideNavOn ? 'el-icon-s-unfold':'el-icon-s-fold'"></i>
                    <span>{{headAjaxData.tenantName}}</span>
                    <div id="head-phone">
                        <span>[{{headerNav.phone.phoneNumber}}]</span>
                        <span>{{headerNav.phone.user_info ? "开工": "收工"}}</span>
                        <el-popover
                                placement="bottom"
                                @after-leave="phone_afterLeave"
                                width="350"
                                trigger="click">
                            <Phone @user_info="phoneUser_info"/>
                            <span @click="phoneHeadNav" slot="reference" class="phone"
                                  :style="'color:'+sideNav.color.navHeaderColor"><i
                                    class="el-icon-phone-outline"></i></span>
                        </el-popover>
                    </div>

                </div>
                <div id="nav-content">
                    <div class="nav-exh">
                        <ul class="info">
                            <li><a href="#">大屏</a></li>
                            <li><a href="#">自助服务</a></li>
                            <li><a href="#">任务看板</a></li>
                        </ul>
                        <img class="imgOne" src="../../public/image/index/toolLost.png"
                             @click="navImgone($event)" alt="">
                        <img class="imgTwo" src="../../public/image/index/square.png" alt="">
                    </div>
                    <div id="nav-user">
                        <img :src="headerNav.userImg" alt="">
                        <el-dropdown trigger="click" @command="userDrop">
                            <span class="el-dropdown-link">
                            {{headAjaxData.name}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="1"><i class="icon iconfont itsm-client"></i>个人信息
                                </el-dropdown-item>
                                <el-dropdown-item command="2"><i class="icon iconfont itsm-yingyong"></i>应用设置
                                </el-dropdown-item>
                                <el-dropdown-item command="3"><i class="icon iconfont itsm-gys"></i>主题皮肤
                                </el-dropdown-item>
                                <el-dropdown-item command="4"><i class="icon iconfont itsm-gys"></i>关于系统
                                </el-dropdown-item>
                                <el-dropdown-item command="5"><i class="icon iconfont itsm-logout"></i>退出
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <el-badge :value="headerNav.wsData.length" class="item">
                        <i @click="WSMsgLook" size="small" class="el-icon-bell nav-news"></i>
                    </el-badge>

                    <div class="nav-language">
                        <img :src="headerNav.language.img" alt="">
                        <el-dropdown trigger="click" @command="languageDrop">
                            <span class="el-dropdown-link">{{headerNav.language.text}}</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="china"><img style="margin-right: 5px;vertical-align: middle;"
                                                                       src="../../public/image/index/ChinaLogo.png"
                                                                       alt="">中文
                                </el-dropdown-item>
                                <el-dropdown-item command="english"><img
                                        style="margin-right: 5px;vertical-align: middle;"
                                        src="../../public/image/index/EnglishLogo.png" alt="">英文
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <el-dialog title="个人设置" width="450px" :visible.sync="headerNav.dialogFormVisible">
                    <el-tabs type="border-card">
                        <el-tab-pane label="头像设置">
                            <div class="uploadHead">
                                <el-image :src="headerNav.headPortrait"
                                          style="width: 100px;height: 100px;">
                                    <div slot="error" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                                <p>
                                    <el-button @click="headerNav.imgDialogUpload = true" type="primary">上传头像</el-button>
                                </p>
                            </div>
                            <ul @click="imgReplace">
                                <li><img class="userImg" src="../assets/user/hpic0.jpg" alt=""></li>
                                <li><img class="userImg" src="../assets/user/hpic1.jpg" alt=""></li>
                                <li><img class="userImg" src="../assets/user/hpic2.jpg" alt=""></li>
                                <li><img class="userImg" src="../assets/user/hpic3.jpg" alt=""></li>
                                <li><img class="userImg" src="../assets/user/hpic4.jpg" alt=""></li>
                            </ul>
                            <div class="user-bottom">
                                <el-button size="small" @click="headerNav.dialogFormVisible = false">取 消</el-button>
                                <el-button size="small" type="primary" @click="clickImgOpen">确 定</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="个人资料">
                            <el-form label-width="80px" :ref="headerNav.formUser" :model="headerNav.formUser">
                                <el-form-item label="登录名">
                                    <el-input readonly v-model="headerNav.formUser.loginName"></el-input>
                                </el-form-item>
                                <el-form-item label="用户名">
                                    <el-input v-model="headerNav.formUser.name"></el-input>
                                </el-form-item>
                                <el-form-item label="用户状态">
                                    <el-popover
                                            width="250"
                                            v-model="headerNav.user_visible"
                                            trigger="click">
                                        <div id="headerNav-formUser-select">
                                            <el-input placeholder="请输入" v-model="headerNav.user_state_input">
                                                <template class="i-icon-box" slot="prepend"><i
                                                        :class="headerNav.user_state_i"></i></template>
                                                <el-button type="primary" @click="headerNavUser_state_btn" slot="append"
                                                           size="mini">确定
                                                </el-button>
                                            </el-input>
                                            <ul id="user-state-ul" @click="headerNavUser_state_li">
                                                <li class="el-dropdown-menu__item"><i class="i-icon-state"></i> 正常工作
                                                </li>
                                                <li class="el-dropdown-menu__item"><i class="i-icon-sick"></i> 生病中</li>
                                                <li class="el-dropdown-menu__item"><i class="i-icon-evection"></i> 出差中
                                                </li>
                                                <li class="el-dropdown-menu__item"><i class="i-icon-meeting"></i> 会议中
                                                </li>
                                                <li class="el-dropdown-menu__item"><i class="i-icon-holiday"></i> 休假中
                                                </li>
                                            </ul>
                                        </div>
                                        <div slot="reference" class="el-input__inner"><i
                                                :class="headerNav.user_state_i"></i>
                                            {{headerNav.headerNavUser_state_val}}
                                        </div>
                                    </el-popover>

                                </el-form-item>
                                <el-form-item prop="email"
                                              :rules="[{ type: 'email', message: '请输入正确的邮箱地址！', trigger: 'blur'}]"
                                              label="邮箱">
                                    <el-input type="email" v-model="headerNav.formUser.email"></el-input>
                                </el-form-item>
                                <el-form-item prop="number"
                                              :rules="[{ validator: headerNav.formPassRules.phoneRules, trigger: 'blur'}]"
                                              label="电话">
                                    <el-input type="pel" v-model="headerNav.formUser.tel"></el-input>
                                </el-form-item>
                            </el-form>
                            <div class="user-bottom">
                                <el-button size="small" @click="headerNav.dialogFormVisible = false">取 消</el-button>
                                <el-button size="small" type="primary" @click="headerNav.dialogFormVisible = false">确
                                    定
                                </el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="密码设置">
                            <el-form label-width="100px" :model="headerNav.formPass" :ref="headerNav.formPass">
                                <el-form-item prop="password" label="密码"
                                              :rules="[{ required: true, message: '密码不能为空！'}]">
                                    <el-input type="password" autocomplete="off"
                                              v-model="headerNav.formPass.password"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码" prop="newPassword" :rules="[{ required: true, message: '请输入新密码！'},
                                {validator: headerNav.formPassRules.newPassRules,trigger: 'blur'}]">
                                    <el-input type="password" v-model="headerNav.formPass.newPassword"></el-input>
                                </el-form-item>
                                <el-form-item label="确认新密码" prop="sureNewPassword" :rules="[{ required: true, message: '请确认新密码！'},
                                {validator: headerNav.formPassRules.okNewPassRules,trigger: 'blur'}]">
                                    <el-input type="password" v-model="headerNav.formPass.sureNewPassword"></el-input>
                                </el-form-item>
                                <el-form-item class="user-bottom">
                                    <el-button size="small" @click="headerNav.dialogFormVisible = false">取 消</el-button>
                                    <el-button size="small" type="primary" @click="submitFormPass(headerNav.formPass)">确
                                        定
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-dialog>
                <el-dialog title="上传图片" width="650px" :visible.sync="headerNav.imgDialogUpload">
                    <ImgTailoring/>
                </el-dialog>
                <el-dialog title="应用设置" width="85%" :visible.sync="headerNav.dialogApplySetting">
                    <iframe src="http://localhost:8080/backstage/portal/editLayout" style="width: 100%;height: 98%"
                            frameborder="0"></iframe>
                </el-dialog>
                <ApplySetting @drawerColorItem="drawerColorItem" :dataColor="sideNav.color"
                              :dataRes="headerNav.drawerThemeColor"
                              @drawerColorMsg="headerNav.drawerThemeColor = false"/>
                <el-dialog id="dialogSystemInfo" title="系统信息" width="500px" :visible.sync="headerNav.dialogSystemInfo">
                    <el-form label-width="180px">
                        <el-form-item label="软件名：">
                            <strong>{{headAjax.currentAccount.tenantName}}</strong>
                        </el-form-item>
                        <el-form-item label="版本号：">
                            <strong>V 3.8.2</strong>
                        </el-form-item>
                        <el-form-item label="授权到期：">
                            <strong>{{headAjax.time}}</strong>
                        </el-form-item>
                    </el-form>
                    <p>保留所有权</p>
                </el-dialog>
                <el-drawer id="dialogWSInfo" title="消息实时提醒"
                           :visible.sync="headerNav.drawerWS"
                           :with-header="false">
                    <div id="WSContent">
                        <el-tag class="WSContent-title">
                            <strong>你有{{headerNav.wsData.length}}条新通知消息待阅读</strong>
                            <el-button @click="WSClearAll" type="primary" size="mini" round>全部已读</el-button>
                        </el-tag>
                        <div @click="WSOpenOrder" class="block WSContent-box">
                            <el-timeline>
                                <el-timeline-item :timestamp="timeString(Number(item.createTime))" placement="top"
                                                  v-for="(item, index) in headerNav.wsData"
                                                  :key="index">
                                    <el-card :data-index="index">
                                        <h4>{{WSContentBrack(item.content,item.title)}}</h4>
                                        <p>{{WSContentBrack(item.content)}}</p>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                    </div>
                </el-drawer>
            </div>
            <div id="navIndexItem">
                <el-button @click="headerNavBtnLeft" class="positionBtn" type="primary" plain>
                    <svg t="1595991300769" class="btnIcon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="1292"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path d="M198.4 473.6l332.8-332.8c6.4-6.4 25.6 0 25.6 12.8l0 256 262.4-262.4c6.4-6.4 25.6 0 25.6 12.8l0 729.6c0 12.8-12.8 19.2-25.6 12.8L556.8 627.2l0 256c0 12.8-12.8 19.2-25.6 12.8L198.4 550.4C172.8 531.2 172.8 492.8 198.4 473.6z"
                              p-id="1532"></path>
                    </svg>
                </el-button>
                <div @click="navIndexBtnBox($event)" id="navIndexBtnBox">
                    <el-button-group>
                        <el-button type="primary" :plain="navIndexItem.jobIframe != index"
                                   v-for="(item, index) in navIndexItem.btnData"
                                   :data-index="index"
                                   :key="index">{{item.name}}<i class="el-icon-error"></i></el-button>
                    </el-button-group>
                </div>
                <el-button @click="headerNavBtnRight" class="positionBtn" type="primary" plain>
                    <svg t="1595991300769" class="btnIcon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="1292"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path d="M838.4 473.6 505.6 134.4C499.2 128 480 134.4 480 147.2l0 256L217.6 134.4C211.2 128 192 134.4 192 147.2l0 729.6c0 12.8 12.8 19.2 25.6 12.8l262.4-262.4 0 256c0 12.8 12.8 19.2 25.6 12.8l339.2-339.2C864 531.2 864 492.8 838.4 473.6z"
                              p-id="1293"></path>
                    </svg>
                </el-button>
            </div>
            <div id="rightBox-content">
                <iframe class="jobIframe" :src="'http://localhost:8080'+item.url"
                        v-for="(item, index) in navIndexItem.btnData"
                        v-show="navIndexItem.jobIframe == index"
                        :key="index"
                        frameborder="0"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";
    import SideNavList from "../components/index/sideNav-list";
    import ChinaLogo from "../../public/image/index/ChinaLogo.png";
    import EnglishLogo from "../../public/image/index/EnglishLogo.png";
    import ImgTailoring from "../components/index/img-tailoring";
    import $vm from "../utils/util";
    import ApplySetting from "../components/index/apply-setting";
    import Phone from "../components/index/head-phone";

    export default {
        name: "app",
        data() {
            return {
                headAjax:  {
                    "headNum": 1,
                    "pre": "ws",
                    "tokenId": "shiro-session-954dfbfb-31c0-4626-8266-0b20fb454d39",
                    "extNo": "",
                    "is_NEW": 0,
                    "ip": "161.189.138.63",
                    "language": "zh_CN",
                    "orgId": "ca551a20ec47496f808ffaf9f70859c4",
                    "EnableWebIM": false,
                    "port": "5066",
                    "currentAccount": {
                        "accountId": "348870fc570f4ce69b7bf54cd461eff9",
                        "orgId": "ca551a20ec47496f808ffaf9f70859c4",
                        "orgName": "深圳商旅公司",
                        "tenantId": "84ae860cf9334006b23ad54e4df5d8e7",
                        "pName": null,
                        "tenantName": "IT服务管理系统",
                        "loginName": "admin",
                        "password": "7HSsu1HKQQmMwZyXw7GYQw==",
                        "clearPwd": "AFDD0B4AD2EC172C586E2150770FBF9E",
                        "salt": "94746ddfcf678f44c9f3a0f81fb302a1",
                        "name": "运维邮件渠道",
                        "picUrl": "/static/images/system/user/hpic2.jpg",
                        "email": "",
                        "phone": "",
                        "description": null,
                        "isValid": 1,
                        "createTime": null,
                        "functionalGroupId": null,
                        "functionalGroupName": null,
                        "createTimeStr": null,
                        "startTime": null,
                        "endTime": null,
                        "startTime2": null,
                        "endTime2": null,
                        "startTime3": null,
                        "endTime3": null,
                        "reserve": null,
                        "manHourIsValid": null,
                        "employeeType": "0",
                        "supplier": null,
                        "updateTime": null,
                        "tempcode": null,
                        "exprationtime": null,
                        "roleId": null,
                        "seq": null,
                        "processAdd": null,
                        "isExpired": 0,
                        "logoImg": "/static/upload/84ae860cf9334006b23ad54e4df5d8e7/image/20200609/f6c39fdec3f64bb69a247ff34cbf26f9.png",
                        "accountStatus": "正常工作",
                        "loginStatus": null,
                        "qywxUserId": null,
                        "dingtalkUserId": null,
                        "loginLog": {
                            "id": null,
                            "tenantid": null,
                            "accountId": null,
                            "aName": null,
                            "loginIP": null,
                            "beginTime": null,
                            "loginTime": null,
                            "endTime": null,
                            "keyWord": null,
                            "logOutTime": null,
                            "sessionId": null,
                            "localtion": null
                        },
                        "keyWord": null,
                        "exitOrgId": null,
                        "language": "zh_CN",
                        "position": "管理员",
                        "unit": "",
                        "vipUser": null,
                        "ppid": "ca551a20ec47496f808ffaf9f70859c4",
                        "pwdUpdateTime": 1595929012000,
                        "theme": "[\"rgb(17, 160, 248)\",\"rgb(255, 255, 255)\",\"rgb(94, 95, 97)\",\"rgb(255, 255, 255)\",\"rgb(17, 160, 248)\",\"rgb(17, 160, 248)\"]",
                        "landLine": "",
                        "lastLoginTime": null,
                        "poss": [],
                        "roles": []
                    },
                    "time": "2020-08-31 00:00:00",
                    "paramMap": {
                        "big_screen": "1",
                        "switching_between_Chinese_and_English": "1"
                    },
                    "apacheHOST": null,
                    "tenant": {
                        "tenantid": "84ae860cf9334006b23ad54e4df5d8e7",
                        "tenantname": "IT服务管理系统",
                        "sysname": "ITSM",
                        "syslog": "/static/upload/84ae860cf9334006b23ad54e4df5d8e7/image/20200609/f6c39fdec3f64bb69a247ff34cbf26f9.png",
                        "tenantadd": "IT服务管理系统",
                        "tenanttel": "85131231",
                        "tenantfax": "23123123",
                        "compantype": 0,
                        "sourcetype": 0,
                        "expiration_date": null,
                        "expirationDateStr": null,
                        "expirationcount": null,
                        "createtime": null,
                        "createTimeStr": null,
                        "keyWord": null,
                        "cn_AB": "IT服务管理系统",
                        "en_AB": "ITSM"
                    },
                    "projectwebsocket": "ws://localhost/itss1.5"
                },
                headAjaxData: {
                    "accountId": "348870fc570f4ce69b7bf54cd461eff9",
                    "orgId": "ca551a20ec47496f808ffaf9f70859c4",
                    "orgName": "深圳商旅公司",
                    "tenantId": "84ae860cf9334006b23ad54e4df5d8e7",
                    "pName": null,
                    "tenantName": "IT服务管理系统",
                    "loginName": "admin",
                    "password": "7HSsu1HKQQmMwZyXw7GYQw==",
                    "clearPwd": "AFDD0B4AD2EC172C586E2150770FBF9E",
                    "salt": "94746ddfcf678f44c9f3a0f81fb302a1",
                    "name": "运维邮件渠道",
                    "picUrl": "/static/images/system/user/hpic2.jpg",
                    "email": "",
                    "logoImg": "/static/upload/84ae860cf9334006b23ad54e4df5d8e7/image/20200609/f6c39fdec3f64bb69a247ff34cbf26f9.png",
                    "accountStatus": "正常工作",
                },
                sideNav: {
                    color: {
                        navHeaderColor: "#11a0f8",
                        navSideColor: "#fff",
                        fontColor: "#5e5f61",
                        firstLiColor: "#fff",
                        firstLiBack: "#11a0f8",
                        allLiColor: "#11a0f8"
                    },
                    data: []
                },
                //false关闭，true打开
                headerNav: {
                    icon: "el-icon-s-fold",
                    sideNavOn: false,
                    imgOne: false,
                    headPortrait: "", //头像
                    userImg: "",//用户头像
                    language: {
                        img: ChinaLogo,
                        text: "中文"
                    },
                    dialogFormVisible: false,
                    imgDialogUpload: false,
                    dialogApplySetting: false,
                    drawerThemeColor: false,
                    dialogSystemInfo: false,
                    drawerWS: false,
                    wsData: [],
                    phone: {
                        phoneNumber: "暂无号码",
                        user_info: false,
                    },
                    formUser: {
                        loginName: "",
                        name: "",
                        state: "",
                        email: "",
                        tel: ""
                    },
                    formPass: {
                        password: "",
                        newPassword: '',
                        sureNewPassword: "",
                    },
                    user_visible: false,
                    user_state_i: "i-icon-state",
                    user_state_input: "正常工作",
                    headerNavUser_state_val: "正常工作",
                    formPassRules: {
                        newPassRules: (rule, value, callback) => {
                            if (this.headerNav.formPass.password === value) {
                                callback(new Error('新密码与旧密码不可一致！'))
                            } else {
                                callback()
                            }
                        },
                        okNewPassRules: (rule, value, callback) => {
                            if (this.headerNav.formPass.newPassword !== value) {
                                callback(new Error('两次密码不一致！'))
                            } else {
                                callback()
                            }
                        },
                        phoneRules: (rule, value, callback) => {
                            if (this.headerNav.formUser.tel && !(/^1[3-9]\d{9}$/.test(this.headerNav.formUser.tel))) {
                                callback(new Error('请输入正确格式电话！'))
                            } else {
                                callback()
                            }
                        }
                    }
                },

                navIndexItem: {
                    btnClickIndex: 0,//第二导航左右按钮初始状态
                    jobIframe: 0, //主页iframe初始显示
                    btnData: []
                }

            }
        },
        components: {
            SideNavList,
            ImgTailoring,
            ApplySetting,
            Phone
        },
        watch: {
            btnClickIndex(newName) {
                if (newName > 4) {
                    this.headerNavBtnLeftWidth(Number(newName));
                }
            },
            btnDataAppend(now, pro) {

            }
        },
        computed: {
            btnClickIndex() {
                return this.navIndexItem.jobIframe
            },
            btnDataAppend() {
                return this.unique(this.navIndexItem.btnData);
            }
        },
        methods: {
            //数组去重
            unique(arr) {
                for (let i = 0, len = arr.length; i < len; i++) {
                    for (let j = i + 1, len = arr.length; j < len; j++) {
                        if (arr[i].name === arr[j].name) {
                            this.navIndexItem.jobIframe = i;
                            arr.splice(j, 1);
                            j--;
                            len--;
                        }
                    }
                }
                return arr;
            },
            //侧边菜单点击
            handleOpen(key, keyPath) {
                const e = event;
                if (e.target.classList.contains("el-menu-item") || e.target.parentNode.classList.contains("el-menu-item")) {
                    let data = this.navIndexItem.btnData,
                        dataset = e.target.dataset.name ? e.target.dataset : e.target.parentNode.dataset;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].name == dataset.name) {
                            this.$set(this.navIndexItem, "jobIframe", i);
                            this.headerNavBtnLeftWidth(i);
                            return;
                        }
                    }
                    data.push({name: dataset.name, url: dataset.url});
                    this.$set(this.navIndexItem, "btnData", data);
                    this.$set(this.navIndexItem, "jobIframe", data.length - 1);
                }
            },
            //头部菜单点击
            navIndexBtnBox(e) {
                if (e.target.classList.contains("el-button")) {
                    this.$set(this.navIndexItem, "jobIframe", e.target.dataset.index);
                } else if (e.target.parentNode.classList.contains("el-button")) {
                    this.$set(this.navIndexItem, "jobIframe", e.target.parentNode.dataset.index);
                } else if (e.target.tagName.toLowerCase() == "i") {
                    let data = this.navIndexItem.btnData, index = e.target.parentNode.parentNode.dataset.index;
                    if (index != 0) {
                        data.splice(index, 1);
                        this.$set(this.navIndexItem, "btnData", data);
                        this.$set(this.navIndexItem, "jobIframe", index - 1);
                    }
                }
            },
            //点击收起展开菜单栏
            navIconOn() {
                this.headerNav.sideNavOn = !this.headerNav.sideNavOn;
            },
            //个人设置
            userDrop(command) {
                const that = this;
                switch (Number(command)) {
                    case 1:
                        that.headerNav.dialogFormVisible = true;
                        that.headerNav.headPortrait = that.headerNav.userImg;
                        break;
                    case 2:
                        that.headerNav.dialogApplySetting = true;
                        break;
                    case 3:
                        that.headerNav.drawerThemeColor = true;
                        break;
                    case 4:
                        that.headerNav.dialogSystemInfo = true;
                        break;
                    case 5:
                        this.$confirm('<div style="width: 150px;height: 30px;line-height: 30px;">确认退出登录吗?</div>', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            dangerouslyUseHTMLString: true,
                            type: 'warning'
                        }).then(() => {
                            this.$post("/system_logout").then((data) => {
                                if (data.res) {
                                    this.$message({
                                        showClose: true,
                                        message: data.resMsg,
                                        type: 'success'
                                    });
                                }
                            });
                        });
                        break;
                    default:
                }
            },
            //更改密码
            submitFormPass(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post("/backstage/user/resetPwdSys", this.headerNav.formPass).then((data) => {
                            if (!data.res) {
                                this.$message({
                                    showClose: true,
                                    message: data.resMsg,
                                    type: 'error'
                                });
                            }

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //上传头像
            clickImgOpen() {
                this.headerNav.dialogFormVisible = false;
                this.headerNav.userImg = this.headerNav.headPortrait;
                this.$post("/backstage/user/updateHeadImg", {headUrl: this.headerNav.userImg}, {dataType: "json"}).then((data) => {
                    this.$message({
                        message: data.resMsg,
                        type: 'success'
                    });
                });
            },
            imgReplace(e) {
                if (e.target.tagName.toLowerCase() == "img") {
                    this.headerNav.headPortrait = e.target.src;
                }
            },
            headerNavUser_state_li(e) {
                if (e.target.tagName.toLowerCase() == "li") {
                    this.headerNav.user_visible = false;
                    this.headerNav.user_state_i = e.target.firstChild.className;
                    this.headerNav.headerNavUser_state_val = this.headerNav.user_state_input = e.target.innerText;
                }

            },
            headerNavUser_state_btn() {
                this.headerNav.user_visible = false;
                this.headerNav.headerNavUser_state_val = this.headerNav.user_state_input;
            },
            drawerColorItem(color, set) {
                if (typeof color == "string") {
                    this.$set(this.sideNav.color, set, color);
                } else if (typeof color == "boolean") {
                    this.ajaxBackgroundColor();
                } else {
                    this.$set(this.sideNav, "color", color);
                    this.mnualmHoverColor(color.firstLiColor, color.firstLiBack, color.navSideColor, true);
                }
            },
            //查看消息
            WSMsgLook() {
                this.headerNav.drawerWS = true;
            },
            WSClearAll() {
                this.$post("/backstage/notices/submitAllReadMark").then((data) => {
                    if (data.res) {
                        this.headerNav.wsData = [];
                        this.$message({
                            showClose: true,
                            message: "全部已读完成",
                            type: 'success'
                        });
                    }
                });
            },
            timeString(timestamp) {
                if (!timestamp) return "";
                let date = new Date(timestamp);
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let minute = date.getMinutes();
                let second = date.getSeconds();
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '/' + m + '/' + d + ' ' + h + ':' + minute + ':' + second;
            },
            WSContentBrack(text, val2) {
                if (val2) {
                    let regex = /\[(.+?)\]/g;
                    let options = text.match(regex);
                    if (options && options.length) {
                        return "您的工单" + options.join("") + "提醒";
                    }
                    return val2;
                } else {
                    if (text.indexOf("工单主题") != -1) {
                        return text.split("工单主题：")[1];
                    } else {
                        let msg = text.split(" ");
                        msg.splice(0, 1);
                        return msg.join("");
                    }
                }
            },
            WSOpenOrder(e) {
                if (e.target.classList.contains("el-card")) {
                    let data = this.headerNav.wsData;
                    let dataHead = this.navIndexItem.btnData;
                    data.splice(Number(e.target.dataset.index), 1);
                    this.$set(this.headerNav, "wsData", data);
                    this.$post("/backstage/notices/submitReadMark", {id: data[[Number(e.target.dataset.index)]].id});
                    this.$set(this.headerNav, "wsData", data);
                    dataHead.push({
                        name: data[Number(e.target.dataset.index)].title,
                        url: data[Number(e.target.dataset.index)].url
                    });
                    this.$set(this.navIndexItem, "btnData", dataHead);
                    this.$set(this.navIndexItem, "jobIframe", dataHead.length - 1);
                    this.headerNav.drawerWS = false;
                }
            },
            //语言选择
            languageDrop(command) {
                let language = "";
                if (command == "china") {
                    language = "zh_CN";
                    this.headerNav.language = {img: ChinaLogo, text: "中文"};
                } else {
                    language = "en_US";
                    this.headerNav.language = {img: EnglishLogo, text: "英文"};
                }
                this.$post('/backstage/account/setLanguage', {language: language}).then((data) => {
                    if (data.res) {
                        this.$message({
                            showClose: true,
                            message: data.resMsg,
                            type: 'success'
                        });
                        window.location.reload();
                    }
                })
            },
            //头部展开动画
            navImgone(e) {
                this.headerNav.imgOne = !this.headerNav.imgOne;
                let width = $(e.target).prev().children("li").length * 90;
                if (this.headerNav.imgOne) {
                    $(e.target).prev().animate({
                        width: width,
                        fontSize: "14px",
                    }, 600);
                    $(e.target).next().css({width: "15px", height: "15px"}).animate({
                        right: width + 65
                    }, {
                        step: function (now) {
                            $(".imgTwo").css({"transform": "rotate(" + now + "deg)"});
                            if (parseInt(now) == width + 65) {
                                $(".imgTwo").css({"transform": "rotate(0deg)"})
                            }
                        },
                        duration: 600
                    });
                } else {
                    $(e.target).prev().animate({width: 0, fontSize: "0"});
                    $(e.target).next().css({width: "10px", height: "10px"}).animate({
                        right: "31px"
                    }, {
                        step: function (now) {
                            $(".imgTwo").css({"transform": "rotate(" + now + "deg)"});
                            if (parseInt(now) == 31) {
                                $(".imgTwo").css({"transform": "rotate(45deg)"})
                            }
                        }, duration: 600
                    });
                }
            },
            //手动设置背景色hover
            mnualmHoverColor(firstLiColor, firstLiBack,sideColor, msg) {
                if (msg) {
                    document.head.removeChild(this.$store.getters.getStyle);
                }
                let style = document.createElement("style");
                style.type = "text/css";
                this.$store.commit("addStyle", style);
                style.innerHTML = `
                #sideNav{
                    background-color: ${sideColor} !important;
                }
                .el-menu--popup-right-start{
                   background-color: ${sideColor} !important;
                }
                .el-menu--popup-right-start .el-menu-item:hover{
                    background-color: ${firstLiBack} !important;
                    color: ${firstLiColor} !important;
                }
                #sideNav .el-submenu__title:hover{
                    background-color: ${firstLiBack} !important;
                    color: ${firstLiColor} !important;
                }
                #sideNav .el-menu-item:hover{
                    background-color: ${firstLiBack} !important;
                    color: ${firstLiColor} !important;
                }
                #sideNav .is-opened>div{
                    background-color: ${firstLiBack} !important;
                    color: ${firstLiColor} !important;
                }`;
                document.head.appendChild(style);
            },
            //获取设置好的背景色
            ajaxBackgroundColor() {
                this.$post("/backstage/account/getTheme").then((data) => {
                    let val = JSON.parse(data.obj);
                    this.$set(this.sideNav.color, "navHeaderColor", val[0]);
                    this.$set(this.sideNav.color, "navSideColor", val[1]);
                    this.$set(this.sideNav.color, "fontColor", val[2]);
                    this.$set(this.sideNav.color, "firstLiColor", val[3]);
                    this.$set(this.sideNav.color, "firstLiBack", val[4]);
                    this.$set(this.sideNav.color, "allLiColor", val[5]);

                    this.mnualmHoverColor(val[3], val[4],val[1]);
                });
            },

            //头部第二导航按钮点击事件
            headerNavBtnLeft() {
                this.headerNavBtnFunction(0);
            },
            headerNavBtnRight() {
                this.headerNavBtnFunction(1);
            },
            headerNavBtnFunction(msg) {
                let btn = Array.from(document.querySelectorAll("#navIndexBtnBox .el-button"));
                let btnBox = document.querySelector("#navIndexBtnBox>.el-button-group"),
                    btnBoxWidth = document.querySelector("#navIndexBtnBox").offsetWidth;
                let btnWidth = btn.reduce((pre, next) => {
                    return pre + next.offsetWidth;
                }, 0);
                if (btnWidth > btnBoxWidth) {
                    if (!msg) {
                        if (!this.navIndexItem.btnClickIndex) {
                            btn.reduce((pre, next, index) => {
                                if (pre != null && btnBoxWidth < (pre + next.offsetWidth)) {
                                    btnBox.style.left = btnBoxWidth + index + 1 - (pre + next.offsetWidth) + "px";
                                    this.navIndexItem.btnClickIndex = index;
                                    return null;
                                }
                                return pre + next.offsetWidth;
                            }, 0);
                        } else {
                            btn.reduce((pre, next, index) => {
                                if (pre != null && this.navIndexItem.btnClickIndex + 1 == index) {
                                    btnBox.style.left = btnBoxWidth + index + 1 - (pre + next.offsetWidth) + "px";
                                    this.navIndexItem.btnClickIndex = index;
                                    return null;
                                }
                                return pre + next.offsetWidth;
                            }, 0);
                        }
                    } else {
                        if (this.navIndexItem.btnClickIndex) {
                            btn.reduce((pre, next, index) => {
                                if (pre != null && this.navIndexItem.btnClickIndex - 1 == index) {
                                    if (btnBoxWidth + index + 1 - (pre + next.offsetWidth) > 0) {
                                        btnBox.style.left = "0px";
                                        this.navIndexItem.btnClickIndex = 0;
                                    } else {
                                        btnBox.style.left = btnBoxWidth + index + 1 - (pre + next.offsetWidth) + "px";
                                        this.navIndexItem.btnClickIndex = index;
                                    }
                                    return null;
                                }
                                return pre + next.offsetWidth;
                            }, 0);
                        }
                    }
                }
            },
            headerNavBtnLeftWidth(index) {
                let btn = Array.from(document.querySelectorAll("#navIndexBtnBox .el-button"));
                let left = $("#navIndexBtnBox>div").css("left");
                if (btn[index] && Math.abs(parseInt(left)) > btn[index].offsetLeft) {
                    if (btn[index].offsetLeft < $("#navIndexBtnBox").width()) {
                        $("#navIndexBtnBox>div").css("left", 0);
                    } else {
                        console.log($("#navIndexBtnBox").width(), btn[index].offsetLeft);
                        $("#navIndexBtnBox>div").css("left", $("#navIndexBtnBox").width() - btn[index].offsetLeft);
                    }
                }
            },
            phoneHeadNav() {
                $("body").append("<div id='phone-v-modal' style='z-index: 99;top: 50px' class=\"v-modal\"></div>")
            },
            phone_afterLeave() {
                $("#phone-v-modal").remove();
            },
            phoneUser_info(info) {
                this.$set(this.headerNav.phone, "user_info", info);
            },
            phone_newRTCSession(event) {
                this.$phone.addRTCSessionEventListener(event.session);
                rtcSession = event.session; // 判断此次回话是由本地发起，还是远端发起

                //来电显示
                if (event.originator === 'remote') {
                    let index;
                    //event.request.from._display_name
                    index = this.$notify({
                        title: '来电显示',
                        position: 'bottom-right',
                        dangerouslyUseHTMLString: true,
                        message: `
                            <div><p style="color:forestgreen;padding: 2px 5px;">${event.request.from._display_name}</p>
                                <div style="text-align: right;width: 250px;margin-top: 5px;">
                                    <button  onclick="window.breakOff()" class="el-button el-button--info el-button--mini is-plain">挂断 </button>
                                    <button onclick="window.anwser()" class="el-button el-button--primary el-button--mini is-plain">接听</button>
                                </div>
                            </div>
                        `,
                        duration: 0
                    });
                    this.$store.commit("addNotificationIndex", index);
                }

                if (event.originator === 'local') {
                    this.$phone.addRemoteStream(event.session.connection);
                }
            },
            //接听
            phone_breakOff() {
                this.$phone.hangup();
                $vm.$emit('nowCall', true);
                this.$store.getters.getNotificationIndex.close();
            },
            //挂断
            phone_anwser() {
                this.$phone.answer();
                this.$store.getters.getNotificationIndex.close();
            }
        },
        mounted() {
            const that = this;
            //侧边导航数据
            this.$post("/backstage/menu/getMenuJson3", {ref: "n"}, {dataType: "json"}).then((data) => {
                this.sideNav.data = data.obj.menuList;
                this.$set(this.navIndexItem, "btnData", [{
                    name: data.obj.menuList[0].name,
                    url: data.obj.menuList[0].resUrl + "?menu=" + data.obj.menuList[0].id
                }]);
            });
            //侧边导航颜色 /backstage/account/getTheme
            this.ajaxBackgroundColor();

            //接收图片裁剪好的数据
            $vm.$on("imgTailOk", (val) => {
                console.log(val);
                this.headerNav.headPortrait = this.$store.getters.getUrl + val;
                this.headerNav.imgDialogUpload = false;
            });

            //接收我的消息
            this.$post("/backstage/notices/listUnread").then((data) => {
                this.headerNav.wsData = data.obj;
            });

            //接收webSocket
            this.$ws["message"] = function (data) {
                if (data) {
                    let wsData = that.headerNav.wsData;
                    wsData.unshift(data);
                    const audioElementHovertree = document.createElement('audio');
                    audioElementHovertree.setAttribute('src', "./static/mp3/ding.mp3");
                    audioElementHovertree.setAttribute('autoplay', 'autoplay'); //打开自动播放
                    that.$set(that.headerNav, "wsData", wsData);
                    if (data.content.indexOf("回复了消息") != -1) {
                        let msg = data.content.split(" ");
                        msg.splice(0, 1);
                        that.$notify({
                            title: that.WSContentBrack(data.content, data.title),
                            message: "<div data-url='" + data.url + "' data-name='" + data.title + "' class='WSMsg' style=\"width: 250px;margin-top: 5px;\">" + msg.join("") + "</div>",
                            position: 'bottom-right',
                            dangerouslyUseHTMLString: true,
                            duration: 4000
                        });
                    } else {
                        that.$notify({
                            title: that.WSContentBrack(data.content, data.title),
                            message: that.WSContentBrack(data.content),
                            position: 'bottom-right',
                            dangerouslyUseHTMLString: true,
                            duration: 0
                        });
                    }


                }
            };

            $("body").on("click", ".el-notification__group", function () {
                if ($(this).find(".WSMsg").length) {
                    let name = $(this).find(".WSMsg").attr("data-name");
                    let wsData = that.headerNav.wsData.filter(item => item.title != name);
                    that.$set(that.headerNav, "wsData", wsData);
                    let navBtnData = that.navIndexItem.btnData;
                    navBtnData.push({name: name, url: $(this).find(".WSMsg").attr("data-url")});
                    that.$set(that.navIndexItem, "btnData", navBtnData);
                    that.$set(that.navIndexItem, "jobIframe", navBtnData.length - 1);
                }
            });

            //监听头部dom变化
            document.getElementById("navIndexBtnBox").addEventListener("DOMNodeInserted", function () {
                if (this.offsetWidth < $(this).children("div").width()) {
                    that.navIndexItem.btnClickIndex = $(this).find("button").length - 1;
                    $(this).children("div").css("left", this.offsetWidth + 1 - $(this).children("div").width());
                } else {
                    $(this).css("left", 0);
                }
            });

            this.$post("/backstage/getBaseInfo").then((data) => {
                const val = JSON.parse(data);

                //初始化电话
                /*
                * pre：ws
                * phoneIp：161.189.138.63
                * phonePort：5066
                * */
                const UA = this.$phone.init(val.obj.pre, val.obj.ip, val.obj.port, val.obj.extNo);
                UA.on('newRTCSession', this.phone_newRTCSession);
                UA.on('registered', this.$phone.registered);
                UA.on('unregistered', this.$phone.unregistered);
                UA.on('registrationFailed', this.$phone.registrationFailed);

                //初始化webSocket
                this.$ws.init(val.obj.projectwebsocket, val.obj.currentAccount.accountId);
                //初始化
                this.headAjaxData = val.obj.currentAccount;
                this.headAjax = val.obj;
                this.headerNav.language = val.obj.language == "zh_CN" ? {
                    img: ChinaLogo,
                    text: "中文"
                } : {img: EnglishLogo, text: "英文"};
                this.headerNav.userImg = val.obj.currentAccount.picUrl;

                this.headerNav.headerNavUser_state_val = val.obj.currentAccount.accountStatus;
                switch (val.obj.currentAccount.accountStatus) {
                    case "正常工作":
                        this.headerNav.user_state_i = "i-icon-state";
                        break;
                    case "生病中":
                        this.headerNav.user_state_i = "i-icon-sick";
                        break;
                    case "出差中":
                        this.headerNav.user_state_i = "i-icon-evection";
                        break;
                    case "会议中":
                        this.headerNav.user_state_i = "i-icon-meeting";
                        break;
                    case "休假中":
                        this.headerNav.user_state_i = "i-icon-holiday";
                        break;
                }
                this.headerNav.formUser = {
                    loginName: val.obj.currentAccount.loginName,
                    name: val.obj.currentAccount.name,
                    state: val.obj.currentAccount.accountStatus,
                    email: val.obj.currentAccount.email,
                    tel: val.obj.currentAccount.phone
                }
            });

            window.breakOff = this.phone_breakOff;
            window.anwser = this.phone_anwser;
            window["contabs"] = {
                addMenuTab: function (url, name) {
                    let navBtnData = that.navIndexItem.btnData;
                    navBtnData.push({name: name, url: url});
                    that.$set(that.navIndexItem, "btnData", navBtnData);
                    that.$set(that.navIndexItem, "jobIframe", navBtnData.length - 1);
                }
            };

        },
        beforeDestroy() {
            if (this.$store.getters.getStyle) {
                document.head.removeChild(this.$store.getters.getStyle);
            }
        }
    }
</script>

<style lang="less">

    #app {
        width: 100%;
        height: 100%;
    }

    #sideNav {
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        overflow-y: auto;
        overflow-x: hidden;
        border-right: .5px solid #ddd;
        scrollbar-arrow-color: #666; /**//*三角箭头的颜色*/
        scrollbar-face-color: #ddd; /**//*立体滚动条的颜色*/
        scrollbar-3dlight-color: #fff; /**//*立体滚动条亮边的颜色*/
        scrollbar-highlight-color: #666; /**//*滚动条空白部分的颜色*/
        scrollbar-shadow-color: #fff; /**//*立体滚动条阴影的颜色*/
        scrollbar-darkshadow-color: #fff; /**//*立体滚动条强阴影的颜色*/
        scrollbar-track-color: #fff; /**//*立体滚动条背景颜色*/
        scrollbar-base-color: #f8f8f8; /**//*滚动条的基本颜色*/

        .el-menu {
            min-height: 100%;
            border-width: 0;

            img {
                width: 100%;
                height: 100%;
            }
        }

        #logo {
            padding: 0 !important;
            height: 56px;
            line-height: 56px;
        }
    }

    #sideNav::-webkit-scrollbar {
        width: 0;
        height: 0;
        background: none;
    }

    /* Track */
    #sideNav::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0);
        border-radius: 4px;
    }

    /* Handle */
    #sideNav::-webkit-scrollbar-thumb {
        background: rgba(201, 201, 202, 1);
        border-radius: 4px;
    }

    /* Handle on hover */
    #sideNav::-webkit-scrollbar-thumb:hover {
        background: rgba(162, 162, 163, 1);
    }

    #sideNav::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    #rightBox {
        margin-left: 220px;
        height: 100%;
        background-color: green;
    }

    .el-message-box {
        width: auto !important;
    }

    #headerNav {
        width: 100%;
        height: 50px;
        color: white;

        #nav-title {
            line-height: 50px;
            font-size: 18px;
            float: left;
            position: relative;
            width: 300px;

            #head-phone {
                width: 190px;
                height: 50px;
                position: absolute;
                right: -300px;
                top: 0;
                font-size: 14px;

                span {
                    margin-left: 20px;
                    float: none;
                }

                .phone {
                    display: block;
                    float: right;
                    width: 35px;
                    height: 35px;
                    background: #f2f2f2;
                    margin-top: 7px;
                    margin-left: 0;
                    border-radius: 50%;
                    line-height: 37px;
                    text-align: center;
                    font-size: 21px;

                    i {
                        margin: 0;
                    }
                }
            }

            span, i {
                margin-left: 13px;
            }
        }
        #nav-content > * {
            float: left;
            margin-right: 20px;
        }
        #nav-content {
            float: right;
            line-height: 50px;

            .nav-exh {
                position: relative;

                .info {
                    position: absolute;
                    right: 65px;
                    height: 50px;
                    width: 0;
                    font-size: 0;
                    display: block;
                    overflow: hidden;

                    li {
                        width: 90px;
                        float: left;
                        list-style: none;
                        text-align: center;

                        a {
                            color: white;
                            text-decoration: none;
                        }
                    }
                }
            }
            .imgOne {
                width: 25px;
                height: 25px;
                margin-top: 12px;
                display: block;
                cursor: pointer;
                margin-right: 30px;
            }
            .imgTwo {
                position: absolute;
                right: 31px;
                top: 14px;
                width: 10px;
                height: 10px;
                transform: rotate(45deg);
            }
            #nav-user {
                font-size: 14px;
                cursor: pointer;
                img {
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                    vertical-align: middle;
                    margin-right: 5px;
                }
            }
            .nav-news {
                display: block;
                margin-top: 14px;
                font-size: 21px;
                cursor: pointer;
            }

            .el-badge__content.is-fixed {
                top: 14px;
                height: 14px;
                line-height: 14px;
                padding: 0 3px;
            }
            .nav-language {
                font-size: 14px;
                img {
                    vertical-align: middle;
                    margin-right: 5px;
                }
                span {
                    cursor: pointer;
                }
            }
        }
        .el-tabs {
            border: none;
            box-shadow: none;

            .user-bottom {
                text-align: right;
                margin-top: 30px;
            }
        }
        .el-tabs--border-card > .el-tabs__header {
            border: 1px solid #E4E7ED;
        }
        #dialogSystemInfo .el-dialog__body {
            height: auto;

            p {
                text-align: center;
                margin-top: 30px;
                margin-bottom: 50px;
                color: #e6a23c;
            }
        }
        .el-dialog__body {
            height: 400px;
            padding-top: 12px;
            padding-bottom: 10px;
            overflow-y: auto;

            .uploadHead {
                text-align: center;
                img {
                    width: 100px;
                    height: 100px;
                    border-right: 5px;
                }
                p {
                    margin-top: 10px;
                }
            }
            ul {
                width: 100%;
                height: 50px;
                margin-top: 30px;

                li {
                    list-style: none;
                    float: left;
                    margin-left: 21px;
                }
            }
            .userImg {
                width: 50px;
                height: 50px;
                border-radius: 5px;
            }
        }
    }

    #user-state-ul {
        margin-top: 15px;
        border-top: 1px solid #DCDFE6;
        padding-top: 5px;
    }

    .i-icon {
        width: 28px;
        height: 28px;
        background-image: url("../assets/user/state.png");
        display: inline-block;
        vertical-align: middle;
    }

    #headerNav-formUser-select .el-input-group--prepend > .el-input-group__prepend {
        padding: 0 5px;
    }

    #headerNav-formUser-select .el-input-group--prepend > .el-input-group__append {
        color: #606266;
    }

    .i-icon-state {
        .i-icon();
        background-position: 0 -1px;
    }

    .i-icon-sick {
        .i-icon();
        background-position: 0 -28px;
    }

    .i-icon-evection {
        .i-icon();
        background-position: 0 -84px;
    }

    .i-icon-meeting {
        .i-icon();
        background-position: 0px -112px;
    }

    .i-icon-holiday {
        .i-icon();
        background-position: 0 -56px;
    }

    /*主题*/
    .head-drawerThemeColor .el-drawer.rtl {
        height: calc(100% - 50px);
        top: 50px;
    }

    #dialogWSInfo {
        .el-drawer {
            top: 50px;
            height: calc(100% - 50px);

            .el-drawer__body {
                overflow-y: auto;

                #WSContent {
                    padding: 10px;
                    position: relative;

                    .WSContent-title {
                        padding: 0 20px;
                        width: 100%;
                        position: sticky;
                        top: 0;
                        left: 0;
                        z-index: 99;
                        background-color: #ecf5ff;

                        strong {
                            margin-right: 20px;
                        }
                    }

                    .WSContent-box {
                        margin-top: 20px;

                        .el-card {
                            cursor: pointer;

                            .el-card__body {
                                pointer-events: none;
                            }
                            p {
                                margin-top: 5px;
                            }
                        }
                        .el-card:hover {
                            border: 1px solid #409eff;
                        }
                    }
                }
            }
        }

    }

    #navIndexItem {
        width: 100%;
        height: 40px;
        background-color: white;
        box-shadow: 0 2px 12px -2px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        position: relative;
        z-index: 1;

        .positionBtn {
            padding: 9px 8px;
            border-radius: 0;
            height: 40px;

            .btnIcon {
                width: 18px;
                height: 18px;
                path {
                    fill: #409EFF;
                }
            }
        }
        .positionBtn:hover, .positionBtn:active, .positionBtn:focus {
            path {
                fill: #fff;
            }
        }
        .positionBtn:first-child {
            float: left;
            border-right-color: #909399;
            border-left: none;
        }
        .positionBtn:last-child {
            float: right;
            border-left-color: #909399;
        }

        #navIndexBtnBox {
            width: calc(100% - 72px);
            height: 40px;
            float: left;
            overflow: hidden;
            position: relative;

            .el-button-group {
                height: 100%;
                width: auto;
                transition: all 0.3s linear;
                display: flex;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
        .el-button-group > .el-button:first-child, .el-button-group > .el-button:last-child {
            border-radius: 0;
        }
        .el-button {
            i {
                margin-left: 5px;
            }
        }
        .el-button-group .el-button--primary:not(:first-child):not(:last-child) {
            border-left-color: #909399;
            border-right-color: #909399;
        }
        .el-button-group .el-button--primary:first-child {
            border-right-color: #909399;
        }
        .el-button-group .el-button--primary:last-child {
            border-left-color: #909399;
        }
    }

    #rightBox-content {
        width: 100%;
        height: calc(100% - 90px);
        background-color: white;
        overflow: hidden;

        .jobIframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    }
</style>
