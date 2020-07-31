<template>
    <div>
        <div v-for="(item, index) in dataList" :key="item.id">
            <el-submenu :index="listIndex+'-'+String(index)" v-if="item.nodes !== undefined && item.nodes.length >= 1">
                <template slot="title">{{item.name}}</template>
                <sideNavList :dataList="item.nodes" :listIndex="index" />
            </el-submenu>

            <el-menu-item v-else
                          :data-name="item.name"
                          :data-url="item.resUrl + '?menu=' + item.id"
                          :index="listIndex+'-'+String(index)">{{item.name}}<span class="order-number" v-if="item.name == '我提交的' || item.name == '待办工单'">{{item.name == '我提交的' ? myUpdataOrder : muselfOrder}}</span></el-menu-item>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sideNavList",
        data(){
          return{
              myUpdataOrder: "",
              muselfOrder: ''
          }
        },
        props:["dataList","listIndex"],
        mounted(){
            this.$post("/backstage/getMyJobsCount").then((data)=>{
                this.myUpdataOrder = data.obj;
            });
            this.$post("/backstage/getTodoListCount").then((data)=>{
                this.muselfOrder = data.obj;
            })
        }
    }
</script>

<style scoped>
 .order-number{
     float: right;
     display: inline-block;
     background: #11a0f8;
     line-height: 1;
     margin-top: 16px;
     padding: 3px;
     border-radius: 2px;
     font-size: 12px;
 }
</style>