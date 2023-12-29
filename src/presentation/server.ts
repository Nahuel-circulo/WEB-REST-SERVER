
import express from 'express'

export class Server {


  private app = express();
  private port = 3000;


  
  
  
  async start() {


    // Middlewares
  
    // Public Folder
    this.app.use(express.static('public'));


    this.app.listen(this.port, () => {
      console.log(`server running on port http://localhost:${this.port}`)
    })
  }

}