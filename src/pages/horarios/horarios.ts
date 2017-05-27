import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-horarios',
  templateUrl: 'horarios.html'
})
export class HorariosPage {
  dados: any = [];
  selecionado: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.selecionado = navParams.get('item');

    this.storage.get('dados').then(dados => {
      if (dados) {
        this.dados = dados
      }
    });
  }

  itemSelecionado(event, item) {

    // TODO: pegar também a chave/nome e exibir na tela de horários

    this.navCtrl.push(HorariosPage, {
      item: item
    });
  }
}
