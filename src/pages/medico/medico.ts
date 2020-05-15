import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ExpecialidadeMedicaService } from '../../services/domain/expecialidade-medica.service';
import { ExpedicalidadeMedicaDTO } from '../../modules/expecialidade-medica.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicoService } from '../../services/domain/medico.service';

@IonicPage()
@Component({
  selector: 'page-medico',
  templateUrl: 'medico.html',
})
export class MedicoPage {

  formGroup: FormGroup;
  expmedicos: ExpedicalidadeMedicaDTO[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public expecialidadeService: ExpecialidadeMedicaService,
    public medicoService: MedicoService,
    public formBuilder: FormBuilder,
     public alertControl: AlertController) {

      this.formGroup = this.formBuilder.group({
        expmedicoId: [null, [Validators.required]],
        nome: ["", Validators.required],
        crm: ["", Validators.required]

      })
  }

  ionViewDidLoad() {
      this.expecialidadeService.findAll1().subscribe (response => {
           this.expmedicos = response;
      })
  }

  inserirMedico(){
      this.medicoService.insert(this.formGroup.value).subscribe(response => {
        this.insertOK();
      },
      error => {} 
      )
  }

  insertOK(){
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
