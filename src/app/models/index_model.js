/**
 * Created by user on 2015-03-03.
 */


model.define('index_model',{

    index:function(param, callback){
        this.logger.info('abc')
        this.db.query('select * from test limit 10',callback)
    },
    test:function(){
        return 'abc'
    },
    set:function(key,val,callback){
        this.redis.set(key,val,callback)
    },
    get:function(key,callback){
        this.redis.get(key,callback)
    }


})