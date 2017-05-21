import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';
import { InicioPage } from '../pages/inicio/inicio';
import { HorariosPage } from '../pages/horarios/horarios';
import { MapaPage } from "../pages/mapa/mapa";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DadosProvider } from '../providers/dados/dados';
import { KeysPipe } from '../pipes/keys/keys';

@NgModule({
  declarations: [
    MyApp,
    InicioPage,
    HorariosPage,
    MapaPage,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InicioPage,
    HorariosPage,
    MapaPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DadosProvider
  ]
})
export class AppModule {}
