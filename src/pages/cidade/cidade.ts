import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoDTO } from '../../modules/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
@IonicPage()
@Component({
  selector: 'page-cidade',
  templateUrl: 'cidade.html',
})
export class CidadePage {

  formGroup: FormGroup;
  estado: EstadoDTO[]
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cidadeservice: CidadeService,
              public estadoservice: EstadoService,
              public formbuilder: FormBuilder,
              public alertControler: AlertController) {
        
              this.formGroup = this.formbuilder.group({
                estadoId: [null,[Validators.required]],
                nome: ["",Validators.required]
              })
  }

  ionViewDidLoad() {
    this.estadoservice.findAll().subscribe (response => {
      this.estado = response;
 })
  }
  inserirCidade(){
    this.cidadeservice.insert(this.formGroup.value).subscribe(response =>{
      this.insertOk();
    },
    error =>{}
    )
  }
  insertOk(){
    let alert = this.alertControler.create({
       title: "Cadastrado",
       message: "Cadasrtro efetuado com sucesso!",
       buttons:[{
         text: "OK"
       }]
    })
    
    alert.present();
  }


}
