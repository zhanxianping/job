<template>
    <div id="phone-keyboard">
        <el-row style="margin-bottom: 10px;">
            <el-input placeholder="请输入号码" v-model="phoneNumber" class="input-with-select">
                <el-button slot="prepend" icon="el-icon-notebook-2"></el-button>
                <el-button @click="clearPhoneNumber" slot="append">
                    <svg t="1595991300769" style="width: 22px;height: 22px;" class="btnIcon" viewBox="0 0 1024 1024"
                         version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1292"
                         xmlns:xlink="http://www.w3.org/1999/xlink">
                        <path d="M469.39119709044934 637.4592522922666c4.734311578232098 4.734311578232098 11.83577829831111 7.101466720079011 16.57008987654321 7.101466720079011s11.83577829831111-2.3671551418469137 16.57008987654321-7.101466720079011l99.42053925925923-99.42053925925923 99.42053925925923 99.42053925925923c4.734311578232098 4.734311578232098 11.83577829831111 7.101466720079011 16.57008987654321 7.101466720079011s11.83577829831111-2.3671551418469137 16.57008987654321-7.101466720079011c9.468623156464195-9.468623156464195 9.468623156464195-23.67155659662222 0-33.14017975308642l-99.42053925925923-99.42053925925923 99.42053925925923-99.42053925925923c9.468623156464195-9.468623156464195 9.468623156464195-23.67155659662222 0-33.14017975308642s-23.67155659662222-9.468623156464195-33.14017975308642 0l-99.42053925925923 99.42053925925923-99.42053925925923-99.42053925925923c-9.468623156464195-9.468623156464195-23.67155659662222-9.468623156464195-33.14017975308642 0s-9.468623156464195 23.67155659662222 0 33.14017975308642l99.42053925925923 99.42053925925923-99.42053925925923 99.42053925925923c-7.101466720079011 9.468623156464195-7.101466720079011 23.67155659662222 0 33.14017975308642z"
                              p-id="1532"></path>
                        <path d="M341.56478965633585 814.9959293560098h591.7889239773234c26.038713033007408 0 47.343114487782714-21.304401454775306 47.343114487782714-47.343114487782714V239.77709525522965c0-26.038713033007408-21.304401454775306-47.343114487782714-47.343114487782714-47.343114487782714h-591.7889239773234c-11.83577829831111 0-23.67155659662222 0-310.09739607608884 298.2616177777778-9.468623156464195 9.468623156464195-9.468623156464195 23.67155659662222 0 33.14017975308642 288.79299462131354 291.1601510576987 298.2616177777778 291.1601510576987 310.09739607608884 291.1601510576987z m7.101466720079011-575.21883410078h584.6874572572444v527.8757196129975H348.6662563764148c-28.40586817485432-21.304401454775306-151.49796403073577-144.39649731065677-265.1214380246914-262.7542815883061 113.62347399395556-118.35778427764939 239.08272499168393-243.81703656991604 265.1214380246914-265.1214380246914z"
                              p-id="1532"></path>
                    </svg>
                </el-button>
            </el-input>
        </el-row>
        <div class="keyboard">
            <el-row>
                <el-col :span="17">
                    <div class="keyboard-left" @click="keyboardBtn">
                        <el-button v-for="item in 9" :key="item" type="primary" plain>{{item}}</el-button>
                        <el-button type="primary" plain>*</el-button>
                        <el-button type="primary" plain>0</el-button>
                        <el-button type="primary" plain>#</el-button>
                    </div>
                    <div class="keyboard-bottom">
                        <el-button @click="tellPhone" :type="nowCallPhone ? 'danger' : 'success'"
                                   icon="el-icon-phone"></el-button>
                        <el-button v-show="user.name" @click="dialogVisible = true" type="text">{{user.name}}</el-button>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="keyboard-right">
                        <el-popover
                                id="openFirstBtn"
                                placement="right"
                                v-model="openFirstBtnVisible"
                                width="50"
                                trigger="click">
                            <el-button @click="openUser_info" size="small" type="primary" plain>{{!user_info ? "开工" :
                                "收工"}}
                            </el-button>
                            <el-button plain slot="reference" size="small" type="success">{{user_info ? "开工" : "收工"}}
                            </el-button>
                        </el-popover>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-dialog
                id="user-info"
                title="人员信息"
                :visible.sync="dialogVisible"
                width="400px">
            <div>
                <h3 style="text-align: center"><img style="width: 50px;height: 50px;border-radius: 50%" :src="user.picUrl" alt=""></h3>
                <el-form label-width="80px">
                    <el-form-item label="账号：">
                        <div>{{user.loginName}}</div>
                    </el-form-item>
                    <el-form-item label="姓名：">
                        <div>{{user.name}}</div>
                    </el-form-item>
                    <el-form-item label="机构：">
                        <div>{{user.orgName}}</div>
                    </el-form-item>
                    <el-form-item label="手机：">
                        <div>{{user.phone}}</div>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <div>{{user.email}}</div>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import $vm from "../../utils/util"

    export default {
        name: "head-phone",
        data() {
            return {
                phoneNumber: "",
                dialogVisible: false,
                openFirstBtnVisible: false,
                user_info: false, //true:开工
                nowCallPhone: false, //true: 正在通话
                user:{
                    loginName: "",
                    name: "",
                    orgName: "",
                    phone: "",
                    email: "",
                    picUrl: ""
                }
            }
        },
        props: ["dataRes"],
        watch: {
            number() {
                if (this.phoneNumber && this.phoneNumber.length > 3) {
                    this.$post("/backstage/conversation/getPersonInfo", {phone: this.phoneNumber}, {dataType: "json"}).then((data) => {
                        if (data.obj.length && data.obj.length <= 1) {
                            let list = data.obj[0];
                            this.$set(this.user,"loginName",list.loginName);
                            this.$set(this.user,"name",list.name);
                            this.$set(this.user,"orgName",list.orgName);
                            this.$set(this.user,"phone",list.phone);
                            this.$set(this.user,"email",list.email);
                            this.$set(this.user,"picUrl",list.picUrl);

                        } else {
                            this.$set(this.user,"name","");
                        }
                    })
                }
            },
            user_info(now) {
                if (now) {
                    this.$phone.connect();
                } else {
                    this.$phone.disconnect();
                }
            },
            dataRes(now) {
                console.log(now);
                this.nowCallPhone = now;
            }
        },
        computed: {
            number: function () {
                this.phoneNumber = this.phoneNumber.replace(/[^#*0-9]/ig, "");
                return this.phoneNumber.replace(/[^*#0-9]/ig, "")
            }
        },
        methods: {
            keyboardBtn(e) {
                if (e.target.classList.contains("el-button")) {
                    this.phoneNumber += e.target.innerText;
                } else if (e.target.tagName.toLowerCase() == "span") {
                    this.phoneNumber += e.target.parentNode.innerText;
                }
            },
            openUser_info() {
                this.user_info = !this.user_info;
                this.openFirstBtnVisible = false;
                this.$emit("user_info", this.user_info)
            },
            clearPhoneNumber() {
                this.phoneNumber = this.phoneNumber.substring(0, this.phoneNumber.length - 1);
            },
            //打电话
            tellPhone() {
                if (!this.nowCallPhone) {
                    if (!this.phoneNumber.trim()) {
                        this.$message({
                            message: '请输入电话号码',
                            type: 'warning'
                        });
                        return
                    }
                    this.$phone.call(this.phoneNumber).then((data) => {
                        this.nowCallPhone = data;
                    })
                } else {
                    if (this.$phone.hangup()) {
                        //挂断成功
                        this.nowCallPhone = false;
                    }
                }

            },
            breakOff(v) {
                console.log(this.$store.getters.getNotificationIndex);
                this.$store.getters.getNotificationIndex.close();
            }

        },
        mounted() {
            window.off = this.breakOff;
            $vm.$on("nowCall", (data) => {
                this.nowCallPhone = data;
            })
        }
    }
</script>

<style lang="less" scoped>
    #phone-keyboard .el-input-group__prepend {
        .el-button {
            padding: 12px;
            font-size: 18px;
        }
    }

    #phone-keyboard .el-input-group__append {
        .el-button {
            padding: 12px;

            path {
                fill: #606266;;
            }
        }
    }

    #phone-keyboard {
        width: 100%;

        .keyboard {
            width: 100%;
        }

        .el-col-17 {
            border-right: 1px solid #f2f2f2;
        }

        .keyboard-left {

            .el-button {
                border-radius: 50%;
                padding: 16px 20px;
                margin: 7px 5px 0 18px;
                font-size: 18px;
            }
        }

        .keyboard-right {
            width: 100%;
            text-align: center;

            .el-button {
                margin-top: 20px;
                padding: 9px 25px;
            }
        }

        .keyboard-bottom {
            width: 61%;
            float: right;
            text-align: right;
            margin-top: 5px;
            border-top: 1px solid #f2f2f2;
            padding-top: 8px;
            display: flex;
            justify-content: space-between;


            .el-button {
                padding: 5px 8px;
                font-size: 22px;
            }
           /* .last-btn{

                margin-left: 20px;
                margin-right: 15px;
            }*/
            .el-button:last-child {
                font-size: 14px;
                text-align: left;
                width: 74px;
                overflow: hidden;
            }
        }

        .el-form{
            padding-left: 40px;
            padding-top: 10px;
        }
    }

</style>