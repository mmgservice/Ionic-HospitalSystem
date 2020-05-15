import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AlergiaService } from '../../services/domain/alergia.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-alergia',
  templateUrl: 'alergia.html',
})
export class AlergiaPage {

  formGroup: FormGroup;
  
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alergiaService: AlergiaService,
     public alertControl: AlertController,
     public formBiulder: FormBuilder,) {

      this.formGroup = this.formBiulder.group({
         nome: ["", Validators.required]
      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AlergiaPage');
  }

  inserirAlergia(){
       this.alergiaService.insert(this.formGroup.value).subscribe(response => {
         this.showInsertOK();
       },
       error => {});
  }

  showInsertOK(){
    let alert = this.alertControl.create({
      title: "Sucesso!",
      message: "Cadastrado efetuado com sucesso!",
      buttons: [
        {
          text: "OK"
        }
     ]
    });

    alert.present();
  }
}
