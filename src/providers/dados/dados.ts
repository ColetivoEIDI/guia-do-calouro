import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ListProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DadosProvider {

  // temporário para testes
  api: string = 'http://localhost:8100/api/';

  constructor(public http: Http, public storage: Storage) {

  }
  getLista(){
    return this.http.get(this.api + 'lista.json').map(res => res.json());
  }

  getData(instituicao){
    instituicao = encodeURI(instituicao.replace(["ó"], ["o"]));
    return this.http.get(this.api + instituicao + '/data.json').map(res => res.json());
  }

  updateLista() {

    // pede ao service uma lista atualizada de instituições
    this.getLista().subscribe(
      data => {

        // salva a lista recebida no armazenamnto
        this.storage.set('lista', data);
      },
      err => console.log(err)
    );
  }

  updateData() {

    // pega do armazenamento nome da instituição atual
    this.storage.get('instituicao').then(instituicao => {

      // checa se existe mesmo uma instituição setada ou se é null
      if (instituicao) {

        // pede ao service os dados da instituição
        this.getData(instituicao).subscribe(
          data => {

            // salva os dados da instituição
            this.storage.set('dadosInstituicao', data);
          },
          err => console.log(err)
        );
      }

    });
  }
}
