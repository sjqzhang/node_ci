
controller.define('blog', {
	
	/*
	 * Constructor
	 */
	blog: function() { 					//constructor, also work: "construct"
		this.load.model('blog_model');	//load global model to use in all methods
	},
	
	/*
	 * Index action
	 */
	index: function() {		
		//using model loaded in constructor
		var posts = this.blog_model.getPosts();
		
		//give data to view and print
		return this.load.view('blog.html', {
			title: 'My blog!',
			posts: posts
		});
	},

    AA:function(){

        return "AA";

    },

    _abc:function(){



          return "safasd";

    },

    Test:function(){

          this.input.aa.bb;

       // return "test";

       return this.load.view('abc.html',{abc:'I\'m jqzhang '})

    },


	abc: function() {
		//using model loaded in constructor

        console.log(this.input.a)
		var posts = this.blog_model.getPosts();

		//give data to view and print
		return this.load.view('abc.html', {
			title: 'My blog!',
            abc:'asdfsadfasf',
			posts: posts
		});
	},

	/*
	 * Get data from twitter using a library
	 */
	twitter: function() {
		this.load.library('twitter');
		this.twitter.getTweets(function(data) {
			
			//TODO: Change this call type
			controller.response(data);
		});
	}
	
});
