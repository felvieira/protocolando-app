import {Page, NavController, Modal, Alert, Events} from 'ionic-angular';
import {DAOProtocolos} from '../../dao/dao-protocolos';
import {ModalProtocolosPage} from '../modal-protocolos/modal-protocolos';
import {Toast} from "ionic-native";


/*  Generated class for the ProtocolosPage page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/protocolos/protocolos.html',
})

export class ProtocolosPage {
  static get parameters(){
    return [[NavController]]
  }

  constructor(nav) {
    this.dao = new DAOProtocolos();
    //this.listProtocolos = [];

    var self = this;

    this.dao.getList(function (lista){
      self.listProtocolos = lista;
      console.log(lista);
    });



    this.nav = nav;
    //  this.events = events;

    //  this.getListaProtocolos();
  }

  // getListaProtocolos() {
  //
  // this.dao.getList((lista) => {
  //   this.listProtocolos = lista;
  // });

  insert(){
    let modal = Modal.create(ModalProtocolosPage);
    //receber os dados salvos no modal
    modal.onDismiss((data) => {
      console.log(data);
      if (data){

        //this.dao.insert(data);
        this.dao.insert(data, (protocolos) => {
          this.listProtocolos.push(protocolos);
          Toast.showShortBottom("Protocolo inserido com sucesso.").subscribe((toast) => {
            console.log(toast);
          });
        });
      }
    });
    //abrir modal
    this.nav.present(modal);
  }

  edit(protocolos){
    let modal = Modal.create(ModalProtocolosPage, {parametro: protocolos});
    //receber os dados salvos no modal
    modal.onDismiss((data) => {
      if (data){
        this.dao.edit(data, (protocolos) => {

          Toast.showShortBottom("Protocolo editado com sucesso.").subscribe((toast) => {
            console.log(toast);
          });

        });
      }
    });
    //abrir modal
    this.nav.present(modal);
  }

  delete(protocolos){

    let confirm = Alert.create({
      title: "Excluir",
      body: "Gostaria de realmente excluir o protocolo " + protocolos.descricao + "?",
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.dao.delete(protocolos, (protocolos) => {
              let pos = this.listProtocolos.indexOf(protocolos);
              this.listProtocolos.splice(pos, 1);
              Toast.showShortBottom("Protocolo excluido com sucesso.").subscribe((toast) => {
                console.log(toast);
              });
            });
          }
        },
        {
          text: "Não"
        }
      ]
    });

    this.nav.present(confirm);
  }


}
