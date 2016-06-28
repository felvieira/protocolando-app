import {Page, NavController,ViewController, NavParams} from 'ionic-angular';
import {DAOEmpresas} from '../../dao/dao-empresas';

//import {DataUtil} from '../../util/data-util';

/*
Generated class for the ModalProtocolosPage page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/modal-protocolos/modal-protocolos.html',
})

export class ModalProtocolosPage {
  static get parameters() {
    return [[NavController], [ViewController], [NavParams]];
  }


  constructor(nav, view, params) {
    this.nav = nav;
    this.view = view;

    this.protocolos = params.get("parametro") || {};
    //console.log(params.get("parametro"));

    //Pegar Empresas Cadastradas
    this.dao = new DAOEmpresas();

    this.dao.getList((lista) => {
      this.empresas = lista;
      //console.log(lista);
    });


    /*
    this.empresa = this.protocolos.empresa;
    this.imagem = this.protocolos.imagem;
    this.data = this.protocolos.data;
    this.numero = this.protocolos.numero;
    this.tempoConversa = this.protocolos.tempoConversa;
    this.tempoEspera = this.protocolos.tempoEspera;
    this.descricao = this.protocolos.descricao;
    */
    /*
    this.dao = new DAOProtocolos();

    this.dao.getList((lista) => {
    this.protocolos = lista;
  });
  */
}

salvar(){
  //this.view.dismiss(this.protocolos);
  /*
  this.protocolos.empresa = this.empresa;
  this.protocolos.imagem = this.imagem;
  this.protocolos.data = this.data;
  this.protocolos.numero = this.numero;
  this.protocolos.tempoConversa = this.tempoConversa;
  this.protocolos.tempoEspera = this.tempoEspera;
  this.protocolos.descricao = this.descricao;
  */
  console.log(this);
  this.view.dismiss(this.protocolos);


}

cancel() {
  this.view.dismiss();
}
}
