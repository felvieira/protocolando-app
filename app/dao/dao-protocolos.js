import{Platform, Page, Storage, SqlStorage} from 'ionic-angular'

export class DAOProtocolos {

  constructor() {
    let storage = new Storage(SqlStorage);
    // storage.query('CREATE TABLE IF NOT EXISTS protocolos(id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT)').then((data) => {

   storage.query("CREATE TABLE IF NOT EXISTS protocolos(id INTEGER PRIMARY KEY AUTOINCREMENT, empresa TEXT, imagem TEXT, data INTEGER, numero INTEGER, tempoConversa TEXT, tempoEspera TEXT, descricao TEXT, escolhaResolucao TEXT)").then((data) => {
          console.log("Tabela Criada -> " + JSON.stringify(data.res));
        }, (error) => {
            console.log("Erro na criação da tabela -> " + JSON.stringify(error.err));
        });
    }

  insert(protocolos, successCallback){
    //this.list.push(protocolos);
      let storage = new Storage(SqlStorage);

      // storage.query("INSERT INTO protocolos(descricao) VALUES(?)", [protocolos.descricao]).then((data) => {
        storage.query("INSERT INTO protocolos(empresa, imagem, data, numero, tempoConversa, tempoEspera, descricao, escolhaResolucao) " +
         "VALUES(?,?,?,?,?,?,?,?)", [protocolos.empresa, protocolos.imagem,  protocolos.data,  protocolos.numero,
           protocolos.tempoConversa,  protocolos.tempoEspera,  protocolos.descricao, protocolos.escolhaResolucao]).then((data) => {
        //protocolos.id = data.res.insertid;
        successCallback(protocolos);
        console.log("Gravou registro");
      }, (error) => {
        console.log(error);
        console.log("Erro na inserção do registro" + JSON.stringify(error.err));
      })
  }

  getList(successCallback){
    let storage = new Storage(SqlStorage);

    storage.query("SELECT * FROM protocolos").then((data) => {
      let lista = [];

      for (var i = 0; i < data.res.rows.length; i++) {

        let protocolosDB = data.res.rows.item(i);

        let protocolos = {id: protocolosDB.id,
          empresa: protocolosDB.empresa,
          imagem: protocolosDB.imagem,
          data: protocolosDB.data,
          numero: protocolosDB.numero,
          tempoConversa: protocolosDB.tempoConversa,
          tempoEspera: protocolosDB.tempoEspera,
          descricao: protocolosDB.descricao,
          escolhaResolucao: protocolosDB.escolhaResolucao
        }

        lista.push(protocolos);
      }

        successCallback(lista);

    }, (error) => {
        console.log("Erro na geração da tabela" + JSON.stringify(error.err));

    });

  }

  edit(protocolos, successCallback){
    let storage = new Storage(SqlStorage);

    storage.query("UPDATE protocolos SET empresa = ?, imagem = ? , data = ? , numero = ?, tempoConversa = ?, tempoEspera = ?, descricao = ?, escolhaResolucao = ? WHERE id = ?", [ protocolos.empresa, protocolos.imagem,  protocolos.data ,  protocolos.numero,
      protocolos.tempoConversa,  protocolos.tempoEspera,  protocolos.descricao, protocolos.escolhaResolucao, protocolos.id]).then((data) => {
      successCallback(protocolos);
    }, (error) => {
      console.log("Erro na criação da tabela " + JSON.stringify(error.err));
    });
  }

  delete(protocolos, successCallback){
    let storage = new Storage(SqlStorage);

    storage.query("DELETE FROM protocolos WHERE id = ?", [protocolos.id]).then((data) => {
      successCallback(protocolos);
    }, (error) => {
      console.log("Erro na criação da tabela " + JSON.stringify(error.err));
    });
  }
}
