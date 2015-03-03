/**
 * Created by user on 2015-03-03.
 */

controller.define('indexCtrl',{



    indexCtrl:function(){
       // console.log(this)
        //this.loader.model('index')
        this.load.model('index_model')
        this.logger=this.log4js.getLogger('Index')


    },
    index:function(request,response){

      // return 'hello world';


       this.logger.info()

        this.index_model.index(null, function(err,data){
            response.write(JSON.stringify(data))
            response.end()
        })

    }





})