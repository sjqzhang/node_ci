/**
 * Created by user on 2015-03-03.
 */

controller.define('indexCtrl',{



    indexCtrl:function(){
       // console.log(this)
        //this.loader.model('index')
        this.load.model('index_model')

        config={}



    },
    index:function(request,response){

      // return 'hello world';

        console.log(config)


       this.logger.info('aaaaaaaaa')

        this.index_model.index(null, function(err,data){
           // response.write(JSON.stringify(data))
            response.end(JSON.stringify(data))
        })

    },
    test:function(request,response){

        return this.index_model.test()
    },
    put:function(request,response){

      //  console.log(this.input)

        this.index_model.set(this.input.key,this.input.val,function(err,data){
            response.end(data)
        })
    },

    get:function(request,response){

      //  console.log(this.input)

        this.index_model.get(this.input.key,function(err,data){
            response.end(data)
        })
    }







})