<template>
    <div>
        <div v-for="(item, index) in dataList" :key="item.id">
            <el-submenu :index="listIndex+'-'+String(index)" v-if="item.nodes !== undefined && item.nodes.length >= 1">
                <template slot="title">{{item.name}}</template>
                <sideNavList :dataList="item.nodes" :listIndex="index" />
            </el-submenu>

            <el-menu-item v-else :index="listIndex+'-'+String(index)">{{item.name}}</el-menu-item>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sideNavList",
        props:["dataList","listIndex"]
    }
</script>

<style scoped>

</style>