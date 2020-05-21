import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaExameService } from '../../services/domain/categoriaexame.service';
import { CategoriaExameDTO } from '../../modules/categoriaexame.dto';


@IonicPage()
@Component({
  selector: 'page-categoriaexame',
  templateUrl: 'categoriaexame.html',
})
export class CategoriaexamePage {

  formGroup: FormGroup;
  categorias: CategoriaExameDTO[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilider: FormBuilder,
    public alertControl: AlertController,
    public categoriaExameService: CategoriaExameService) {

      this.formGroup = this.formBuilider.group({
        nome:["",Validators.required],
      })
  }


  ionViewDidLoad() {
    this.categoriaExameService.findAll();
  }

  inserirCategoriaExame(){
    this.categoriaExameService.insert(this.formGroup.value).subscribe(response =>{
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
