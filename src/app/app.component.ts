import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DadosProvider } from '../providers/dados/dados';

import { InicioPage } from '../pages/inicio/inicio';
import { HorariosPage } from '../pages/horarios/horarios';
import { MapaPage } from '../pages/mapa/mapa';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = InicioPage;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public dadosProvider: DadosProvider) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Início', component: InicioPage },
      { title: 'Horários', component: HorariosPage },
      { title: 'Mapa', component: MapaPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.dadosProvider.updateLista();
      this.dadosProvider.updateDados();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}