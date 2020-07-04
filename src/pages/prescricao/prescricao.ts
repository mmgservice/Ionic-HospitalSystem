import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicoDTO } from '../../modules/medico.dto';
import { EnfermagemDTO } from '../../modules/enfermagem.dto';
import { PrescricaoDTO } from '../../modules/prescricao.dto';
import { MedicoService } from '../../services/domain/medico.service';
import { EnfermagemService } from '../../services/domain/enfermagem.service';
import { PrescricaoService } from '../../services/domain/prescricao.service';


@IonicPage()
@Component({
  selector: 'page-prescricao',
  templateUrl: 'prescricao.html',
})
export class PrescricaoPage implements OnInit {

  formGroup: FormGroup;
  listaMedico: MedicoDTO[];
  listaEnfermagem: EnfermagemDTO[];
  loading: any;
  item: PrescricaoDTO

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public medicoService: MedicoService,
              public enfermagemService:EnfermagemService,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              public alertCotroler: AlertController,
              public prescricaoService: PrescricaoService
  ) {
    const prescricao = this.navParams.get('item');
    if(prescricao && prescricao.id){
      this.item = prescricao;
    }
    this.listEnfermagem();
    this.listMedico();
  }

  listMedico(){
    this.medicoService.findAll().subscribe(response =>{
      this.listaMedico = response;
    })
  }
  listEnfermagem(){
    this.enfermagemService.findAll().subscribe(response =>{
      this.listaEnfermagem = response;
    })
  }

  ngOnInit():void{
    this.formGroup = this.formBuilder.group({
      id: [null,this.item && this.item.id ? Validators.required: null],
      datasistema: [null ,Validators.required],
      via: [null,Validators.required],
      freq: [null,Validators.required],
      horario1: [null,Validators.required],
      horario2: [null,Validators.required],
      horario3: [null,Validators.required],
      horario4:[null],
      horario5:[null],
      horario6:[null],
      medico: [null,Validators.required],
      enfermagem:[null,Validators.required]
    });
    if(this.item && this.item.id){
      this.formGroup.patchValue({
        id: this.item.id,
        datasistema: this.item.datasistema,
        via: this.item.via,
        freq: this.item.freq,
        horario1: this.item.horario1,
        horario2: this.item.horario2,
        horario3: this.item.horario3,
        horario4: this.item.horario4,
        horario5: this.item.horario5,
        horario6: this.item.horario6,
        medico: this.item.medico,
        enfermagem: this.item.enfermagem
      })
    }
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
      this.navCtrl.setRoot('TelaInicialPage');
    }
  }

  savePrescricao(){
    const prescricao = this.formGroup.value as PrescricaoDTO;
    if(prescricao.id){
      this.updatePrescricao(prescricao);
    }else{
      this.insertPrescricao(prescricao);
    }
  }

  private insertPrescricao(prescricao: PrescricaoDTO) {
    this.showLoading();
    this.prescricaoService.insert(prescricao).subscribe(response => {
     this.closeLoading();
         let alert = this.alertCotroler.create({
           title: "Sucesso",
           message: "Cadastro realizado com sucesso!",
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




  private updatePrescricao(prescricao: PrescricaoDTO) {
   this.showLoading();
   this.prescricaoService.update(prescricao).subscribe(response => {
    this.closeLoading();
        let alert = this.alertCotroler.create({
          title: "Sucesso",
          message: "Cadastro realizado com sucesso!",
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
    

}
