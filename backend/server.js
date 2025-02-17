const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configuração do armazenamento do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Renomeia o arquivo para evitar conflitos
  },
});

// Inicializa o multer com a configuração de armazenamento
const upload = multer({ storage: storage });

// Rota para upload de arquivos
app.post('/upload', upload.single('arquivo'), (req, res) => {
  // O 'arquivo' é o nome do campo no formulário (campo <input type="file" name="arquivo" />)
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }
  // Salva o arquivo no servidor
  res.status(200).send({ message: 'Arquivo enviado com sucesso!', file: req.file });
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
