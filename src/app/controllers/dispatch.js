/**
 * Created by user on 2015-03-05.
 */





controller.define('dispatch',{

    construct:function(){

        this.load.library('helper')
        this.mdkey='3.0_b:!3chg'
    },



    test:function(req,res){

        res.end(''+Date.now())
    },



    _deploy:function(id){
       var that=this
       var url="http://gujian.meizu.com/api/cdnop?op=publish&id="+id
       this.helper.post(url,{},function(data){
           that.logger.info(data)
       })

    },
    /*
    接口1：
    name:
    /distribute_firmware

    params:
    url : 正式的上传地址
    md5: md5校验值
    local_path: 固件存放的地址，比如固件地址是smb://d/研发中心公共文件夹/temp/a/b/c/update.zip

    return:
    返回一个int类型的task id
    [id]


    接口2：
    name:
    /query_progress

    params:
    id：返回的任务id

    return:
    string类型的：
    [done|doing]

     */
    distribute_firmware:function(req,res){
    var fs=require('fs')
    var dir_cur=this.helper.date('Y-m-d')
    var savepath='/data/firmware/download.meizu.com/'+dir_cur+'/'
    if(!fs.existsSync(savepath)) {
        fs.mkdirSync(savepath)
    }
    var that=this
    var key=that.mdkey
     that.logger.info(that.input)

    if (that.helper.md5( key+ this.input.timestamp)!=this.input.md5){
        res.end('{"message":"md5 error,access deny!","status":"501"}')
    }
    try {
      var Download = require('download');
        var md5=this.helper.md5(that.input.local_path)

        var download = new Download({ mode: '755'}).get(this.input.local_path).dest(savepath).rename(md5);
            filepath=savepath+md5
            download.run(function (err, files) {
                if (err) {
                    throw err;
                }
                var fs=require('fs')
                that.helper.md5sum( fs.createReadStream(filepath),function(file_md5){
//                    console.log(file_md5)

                    if(file_md5!=that.input.file_md5){
                        that.logger.error(that.input)
                        return;
                    }

                    that.db.where({'md5_file':file_md5}).get('gu_data',function(err,row){
                        //console.log(row)
                        if(row.length==0){
                            var idata={
                                'time':Date.now()/1000,
                                'md5_file':file_md5,
                                'path':dir_cur+'/'+md5,
                                'md5_url':md5
                            }
                           // console.log(idata)
                            that.db.insert('gu_data',idata,function(err,rep){
                                //console.log(rep)
                                if(!err){
                                      that._deploy(rep.insertId)
                                }
                            })
                        } else {
                            that._deploy(row[0].id)
                        }
                    })
                })
                //console.log('File downloaded successfully!');
            });

        }catch(e){
                console.log(e)
    }
       res.end('{"status":200,"message":"OK","data":"'+md5+'"}')
    },
    query_progress:function(req,res){

        var self=this

        result={'status':200,
            'data':null,
            'message':''
        }

        self.db.where({'gu_data.md5_url':self.input.id}).get('gu_data',function(err,rows){


            if(rows.length==0){

                res.end('{"status":200,"message":"job failed","data":false}')
                return;
            }

            var path=rows[0]['path'];

            self.db.select('cdn_log.*').join('cdn_log','cdn_log.file_id=gu_data.id').where({'gu_data.md5_url':self.input.id}).get('gu_data',function(err,rows){
             result['data']=rows

            if(rows.length==0){
                res.end('{"status":200,"message":"cdn deploy failed","data":false}')
            }
            var sucess=true
            result['message']='success'

              for(var i=0;i<rows.length;i++){
                  if(rows[i]['status']!=1){
                      sucess=false
                       result['message']='fail'
                      break;
                  }
              }
            result['data']=path

            res.end(JSON.stringify(result))
            })//end get

         })//end get



    }






});