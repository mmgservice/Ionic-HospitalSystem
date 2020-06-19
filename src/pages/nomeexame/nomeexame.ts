import { CategoriaExameDTO } from './../../modules/categoriaexame.dto';
import { NomeExameDTO } from './../../modules/nomeexame.dto';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CategoriaExameService } from '../../services/domain/categoriaexame.service';
import { NomeExameService } from '../../services/domain/nomeexame.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
export class NomeexamePage  implements OnInit{

  loading: any;
  formGroupName: FormGroup;
  item: NomeExameDTO;
  listaCategoria: CategoriaExameDTO[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public nomeexameservice: NomeExameService,
              public formbuilder: FormBuilder,
              public alertcontroler: AlertController,
              public loadingCtrl: LoadingController,
              public categoriaexameservice: CategoriaExameService) {

              const nomeExame = this.navParams.get('item');
              if(nomeExame && nomeExame.id){
                 this.item = nomeExame;
              } 

              this.listCategoria();
  }

  ngOnInit(): void {
    this.formGroupName = this.formbuilder.group({
      id: [null,this.item && this.item.id ? Validators.required: null],
      nomedoexame: [null ,Validators.required],
      valor: [null,Validators.required],
      categoriaExame: [null, Validators.required]
    });

    if(this.item && this.item.id){
      this.formGroupName.patchValue({
        id: this.item.id,
        nome: this.item.nomedoexame,
        valor: this.item.valor,
        categoriaExame: this.item.categoria
         
      })
    }
  }

  listCategoria(){
    this.categoriaexameservice.findAll().subscribe(response =>{
      this.listaCategoria = response;
    })
  }

  saveNomeExame(){
    const nomeExame = this.formGroupName.value as NomeExameDTO;
    if(nomeExame.id){
      this.updateNomeExame(nomeExame);
    }else{
      this.insertNomeExame(nomeExame);
    }
  }

  insertNomeExame(nome: NomeExameDTO){
    this.showLoading();
    this.nomeexameservice.insert(nome).subscribe(response => {
    this.closeLoading();
        let alert = this.alertcontroler.create({
          title: "Sucesso",
          message: "Cadastro efetuado com sucesso!",
          buttons: [{
            text: "OK"
          }]
        });
        alert.present();
        alert.onDidDismiss(() => {
          this.back();
        });
      },
      error => {
        this.closeLoading()
        // TODO - verificar erro e exibir msg de erro
      }

    )
  }

 /**
   * Atualizo os dados do cidade
   * @param nome
   */

  private updateNomeExame(nome: NomeExameDTO) {
    this.showLoading();
    this.nomeexameservice.update(nome).subscribe(response => {
        this.closeLoading();
        let alert = this.alertcontroler.create({
          title: "Sucesso",
          message: "Cadastro efetuado com sucesso!",
          buttons: [{
            text: "OK"
          }]
        });
        alert.present();
        alert.onDidDismiss(() => {
          this.back();
        });
      },
      error => {
        this.closeLoading();
        // TODO - verificar erro e exibir msg de erro
      }
    )
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    this.loading.present();
  }
  closeLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
  back() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.popToRoot();
    }
  }
}

