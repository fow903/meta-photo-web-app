import 'zone.js/node';  // Use this updated path instead of 'zone.js/dist/zone-node'
import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import { join } from 'path';
import { APP_BASE_HREF } from '@angular/common';
import { AppServerModule } from './src/main.server';

const app = express();

const DIST_FOLDER = join(process.cwd(), 'dist/meta-photo-ui/browser');

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule,
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Serve static files
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All other routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', {
    req,
    providers: [
      { provide: APP_BASE_HREF, useValue: req.baseUrl },
    ],
  });
});

// Start the Express server
function run() {
  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
  });
}

run();
