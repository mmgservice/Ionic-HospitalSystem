import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoDTO } from '../../modules/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeDTO } from '../../modules/cidade.dto';
@IonicPage()
@Component({
  selector: 'page-cidade',
  templateUrl: 'cidade.html',
})
export class CidadePage implements OnInit{

  formGroup: FormGroup;
  listaEstado: EstadoDTO[];
  loading: any;
  item: CidadeDTO



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cidadeservice: CidadeService,
              public estadoservice: EstadoService,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              public alertControler: AlertController
  ) {
     const cidade = this.navParams.get('item');
     if(cidade && cidade.id ){
      this.item = cidade;
     }
     this.listEstado();
  }

  ngOnInit(): void{
   // this.selectCidade();
    this.formGroup = this.formBuilder.group({
      id: [null,this.item && this.item.id ? Validators.required: null],
      nome: [null ,Validators.required],
      estado: [null,Validators.required]
    });

    if(this.item && this.item.id){
      this.formGroup.patchValue({
        id: this.item.id,
        nome: this.item.nome,
        estado: this.item.estado
      })
    }
  }

  listEstado(){
    this.estadoservice.findAll().subscribe(response =>{
      this.listaEstado = response;
    })
  }
  saveCidade(){
    const cidade = this.formGroup.value as CidadeDTO;
    if(cidade.id){
      this.updateCidade(cidade);
    }else{
      this.insertCidade(cidade);
    }
  }
  insertCidade(cidade: CidadeDTO){
    this.showLoading();
    this.cidadeservice.insert(cidade).subscribe(response => {
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
   * Atualizo os dados do cidade
   * @param cidade
   */

  private updateCidade(cidade: CidadeDTO) {
    this.showLoading();
    this.cidadeservice.update(cidade).subscribe(response => {
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
