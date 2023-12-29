
import express, { Router } from 'express'
import path from 'path';

interface Options {
  PORT?: number;
  PUBLIC_PATH?: string;
  routes: Router;
}
export class Server {


  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;


  constructor(options: Options) {
    const { PORT, PUBLIC_PATH, routes } = options;
    this.port = PORT || 3000;
    this.publicPath = PUBLIC_PATH || './public';
    this.routes = routes;
  }



  async start() {


    // Middlewares

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