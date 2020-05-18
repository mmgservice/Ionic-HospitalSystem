import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { QuartoService } from '../../services/domain/quarto.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { QuartoDTO } from '../../modules/quarto.dto';

@IonicPage()
@Component({
  selector: 'page-quarto',
  templateUrl: 'quarto.html',
})
export class QuartoPage {

  formGroup: FormGroup;
  item: QuartoDTO[]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuiler: FormBuilder,
              public quartoservice: QuartoService,
              public alertControl: AlertController
              ) {
              this.formGroup = this.formBuiler.group({
                nome:["",Validators.required]
              })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuartoPage');
  }

  inserirQuarto(){
    this.quartoservice.insert(this.formGroup.value).subscribe(response =>{
      this.insertOK();
    },
    error => {}
    )
  }

  insertOK(){
    let alert = this.alertControl.create({
      title:"Cadastrado",
      message: "Cadastro efetuado com Sucesso!",
      buttons:[{
        text:"OK"
      }]
    })
    alert.present();
  }

}
