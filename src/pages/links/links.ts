import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'leaflet';

import { DadosProvider } from '../../providers/dados/dados';

@Component({
  templateUrl: 'links.html'
})

export class LinksPage {

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
    window.open(url, "_system", "location=no");
  }

}
