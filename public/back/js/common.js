
//在全局都有ajax请求,而且每个ajax请求的都是向后台发送数据
//如果不使用全局事件 在每一个ajax的beforesend  success  complete  回调函数
//中间加上相应的代码


//jq全局事件  都需要给document  注册(固定写法)
$(document).ajaxStart(function(){
    // console.log(111);
    //在发送Ajax请求时 开启进度条
    NProgress.start();
    
});



//在发送ajax请求结束时,就关闭进度条
$(document).ajaxStop(function(){
    //设置延时器,延迟  1秒  模拟网络的速度
    setTimeout(function(){
        NProgress.done();
    },1000)
});


//首页的二级菜单展示或者隐藏通过js完成
//1.给左侧栏 通过jq添加动画
// 公用的功能:
// 1. 左侧二级菜单的切换
// 2. 左侧整体菜单的切换
// 3. 公共的退出功能 
$(function(){
//1.左侧二级菜单的切换
$(".lt_aside .category").click(function(){
    //找到下一个兄弟元素,做动画显示
    $(this).next().stop().slideToggle();
})


//2.点击按钮,左边的侧边栏隐藏  右边的补过来
$(".lt_topbar .icon_menu").click(function(){
    $(".lt_aside").toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
    $(".lt_topbar").toggleClass("hidemenu");
})

//3.点击退出按钮,弹出模态框,判断时候退出或者取消
$(".lt_topbar .icon_logout").click(function(){
    console.log(111);
    
    $("#logoutModal").modal("show");
})
//4.点击退出按钮.发送求情,退出模态框,跳到登录页面
$("#logoutBtn").click(function(){
    $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        success:function(info){
            if(info.success){
                location.href="login.html";
            }
        }
    })
})















})



