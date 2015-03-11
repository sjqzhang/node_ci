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


//serverConfig.port=process.argv[2]||2000


require(__dirname+'/system/core/core.js');



