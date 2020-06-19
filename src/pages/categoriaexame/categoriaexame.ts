import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaExameService } from '../../services/domain/categoriaexame.service';
import { CategoriaExameDTO } from '../../modules/categoriaexame.dto';


@IonicPage()
@Component({
  selector: 'page-categoriaexame',
  templateUrl: 'categoriaexame.html',
})
export class CategoriaexamePage implements OnInit {

  loading: any;
  formGroup: FormGroup;
  item: CategoriaExameDTO;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilider: FormBuilder,
    public alertControl: AlertController,
    public loadingCtrl: LoadingController,
    public categoriaExameService: CategoriaExameService) {

      const categoria = this.navParams.get('item');
      if(categoria && categoria.id){
        this.item = categoria;
      }
  }
  
  ngOnInit(): void {
    // Monta os dados necessários para o formulário
    this.formGroup = this.formBuilider.group({
      // o id é obrigatório somente em casos de edição
      id: [null, this.item && this.item.id ? Validators.required : null],
      nome: [null, Validators.required]
    });

    if (this.item && this.item.id) {
      // seta os dados do registro de edição no formulário
      this.formGroup.patchValue({
        id: this.item.id,
        nome: this.item.nome,
      })
    }

  }

  saveCategoriaExame(){
    const categoria = this.formGroup.value as CategoriaExameDTO;
    // TODO - verificar se os dados foram preenchidos
    if (categoria.id) { // se o estado já tem id ele já foi cadastrado na base, então faço um update
      this.updatecategoriaExame(categoria);
    } else {
      this.inserirCategoriaExame(categoria);
    }
  }

  inserirCategoriaExame(categoria: CategoriaExameDTO) {
    this.showLoading();
    this.categoriaExameService.insert(categoria).subscribe(response => {
        this.closeLoading();
        let alert = this.alertControl.create({
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

  private updatecategoriaExame(categoria: CategoriaExameDTO) {
    this.showLoading();
    this.categoriaExameService.update(categoria).subscribe(response => {
        this.closeLoading();
        let alert = this.alertControl.create({
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
