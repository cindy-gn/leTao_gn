$(function () {

    //获取地址栏里面的关键字
    var txt = getSearch("key");//💗后面的参数里面是前面跳转时拼接的
    //地址栏里面的键,才能获取到里面的值
    // console.log(txt);

    // //1.将关键字设置给搜索框
    $(".search_input").val(txt);


    //2.一进页面先渲染一次
    render();



    //3.点击搜索按钮,发送请求渲染页面
    $(".search_btn").click(function () {
        //发送请求,渲染页面
        render();
    })

    // //4.点击中间的两个a,添加类名
    //    (1) 如果本身没有 current 类, 添加上 current 类, 排他
    //    (2) 如果本身有 current 类, 切换箭头的方向, 切换箭头类名 fa-angle-up  fa-angle-down
    $(".lt_sort a[data-type]").click(function () {

        if ($(this).hasClass("current")) {
            $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down");

        } else {
            //如果没有这个类名就给当前点击的这个加上类名,其他的兄弟元素
            //移除这个类名
            $(this).addClass("current").siblings().removeClass("current");
        }

        //修改上下箭头后,重新渲染页面
        render();
    });



    // 1. 一进页面就根据搜索框里面的关键字发送请求
    function render() {


        // 注意:💗 请求的参数有5个看接口文档
        //还有两个参数,一个点击是按价格,按照升序或者降序排列

        //1.声明一个对象,将需要的五个参数都放进这个对象里面去
        var obj = {};
        obj.proName = $(".search_input").val();
        obj.page = 1;
        obj.pageSize = 100;
        //以上这三个参数是必须的写的
        //判断什么时候需要写这个参数
        //如果当前的这个a 是高亮的效果,决定是否排序

        var $current = $(".lt_sort a.current");//==>找到有这个类名的a
        console.log($current);

        //jq对象是有长度的,判断,当长度为1 ,就是有这个类名
        if ($current.length === 1) {
            //获取后台需要传的参数
            var sortName = $current.data("type");
            console.log(sortName);

            //获取给后台传递的参数值,根据箭头的方向决定是升序还是降序

            var sortValue = $current.find("i").hasClass('fa-angle-down') ? 2 : 1;
            console.log(sortValue);

            //接口文档里面,如果是1 就是升序 ,2 降序
            obj[sortName] = sortValue;
        }
        console.log(obj);

        setTimeout(function () {
            $.ajax({
                type: "get",
                url: "/product/queryProduct",
                data: obj,
                dataType: "json",
                success: function (info) {
                    // console.log(info);
                    //渲染数据到页面
                    var htmlStr = template("searchTpl", info);
                    //渲染到页面
                    $(".lt_product").html(htmlStr);

                }

            });
        }, 1000);


    };



    //点击商品跳到商品的详情页==>在渲染的时候把商品页的地址渲染到a 链接里面



})