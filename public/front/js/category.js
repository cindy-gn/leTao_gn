

//动态的获取一级分类的数据,渲染页面
$(function(){
    
    //1.刚进页面就发送请求渲染页面
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        dataType:"json",
        success:function(info){
            console.log(info);
            var htmlStr=template("leftTpl",info);

            //渲染到页面
            $(".lt_category_left ul").html(htmlStr);


            //默认已进入页面就渲染第一个一级分类的对应的二级分类页面
            renderById(info.rows[0].id);
            //info.rows[0].id==>后台返回的数据里面的rows 的第0项里面就有id
            
        }

    })





    //2.渲染二级分类的页面,根据接口要求,需要传一级菜单的id  作为参数,在渲染页面的
    //时候,我们把一级分类的id存储到a上面去
    function renderById(ret){
        $.ajax({
            type:"get",
            url:"/category/querySecondCategory",
            data:{
                id:ret
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr=template("rightTpl",info);
                $(".lt_category_right ul").html(htmlStr);
                
            }
    
        })
    }



    //3.点击一级菜单的a 渲染左边的页面
    //用委托事件
    $(".lt_category_left").on("click","a",function(){
        //点击时切换类名,先移除所有的类名,点击那个,那个添加
        $(".lt_category_left a").removeClass("current");

        //给当前点击的这个添加leiming
        $(this).addClass("current");

        //点击时获取一级分类的id ==>发送ajax渲染页面完成
        var id=$(this).data("id");
        renderById(id);
        
    })

    //4.但是有些没有二级分类的菜单,如果没有我们就写一个提示信息 
    //在模板渲染的时候就进行判断 如果返回的数据rows这个数组的长度=0
    //就说明没有数据    需要进行提示








});












