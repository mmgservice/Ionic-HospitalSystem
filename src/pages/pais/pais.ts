import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaisService} from '../../services/domain/pais.service';
import { PaisDTO } from '../../modules/pais.dto';

/**
 * Generated class for the PaisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pais',
  templateUrl: 'pais.html',
})
export class PaisPage {


  items: PaisDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public paisservice: PaisService) {
  }

  ionViewDidLoad() {
      this.paisservice.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {
        console.log(error);
      });
}

}
