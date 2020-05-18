import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EstadoDTO } from '../../../modules/estado.dto';
import { EstadoService } from '../../../services/domain/estado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CidadeService } from '../../../services/domain/cidade.service';

/**
 * Generated class for the CadastroestadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastroestado',
  templateUrl: 'cadastroestado.html',
})
export class CadastroestadoPage {

  items: EstadoDTO[];
  formGroup : FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilider: FormBuilder,
              public alertControl: AlertController,
              public estadoservice: EstadoService,
              public cidadeservice: CidadeService)

              {

                this.formGroup = this.formBuilider.group({
                   id:["",Validators.required],
                   nome:["",Validators.required]
                })   
   
              
  }

  ionViewDidLoad() {
      this.estadoservice.findAll()
      .subscribe(response =>{
        this.items = response;
      },
      error => {
        console.log(error);
      });
  }
  estado(){
    this.navCtrl.setRoot('EstadoPage');
  }


  deletarEstado(id: string){
    let estado_id = this.formGroup.value.id;
    this.estadoservice.deletar(estado_id)
     .subscribe(response =>{
    this.items = response;
    this.formGroup.controls.id.setValue(null);
    this.deletarOk();
    },error => {
    console.log(error);
    });

  }

  deletarOk(){
    let alert = this.alertControl.create({
       title: "Deletando",
       message: "Cadastro deletado com sucesso!",
       buttons:[{
         text: "OK"
       }]
    })
    
    alert.present();
  }

}
 