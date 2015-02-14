// function Index() {
//
//};
//Index.prototype.getInfo = function (evn, callback) {
//
//    callback();
//    env.response.end()
//};
exports.IndexMode = (function(){

    var getInfo= function (env, callback) {

        env.renderStr("hello world")
//        callback();
//        env.response.end()

    }



    return {
        getInfo:getInfo

    }

})()
