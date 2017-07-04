import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'leaflet';

import { DadosProvider } from '../../providers/dados/dados';

@Component({
  selector: 'page-arquivos',
  templateUrl: 'arquivos.html'
})

export class ArquivosPage {

  dados: any = [];
  instituicao: string;

  constructor(private storage: Storage, public dadosProvider: DadosProvider) {

    this.storage.get('instituicao').then(instituicao => {

      // checa se existe mesmo uma instituição setada ou se é null
      if (instituicao) {
        this.instituicao = instituicao;
      }

    });

    this.storage.get('dados').then(dados => {
      if (dados) {
        this.dados = dados
      }
    });

  }

  url(url: string) {
    window.open(this.dadosProvider.api + this.dadosProvider.slug(this.instituicao) + "/arquivos/" + url, "_system", "location=no");
  }

}
