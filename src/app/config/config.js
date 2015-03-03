
config = {
	
	defaultController: 'blog',
	
	autoloads: {
		libraries: [],
		models: []
	},
    db:{
    connectionLimit : 100,
  host            : '172.16.3.92',
  user            : 'root',
  password        : 'meizu.com',
  database          :'test'
    },
    logger:{
      appenders: [
        { type: 'console' },{
          type: 'file',
          filename: 'access.log',
          maxLogSize: 1024,
          backups:4,
          category: 'normal'
        }
      ],
      replaceConsole: true

    }


	
};
