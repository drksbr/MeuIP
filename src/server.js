const express = require('express');
const path = require('path');
const fs = require('fs');

// Cria uma instância do aplicativo Express
const app = express();

// Variáveis de ambiente para logo e cor de fundo
const logoUrl = process.env.LOGO_URL || 'https://logos.mw-solucoes.com/MW-01.png';
const backgroundColor = process.env.BACKGROUND_COLOR || '#ffffff';

// Serve arquivos estáticos (CSS, JS, imagens)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Rota principal que renderiza o HTML com as variáveis dinâmicas
app.get('/', (req, res) => {

  // Caminho do arquivo HTML
  const filePath = path.join(__dirname, 'views', 'index.html');

  // Captura a porta de origem e o timestamp exato da conexão
  const clientPort = req.headers['x-forwarded-source-port'] || req.socket.remotePort;
  const clientIP =  req.headers['x-real-ip'] || req.socket.remoteAddress;
  const timestamp = new Date().toISOString(); // Timestamp em formato ISO

  console.log("#########################################################################")
  console.log("Client IP: ", clientIP)
  console.log("clientPort: ", clientPort)
  console.log("timestamp: ", timestamp)
  console.dir(req.headers, {depth: null})
  console.log("#########################################################################\r\n")

  // Lê o arquivo HTML e injeta as variáveis
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erro ao ler o arquivo HTML:', err);
        res.status(500).send('Erro ao carregar a página.');
        return;
    }

    // Injeta as variáveis no HTML
    const updatedHtml = data
        .replace(/\$\{logoUrl\}/g, logoUrl)
        // Injeta as variáveis como atributos de dados no body
        .replace('<body', `<body data-client-port="${clientPort}" data-timestamp="${timestamp}" data-client-ip="${clientIP}"`);

    res.send(updatedHtml);
});
});

// Define a porta do servidor
const PORT = 3000;

// Inicia o servidor e escuta na porta definida
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
