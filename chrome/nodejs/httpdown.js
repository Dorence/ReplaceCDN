var request = http.request( {hostname:'www.zhuoku.com'}, function (response) {
    response.on('data', function (data) {
        //Buffer
        var string =  data.toString() ;
        var rule = /http:\/\/.[^"]+\.jpg/gi;
        var ary = string.match(rule);    //拿到所有jpg结尾的链接集合
        var x = 0;

        for(var i in ary) {
            console.log(ary[i]);
            //通过url重新连接服务器，获取图片，将图片写到磁盘上
            http.get(ary[i], function (res) {
                res.setEncoding('binary');//转成二进制
                var content = '';
                res.on('data', function (data) {
                   content+=data;
                }).on('end', function () {
                   fs.writeFile(x++ + '.jpg',content,'binary', function (err) {
                       if (err) throw err;
                       console.log('保存完成');
                   });
                });
            });

        }
    });


});

request.end();