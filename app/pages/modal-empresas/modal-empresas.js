import {Page, ViewController, NavParams, NavController} from 'ionic-angular';
import {DAOEmpresas} from '../../dao/dao-empresas';

/*
Generated class for the ModalEmpresasPage page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/modal-empresas/modal-empresas.html',
})
export class ModalEmpresasPage {
  static get parameters() {
    return [[NavController], [ViewController], [NavParams]];
  }


  constructor(nav, view, params) {
    this.nav = nav;
    this.view = view;

    this.empresas = params.get("parametro") || {};
    console.log(params.get("parametro"));

  }

  salvar(){
    console.log(this);
    this.view.dismiss(this.empresas);


  }

  cancel() {
    this.view.dismiss();
  }
}
