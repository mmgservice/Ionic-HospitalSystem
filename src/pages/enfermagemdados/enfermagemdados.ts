import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpecialidadeEnfermagemService } from '../../services/domain/expenfermagem';
import { EnfermagemDadosService } from '../../services/domain/enfermagemdados.service';
import { ExpecialidadeEnfermagemDTO } from '../../modules/expenfermagem.dto';


@IonicPage()
@Component({
  selector: 'page-enfermagemdados',
  templateUrl: 'enfermagemdados.html',
})
export class EnfermagemdadosPage {

  formGroup: FormGroup;
  expecialid: ExpecialidadeEnfermagemDTO[]

  
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilider: FormBuilder,
     public alertControl: AlertController,
     public expecialidadeService: ExpecialidadeEnfermagemService,
     public enfermagemService: EnfermagemDadosService,
      ) {

        this.formGroup = this.formBuilider.group({
          coren: ["", Validators.required],
          nome:["",Validators.required],
          expecialidadeId: [null,[Validators.required]]
        })
  }

  ionViewDidLoad() {
    this.expecialidadeService.findAll().subscribe(response =>{
      this.expecialid = response;
    })
   }

   inserirEnfermagem(){
    this.enfermagemService.insert(this.formGroup.value).subscribe(response =>{
      this.insertOk();
    },
    error =>{}
    )
  }

  insertOk(){
    let alert = this.alertControl.create({
       title: "Cadastrado",
       message: "Cadasrtro efetuado com sucesso!",
       buttons:[{
         text: "OK"
       }]
    })
    
    alert.present();
  }

}
