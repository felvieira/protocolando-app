import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {ProtocolosPage} from './pages/protocolos/protocolos';
import {BuscaPage} from './pages/busca/busca';
import {EmpresasPage} from './pages/empresas/empresas';



@App({
  templateUrl: 'build/app.html',
  config: { mode: "md" } // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.home = HomePage;
    this.protocolos = ProtocolosPage;
    this.busca = BuscaPage;
    this.empresas = EmpresasPage;
    this.rootPage = ProtocolosPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(opcao) {

    this.rootPage = opcao;

  };

}
