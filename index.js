var express = require('express');
var cors = require('cors');
var multer = require('multer')
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
// Create a Multer instance and specify the destination for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({storage})

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.json({
    name: req.file.filename,
    "type": req.file.mimetype,
    "size":req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
