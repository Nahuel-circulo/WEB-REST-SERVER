
import express, { Router } from 'express'
import path from 'path';
import compression from 'compression'
interface Options {
  port?: number;
  public_path?: string;
  routes: Router;
}
export class Server {


  public readonly app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;


  constructor(options: Options) {
    const { port: PORT, public_path: PUBLIC_PATH, routes } = options;
    this.port = PORT || 3000;
    this.publicPath = PUBLIC_PATH || './public';
    this.routes = routes;
  }



  async start() {


    // Middlewares
    this.app.use(compression()); //gzip compression
    this.app.use(express.json()); //raw
    this.app.use(express.urlencoded({extended:true})); //url encoded

    // Public Folder
    this.app.use(express.static(this.publicPath));

    //Routes

    this.app.use(this.routes);

    // SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
      res.sendFile(indexPath)
    })





    this.app.listen(this.port, () => {
      console.log(`server running on port http://localhost:${this.port}`)
    })
  }

}