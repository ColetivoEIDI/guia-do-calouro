import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the ListProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DadosProvider {

  // temporário para testes
  api: string = 'http://localhost:8100/api/';

  constructor(public http: Http, public storage: Storage, public events: Events) {
    // TODO: checar se existe conexão e prevenir erros pela falta dela.
  }

  getLista() {
    return this.http.get(this.api + 'lista.json').map(res => res.json());
  }

  getDados(instituicao) {
    instituicao = this.url(instituicao);
    return this.http.get(this.api + instituicao + '/data.json').map(res => res.json());
  }

  updateLista() {

    // pede ao service uma lista atualizada de instituições
    this.getLista().subscribe(
      data => {

        // salva a lista recebida no armazenamnto
        this.storage.set('lista', data).then(() => {

          // emite o evento de que os dados foram atualziados
          this.events.publish('lista:updated');

        });
      },
      err => console.log(err)
    );
  }

  updateDados() {

    // pega do armazenamento nome da instituição atual
    this.storage.get('instituicao').then(instituicao => {

      // checa se existe mesmo uma instituição setada ou se é null
      if (instituicao) {

        // pede ao service os dados da instituição
        this.getDados(instituicao).subscribe(
          data => {

            // salva os dados da instituição
            this.storage.set('dados', data).then(() => {

              // emite o evento de que os dados foram atualziados
              this.events.publish('dados:updated');
            });
          },
          err => console.log(err)
        );
      }
    });
  }

  url(str) {

    // TODO: finalizar a lista completa de caracteres especiais do replace
    var find =    [' ', "ó"];
    var replace = ['-', 'o'];

    str = str.toLowerCase();
    for (var i = 0; i < find.length; i++) {
        str = str.replace(new RegExp(find[i], 'gi'), replace[i]);
    }

    return encodeURI(str);
  }
}
