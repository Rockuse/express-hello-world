const http = require('http');

const PORT = 3000;
const server = http.createServer((req, res) => {
  if (req.url === '/friends') {
    // res.writeHead(200, {
    //   'Content-type': 'text/plain',
    // });
    res.statusCode = 200;
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify({
      id: 1,
      name: 'Sir Isaac Newrton',
    }));
  } else if (req.url === '/messages') {
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>Hello Sir Isaac</li>');
    res.write('<li>It\'s me piwdepay</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`the server is running at port ${PORT}`);
});
