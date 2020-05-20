import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoDTO } from '../../../modules/estado.dto';
import { EstadoService } from '../../../services/domain/estado.service';






@IonicPage()
@Component({
  selector: 'page-editarestado',
  templateUrl: 'editarestado.html',
})
export class EditarestadoPage {

  formGroup: FormGroup;
  item: EstadoDTO[]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formbuilder: FormBuilder,
              public alertcontrol: AlertController,
              public estadoservice: EstadoService
              ) {
              this.formGroup = this.formbuilder.group({
                nome:["",Validators.required]
              })
  }

  ionViewDidLoad() {
    
  }

}
