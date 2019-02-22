

/*
 * 1. 进行表单校验配置
 *    校验要求:
 *        (1) 用户名不能为空, 长度为2-6位
 *        (2) 密码不能为空, 长度为6-12位
 * */
//这里需要通过一个插件bootstrap-validator  完成 这个插件专门做表单验证的
$(function () {

    //1.实现表单校验
    $("#form").bootstrapValidator({
        //2.设置输入框后面的显示图标
        // 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //1. 字段列表fields 要先在input  里面配置name属性 才能进行表单提交
        fields: {
            //用户名
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名必须在2-6位之间"
                    }
                }
            },
            //密码
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码必须是6-12位"
                    }
                }
            }
        }
    })



    /* 
    2. 使用 submit 按钮, 会进行表单提交, 此时表单校验插件会立刻进行校验
    (1) 校验成功, 此时会默认提交, 发生页面跳转,  注册表单校验成功事件, 在事件中阻止默认的跳转提交, 通过ajax提交
    (2) 校验失败, 自动拦截提交

   注册表单校验成功事件, 在事件中阻止默认的提交, 通过ajax提交

   只用submit提交按钮 会进行表单校验,此时表单校验插件会立刻进行校验,
   校验成功,会默认发生页面跳转,注册表单校验成功事件,在实践中组织默认的提交行为,通过ajax发送请求
   如果失败会自动拦截

    */
    $("#form").on("success.form.bv", function (e) {
        //组织默认的跳转行为,通过ajax发送请求
        e.preventDefault();
        $.ajax({
            type: "post",
            //本质上会自动拼接前面的端口号和域名
            url: "/employee/employeeLogin",
            //表单序列化就是自动将配置了name属性的input 值进行拼接用于提交
            data: $("#form").serialize(),
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.error == 1000) {
                    //    alert("用户名不存在");
                    // updateStatus
                    // 参数1: 字段名称
                    // 参数2: 校验状态
                    // 参数3: 校验规则, 可以设置提示文本
                    $("#form").data("bootstrapValidator").updateStatus("usrname", "INVALID", "callback")
                }
                if (info.error == 1001) {
                    // alert("密码错误");
                    $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
                }
                if (info.success) {
                    location.href = "index.html"
                }

            }
        })
    })


    //3.重置表单
    $("[type='reset']").on("click",function(){
        console.log(1111);
        
    $("#form").data("bootstrapValidator").resetForm();

    })








});