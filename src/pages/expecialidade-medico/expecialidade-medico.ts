import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpecialidadeMedicaService } from '../../services/domain/expecialidade-medica.service';
import { text } from '@angular/core/src/render3/instructions';
import { ExpedicalidadeMedicaDTO } from '../../modules/expecialidade-medica.dto';


@IonicPage()
@Component({
  selector: 'page-expecialidade-medico',
  templateUrl: 'expecialidade-medico.html',
})
export class ExpecialidadeMedicoPage {

  formGroup: FormGroup;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBiulder: FormBuilder,
     public alertControl: AlertController,
     public expecialidadeMedicoService: ExpecialidadeMedicaService,
     ) {
      this.formGroup = this.formBiulder.group({
        expecialidade: ["", Validators.required]
     })
  }

  inserirExpMedico(){
     this.expecialidadeMedicoService.insert(this.formGroup.value).subscribe(response  => {
       this.insertOK();
     },
     error => {});
  }

  ionViewDidLoad() {
    this.expecialidadeMedicoService.findAll1()
    .subscribe(response => {
      console.log(response);
    },
    error =>{
      console.log(error);
    })

  }

  insertOK(){
      let alert = this.alertControl.create({
        title: "Sucesso",
        message: "Cadastrado efeutado com sucesso!",
        buttons: [
          {
            text: "OK"
          }       
        ]
      });
      
      alert.present();
  }

}
