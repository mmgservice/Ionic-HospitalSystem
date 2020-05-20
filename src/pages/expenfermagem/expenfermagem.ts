import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpecialidadeEnfermagemService } from '../../services/domain/expenfermagem';

@IonicPage()
@Component({
  selector: 'page-expenfermagem',
  templateUrl: 'expenfermagem.html',
})
export class ExpenfermagemPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilider: FormBuilder,
    public alertControl: AlertController,
    public expecialidadeService: ExpecialidadeEnfermagemService,
    
    ) {

      this.formGroup = this.formBuilider.group({
        expecialidade:["",Validators.required]
     })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpenfermagemPage');
  }

  inserirExpEnf(){
    this.expecialidadeService.insert(this.formGroup.value).subscribe(response =>{
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
