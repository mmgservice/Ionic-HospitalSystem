import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';


@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder: FormBuilder,
     public alertControl: AlertController,
     public usuarioService: UsuarioService
     
     ) {

      this.formGroup = this.formBuilder.group({
        usuario:["", Validators.required],
        senha: ["", Validators.required],
        perfil: ["", Validators.required]
    

      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuarioPage');
  }
   
  inserirUsuario(){
    this.usuarioService.insert(this.formGroup.value).subscribe(response => {
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
