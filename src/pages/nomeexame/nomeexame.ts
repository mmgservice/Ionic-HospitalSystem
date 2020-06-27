import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NomeExameDTO } from '../../modules/nomeexame.dto';
import { CategoriaExameDTO } from '../../modules/categoriaexame.dto';
import { CategoriaExameService } from '../../services/domain/categoriaexame.service';
import { NomeExameService } from '../../services/domain/nomeexame.service';


@IonicPage()
@Component({
  selector: 'page-nomeexame',
  templateUrl: 'nomeexame.html',
})
export class NomeexamePage implements OnInit {

  loading: any;
  formGroup: FormGroup;
  item: NomeExameDTO;
  listaCategoria: CategoriaExameDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public nomeService: NomeExameService,
    public categoriaService: CategoriaExameService,
    public alertControler: AlertController){

      const nome = this.navParams.get('item');
      if(nome && nome.id){
        this.item = nome;
      }

      this.listCategoria();
  }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      id: [null,this.item && this.item.id ? Validators.required: null],
      nomedoexame: [null ,Validators.required],
      valor: [null,Validators.required],
      categoriaExame: [null,Validators.required]
    });

    if(this.item && this.item.id){
      this.formGroup.patchValue({
        id: this.item.id,
        nomedoexame: this.item.nomedoexame,
        valor: this.item.valor,
        categoriaExame: this.item.categoriaExame
      })
    }
  }

  listCategoria(){
    this.categoriaService.findAll().subscribe(response => {
      this.listaCategoria = response;
    })
  }
  
  saveNome(){
    const nome = this.formGroup.value as NomeExameDTO;
    if(nome.id){
      this.updateNome(nome);
    }else{
      this.insertNome(nome);
    }
  }

  insertNome(nome: NomeExameDTO){
    this.showLoading();
    this.nomeService.insert(nome).subscribe(response => {
    this.closeLoading();
        let alert = this.alertControler.create({
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

   /**
   * Atualizo os dados do nome
   * @param nome
   */

  private updateNome(nome: NomeExameDTO) {
    this.showLoading();
    this.nomeService.update(nome).subscribe(response => {
        this.closeLoading();
        let alert = this.alertControler.create({
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


}
