$(function () {

    //点击登录按钮就行登录

    $("#loginBtn").on("click", function () {

        // console.log(111);
        var username= $("#username").val().trim();
        var password= $("#password").val().trim();
        if(username===""){
            mui.toast("请输入用户名");
        }
        if(password===""){
            mui.toast("请输入密码");
        }

        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                username:username,
                password:password
            },
            dataType: "json",
            success: function (info) {
                console.log(info);

                //判断用户名或者密码不存在的情况
                if(info.error===403){
                    mui.toast("用户名或者密码错误");
                    return;
                }
                if(info.success){
                    //跳转到添加购物车页面
                    //1.如果有参数  就跳转到需要跳转的页面
                    //2.如果没有参数,就直接跳转到用户中心页面
                    //!=-1 就表示有
                    if(location.search.indexOf("retUrl")!=-1){
                        // 获取传过来的参数,跳到这个页面
                        //把前面不需要的键用空的字符串替换
                        retUrl=location.search.replace("?retUrl=","");

                        //跳回到这个地址
                        location.href=retUrl;
                    }
                    else{
                        //没有传参数
                        //直接跳转到用户页面
                        location.href="user.html";
                    }
                }

            }
        })
    })
















})