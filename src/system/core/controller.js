/**
 * Controller Core Object
 */

controller = {
	tempController: null,
	
	/**
	 * define
	 * Register new app controller
	 * @param {String} name
	 * @param {Object} methods
	 */
	define: function(name, actions) {
//        console.log(this)
		actions.load = this.loader;
        actions.end= this.end
		actions.logger=__log4js.getLogger(name),
        actions.db=__db
		this.tempController = {

			name: name,
			actions: actions
		};
		
		return this.tempController;
	},
	
	response: function(data) {
		EventEmitter.emit('IJSasyncListener', data);
	},


    end:function(data){
        console.log(this['__response'])
        if(typeof (data)==='object'){
            data=JSON.stringify(data)
        }
        console.log(data)
       // this.__response.end(data)
    },


	
	/**
	 * Loader
	 */
	loader: {
		
		/**
		 * view
		 * @param {String} view
		 * @param {Object} data
		 * @param {Function} _fnCallback
		 */
		view: function(view, data, _fnCallback) {
			var viewFile = serverConfig.appFolder +'/views/'+ view;
			var fs = require('fs');
			
			if (!_fnCallback) {
				return controller.process.view(fs.readFileSync(viewFile, "binary"), data);
				
			/* Experimental */
			//TODO: How to print async response?
			} else {
				fs.readFile(viewFile, "binary", function(err, data) {
					if(!err) _fnCallback(data);
					else _fnCallback(err);
				});
			}	
		},
		
		/**
		 * model
		 * @param {String} modelName
		 * @param {String} alias
		 */
		model: function(modelName, alias) {			
			controller.process.loadModule('models',modelName, alias);
		},
		
		/**
		 * library
		 * @param {String} libName
		 * @param {String} alias
		 */
		library: function(libName, alias) {
			controller.process.loadModule('libraries', libName, alias);
		}
		
	},
	
	/**
	 * Process
	 */
	process: {
		view: function(viewData, data) {
			return Mustache.to_html(viewData, data);
		},
		
		loadModule: function(type, moduleName, alias) {
			var file = serverConfig.appFolder +'/'+ type +'/'+ moduleName +'.js';
			var fs = require('fs');
			
			var fileData = fs.readFileSync(file, "binary");
			var fileObject = eval(fileData);
			
			var moduleAlias = moduleName;
			if(alias) moduleAlias = alias;
			
			//TODO: Find another solution to controller.tempController 
			controller.tempController.actions[moduleAlias] = fileObject.actions;
		}
	}
	
};