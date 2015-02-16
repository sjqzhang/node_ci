/**
 * Model Core Object
 */
model = {
	
	/**
	 * define
	 * Register new model in user controller
	 * @param {String} name
	 * @param {Object} actions
	 */
	define: function(name, actions) {
		return {
			name: name,
			actions: actions
		};	
	}
	
};
