

$(function () {
    var currentPage = 1;
    var pageSize = 5;


    render();
    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                // console.log(info);

                var htmlStr = template("secondTpl", info);
                $("tbody").html(htmlStr);

                //添加分页初始化
                $("#paginator").bootstrapPaginator({
                    //版本号
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    //给页面添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        //更新当前页
                        currentPage = page;
                        render();
                    }
                })


            }
        })
    }


    //点击显示模态框
    $("#addBtn").on("click", function () {
        $("#addModal").modal("show");

        //显示模态框的同时就发送ajax请求 渲染下拉菜单里面的内容 
        //避免网络速度慢的时候,下拉菜单里面的数据渲染不出来

        //在这里没有专门的接口,去渲染下单菜单的  所有  数据 ,我们自己模拟一下,请求数据的时候
        //只请求一页,而且,  这一页可以有所有的数据
        //模拟获取全部数据的接口, page:1  pageSize:100

        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('dropdownTpl', info);
                $('.dropdown-menu').html(htmlStr);
            }
        })


    })



    //点击下拉菜单的内容==>把里面的内容 渲染到上面的按钮里面去
    //这个内容是动态渲染的==>注册委托事件给父元素
    $(".dropdown-menu").on("click", "a", function () {
        //获取a  里面的内容
        var txt = $(this).text();
        //赋值给上面的里面的内容,在静态页面,用一个span 将内容包起来的,然后添加了id 
        //也就是赋值给button按钮💗
        $("#dropdownText").text(txt);

        //获取当前点击的 a  的id  赋值给隐藏域
        var id=$(this).data("id");//因为后台需要提交的数据是id  不是文本内容

        //将在这个id 赋值给隐藏域
        $('[name="categoryId"]').val(id);

        //赋值完成后,重置表单的状态
        // $("#form").data("")

    })




    //点击添加图片==>实现本地预览,这个在点击的时候就发送ajax  请求,将图片传给后台
    //这样避免以后再提交图片和上面表单里面的内容  由于图片太多,网络不好 会造成用户体验不好
    //所以在添加时,就发送请求
    //配置图片上传    完成文件上传初始化===>插件初始化
    $("#fileupload").fileupload({
        //指定上传的类型
        dataType: "json",
        //上传完成的回调函数
        //e==>事件对象  data===成功的回调函数返回的结果 ==>里面有文件的路径
        done: function (e, data) {
            console.log(data);
            //获取文件的路径
            var src = data.result.picAddr;
            // console.log(src);

            //设置路径给图片
            $("#imgBox img").attr("src", src);

            //将图片的地址赋值给隐藏域的input===>用于表单提交
            $('[name="brandLogo"]').val(src);
            
            //重置表单里面的内容  只要隐藏域有值了  就可以更新状态
            // $("#form").data("bootstrapValidator").updateStatus()

        }
    })

    //5.配置表单校验
    $("#form").bootstrapValidator({
        //配置校验的小图标显示
        // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
        excluded: [],

        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //配置校验的提示信息和字符长度
        fields:{
            //品牌名称
            brandName: {
                //校验规则
                validators: {
                  notEmpty: {
                    message: "请输入二级分类名称"
                  }
                }
              },
            //一级分类的id
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请添加图片"
                    }
                }
            }
        }
    });



    //6.注册表单校验成功事件  发送请求,添加数据到页面
    $("#form").on("success.form.bv",function(e){
        //阻止默认事件
        e.preventDefault();

        //发送请求
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.success){
                    //关闭模态框
                    $("#addModal").modal("hide");

                    //切换到第一页 渲染页面
                    currentPage=1;
                    render();

                    //重置表单里面的内容
                    $("#form").data("bootstrapValidator").resetForm(true);

                    //也要重置按钮上面的内容
                    $("#dropdownText").text("请选择一级分类");

                    //重置图片的路径
                    $('#imgBox img').attr("src","./images/none.png");
                }
            }
        })
    })







});