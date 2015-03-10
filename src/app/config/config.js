config = {

	defaultController: 'blog',

	autoloads: {
		libraries: [],
		models: []
	},
	db: {
		connectionLimit: 100,
		host: '127.0.0.1',
		user: 'root',
		password: 'root',
		database: 'gujian'
	},
	logger: {
		appenders: [{
			type: 'console'
		},
		//控制台输出
		{

            type: 'file',
			filename: 'logs/access.log',
			maxLogSize: 102400,
			backups: 4

		}]/*,
		replaceConsole: true
*/
       // ,levels:{ "logDebug": "DEBUG", "logInfo": "DEBUG", "logWarn": "DEBUG", "logErr": "DEBUG"}

	}
};