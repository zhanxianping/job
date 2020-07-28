<template>
    <div id="drawerThemeColor">
        <el-drawer title="我是标题" class="head-drawerThemeColor"
                   :visible.sync="drawerThemeColor"
                   :modal-append-to-body="false"
                   :before-close="colorClose"
                   size="400px"
                   :with-header="false">
            <div id="colorBox">
                <h4>配色方案</h4>
                <ul @click="colorIndexItem">
                    <li :data-index="index" v-for="(item, index) in indexItem" :key="index">
                        <div class="head" :style="'background: '+item.navHeaderColor"></div>
                        <div class="left" :style="'background: '+item.navSideColor">
                            <div class="leftLogo"></div>
                        </div>
                    </li>
                </ul>
                <h4 style="margin-top: 15px">自定义配色</h4>
                <div>
                    <div class="el-form-item">
                        <el-color-picker @active-change="changeHeaderColor" v-model="colorBox.navHeaderColor"></el-color-picker>
                        <div class="colorTie">头部颜色选取</div>
                    </div>
                    <div class="el-form-item">
                        <el-color-picker @active-change="changeSideColor" v-model="colorBox.navSideColor"></el-color-picker>
                        <div class="colorTie">侧边导航背景</div>
                    </div>
                    <div class="el-form-item">
                        <el-color-picker @active-change="changeFontColor" v-model="colorBox.fontColor"></el-color-picker>
                        <div class="colorTie">侧边导航字体</div>
                    </div>
                    <div class="el-form-item">
                        <el-color-picker v-model="colorBox.firstLiColor"></el-color-picker>
                        <div class="colorTie">侧边导航选中颜色</div>
                    </div>
                    <div class="el-form-item">
                        <el-color-picker v-model="colorBox.firstLiBack"></el-color-picker>
                        <div class="colorTie">侧边导航选中背景</div>
                    </div>
                    <div class="el-form-item">
                        <el-color-picker v-model="colorBox.allLiColor"></el-color-picker>
                        <div class="colorTie"> 二级以下选中字体</div>
                    </div>
                    <div class="el-form-item">
                        <div class="el-dialog__footer">
                            <el-button @click="reset" size="small" type="warning">默认</el-button>
                            <el-button @click="update" size="small" type="primary">更新</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "apply-setting",
        data() {
            return {
                drawerThemeColor: false,
                indexItem: [{
                    //头部颜色设置
                    navHeaderColor: "rgb(32, 34, 42)",
                    //侧导航颜色设置
                    navSideColor: "rgb(32, 34, 42)",
                    //主题默认字体颜色
                    fontColor: "#fff",
                    //侧边栏选中字体颜色
                    firstLiColor: "#fff",
                    //侧边栏选中背景颜色
                    firstLiBack: "#d95043",
                    //侧边栏所有li选中的字体颜色
                    allLiColor: "#d95043"
                }, {
                    navHeaderColor: "#50314F",
                    navSideColor: "#50314F",
                    fontColor: "#fff",
                    firstLiColor: "#fff",
                    firstLiBack: "#7fca0c",
                    allLiColor: "#7fca0c"
                }, {
                    navHeaderColor: "#00CA79",
                    navSideColor: "#00CA79",
                    fontColor: "#fff",
                    firstLiColor: "#fff",
                    firstLiBack: "rgb(34, 236, 173)",
                    allLiColor: "rgb(33, 139, 8)"
                }, {
                    navHeaderColor: "#252525",
                    navSideColor: "#b52e31",
                    fontColor: "#fff",
                    firstLiColor: "#fff",
                    firstLiBack: "#252525",
                    allLiColor: "#252525"
                }, {
                    navHeaderColor: "#11a0f8",
                    navSideColor: "#fff",
                    fontColor: "#5e5f61",
                    firstLiColor: "#fff",
                    firstLiBack: "#11a0f8",
                    allLiColor: "#11a0f8"
                }, {
                    navHeaderColor: "linear-gradient(to right, #004899 , #36dcdc)",
                    navSideColor: "linear-gradient(to bottom, #004899 , #36dcdc)",
                    fontColor: "#fff",
                    firstLiColor: "#fff",
                    firstLiBack: "#0e94cd",
                    allLiColor: "#0e94cd"
                }],
                colorBox:{
                    navHeaderColor: "#11a0f8",
                    navSideColor: "#fff",
                    fontColor: "#5e5f61",
                    firstLiColor: "#fff",
                    firstLiBack: "#11a0f8",
                    allLiColor: "#11a0f8"
                }
            }
        },
        props: ["dataRes","dataColor"],
        watch: {
            dataRes: function (newValue, oldValue) {
                this.drawerThemeColor = newValue;
            },
            dataColor: function (newValue, oldValue) {
                this.colorBox = newValue;
            }
        },
        methods: {
            reset(){
                let data = JSON.stringify(["#11a0f8","#fff","#5e5f61","#fff","#11a0f8","#11a0f8"]);
                this.colorBox = {
                    navHeaderColor: "#11a0f8",
                    navSideColor: "#fff",
                    fontColor: "#5e5f61",
                    firstLiColor: "#fff",
                    firstLiBack: "#11a0f8",
                    allLiColor: "#11a0f8"
                };
                this.$post("/backstage/account/setTheme", {theme: data}).then((data) => {
                    this.$message({
                        message: data.resMsg,
                        type: 'success'
                    });
                });
                this.$emit("drawerColorMsg", false);
                this.$emit("drawerColorItem", this.colorBox);
                this.drawerThemeColor = false;
            },
            update(){
                let color =  this.$parent.sideNav.color;
                let data = JSON.stringify([color.navHeaderColor,color.navSideColor,color.fontColor,color.firstLiColor,color.firstLiBack,color.allLiColor]);
                this.$post("/backstage/account/setTheme", {theme: data}).then((data) => {
                    this.$message({
                        message: data.resMsg,
                        type: 'success'
                    });
                });
                this.$emit("drawerColorMsg", false);
                this.drawerThemeColor = false;
            },
            colorClose(done) {
                done();
                this.$emit("drawerColorMsg", false);
                this.$emit("drawerColorItem", false);
            },
            colorIndexItem(e){
                if (e.target.tagName.toLowerCase() == "li"){
                    this.$emit("drawerColorItem", this.indexItem[Number(e.target.dataset.index)]);
                }
            },
            changeHeaderColor(color){
                this.$emit("drawerColorItem", color, "navHeaderColor");
            },
            changeSideColor(color){
                this.$emit("drawerColorItem", color, "navSideColor");
            },
            changeFontColor(color){
                this.$emit("drawerColorItem", color, "fontColor");
            }
        }
    }
</script>

<style lang="less" scoped>
    #drawerThemeColor {
        #colorBox {
            width: 100%;
            padding: 0 15px;
        }
        h4 {
            color: #333;
            padding: 10px 0;
        }

        ul:after {
            content: "";
            display: block;
            clear: both;
        }
        li {
            list-style: none;
            float: left;
            width: 105px;
            height: 65px;
            background-color: #f2f2f2;
            margin-left: 15px;
            cursor: pointer;
            margin-top: 15px;
            overflow: hidden;
            box-shadow: 0 2px 8px -3px rgba(0, 0, 0, 0.08), 0 3px 10px 0 rgba(0, 0, 0, 0.05), 0 4px 12px 8px rgba(0, 0, 0, 0.03);

            .head {
                width: 100%;
                height: 10px;
                background: green;
                margin-left: 30px;
            }
            .left {
                margin-top: -10px;
                width: 30px;
                height: 100%;
                background: red;

                .leftLogo {
                    width: 100%;
                    height: 10px;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
                }
            }
        }
        .el-form-item {
            margin-bottom: 12px;

            .el-color-picker{
                float: left;
            }
            .colorTie{
                display: inline-block;
                line-height: 40px;
                float: left;
                margin-left: 20px;
                color: #606266;
                font-size: 14px;
            }
        }

    }
</style>