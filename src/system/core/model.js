/**
 * Model Core Object
 */



var Db = require('mysql-activerecord');
var db = new Db.Adapter(config.db);


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
        actions.db=db
		return {
			name: name,
			actions: actions
		};	
	}
	
};
