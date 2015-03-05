config = {

	defaultController: 'blog',

	autoloads: {
		libraries: [],
		models: []
	},
	db: {
		connectionLimit: 100,
		host: '172.16.3.92',
		user: 'root',
		password: 'meizu.com',
		database: 'test'
	},
	logger: {
		appenders: [{
			type: 'console'
		},
		//控制台输出
		{

            type: 'console',
			filename: 'access.log',
			maxLogSize: 1024,
			backups: 4,
			category: 'normal'
		}],
		replaceConsole: true

	},
	redis: {
		host: '172.16.3.241',
		port: 6379
	}

};