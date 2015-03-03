/**
 * Created by user on 2015-03-03.
 */


model.define('index',{

    index:function(param, callback){
        this.db.query('select * from test limit 10',callback)
    }

})