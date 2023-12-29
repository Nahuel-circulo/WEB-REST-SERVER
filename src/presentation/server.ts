
import express from 'express'

interface Options {
  PORT?: number;
  PUBLIC_PATH?: string;
}
export class Server {


  private app = express();
  private readonly port: number;
  private readonly publicPath: string;


  constructor(options: Options) {
    const { PORT, PUBLIC_PATH } = options;
    this.port = PORT || 3000;
    this.publicPath = PUBLIC_PATH || './public';
  }



  async start() {


    // Middlewares

    // Public Folder
    this.app.use(express.static(this.publicPath));


    this.app.get('*', (req, res) => {
      console.log(req.url)
      res.send('Hola Mundo')
    })


    this.app.listen(this.port, () => {
      console.log(`server running on port http://localhost:${this.port}`)
    })
  }

}