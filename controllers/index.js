var http = require("http");
exports.controller = function() {
    var model= require('../models/index').IndexModel
    var index = function () {
//            console.dir(this)
            this.render("index",{'title':'asdfasfasf','list':[1,2,3,4,5,6,7,8]});
        };

    var getInfo=function(age){



        model.getInfo(this,function(data){

        })

    }


    return {
        get: {
            index: index,
            getInfo:getInfo
        }
    };
}();

