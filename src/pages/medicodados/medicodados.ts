import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ExpedicalidadeMedicaDTO } from '../../modules/expmedica.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpecialideMedicoService } from '../../services/domain/expmedico.service';
import { MedicoDadosService } from '../../services/domain/medicodados.service';

@IonicPage()
@Component({
  selector: 'page-medicodados',
  templateUrl: 'medicodados.html',
})
export class MedicodadosPage {
  formGroup: FormGroup;
  expecialid: ExpedicalidadeMedicaDTO[]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formbuider: FormBuilder,
              public alertcontrol: AlertController,
              public expecialidademedicos: ExpecialideMedicoService,
              public medicoservice: MedicoDadosService) {
              
              this.formGroup = this.formbuider.group({
                crm: ["", Validators.required],
                nome:["",Validators.required],
                expecialidadeId: [null,[Validators.required]]
              })
  }

  ionViewDidLoad() {
   this.expecialidademedicos.findAll().subscribe(response =>{
     this.expecialid = response;
   })
  }
  inserirMedico(){
    this.medicoservice.insert(this.formGroup.value).subscribe(response =>{
      this.insertOk();
    },
    error =>{}
    )
  }
  insertOk(){
    let alert = this.alertcontrol.create({
       title: "Cadastrado",
       message: "Cadasrtro efetuado com sucesso!",
       buttons:[{
         text: "OK"
       }]
    })
    
    alert.present();
  }

}
