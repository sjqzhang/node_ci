
var ViewEngine = {

	version: '0.1.1',

	_escape_table: { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' },

	_escape_func: function(m) { return ViewEngine._escape_table[m]; },

	escapeXml: function(s) {
		//if (s == null) return '';
		return typeof(s) != 'string' ? s : s.replace(/[&<>"]/g, ViewEngine._escape_func); //"
		//return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); //"
	},

	escapeXml2: function(s) {
		if (s == null) return '';
		return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');  //"
	},

	strip: function(s) {
		if (! s) return s;
		//return s.replace(/^\s+|\s+$/g, '');
		return s.replace(/^\s+/, '').replace(/\s+$/, '');
	},

	_end: undefined  // dummy property to escape strict warning (not legal in ECMA-262)
};
delete(ViewEngine._end);

// 因为用 new Function 创建的函数，其[[scope]]的作用域链只包含全局对象，所以这里定义为全局变量
_ViewEngineEscapeXml = ViewEngine.escapeXml;


/**
 *  Template class
 */

ViewEngine.Template = function(properties) {
	if (properties) {
		var p = properties;
		if (p['escaefunc']) this.escapefunc = p['escapefunc'];
	}
};

ViewEngine.Template.prototype = {

	escapefunc: '_ViewEngineEscapeXml',

	convert: function(input) {
        input=input.replace(/[\r\n]+/ig,'')
		var buf = [];
		buf.push("var _buf='';");
		this.parseStatements(buf, input);
		buf.push("return _buf;");
		buf = buf.join('').split("_buf+='';").join('')
			 .split("var _buf='';_buf+=").join('var _buf=');
        try {
//            console.log(buf)
			return this.render = new Function('it', buf);
            //eval('this.render = function(it){' + buf + '};');
            //return this.render;
		} catch (e) {
			if (typeof console !== 'undefined') console.log("Could not create a template function: " + buf);
			throw e;
		}
	},

	parseStatements: function(buf, input) {
		var regexp = /<\?js(\s(.|\n)*?) ?\?>/mg;
		var pos = 0;
		var m;
		while ((m = regexp.exec(input)) != null) {
			var stmt = m[1];
			var text = input.substring(pos, m.index);
			pos = m.index + m[0].length;
			//
			if (text) this.parseExpressions(buf, text);
			if (stmt) buf.push(stmt);
		}
		var rest = pos == 0 ? input : input.substring(pos);
		this.parseExpressions(buf, rest);
	},

	parseExpressions: function(buf, input) {
		if (! input) return;
		//buf.push(" _buf+=");
		var regexp = /([$#])\{(.*?)\}/g;
		var pos = 0;
		var m;
		while ((m = regexp.exec(input)) != null) {
			var text = input.substring(pos, m.index);
			var s = m[0];
			pos = m.index + s.length;
			this.addText(buf, text);
			buf.push(";_buf+=");
			var indicator = m[1];
			var expr = m[2];
			if (indicator == "$")
				buf.push(this.escapefunc, "(", expr, ");");
			else
				buf.push(expr, ";");
		}
		var rest = pos == 0 ? input : input.substring(pos);
		rest ? this.addText(buf, rest, true) : buf.push('""');
		buf.push(";");
		if (input.charAt(input.length-1) == "\n")
			buf.push("\n");
	},

	addText: function(buf, text, encode_newline) {
		if (! text) return;
		var s = text.replace(/[\'\\]/g, '\\$&').replace(/\n/g, '\\n\\\n');
		buf.push("_buf+='", s, "'");
	},

	_end: undefined  // dummy property to escape strict warning (not legal in ECMA-262)
};
delete(ViewEngine.Template.prototype._end);


/*
 *  convenient function
 */
ViewEngine.render = function(template_str, context) {
	var template = new ViewEngine.Template();
	template.convert(template_str);
	var output = template.render(context);
	return output;
};

/**
 * compile str to Function
 *
 * @param {String} str, template string
 * @return {Function}
 * @api public
 */

ViewEngine.compile = function(str, options) {
	var tpl = new ViewEngine.Template();
	return tpl.convert(str);
};



exports.ViewEngine = ViewEngine;
