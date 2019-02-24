

//发送请求获取数据==>模板引擎  ==>渲染页面
$(function () {
    var currentPage = 1; //获取第一页的数据
    var pageSize = 5;   //获取到一页的数据条数


    render();

    function render() {

        $.ajax({
            type: "get",
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                //
                // var htmlStr=template("模板的id",对象);
                var htmlStr = template("firstModal", info);
                //渲染到页面
                $("tbody").html(htmlStr);

                //添加分页功能
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),
                    // 给页码添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        // 更新当前页, 并且重新渲染
                        currentPage = page;
                        render();
                    }
                })


            }
        })

    }




    // 点击按钮==>显示模态框===>  添加数据====>在渲染到页面

    $("#addBtn").on("click", function () {
        // console.log(111);

        $("#addModal").modal("show");
    })

     // 3. 完成添加校验
  $('#form').bootstrapValidator({

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 配置需要校验的字段列表
    fields: {
      categoryName: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
    }
  });


    //表单校验成功事件,在表单事件中阻止默认的提交功能
    //通过ajax实现
    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();//阻止submit默认的提交行为

        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $("#form").serialize(),
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    //如果提交成功 关闭模态框 渲染页面
                    $("#addModal").modal("hide");

                    //默认又回到第一页
                    currentPage = 1;
                    render()



                    //重置表单里面的内容
                    $("#form").data("bootstrapValidator").resetForm(true);
                }
            }
        })
    })


});




















