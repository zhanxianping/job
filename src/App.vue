<template>
    <div id="app">
       <Index/>
    </div>
</template>

<script>
    import Index from "./views/Index";

    export default {
        name: "app",
        components: {
            Index
        },
    }
</script>

<style lang="less">

    #app {
        width: 100%;
        height: 100%;
    }
</style>
