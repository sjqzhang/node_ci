/**
 * Created by user on 2015-03-05.
 */




controller.define('__dispatch',{

    __dispatch:function(){

    },

    push:function(req,res){

      var Download = require('download');

    var download = new Download({extract: true, strip: 1, mode: '755'})
        .get('http://www.baidu.com','dest').rename('index.html').get('http://www.sina.com').rename('sina.html')

        //.dest('dest');

    download.run(function (err, files) {
        if (err) {
            throw err;
        }

        config={}
       // console.log(config)

        //console.log(files)

        console.log('File downloaded successfully!');


    });












     res.end()



    }

    ,test:function(req,res){

        //console.log(__config)

        this.logger.info('xxx')
        setTimeout(function(){

            res.end()
        },2000)

        res.end()
        res.end()
    }





});