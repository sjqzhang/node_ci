/**
 * Requires
 */

require(serverConfig.appFolder+'/config/config.js');
require(__dirname+'/controller.js');
require(__dirname+'/library.js');
require(__dirname+'/model.js');




require(__dirname+'/events.js');




//var _activerecord=require(serverConfig.systemFolder+'/core/ar.js')


require(__dirname+'/../libraries/mustache.js');




__logger=null
__log4js=null
__controllers={}
var __config=config
__config['serverConfig']=serverConfig

try {
    __log4js = require('log4js');
    __log4js.configure(config.logger)
    __logger= __log4js.getLogger('default')
    __logger.info('init log4js')

}catch (e){

    console.log(e)
}



/**
 * HTTP Server
 */
var http = require('http');
var server=http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	core.processRequest(req, res)
}).listen(serverConfig.port, serverConfig.host);


server.addListener("clientError", function (exception) {
    console.log(exception);
});

server.addListener("upgrade", function (request, socket, head) {
    console.log("upgrade");
});
console.log('Server running at http://'+serverConfig.host+':'+serverConfig.port+'/');

var qs = require('querystring');

/**
 * Core Base Object
 */
var core = {
	
	/**
	 * processRequest
	 * @param {Object} req
	 * @param {Object} res
	 */
	processRequest: function(req, res) {
		//POST
		if(req.method === "POST") {
		    var data = "";
		    req.on("data", function(chunk) {
		        data += chunk;
		    });
		
		    req.on("end", function() {
		        var jsonPostData = qs.parse(data);
				core.execRequest(req, res, jsonPostData);
		    });
		}		

		//GET
		if(req.method === "GET") {
            params={}
            var pos=req.url.indexOf('?');
            if(  pos!=-1) {
               params= qs.parse(  req.url.substring(pos+1))
            }
			this.execRequest(req, res,params);
		}
	},
	
	execRequest: function(req, res, postParams) {	
		var urlRequest = req.url.split(/\/|\?/);
		var params = this.router.trimArray(urlRequest.slice(2));
		this.findController(req, res, urlRequest[1], params, postParams);
	},
	
	/**
	 * findController
	 * @param {Object} res
	 * @param {String} controllerName
	 * @param {Array} params
	 */
	findController: function(req,res, controllerName, params, postParams) {
		var that = this;
		var controllerFile = serverConfig.appFolder + '/controllers/' + controllerName + '.js';

        if(__controllers[controllerName]){
             __controllers[controllerName].actions.input = postParams;
            that.router.processActions(req,res, __controllers[controllerName], params);
        } else {

            require('fs').readFile(controllerFile, "binary", function (err, data) {
                if (!err) {
                    controller.res = res;
                    var userController = eval(data);
//                    __controllers[controllerName] = userController

                    //Add POST params to input.post object
                    if (postParams) {
//					userController.actions.input = {
//						post: postParams
//					};
                        userController.actions.input = postParams;
                    }
//                userController.actions.log4js=log4js;
//                userController.actions.logger=logger;

                    that.router.processActions(req, res, userController, params);

                } else {
                    res.end('File ' + controllerFile + ' not found')
                }
            });
        }
	},
	
	/**
	 * Router
	 */
	router: {
		
		/**
		 * processMethods
		 * @param {Object} res
		 * @param {Object} c
		 * @param {Array} params
		 */
		processActions: function(req,res, userControl, params) {
			var output = null;
			
//			//Register response/end output event
//			EventEmitter.on('IJSasyncListener', function(data) {
//                if(typeof (data)==='object'){
//                    data=JSON.stringify(data)
//                }
//				if(data) res.write(data);
//				res.end();
//			});
			
			//Execute constructors
			if(this.findAction(userControl.actions, userControl.name)) {
				userControl.actions[userControl.name]();
			}
			if(this.findAction(userControl.actions, 'construct')) {
				userControl.actions['construct']();
			}
			
			//Execute selected method
			if(params.length > 0 && params[0] != "") {
				var action = params[0];
                action=this.findAction(userControl.actions, action);
				if(action) {
                    try {
                        var innerParams = this.trimArray(params.slice(1));

                        innerParams.unshift(res)
                        innerParams.unshift(req)

//                        userControl['__response']=res
                        //console.log(userControl)
                        output = userControl.actions[action].apply(userControl.actions, innerParams);
                        if(typeof(output)==='string') {
                            res.write(output)
                            res.end()
                        }
// else if(typeof(output)==='object') {
//                            res.write(JSON.stringify(output))
//                            res.end()
//                        }

                    }catch (err){
                        console.log(__filename,err)
                        res.write('500:server error')
                        res.end()
                    }
					
				} else {
					//Error
					output = 'Method /'+userControl.name+'/'+action+' not found.';
                    res.write('404')
                    res.end()
                     console.log(__filename)

				}
				
			} else {
				//Execute index function
				if(this.findAction(userControl.actions,'index')) {
					output = userControl.actions['index'](params);
					
				} else {
					//Error
					output = 'Index method has not been found.';
				}
			}
			
//			if (output) {
//				EventEmitter.emit('IJSasyncListener', output);
//			}
		},


        response:function(data){

        },
		
		/**
		 * findMethod
		 * Helper function
		 * @param {Object} object
		 * @param {String} action
		 */
		findAction: function(object, action) {
			if(typeof object !== 'object') return false;
            if(action.match(/^\_/)){
                return false;
            }
				
			for(var i in object) {
				if(i.toLowerCase()== action.toLowerCase()) {
                    return i;
					return true;
				}
			}
			return false;
		},
		
		/**
		 * trimArray
		 * Helper function
		 * @param {Array} arr
		 */
		trimArray: function(arr) {
			var arr1 = [];
			for (i = 0; i < arr.length; i++) {
				if (arr[i] != "")
					arr1[arr1.length] = arr[i];
			}
			arr.length = arr1.length;
			for(i=0; i<arr1.length; i++)
				arr[i] = arr1[i];
			return arr;
		}
	}
	
};
