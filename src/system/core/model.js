/**
 * Model Core Object
 */



//var Db = require('mysql-activerecord');
//var db = new Db.Adapter(config.db);
//
//var __redis = require("redis")
//var redis = __redis.createClient(config.redis.port,config.redis.host)






//console.log(serverConfig.appFolder+'/config/config.js')



//var mysql = require('mysql');
//var db  = mysql.createPool(config.db);




model = {
	
	/**
	 * define
	 * Register new model in user controller
	 * @param {String} name
	 * @param {Object} actions
	 */
	define: function(name, actions) {
        actions.db=__db
//        actions.redis=redis
        actions.logger=__log4js.getLogger(name)
		return {
			name: name,
			actions: actions
		};	
	}
	
};
