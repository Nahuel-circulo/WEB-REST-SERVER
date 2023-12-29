
import express from 'express'

export class Server {


  private app = express();
  private port = 3000;





  async start() {


    // Middlewares

    // Public Folder
    this.app.use(express.static('public'));


    this.app.get('*', (req, res) => {
      console.log(req.url)
      res.send('Hola Mundo')
    })


    this.app.listen(this.port, () => {
      console.log(`server running on port http://localhost:${this.port}`)
    })
  }

}