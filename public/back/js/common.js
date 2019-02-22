
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




