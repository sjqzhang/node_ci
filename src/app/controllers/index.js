/**
 * Created by user on 2015-03-03.
 */

var async = require('async')

controller.define('indexCtrl', {

	indexCtrl: function() {
		// console.log(this)
		//this.loader.model('index')
		this.load.model('index_model')

		config = {}

	},


    step:function(reqest,respone){

        var that=this;

        this.index_model.step1(1,function(err,data){

              that.index_model.step2(data[0]['id'],function(err,data){

                respone.end(JSON.stringify(data))
            })
        })


    },
	combine: function(request, response) {

		var that = this;
		async.parallel({
                abc: function(callback) {
                    that.index_model.part1(null,
                    function(err, data) {

                        callback(err, data)
                    })
                },
                adfd: function(callback) {
                    that.index_model.part2(null,
                    function(err, data) {
                        callback(err, data)
                    })
                }
            },
            function(err, results) {


                response.end(JSON.stringify(results))
            }
        )

	},
	index: function(request, response) {

		// return 'hello world';
		console.log(config)

		this.logger.info('aaaaaaaaa')

		this.index_model.index(null,
		function(err, data) {
			// response.write(JSON.stringify(data))
			response.end(JSON.stringify(data))
		})

	},
	test: function(request, response) {

		return this.index_model.test()
	},
	put: function(request, response) {

		//  console.log(this.input)
		this.index_model.set(this.input.key, this.input.val,
		function(err, data) {
			response.end(data)
		})
	},

	get: function(request, response) {

		//  console.log(this.input)
		this.index_model.get(this.input.key,
		function(err, data) {
			response.end(data)
		})
	}

})