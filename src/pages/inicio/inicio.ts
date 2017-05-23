import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { DadosProvider } from '../../providers/dados/dados';

import { HorariosPage } from '../horarios/horarios';
import { MapaPage } from '../mapa/mapa';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})

export class InicioPage {

  // páginas
  //telefonesPage = TelefonesPage;
  horariosPage = HorariosPage;
  mapaPage = MapaPage;

  // irá armazenar a lista de instituições disponíveis
  lista: object;

  // irá armazenar a instituição atual ou null
  instituicao: string;

  // irá armazenar os dados da instituição atual ou null
  dados = [];

  constructor(private storage: Storage, public events: Events, public dadosProvider: DadosProvider) {

    // recupera instituicao atual do armazenamento do app
    this.storage.get('instituicao').then(instituicao => this.instituicao = instituicao);

    // recupera lista do armazenamento do app
    this.storage.get('lista').then(instituicoes => this.lista = instituicoes);

    // checa mudanças nos dados armazenados da instituição
    this.updatePropriedades();
    this.events.subscribe('dados:updated', () => {
      this.updatePropriedades();
    });

  }

  updateInstituicao() {

    // atualiza o dado no armazenamento do app
    this.storage.set('instituicao', this.instituicao).then(() => {

      // pede para o provider atualizar os dados de acordo a nova instituição
      this.dadosProvider.updateDados();
    });
  }

  updatePropriedades() {

    this.dados["descricao"] = "";
    this.storage.get('dados').then(dados => {
      if (dados) {
        this.dados = dados
      }
    });
  }

}
