import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CategoriaExameService } from '../../services/domain/categoriaexame.service';
import { NomeExameService } from '../../services/domain/nomeexame.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaExameDTO } from '../../modules/categoriaexame.dto';

/**
 * Generated class for the NomeexamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nomeexame',
  templateUrl: 'nomeexame.html',
})
export class NomeexamePage {

  formGroup: FormGroup;
  categoria: CategoriaExameDTO[]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public nomeexameservice: NomeExameService,
              public formbuilder: FormBuilder,
              public alertcontroler: AlertController,
              public categoriaexameservice: CategoriaExameService) {

                this.formGroup = this. formbuilder.group({
                  nome:["",Validators.required],
                  valor:["",Validators.required],
                  categoriaExameId:[null,Validators.required]
                })
  }

  ionViewDidLoad() {
    this.categoriaexameservice.findAll().subscribe (response =>{
      this.categoria = response;
    })
  }

  inserirCategoria(){
    this.categoriaexameservice.insert(this.formGroup.value).subscribe(response =>{
      this.insertOk();
    },
    error =>{}
    )
  }
  insertOk(){
    let alert = this.alertcontroler.create({
       title: "Cadastrado",
       message: "Cadasrtro efetuado com sucesso!",
       buttons:[{
         text: "OK"
       }]
    })
    
    alert.present();
  }

}

