

//功能1:先往本地存一些假数据获取这些假数据,动态的渲染到页面,历史记录
//部分 这些是假数据==>不写写死

/*
    var arr=["新百伦","匡威","哥伦比亚","老奶奶"];
    //转换成json格式的字符串==>存储到本地
    var jsonStr=JSON.stringify(arr);
    //存储到本地====>在这里约定存储到本地的键名:search_list
    localStorage.setItem("search_list",jsonStr);
    // console.log(jsonStr);
*/

render();
//获取本地存储的值
function getHistory() {
    //功能1:获取本地的存储的数据==>渲染到页面,如果里面没有值  会报错
    //所以或上一个空数组,要字符串要格式的
    var jsonStr = localStorage.getItem("search_list")||"[]";
    //转换成数组
    var arr = JSON.parse(jsonStr);
    return arr;
}


//把值渲染到页面
function render() {
    var arr = getHistory();//这个函数里面返回了本地存储的值,在这里调用函数,拿到里面的值
    //使用模板引擎渲染
    var htmlStr = template("searchTpl", { list: arr })//因为模板渲染的数据是一个
    //对象,我们得到的数组需要进行包装成对象
    $(".lt_history").html(htmlStr);
}


//功能2:点击清空记录,清空所有的历史记录==>事件委托
$(".lt_history").on("click", ".btn_empty", function () {
    // console.log(111);
    
    //点击时,弹出一个框,提示用户需要全部清除吗
    // mui插件里面有
    //修改弹出框默认input类型为password 
    mui.confirm("你确认要清空历史纪录吗?","温馨提示",['取消','确认'],function(e){
        //成功的回调函数里面的事件对象e,里面有index ,有两个值1/0
        console.log(e);
        // 获取本地存储的里面的值
        if(e.index===1){
            //就是删除数组里面的值
            localStorage.removeItem("search_list");
            //重新渲染页面
            render();
        }
        
    })


})


//功能3:点击删除一条数据:
// 思路:1.注册事件.
//找到本地存储的值
//找到要删除的对应的id,删除对应的
//2.重新渲染页面
$(".lt_history").on("click",".btn_delete",function(){
    var arr=getHistory();
    //获取当前点击的这个下标,删除当前的这个数据
    var index=$(this).data("index");

    //删除
    arr.splice(index,1);
    //将修改的数据更新到本地存储==>记住要转换成字符串
    localStorage.setItem("search_list",JSON.stringify(arr));

    //重新渲染页面
    render();

})


//功能4:点击搜索,将搜索框里面的内容添加到本地,并渲染到下面列表
//判断,当这个下面的列表的数据>10,就删除最先添加的那个数据
$(".search_btn").on("click",function(){
    //获取文本框里面的内容
    var txt=$(".search_input").val().trim();
    // console.log(txt);
    //判断文本不为空才能提交
    if(txt===""){
        mui.toast("请输入关键字");
        return;
    }

    //获取本地的数组,添加到数组里面去
    var arr=getHistory();//得到的是一个数组
    //去掉重复项
    var index=arr.indexOf(txt);//判断的值玮-1 时 就表示没有  值为1时,表示有
    if(index !=-1){  
        //说明数组里面有
        arr.splice(index,1);
    }
    
    //在判断,如果这个数组的长度>10 就删除最前面添加的
    if(arr.length>=10){
        arr.pop();
    }
    //把获取到的值添加到数组的前面
    arr.unshift(txt);

    //然后存储到本地
    localStorage.setItem("search_list",JSON.stringify(arr));

    //渲染页面
    render();

    //清空搜索框里面的值
    $(".search_input").val("");

    //再点击搜索按钮的时候,获取到搜索框里面的内容拼接到地址栏的后面
    //1.跳转页面到商品详情
    //2.获取到搜索框里面的值  ==>上面已经获取到了txt  拼接到地址的后面
    location.href="searchList.html?key="+txt;


    
})
