var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


// Configuración de almacenamiento de multer
// Utilizamos la memoria para almacenar temporalmente el archivo
var storage = multer.memoryStorage();  
var upload = multer({ storage: storage });

// Route para manejar la petición de la carga de archivo
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // Si no se ha enviado un archivo, enviamos un error
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }

  // Enviar la metadata del archivo como respuesta
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
