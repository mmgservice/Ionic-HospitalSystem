import { ExpedicalidadeMedicaDTO } from './../../modules/expmedica.dto';
import { MedicoService } from './../../services/domain/medico.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { MedicoDTO } from '../../modules/medico.dto';
import { ExpecialideMedicoService } from '../../services/domain/expmedico.service';

/**
 * Generated class for the MedicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medico',
  templateUrl: 'medico.html',
})
export class MedicoPage implements OnInit{


  loading: any;
  item: MedicoDTO;
  listaExpMedico: ExpedicalidadeMedicaDTO[] = [];
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertControl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilider: FormBuilder,
    public medicoService: MedicoService,
    public expMedicoService: ExpecialideMedicoService) {

      const medico = this.navParams.get('item');
      if(medico && medico.id){
        this.item = medico;
      }

      this.listExpMedico();
  }
  
  ngOnInit(): void {
     // Monta os dados necessários para o formulário
     this.formGroup = this.formBuilider.group({
      // o id é obrigatório somente em casos de edição
      id: [null, this.item && this.item.id ? Validators.required : null],
      nome: [null, Validators.required],
      crm: [null, Validators.required], 
      expecialidade:[null, Validators.required], 

    });
    if (this.item && this.item.id) {
      // seta os dados do registro de edição no formulário
      this.formGroup.patchValue({
        id: this.item.id,
        nome: this.item.nome,
        crm: this.item.crm,
        expecialidade: this.item.expecialidade
      })
    }
  }


  listExpMedico(){
    this.expMedicoService.findAll().subscribe(response =>{
      this.listaExpMedico = response;
    })
  }

  saveMedico(){
    const medico = this.formGroup.value as MedicoDTO;
    // TODO - verificar se os dados foram preenchidos
    if (medico.id) { // se o estado já tem id ele já foi cadastrado na base, então faço um update
      this.updateMedico(medico);
    } else {
      this.insertMedico(medico);
    }
  }

  insertMedico(medico: MedicoDTO){
    this.showLoading();
    this.medicoService.insert(medico).subscribe(response => {
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


  /**
   * Atualizo os dados do medico
   * @param medico
   */

  private updateMedico(medico: MedicoDTO) {
    this.showLoading();
    this.medicoService.update(medico).subscribe(response => {
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

 /**
   * Volta para a tela que chamou
   */
  back() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.popToRoot();
    }
  }

 

}
