import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'leaflet';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})

export class MapaPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    document.getElementById('map').innerHTML = '<div id="map-container"></div>';
    var map = L.map('map-container', {
      minZoom: 1,
      maxZoom: 5,
      center: [0, 0],
      zoom: 1,
      crs: L.CRS.Simple
    });

    // dimensions of the image
    var w = 4220,
      h = 3490,
      url = 'assets/maps/UFAL-arapiraca.png';

    // calculate the edges of the image, in coordinate space
    var southWest = map.unproject([0, h], map.getMaxZoom() - 1);
    var northEast = map.unproject([w, 0], map.getMaxZoom() - 1);
    var bounds = new L.LatLngBounds(southWest, northEast);

    // add the image overlay,
    // so that it covers the entire map
    L.imageOverlay(url, bounds).addTo(map);

    // tell leaflet that the map is exactly as big as the image
    map.setMaxBounds(bounds);
  }

}
