$(function () {


    //1.一进页面就渲染渲染,
    //根据后台的接口渲染页面,后台的接口需要上传对应的商品详情的id
    //在上次的页面 searchList.html==> 跳转之前的页面,渲染时,跳转的时候把id 拼接到地址栏的后面
    var productId = getSearch("productId");

    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id: productId
        },
        dataType: "json",
        success: function (info) {
            console.log(info);
            var htmlStr = template("productTpl", info);
            $(".mui-scroll").html(htmlStr);


            // 初始化轮播图, 获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
            //初始化数字kuang 让input框里面有数字
            mui(".mui-numbox").numbox();
        }
    });

    //2.给鞋码添加点击事件,点击时添加类名高亮
    $(".lt_main").on("click",'.lt_size span',function(){
        $(this).addClass("current").siblings().removeClass("current");
    })

    //3.加入购物车功能
    $("#addCart").click(function(){
        console.log(111);
        
        //点击时获取鞋码的大小
        var size=$(".lt_size span.current").text();
        //判断,如果点击添加到购车时,没有选尺码,就提示用户
        if(!size){
            mui.toast("请选择尺码");
        }
        //选择要加入购物车的数量
        var num=$(".lt_num .mui-numbox-input").val();

        //如果都选好了就发送请求,如果登录了就添加到购物车,如果还没有登录,
        //就拦截跳转到登录页面.跳转到登录页面,登录成功还是要跳回到添加到
        //购物车页面的
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
                size:size,
                num:num,
                productId:productId
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                //先判断未登录,跳转到登录页面
                if(info.error===400){
                    location.href="login.html?retUrl="+location.href;

                    return;
                }
                if(info.success){
                    //提示用户,加入购物车成功
                    mui.confirm("加入成功","温馨提示",["去购物车","继续浏览"],function(e){

                        //登录成功跳转到购物车页面
                        if(e.index===0){

                            location.href="cart.html";
                        }
                    })
                }
            }

        })

        
    })




















})