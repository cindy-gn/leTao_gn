

// 图片自定义轮播
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
});


mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006

  indicators: false  //是否显示区域滚动时的滚动条false  不显示
});

// 这个方法专门用于获取地址栏传参
function getSearch( k ) {
  // 获取地址栏参数
  var str = location.search;  // 如果有中文, 是需要解码的

  // 进行中文解码
  str = decodeURI(str);  // ?key=匡威&name=pp&age=18

  // 去掉问号
  // str.slice(start, end);  // 包括start, 不包括end
  // str.slice(start);  // 表示从 start 开始截取到最后
  str = str.slice(1);    // key=匡威&name=pp&age=18

  var arr = str.split('&');   // ["key=匡威", "name=pp", "age=18"]

  var obj = {};
  
  arr.forEach(function (v, i) {  // v => age=18
    var key = v.split('=')[0];  // age
    var value = v.split('=')[1]; // 18
    // 将属性添加到 obj 中
    obj[key] = value;
  })
  return obj[k];
}




















// function getSearch(k) {
//   //1.从地址栏中获取值.
//   var str = location.search;// 得到地址后面的 拼接的参数"?key=%E5%8C%A1%E5%A8%81"

//   //将字符串进行解码
//   str = decodeURI(str);

//   // 通过截取字符串的方法,截取
//   str = str.slice(1);//把问号去掉

//   var arr = str.split("&");//通过&分割成字符串


//   //声明一个对象
//   var obj = {};

//   //遍历数组,添加到对象里面去
//   arr.forEach(function (v, i) {
//     var key = v.split("=")[0];
//     var value = v.split("=")[1];

//     //添加到对象里面去
//     obj[key] = value;
//   })
//   // console.log(obj[k]);
  
//   return obj[k];
// }











