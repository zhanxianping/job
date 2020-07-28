<template>
    <div id="app">
        <div id="sideNav" :style="headerNav.sideNavOn ? 'width: 70px;':'width:220px;' + 'background:'+sideNav.color.navSideColor">
            <el-menu
                    :collapse="headerNav.sideNavOn"
                    class="el-menu-vertical-demo"
                    :collapse-transition="false"
                    unique-opened
                    background-color="transparent"
                    :text-color="sideNav.color.fontColor"
                    :active-text-color="sideNav.color.allLiColor">
                <li id="logo">
                    <img src="../../public/image/index/logo.png" alt="">
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
                    <el-menu-item v-else :index="String(index)">
                        <i :class="'icon iconfont '+item.icon"></i>
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                </div>

            </el-menu>
        </div>
        <div id="rightBox" :style="headerNav.sideNavOn ? 'margin-left: 70px;':'margin-left: 220px;'">
            <div id="headerNav" :style="'background:'+sideNav.color.navHeaderColor">
                <div id="nav-title">
                    <i @click="navIconOn" style="cursor: pointer" :class="headerNav.sideNavOn ? 'el-icon-s-unfold':'el-icon-s-fold'"></i>
                    <span>IT服务管理系统</span>
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
                            管理员<i class="el-icon-arrow-down el-icon--right"></i>
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
                                        <div>
                                            <el-input placeholder="请输入" v-model="headerNav.user_state_input">
                                                <template class="i-icon-box" slot="prepend"><i :class="headerNav.user_state_i"></i></template>
                                                <el-button type="primary" @click="headerNavUser_state_btn" slot="append" size="mini">确定</el-button>
                                            </el-input>
                                            <ul id="user-state-ul" @click="headerNavUser_state_li">
                                                <li class="el-dropdown-menu__item"><i class="i-icon-state"></i> 正常工作</li>
                                                <li class="el-dropdown-menu__item"><i class="i-icon-sick"></i> 生病中</li>
                                                <li class="el-dropdown-menu__item"><i class="i-icon-evection"></i> 出差中</li>
                                                <li class="el-dropdown-menu__item"><i class="i-icon-meeting"></i> 会议中</li>
                                                <li class="el-dropdown-menu__item"><i class="i-icon-holiday"></i> 休假中</li>
                                            </ul>
                                        </div>
                                        <div slot="reference" class="el-input__inner"><i :class="headerNav.user_state_i"></i> {{headerNav.headerNavUser_state_val}}</div>
                                    </el-popover>

                                </el-form-item>
                                <el-form-item prop="email" :rules="[{ type: 'email', message: '请输入正确的邮箱地址！', trigger: 'blur'}]" label="邮箱">
                                    <el-input type="email" v-model="headerNav.formUser.email"></el-input>
                                </el-form-item>
                                <el-form-item prop="number" :rules="[{ validator: headerNav.formPassRules.phoneRules, trigger: 'blur'}]" label="电话">
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
                    <iframe src="http://localhost:8080/backstage/portal/editLayout" style="width: 100%;height: 98%" frameborder="0"></iframe>
                </el-dialog>
                <ApplySetting @drawerColorItem="drawerColorItem" :dataColor="sideNav.color" :dataRes="headerNav.drawerThemeColor" @drawerColorMsg="headerNav.drawerThemeColor = false" />
                <el-dialog id="dialogSystemInfo" title="系统信息" width="500px" :visible.sync="headerNav.dialogSystemInfo">
                    <el-form label-width="180px" >
                        <el-form-item label="软件名：">
                            <strong>IT服务管理系统</strong>
                        </el-form-item>
                        <el-form-item label="版本号：">
                            <strong>V 3.8.2</strong>
                        </el-form-item>
                        <el-form-item label="授权到期：">
                            <strong>2020-08-31 00:00:00</strong>
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
                        <div class="block WSContent-box">
                            <el-timeline>
                                <el-timeline-item :timestamp="timeString(Number(item.createTime))" placement="top"
                                                  v-for="(item, index) in headerNav.wsData"
                                                  :key="index">
                                    <el-card>
                                        <h4>{{WSContentBrack(item.content,item.title)}}</h4>
                                        <p>{{WSContentBrack(item.content)}}</p>
                                    </el-card>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                    </div>
                </el-drawer>
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

    export default {
        name: "app",
        data() {
            return {
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
                        phoneRules:(rule, value, callback)=>{
                            if (this.headerNav.formUser.tel && !(/^1[3-9]\d{9}$/.test(this.headerNav.formUser.tel))) {
                                callback(new Error('请输入正确格式电话！'))
                            } else {
                                callback()
                            }
                        }
                    }
                }

            }
        },
        components: {
            SideNavList,
            ImgTailoring,
            ApplySetting
        },
        methods: {
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
            headerNavUser_state_li(e){
                if(e.target.tagName.toLowerCase() == "li"){
                    this.headerNav.user_visible = false;
                    this.headerNav.user_state_i = e.target.firstChild.className;
                    this.headerNav.headerNavUser_state_val = this.headerNav.user_state_input = e.target.innerText;
                }

            },
            headerNavUser_state_btn(){
                this.headerNav.user_visible = false;
                this.headerNav.headerNavUser_state_val = this.headerNav.user_state_input;
            },
            drawerColorItem(color,set){
                if (typeof color == "string") {
                    this.$set(this.sideNav.color, set, color);
                }else if (typeof color == "boolean"){
                    this.ajaxBackgroundColor();
                } else {
                    this.$set(this.sideNav, "color", color);
                    this.mnualmHoverColor(color.firstLiColor,color.firstLiBack,true);
                }
            },
            //查看消息
            WSMsgLook(){
                this.headerNav.drawerWS = true;
            },
            WSClearAll(){
                this.$post("/backstage/notices/submitAllReadMark").then((data) => {
                   if (data.res){
                       this.headerNav.wsData = [];
                       this.$message({
                           showClose: true,
                           message: "全部已读完成",
                           type: 'success'
                       });
                   }
                });
            },
            timeString(timestamp){
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
                return y + '/' + m + '/' + d +' '+ h +':'+ minute +':' + second;
            },
            WSContentBrack(text,val2){
                if(val2){
                    let regex = /\[(.+?)\]/g;
                    let options = text.match(regex);
                    if (options && options.length) {
                        return "您的工单"+options.join("")+"提醒";
                    }
                    return val2;
                }else {
                    if(text.indexOf("工单主题") != -1){
                        return text.split("工单主题：")[1];
                    }
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
                this.$post('/backstage/account/setLanguage',{language: language}).then((data) => {
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
            mnualmHoverColor(firstLiColor,firstLiBack,msg){
                if (msg){
                    document.head.removeChild(this.$store.getters.getStyle);
                }
                let style = document.createElement("style");
                style.type = "text/css";
                this.$store.commit("addStyle", style);
                style.innerHTML = `
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
            ajaxBackgroundColor(){
                this.$post("/backstage/account/getTheme").then((data) => {
                    let val = JSON.parse(data.obj);
                    this.$set(this.sideNav.color, "navHeaderColor", val[0]);
                    this.$set(this.sideNav.color, "navSideColor", val[1]);
                    this.$set(this.sideNav.color, "fontColor", val[2]);
                    this.$set(this.sideNav.color, "firstLiColor", val[3]);
                    this.$set(this.sideNav.color, "firstLiBack", val[4]);
                    this.$set(this.sideNav.color, "allLiColor", val[5]);

                    this.mnualmHoverColor(val[3],val[4]);
                });
            }
        },
        mounted() {
            //侧边导航数据
            this.$post("/backstage/menu/getMenuJson3", {ref: "n"}, {dataType: "json"}).then((data) => {
                this.sideNav.data = data.obj.menuList;
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
            this.$ws.message().then((data)=>{
                this.$notify({
                    title: this.WSContentBrack(data.content,data.title),
                    message: this.WSContentBrack(data.content),
                    position: 'bottom-right'
                });
            })
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
        #dialogSystemInfo .el-dialog__body{
            height: auto;

            p{
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

    #user-state-ul{
        margin-top: 15px;
        border-top: 1px solid #DCDFE6;
        padding-top: 5px;
    }
    .i-icon{
        width: 28px;
        height: 28px;
        background-image: url("../assets/user/state.png");
        display: inline-block;
        vertical-align: middle;
    }
    .el-input-group--prepend>.el-input-group__prepend{
        padding: 0 5px;
    }
    .el-input-group--prepend>.el-input-group__append{
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
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
    .head-drawerThemeColor .el-drawer.rtl{
        height: calc(100% - 50px);
        top: 50px;
    }

    #dialogWSInfo{
        .el-drawer{
            top: 50px;
            height: calc(100% - 50px);

            .el-drawer__body{
                overflow-y: auto;

                #WSContent{
                    padding: 10px;

                    .WSContent-title{
                        padding: 0 20px;
                        width: 100%;

                        strong{
                            margin-right: 20px;
                        }
                    }

                    .WSContent-box{
                        margin-top: 20px;

                        .el-card{
                            p{
                                margin-top: 5px;
                            }
                        }
                    }
                }
            }
        }

    }
</style>
