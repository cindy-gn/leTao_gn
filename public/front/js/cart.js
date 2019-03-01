$(function () {

    //1.一进入页面 就选渲染购物车

    render();//一进页面先渲染一下
    function render() {
        $.ajax({
            type: "get",
            url: "/cart/queryCart",
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.error === 400) {
                    location.href = "login.html?retUrl=" + location.href;
                    return;
                }
                //等到的是一个数组,需要包装一下
                var htmlStr = template("cartTpl", { list: info })
                $(".lt_main .mui-table-view").html(htmlStr);

            }
        });

    }


    //2.时间委托给所有的删除按钮,点击删除当前的内容
    //后台接口的参数需要传当前删除的id  必须是一个数组

    $(".lt_main").on("click", ".btn_delete", function () {
        var id = $(this).data("id");
        $.ajax({
            type: "get",
            url: "/cart/deleteCart",
            data: {
                id: [id]
            },
            dataType: "json",
            success: function (info) {
                console.log(info);

                //删除成功了,重新渲染页面
                render();
            }
        })
    })
















})