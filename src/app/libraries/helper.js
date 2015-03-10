
library.define('md5sum', {
	
	md5sum:function(rs, callback) {
    var crypto = require('crypto')
	var hash = crypto.createHash('md5');

	rs.on('data', function (data) {
		hash.update(data);
	});

	rs.on('end', function () {
		callback(hash.digest('hex'));
	});
    },
    md5:function(str){
        var crypto = require('crypto')
	    var hash = crypto.createHash('md5');
        hash.update(str);
        return hash.digest('hex');

    },
    post:function(url,data,callback){
        var http = require('http');
        var _url=require('url')
        var url_info=_url.parse(url)
        var querystring = require('querystring');
        var post_data = querystring.stringify(data);
        var options = {
            host: url_info.host,
            port: url_info.port,
            path: url_info.path,
            method: 'POST'
        };


        var req = http.request(options, function(res) {
          //console.log('STATUS: ' + res.statusCode);
          //console.log('HEADERS: ' + JSON.stringify(res.headers));
          var data=[]
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
              data.push(chunk)
          });
          res.on('end',function(_data){
               callback(data.join(''))
          })
        });
        req.write(post_data + "\n");
        req.end();
    },
    date:function (pat, ts) {
    var y, m, d, H, i, s;
    var dt = [ 'Y', 'm', 'd', 'H', 'i', 's' ];
    var dv = [];
    var dd = ts ? new Date(ts) : new Date();
    y = dd.getYear() + 1900;
    m = dd.getMonth() + 1, m = m < 10 ? '0' + m : m;
    d = dd.getDate(), d = d < 10 ? '0' + d : d;
    H = dd.getHours(), H = H < 10 ? '0' + H : H;
    i = dd.getMinutes(), i = i < 10 ? '0' + i : i;
    s = dd.getSeconds(), s = s < 10 ? '0' + s : s;
    dv[0] = y;
    dv[1] = m;
    dv[2] = d;
    dv[3] = H;
    dv[4] = i;
    dv[5] = s;
    for ( var p in dt) {
    pat = pat.replace(new RegExp(dt[p]), dv[p]);
    }
    return pat;
}
	
});
