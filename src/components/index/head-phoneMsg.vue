<template>
    <div>
        <p style="color:forestgreen;padding: 2px 5px;">{{data}}</p>
        <div style="text-align: right;width: 250px;margin-top: 5px;">
            <button  @click="breakOff" class="el-button el-button--info el-button--mini is-plain">挂断 </button>
            <button @click="anwser" class="el-button el-button--primary el-button--mini is-plain">接听</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "head-phoneMsg",
        props:["data","msgIndex"],
        methods:{
            breakOff(){

            },
            answer(){

            },
        }
    }
</script>

<style scoped>

</style>