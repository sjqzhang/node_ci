/**
 * General Config
 */
serverConfig = {
	host: '0.0.0.0',
	port: 2000,
	
	environment: 'development',
	
	systemFolder: __dirname+'/system',
	appFolder: __dirname+'/app'
};

/**
 * Go!
 */
require(__dirname+'/system/core/core.js');
