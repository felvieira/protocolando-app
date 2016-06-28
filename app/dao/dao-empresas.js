import{Platform, Page, Storage, SqlStorage} from 'ionic-angular'

export class DAOEmpresas {

  constructor() {
    let storage = new Storage(SqlStorage);
    // storage.query('CREATE TABLE IF NOT EXISTS empresas(id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT)').then((data) => {

   storage.query("CREATE TABLE IF NOT EXISTS empresas(id INTEGER PRIMARY KEY AUTOINCREMENT, imagem TEXT, descricao TEXT)").then((data) => {
          console.log("Tabela Criada -> " + JSON.stringify(data.res));
        }, (error) => {
            console.log("Erro na criação da tabela -> " + JSON.stringify(error.err));
        });
    }

  insert(empresas, successCallback){
    //this.list.push(empresas);
      let storage = new Storage(SqlStorage);

      // storage.query("INSERT INTO empresas(descricao) VALUES(?)", [empresas.descricao]).then((data) => {
        storage.query("INSERT INTO empresas(imagem,descricao) " +
         "VALUES(?,?)", [empresas.imagem, empresas.descricao]).then((data) => {
        //empresas.id = data.res.insertid;
        successCallback(empresas);
        console.log("Gravou registro");
      }, (error) => {
        console.log(error);
        console.log("Erro na inserção do registro" + JSON.stringify(error.err));
      })
  }

  getList(successCallback){
    let storage = new Storage(SqlStorage);

    storage.query("SELECT * FROM empresas").then((data) => {
      let lista = [];

      for (var i = 0; i < data.res.rows.length; i++) {

        let empresasDB = data.res.rows.item(i);

        let empresas = {id: empresasDB.id,
          imagem: empresasDB.imagem,
          descricao: empresasDB.descricao
        }

        lista.push(empresas);
      }

        successCallback(lista);

    }, (error) => {
        console.log("Erro na geração da tabela" + JSON.stringify(error.err));

    });

  }

  edit(empresas, successCallback){
    let storage = new Storage(SqlStorage);

    storage.query("UPDATE empresas SET imagem = ?, descricao = ?  WHERE id = ?", [ empresas.imagem, empresas.descricao, empresas.id]).then((data) => {
      successCallback(empresas);
    }, (error) => {
      console.log("Erro na criação da tabela " + JSON.stringify(error.err));
    });
  }

  delete(empresas, successCallback){
    let storage = new Storage(SqlStorage);

    storage.query("DELETE FROM empresas WHERE id = ?", [empresas.id]).then((data) => {
      successCallback(empresas);
    }, (error) => {
      console.log("Erro na criação da tabela " + JSON.stringify(error.err));
    });
  }
}
