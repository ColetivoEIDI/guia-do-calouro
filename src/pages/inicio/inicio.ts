import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DadosProvider} from '../../providers/dados/dados';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})

export class InicioPage {

  // irá armazenar a lista de instituições disponíveis
  instituicoes: object;

  // irá armazenar a instituição atual ou null
  instituicao: string;

  constructor(public navCtrl: NavController, private storage: Storage, public dadosProvider: DadosProvider) {

    // recupera instituicao atual do armazenamento do app
    this.storage.get('instituicao').then(data => this.instituicao = data);

    // recupera lista do armazenamento do app
    storage.get('lista').then(data => this.instituicoes = data);

  }

  onItemChange(newValue){

    // atualiza o dado no armazenamento do app
    this.storage.set('instituicao', this.instituicao);

    // pede para o provider atualizar os dados de acordo a nova instituição
    this.dadosProvider.updateLista();
    this.dadosProvider.updateData();
  }

}
