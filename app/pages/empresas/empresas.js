import {Page, NavController, Modal, Alert, Events} from 'ionic-angular';
import {DAOEmpresas} from '../../dao/dao-empresas';
import {ModalEmpresasPage} from '../modal-empresas/modal-empresas'
import {Toast} from "ionic-native";
/*
  Generated class for the EmpresasPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/empresas/empresas.html',
})

export class EmpresasPage {
  static get parameters(){
    return [[NavController]]
  }
  constructor(nav) {
    this.dao = new DAOEmpresas();
    //this.listEmpresas = [];

    var self = this;

    this.dao.getList(function (lista){
      self.listEmpresas = lista;
    });

    this.nav = nav;
    //  this.events = events;

    //  this.getListaEmpresas();
  }

  // getListaEmpresas() {
  //
  // this.dao.getList((lista) => {
  //   this.listEmpresas = lista;
  // });

  insert(){
    let modal = Modal.create(ModalEmpresasPage);
    //receber os dados salvos no modal
    modal.onDismiss((data) => {
      console.log(data);
      if (data){

        //this.dao.insert(data);
        this.dao.insert(data, (empresas) => {
          this.listEmpresas.push(empresas);
          Toast.showShortBottom("Empresa inserido com sucesso.").subscribe((toast) => {
            console.log(toast);
          });
        });
      }
    });
    //abrir modal
    this.nav.present(modal);
  }

  edit(empresas){
    let modal = Modal.create(ModalEmpresasPage, {parametro: empresas});
    //receber os dados salvos no modal
    modal.onDismiss((data) => {
      if (data){
        this.dao.edit(data, (empresas) => {

          Toast.showShortBottom("Empresa editada com sucesso.").subscribe((toast) => {
            console.log(toast);
          });

        });
      }
    });
    //abrir modal
    this.nav.present(modal);
  }

  delete(empresas){

    let confirm = Alert.create({
      title: "Excluir",
      body: "Gostaria de realmente excluir a Empresa " + empresas.descricao + "?",
      buttons: [
        {
          text: "Sim",
          handler: () => {
            this.dao.delete(empresas, (empresas) => {
              let pos = this.listEmpresas.indexOf(empresas);
              this.listEmpresas.splice(pos, 1);
              Toast.showShortBottom("Empresa excluida com sucesso.").subscribe((toast) => {
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
