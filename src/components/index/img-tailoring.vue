<template>
    <div id="imgTailor">
       <div class="imgLeft">
           <div id="imageBox" @mousedown="imgDown" @mouseenter="mouseOver" @mouseleave="mouseOut" :style="'background-image: url('+imgSrc+');'">
               <div class="thumbBox"></div>
           </div>
           <div class="imgBtn">
               <el-button-group>
                   <div class="el-upload el-upload--text" style="position: relative">
                       <el-button size="small" type="primary">上传图像</el-button>
                       <input type="file" @change="fileProgress" name="file" style="position: absolute;opacity: 0;left: 0;top: 0;">
                   </div>
               </el-button-group>
               <el-button-group style="margin-left: 23px">
                   <el-button size="small" type="primary" @click="add" icon="el-icon-plus"></el-button>
                   <el-button size="small" type="primary" @click="del" icon="el-icon-minus"></el-button>
                   <el-button size="small" type="primary" @click="shear">裁剪</el-button>
                   <el-button size="small" type="primary" @click="use">应用</el-button>
               </el-button-group>
           </div>
       </div>
        <div class="cropped" v-show="tailor">
            <img style="width: 100px;height: 100px;border-radius: 50%;margin-top: 10px;" :src="tailor" alt="">
            <p>100px*100px</p>
            <img style="width: 128px;height: 128px;border-radius: 50%;margin-top: 30px;" :src="tailor" alt="">
            <p>128px*128px</p>
        </div>

    </div>
</template>

<script>
    import $vm from "../../utils/util"

    export default {
        name: "imgTailor",
        data() {
            return {
                imgSrc: "",
                imgLeft: 0,
                imgTop: 0,
                imgWidth: 0,
                imgHeight: 0,
                imgDom: "",
                tailor: "",
                iw: 0,
                ih: 0
            }
        },
        methods: {
            //上传图片
            fileProgress(e) {
                const that = this;
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = function(e) {
                    let img = e.target.result;
                    that.imgSrc = img;
                    let image = new Image();
                    image.src = img;
                    image.onload = function () {
                        that.imgWidth = that.iw = this.width;
                        that.imgHeight = that.ih = this.height;
                    }
                }
            },
            //裁剪
            async shear(){
                if(!this.imgSrc){
                    this.$message({
                        showClose: true,
                        message: '请先上传图片',
                        type: 'error'
                    });
                    return;
                }
                let thumbBox = document.getElementsByClassName("thumbBox")[0];
                let that = this,
                    sx = this.imgTop - thumbBox.offsetLeft,
                    sy = this.imgLeft - thumbBox.offsetTop,
                    canvas = document.createElement("canvas");
                canvas.width = thumbBox.offsetWidth;
                canvas.height = thumbBox.offsetHeight;
                let context = canvas.getContext("2d");
                let image = new Image();
                image.src = this.imgSrc;

                image.onload = await function () {
                    context.drawImage(image, 0,0,that.iw, that.ih, sx, sy, that.imgWidth, that.imgHeight);
                    that.tailor = canvas.toDataURL('image/jpeg');
                }

            },
            //使用图片
            use(){
                this.shear("use");
                const unWatch = this.$watch('tailor', (val) => {
                    this.$post("/backstage/uploadpic/uploadHeadFtpImage",{data: val,"name": (new Date()).getTime() + ".jpg"}).then((data)=>{
                        $vm.$emit("imgTailOk",data.obj);
                    });
                    unWatch();//销毁watch,防止内存溢出
                });
            },
            //图片移动
            imgDown(e){
                e.stopImmediatePropagation();
                const that = this;
                let X = e.clientX,Y = e.clientY;
                e.target.onmousemove = function(ev){
                    let x = ev.clientX - X;
                    let y = ev.clientY - Y;
                    that.imgLeft = y + that.imgLeft;
                    that.imgTop = x + that.imgTop;
                    e.target.style.backgroundPosition = that.imgTop + "px "+that.imgLeft + "px";
                    X = ev.clientX;
                    Y = ev.clientY;
                };
                document.onmouseup = function () {
                    e.target.onmousemove = null;
                    document.onmouseup = null;
                };
            },
            mouseOver(e){
                const that = this;
                e.stopImmediatePropagation();
                that.imgDom = e.target;
                e.target.onmousewheel = that.wheelHander;
                e.target.addEventListener('DOMMouseScroll',that.wheelHander,false);
            },
            mouseOut(){
                this.imgDom.onmousewheel = null;
                this.imgDom.removeEventListener("DOMMouseScroll",this.wheelHander);
            },
            //放大
            add(){
                this.imgWidth = this.imgWidth+20;
                this.imgHeight = this.imgHeight+20;
                this.imgDom.style.backgroundSize = this.imgWidth + "px "+this.imgHeight+ "px";
            },
            //缩小
            del(){
                this.imgWidth = this.imgWidth-20;
                this.imgHeight = this.imgHeight-20;
                this.imgDom.style.backgroundSize = this.imgWidth + "px "+this.imgHeight+ "px";
            },
            //鼠标滚轮事件
            wheelHander(e){
                //事件的兼容性写法
                const that = this;
                let oEvent = window.event;
                if (oEvent.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                    if (oEvent.wheelDelta > 0) { //当滑轮向上滚动时
                        that.add();
                    }
                    if (oEvent.wheelDelta < 0) { //当滑轮向下滚动时
                        that.del();
                    }
                } else if (oEvent.detail) {  //Firefox滑轮事件
                    if (oEvent.detail> 0) { //当滑轮向下滚动时
                        that.del();
                    }
                    if (oEvent.detail< 0) { //当滑轮向上滚动时
                        that.add();
                    }
                }
                return false;
            }
        }
    }


</script>

<style lang="less" scoped>
    #imgTailor{
        width: 580px;
        height: 300px;

        .imgLeft{
            float: left;
            margin: 0 50px;

            .imgBtn{
                margin-top: 15px;
            }
        }
        #imageBox{
            width: 300px;
            height: 300px;
            overflow: hidden;
            position: relative;
            cursor: move;
            background-repeat: no-repeat;

            .thumbBox{
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100px;
                height: 100px;
                margin-top: -50px;
                margin-left: -50px;
                box-sizing: border-box;
                border: 1px solid rgb(102, 102, 102);
                box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
                background: none repeat scroll 0% 0% transparent;
            }
        }
        .cropped{
            width: 150px;
            float: left;
            margin-left: 20px;
            text-align: center;

            p{
                color: #bbb;
                font-size: 12px;
            }
        }
    }
</style>