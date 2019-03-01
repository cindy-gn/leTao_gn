

$(function () {

    //1.一进入就渲染当前用户的信息
    $.ajax({
        type: "get",
        url: "/user/queryUserMessage",
        dataType: "json",
        success: function (info) {
            console.log(info);

            if (info.error === 400) {
                //未登录
                location.href = "login.html";
                return;
            }

            //如果是登录状态 
            var htmlStr = template("userTpl", info);
            $("#userInfo").html(htmlStr);

        }
    })





    ///2.点击退出按钮,退出登录信息
    $("#logout").click(function () {
        $.ajax({
            type: "get",
            url: "/user/logout",
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    location.href = "login.html"
                }
            }
        })
    })









})