

$(function () {

    //1.发送请求渲染页面

    var currentPage = 1;
    var pageSize = 3;
    var picArr = [];  //声明一个数组存储文件上传的路径,因为是多文件上传

    render();
    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("productTpl", info);
                $("tbody").html(htmlStr);

                //添加分页初始化
                $("#paginator").bootstrapPaginator({

                    //配置当前的版本
                    bootstrapMajorVersion: 3,
                    //当前页
                    currentPage: info.page,
                    //一页的数据条数
                    totalPages: Math.ceil(info.total / info.size),

                    //给页面添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;

                        render();
                    }
                })

            }

        })
    }


    //2.点击显示模态  返送请求渲染模态框的下拉菜单
    $("#addBtn").on("click", function () {

        //显示模态框
        $("#addModal").modal("show");

        //修改静态模态框里面的内容
        //发送请求  获取二级分类的全部内容渲染下拉菜单
        ///category/querySecondCategoryPaging
        $.ajax({
            type: 'get',
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (info) {
                console.log(info);

                var htmlStr = template("dropdownTpl", info);

                $(".dropdown-menu").html(htmlStr);

            }
        })
    })


    //3.给下拉菜单  里面的a添加点击事件 通过事件委托
    $(".dropdown-menu").on("click", "a", function () {

        //获取里面的值,添加到按钮里面,然后把渲染的id 添加到隐藏域里面
        var txt = $(this).text();
        // console.log(txt);
        //赋值给button 的第一个子元素span 通过id 获取
        $("#dropdownText").text(txt);

        //获取id  赋值给隐藏域input
        var id = $(this).data("id");
        $('[name="brandId"]').val(id);

        // 将隐藏域校验状态更新成 VALID 成功状态
        $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID');


    })



    //4.进行文件上传成事件 ,选取图片 发送ajax  请求 ,提交给后台,
    //这个是多文件上传 给input 表单里面添加multiple
    $("#fileupload").fileupload({
        dataType: "json",

        //图片上传完成的回调函数
        done: function (e, data) {
            console.log(data);

            //  e==>事件对象 data===>后台返回的数据
            //获取返回的结果
            var result = data.result;
            //获取图片上传的路径
            var url = result.picAddr;
            //添加到数组里面,添加到前面
            picArr.unshift(result);

            // push 往后面加
            // pop  在后面删
            // shift 在前面删
            // unshift 在前面加
            //后台需要上传的数据类型为 图片的名字 和图片的地址==>result  
            // 刚好获取到的是图片的地址和图片的名字

            //然后追加到imgBox的最前面  append ==>是添加到后面
            $('#imgBox').prepend('<img style="height: 100px;" src="' + url + '" alt="">');

            //判断只能上传三张图片
            if (picArr.length > 3) {
                //删除最后一张图片  数组的最后一项, 图片结构的最后一张图也要移除
                picArr.pop();

                // 找到最后一张图, 让他自杀, 找最后一个 img 类型的 元素
                //遭到最后一张图片,删掉自己,找到最后一个img 类型的元素
                $("#imgBox img:last-of-type").remove();
            }

            //如果图片的长度==3,更新校验
            if (picArr.length === 3) {
                // 图片校验的状态, 更新成成功
                $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
            }
        }
    });


    //5.进行表单校验
    $("#form").bootstrapValidator({
        // 配置 excluded 排除项, 对隐藏域完成校验
        excluded: [],
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //配置字段列表
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请选择商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    // 1  10  111  1111
                    // 正则校验, 必须非零开头的数字
                    // \d  0-9 数字
                    // ?   表示 0 次 或 1 次
                    // +   表示 1 次 或 多次
                    // *   表示 0 次 或 多次
                    // {n} 表示 出现 n 次
                    // {n, m}  表示 出现 n ~ m 次
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零开头的数字'
                    }
                }

            },

            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 xx-xx 格式,  xx 是两位数字, 例如: 32-40 '
                    }
                }

            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请选择商品原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传三张图片"
                    }
                }
            }

        }
    });


    //6.注册表单成功事件
    $("#form").on("success.form.bv", function (e) {
        e.preventDefault();

        //获取表单域的内容==>不包括图片里面的内容
        var paramsStr = $("#form").serialize();
        console.log(picArr);

        //拼接图片上传的数据 picArr
        paramsStr += "&picArr=" + JSON.stringify(picArr);


        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: paramsStr,
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    // 关闭模态框
                    $('#addModal').modal('hide');
                    // 重新渲染第一页
                    currentPage = 1;
                    render();

                    // 重置表单元素的状态和内容
                    $('#form').data('bootstrapValidator').resetForm(true);

                    // 重置按钮文本, 图片
                    $('#dropdownText').text('请选择二级分类');
                    $('#imgBox img').remove();
                    picArr = [];
                }
            }
        })


    })






});