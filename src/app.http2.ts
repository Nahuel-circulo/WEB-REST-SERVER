import http2 from 'http2'
import fs from 'fs'

const server = http2.createSecureServer({
  key: fs.readFileSync('./secret/server.key'),
  cert: fs.readFileSync('./secret/server.crt')
}, (req, res) => {


  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(htmlFile)
    return;
  }

  if (req.url?.endsWith('.js')) {
    res.writeHead(200, { 'Content-Type': 'text/javascript' })
  }
  else if (req.url?.endsWith('.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' })
  }
try{

  const responseContent = fs.readFileSync(`./public/${req.url}`, 'utf-8');
  res.end(responseContent)
}catch(e){
  res.writeHead(404, { 'Content-Type': 'text/html' })
  res.end('<h1>Page not found</h1>')
}


})


server.listen(3000, () => {
  console.log('server is running')
})