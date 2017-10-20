const fs = require('fs');
const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');


function readcontent(){
	fs.readFile('./index.html', function read(err, data) {
			if (err) throw err;
			console.log(data);
		});
}

const bundleRenderer = createBundleRenderer(
	require('./dist/vue-ssr-bundle.json'),
	{
		template: readcontent() 
	}
);

const app = express();

// serve static assets from ./dist on /dist route
app.use('/dist', express.static('dist'));

// render all other routes with bundleRenderer
app.get('*', (req, res) => {
	bundleRenderer
	  // renders directly to response stream
	  // the argument passed as context to main.server.js
	  .renderToStream({url: req.path})
	  .pipe(res);
});

// bind app to this port
app.listen(8081);
