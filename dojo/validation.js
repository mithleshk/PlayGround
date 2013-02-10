define([
	"dojo/_base/declare",
	"dojox/validate/_base",
	"dojox/validate/br",
	"dojox/validate/ca",
	"dojox/validate/check",
	"dojox/validate/creditCard",
	"dojox/validate/isbn",
	"dojox/validate/regexp",
	"dojox/validate/us",
	"dojox/validate/web"
	],function(declare, validate, br, ca, check, creditCard, isbn, regexp, us, web){
		return declare("cust.validation",null,{
			validate:function(){
				return validate;
			}
		});
	});