<template>
    <div id="app">
        <div id="sideNav" :style="headerNav.sideNavOn ? 'width: 70px;':'width:220px;'">
            <el-menu
                    :collapse="headerNav.sideNavOn"
                    class="el-menu-vertical-demo"
                    :collapse-transition="false"
                    unique-opened
                    :background-color="sideNav.color.backgroundColor"
                    :text-color="sideNav.color.textColor"
                    :active-text-color="sideNav.color.activeColor">
                <li id="logo">
                    <img src="../public/image/index/logo.png" alt="">
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
            <div id="headerNav" :style="'background-color:'+sideNav.color.headerNav">
                <div id="nav-title">
                    <i @click="navIconOn" :class="headerNav.sideNavOn ? 'el-icon-s-unfold':'el-icon-s-fold'"></i>
                    <span>IT服务管理系统</span>
                </div>
                <div id="nav-content">
                    <div class="nav-exh">
                        <ul class="info">
                            <li><a href="#">大屏</a></li>
                            <li><a href="#">自助服务</a></li>
                            <li><a href="#">任务看板</a></li>
                        </ul>
                        <img class="imgOne" src="../public/image/index/toolLost.png"
                             @click="navImgone($event)" alt="">
                        <img class="imgTwo" src="../public/image/index/square.png" alt="">
                    </div>
                    <div id="nav-user">
                        <img src="./assets/1.jpg" alt="">
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
                    <el-badge :value="134" class="item">
                        <i size="small" class="el-icon-bell nav-news"></i>
                    </el-badge>

                    <div class="nav-language">
                        <img :src="headerNav.language.img" alt="">
                        <el-dropdown trigger="click" @command="languageDrop">
                            <span class="el-dropdown-link">{{headerNav.language.text}}</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="china"><img style="margin-right: 5px;vertical-align: middle;"
                                                                       src="../public/image/index/ChinaLogo.png" alt="">中文
                                </el-dropdown-item>
                                <el-dropdown-item command="english"><img
                                        style="margin-right: 5px;vertical-align: middle;"
                                        src="../public/image/index/EnglishLogo.png" alt="">英文
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <el-dialog title="个人设置" width="500px" :visible.sync="headerNav.dialogFormVisible">
                    <el-tabs type="border-card">
                        <el-tab-pane label="头像设置">
                            <div class="uploadHead">
                                <img src="./assets/1.jpg" alt="">
                                <p><el-button type="primary">上传头像</el-button></p>
                            </div>
                            <el-row :gutter="20">
                                <el-col :span="4"><img class="userImg" src="./assets/1.jpg" alt=""></el-col>
                                <el-col :span="4"><img class="userImg" src="./assets/1.jpg" alt=""></el-col>
                                <el-col :span="4"><img class="userImg" src="./assets/1.jpg" alt=""></el-col>
                                <el-col :span="4"><img class="userImg" src="./assets/1.jpg" alt=""></el-col>
                                <el-col :span="4"><img class="userImg" src="./assets/1.jpg" alt=""></el-col>
                                <el-col :span="4"><img class="userImg" src="./assets/1.jpg" alt=""></el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="个人资料">
                            <el-form label-width="80px" :model="headerNav.formUser">
                                <el-form-item label="登录名">
                                    <el-input v-model="headerNav.formUser.loginName"></el-input>
                                </el-form-item>
                                <el-form-item label="用户名">
                                    <el-input v-model="headerNav.formUser.name"></el-input>
                                </el-form-item>
                                <el-form-item label="用户状态">
                                    <el-input v-model="headerNav.formUser.name"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱">
                                    <el-input v-model="headerNav.formUser.email"></el-input>
                                </el-form-item>
                                <el-form-item label="电话">
                                    <el-input v-model="headerNav.formUser.tel"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="密码设置">角色管理</el-tab-pane>
                    </el-tabs>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="headerNav.dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="headerNav.dialogFormVisible = false">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";
    import SideNavList from "./components/index/sideNav-list";
    import ChinaLogo from "../public/image/index/ChinaLogo.png"
    import EnglishLogo from "../public/image/index/EnglishLogo.png"

    export default {
        name: "app",
        data() {
            return {
                sideNav: {
                    color: {
                        backgroundColor: "#545c64",
                        textColor: "#fff",
                        activeColor: "#ff7b62",
                        headerNav: "#11a0f8",
                        hoverColor: "",
                        hoverBackgroundColor: ""
                    },
                    data: []
                },
                //false关闭，true打开
                headerNav: {
                    icon: "el-icon-s-fold",
                    sideNavOn: false,
                    imgOne: false,
                    language: {
                        img: ChinaLogo,
                        text: "中文"
                    },
                    dialogFormVisible: false,
                    formUser:{
                        loginName: "",
                        name:"",
                        state: "",
                        email: "",
                        tel: ""
                    }
                }

            }
        },
        components: {
            SideNavList
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
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    case 4:
                        break;
                    case 5:
                        break;
                    default:

                }
            },
            //语言选择
            languageDrop(command) {
                if (command == "china") {
                    this.headerNav.language = {img: ChinaLogo, text: "中文"}
                } else {
                    this.headerNav.language = {img: EnglishLogo, text: "英文"}
                }
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
                        step: function (now, fx) {
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
        },
        mounted() {
            //侧边导航数据
            /*this.$post("/backstage/menu/getMenuJson3", {ref: "n"}, {dataType: "json"}).then((data) => {
                this.sideNav.data = data.obj.menuList;
            });*/
            //侧边导航颜色 /backstage/account/getTheme
            this.$post("/backstage/account/getTheme").then((data) => {
                let val = JSON.parse(data.obj);
                this.$set(this.sideNav.color, "headerNav", val[0]);
                this.$set(this.sideNav.color, "backgroundColor", val[1]);
                this.$set(this.sideNav.color, "textColor", val[2]);
                this.$set(this.sideNav.color, "hoverColor", val[3]);
                this.$set(this.sideNav.color, "hoverBackgroundColor", val[4]);
                this.$set(this.sideNav.color, "activeColor", val[5]);

                let style = document.createElement("style");
                style.type = "text/css";
                this.$store.commit("addStyle", style);
                style.innerHTML = `
                #sideNav .el-submenu__title:hover{
                    background-color: ${val[4]} !important;
                    color: ${val[3]} !important;
                }
                #sideNav .el-menu-item:hover{
                    background-color: ${val[4]} !important;
                    color: ${val[3]} !important;
                }
                #sideNav .is-opened>div{
                    background-color: ${val[4]} !important;
                    color: ${val[3]} !important;
                }`;
                document.head.appendChild(style);
            });
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

        .el-dialog__body{
            height: 300px;
            padding-top: 12px;

            .uploadHead{
                text-align: center;
                img{
                    width: 100px;
                    height: 100px;
                    border-right: 5px;
                }
                p{
                    margin-top: 10px;
                }
            }
            .el-row{
                margin-top: 40px;
            }
            .userImg{
                width: 50px;
                height: 50px;
                border-radius: 5px;
            }
        }
    }
</style>
