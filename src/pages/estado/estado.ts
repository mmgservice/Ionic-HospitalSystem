import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoDTO } from '../../modules/estado.dto';
import { EstadoService } from '../../services/domain/estado.service';



@IonicPage()
@Component({
  selector: 'page-estado',
  templateUrl: 'estado.html'
})
export class EstadoPage {

   formGroup : FormGroup;
   items: EstadoDTO[]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilider: FormBuilder,
              public alertControl: AlertController,
              public estadoService: EstadoService
              ) {

             this.formGroup = this.formBuilider.group({
                nome:["",Validators.required]
             })   


  }

  ionViewDidLoad() {
  
  }

  inserirEstado(){
    this.estadoService.insert(this.formGroup.value).subscribe(response =>{
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
  voltarTela(){
    this.navCtrl.setRoot('TelaInicialPage');
  }
}
