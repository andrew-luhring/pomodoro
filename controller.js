//noinspection JSUnresolvedVariable,JSUnusedGlobalSymbols
(function(){
	"use strict";

	//  node requires

	//==============================
	// grunt
	// grunt-browserify
	// express-hbs
	// express
	//
	const express = require('express')
		, portN = 5000
		, statPort = 5001
		, hbs = require('express-hbs')
		, app = express()
		, path = require('path')
		, Server = require('./server')
		, bodyParser = require('body-parser')
		, serveStatic = require('serve-static')
		, session = require('express-session')
		, stat = express()
    , router = express.Router()
    , logger  = require('morgan')
		, methodOverride = require('method-override')
		, errorhandler = require('errorhandler')


	//  view paths
	//==============================
	//
	//
	//
		, viewsD = __dirname + '/views/'
		, partialsD = viewsD + 'partials/'
		, layoutsD = viewsD + 'layouts/'
		, testsD =  __dirname + '/tests/'
    , publicD = __dirname + '/public/'
    , styleguideD = publicD+ '/styleguide/'
		, defaultF = layoutsD + 'default.hbs';
	//  Express setup.
	//==============================
	//
	//
	//
	app.use(express.static(publicD))
			.use(bodyParser())
			.use(logger('dev'))
			.use(methodOverride())
			//.use(express.static(path.join(__dirname, 'tests')))
			.use(serveStatic(path.join(__dirname, 'public')))
			.use(errorhandler());


	app.set('view engine', 'hbs')
			.set('port', process.env.PORT || portN)
			.set('cache', false)
			.set('views', viewsD);

	app.engine('hbs', hbs.express3({
		partialsDir: partialsD,
		defaultLayout: defaultF,
		layoutsDir: layoutsD
	}));

	var indx = {
	derp : {
		src : '/'
	,   id : ''
	}
};
//  function Static(url, dir, isStat){
//    var obj = (isStat) ? stat : app;
//    this.url = url;
//    this.file = file;
////    return obj.get(url, function(req, res){
////      res.send(file);
////    });
//    	return obj.use(url , serveStatic(dir))
//     .use('/coverage/', serveStatic(testsD + 'results/'));
//  }

	app.get( '/' ,function (req, res) {
		res.render(partialsD + '_home.hbs', indx);
	});
	stat.use('/' , serveStatic(testsD));

	stat.set('port', statPort)
			.set('cache', false);
	new Server(app);
	new Server(stat);

})();


