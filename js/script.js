const myModulefunction = require('./myModule.js');
window.onload = function () {
    console.log('nth ++');
    document.body.appendChild(myModulefunction.generateDiv())
    /*var xhr = new XMLHttpRequest();
    xhr.open("get", "http://127.0.0.1:8800/test?a=1", true);
    //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");//缺少这句，后台无法获取参数
    xhr.onreadystatechange = function() {
        //console.log(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    };
    var content = "appid=11111&sign=222222222";
    xhr.send(content);*/
};
