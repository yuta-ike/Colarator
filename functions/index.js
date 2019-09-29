const functions = require('firebase-functions');
const express = require('express')
const app = express()

const genHtml = () => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta property="og:locale" content="ja_JP">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://colarator.web.app">
    <meta property="og:title" content="Colarator">
    <meta property="og:site_name" content="Colarator">
    <meta property="og:description" content="コラ画像を生成するサービスです">
    <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/colarator.appspot.com/o/test.jpg?alt=media&token=e8187ed3-2580-44bc-873d-5f7496059387">
    <meta property="og:image:width" content="400">
    <meta property="og:image:height" content="300">
    <meta property="fb:app_id" content= "colarator"}>
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Colarator">
    <meta name="twitter:description" content="コラ画像を生成するサービスです">
    <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/colarator.appspot.com/o/test.jpg?alt=media&token=e8187ed3-2580-44bc-873d-5f7496059387">
    <meta name="twitter:site" content="https://colarator.web.app">
    <meta name="twitter:creator" content="colarator">
  </head>
  <body>
    <script>
      location.href = '/';
    </script>
  </body>
</html>
`

app.get('/:id', async (req, res) => {
  // const doc = await db.collection('cards').doc(req.params.id).get()
  // if (!doc.exists) {
    // console.log(`${req.params.id} not exist`)
    // res.status(404).send('404 Not Exist')
  // } else {
    // const url = await generateSignedUrl(bucketName, `${req.params.id}.png`)
    const html = genHtml()
    res.set('cache-control', 'public, max-age=3600');
    res.send(html)
  // }
})
exports.s = functions.https.onRequest(app)


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
