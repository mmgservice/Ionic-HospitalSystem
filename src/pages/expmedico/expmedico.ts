import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpedicalidadeMedicaDTO } from '../../modules/expmedica.dto';
import { ExpecialideMedicoService } from '../../services/domain/expmedico.service';

@IonicPage()
@Component({
  selector: 'page-expmedico',
  templateUrl: 'expmedico.html',
})
export class ExpmedicoPage {

  formGroup: FormGroup;
  items: ExpedicalidadeMedicaDTO[]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilider: FormBuilder,
              public alertControl: AlertController,
              public expecialidadeservice: ExpecialideMedicoService) 
              {
                this.formGroup = this.formBuilider.group({
                  expecialidade:["",Validators.required]
               })   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpmedicoPage');
  }

  inserirExp(){
    this.expecialidadeservice.insert(this.formGroup.value).subscribe(response =>{
      this.insertOk();
    },
    error => {}
    )
  }
  insertOk(){
    let alert = this.alertControl.create({
      title: "Cadastrado",
      message: "Cadastrado efetuado com sucesso!",
      buttons:[{
         text: "OK"
      }]
    })
    alert.present();
  }
}
