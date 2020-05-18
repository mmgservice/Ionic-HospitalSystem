import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeitoDTO } from '../../modules/leito.dto';
import { LeitoService } from '../../services/domain/leito.service';
import { QuartoService } from '../../services/domain/quarto.service';
import { QuartoDTO } from '../../modules/quarto.dto';

@IonicPage()
@Component({
  selector: 'page-leito',
  templateUrl: 'leito.html',
})
export class LeitoPage {

  formGroup: FormGroup;
  quarto: QuartoDTO[]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public leitoservice: LeitoService,
              public quartoservice: QuartoService,
              public formBuilder: FormBuilder,
              public alertControler: AlertController) {
               
                this.formGroup = this.formBuilder.group({
                  quartoId: [null,[Validators.required]],
                  statusquartoenum: ["",Validators.required],
                  nomequarto:["",Validators.required]
                })
  }

  ionViewDidLoad() {
      this.quartoservice.findAll().subscribe (response => {
        this.quarto = response;
      })
  }
  inserirLeito(){
    this.leitoservice.insert(this.formGroup.value).subscribe(response =>{
      this.insertOK();
    },
    error => {}
    )
  }
  insertOK(){
    let alert = this.alertControler.create({
      title: "Cadastrado",
      message: "Cadastro efetuado com sucesso!",
      buttons:[{
        text: "OK"
      }]
   })
   
   alert.present();
  }
}
