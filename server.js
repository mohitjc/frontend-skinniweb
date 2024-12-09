// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const fs = require("fs"); 
const app = express();
const PORT = process.env.PORT || 8101;
const API_URL='https://acapi.jcsoftwaresolution.in/'


// Point static path to dist
app.use(express.static(
  path.resolve(__dirname, 'build'),
  { maxAge: '30d' },
));

const indexPath  = path.resolve(__dirname, 'build', 'index1.html');
// Catch all other routes and return the index file
app.get('*', async (req, res) => {
  // res.sendFile(path.join(__dirname, 'build/index.html'));
  await fs.readFile(indexPath, 'utf8',async (err, htmlData) => {
    if (err) {
        console.error('Error during file reading', err);
        return res.status(404).end()
    }


    // inject meta tags

    let sitedetail={
      name:'Skinni Web',
      fabIcon:'',
    }

    const setMeta=()=>{
      htmlData = htmlData
      .replace('__META_TITLE__', sitedetail.name||'Skinni Web')
      .replaceAll('__META_FAV_ICON__', sitedetail.fabIcon?`${API_URL}img/users/${sitedetail.fabIcon}`:'/assets/img/logo.png')
    }

    setMeta()
    return res.send(htmlData);
});
});


app.listen(PORT, (error) => {
  if (error) {
      return console.log('Error during app startup', error);
  }
  console.log("listening on " + PORT + "...");
});