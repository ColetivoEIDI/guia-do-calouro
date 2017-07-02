import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { DadosProvider } from '../../providers/dados/dados';

import { TelefonesPage } from '../telefones/telefones';
import { HorariosPage } from '../horarios/horarios';
import { MapaPage } from '../mapa/mapa';
import { ArquivosPage } from '../arquivos/arquivos';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})

export class InicioPage {

  // páginas
  telefonesPage = TelefonesPage;
  horariosPage = HorariosPage;
  mapaPage = MapaPage;
  arquivosPage = ArquivosPage;

  atualizando: boolean = true;

  // irá armazenar a lista de instituições disponíveis
  lista: any;

  // irá armazenar a instituição atual ou null
  instituicao: string;

  // irá armazenar os dados da instituição atual ou null
  dados = [];

  constructor(private storage: Storage, public events: Events, public dadosProvider: DadosProvider) {

    // recupera instituicao atual do armazenamento do app
    this.storage.get('instituicao').then(instituicao => this.instituicao = instituicao);

    // checa mudanças na lista de instituições
    this.updateLista();
    this.dadosProvider.updateLista();
    this.events.subscribe('lista:updated', () => {
      this.updateLista();
    });

    // checa mudanças nos dados armazenados da instituição
    this.updateDados();
    this.dadosProvider.updateDados();
    this.events.subscribe('dados:updated', () => {
      this.updateDados();
    });

  }

  updateInstituicao() {

    this.atualizando = true;

    // atualiza o dado no armazenamento do app
    this.storage.set('instituicao', this.instituicao).then(() => {

      // pede para o provider atualizar os dados de acordo a nova instituição
      this.dadosProvider.updateDados();
    });
  }

  updateLista() {
    this.atualizando = true;
    this.storage.get('lista').then(lista => {
      if (lista) {
        this.lista = lista;
      }
      this.atualizando = false;
    });
  }

  updateDados() {
    this.atualizando = true;
    this.storage.get('dados').then(dados => {
      if (dados) {
        this.dados = dados
      }
      this.atualizando = false;
    });
  }

  // atribuir esse método a um local onde ele possa ser usado a partir de qualquer página
  url(url: string) {
    window.open(url, "_system", "location=no");
  }

}
