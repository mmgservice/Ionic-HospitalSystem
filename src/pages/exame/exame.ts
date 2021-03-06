import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ExameDTO } from '../../modules/exame.dto';
import { NomeExameDTO } from '../../modules/nomeexame.dto';
import { PacienteDTO } from '../../modules/paciente.dto';
import { MedicoDTO } from '../../modules/medico.dto';
import { NomeExameService } from '../../services/domain/nomeexame.service';
import { PacienteService } from '../../services/domain/paciente.service';
import { MedicoService } from '../../services/domain/medico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExameService } from '../../services/domain/exame.service';
import { DataService } from '../../services/data.service';
import { CategoriaExameDTO } from '../../modules/categoriaexame.dto';


@IonicPage()
@Component({
  selector: 'page-exame',
  templateUrl: 'exame.html',
})
export class ExamePage implements OnInit {

 formGroup: FormGroup;
 loading: any;
 item: ExameDTO;
 nomeExame: NomeExameDTO;
 paciente: PacienteDTO;
 medico: MedicoDTO;
 listaNomeExame: NomeExameDTO[]=[];
 listaPaciente: PacienteDTO[]=[];
 listaMedico: MedicoDTO[]=[];
 selectedNomeExame: any;
 selectedPaciente: any;
 selectedMedico: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertControl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilider: FormBuilder,
    public exameService: ExameService,
    public nomeExameService: NomeExameService,
    public pacienteService: PacienteService,
    public medicoService: MedicoService,
    public dataService: DataService) {
      
      const exame = this.navParams.get('item');
      if(exame && exame.id){
        this.item = exame;
      }

      const nomeExame = this.navParams.get('nomeExame');
      if(nomeExame && nomeExame.id){
        this.nomeExame = nomeExame;
      }

      const paciente = this.navParams.get('paciente');
      if(paciente && paciente.id){
        this.paciente = paciente;
      }

      const medico = this.navParams.get('medico');
      if(paciente && paciente.id){
        this.medico = medico;
      }
  }
 
  public myDate = new Date().toISOString();

  
    public  data = new Date();
    public dia  = this.data.getDate().toString();
    public mes  = (this.data.getMonth()+1).toString(); //+1 pois no getMonth() Janeiro começa com zero
    public anoF = this.data.getFullYear();

    public datafinal = this.dia + "/" + this.mes + "/" + this.anoF;


  ngOnInit(): void {
    // Monta os dados necessários para o formulário
    this.formGroup = this.formBuilider.group({
      // o id é obrigatório somente em casos de edição
      id: [null, this.item && this.item.id ? Validators.required : null],
      datasistema: [null, Validators.required],
      dataexame: [null, Validators.required],
      nomeexame: [null, Validators.required],
      statusExameId: [null, Validators.required], 
      paciente:[null, Validators.required], 
      medico:[null, Validators.required], 

     });

     if (this.item && this.item.id) {
      // seta os dados do registro de edição no formulário
      this.formGroup.patchValue({
        id: this.item.id,
        datasistema: this.item.datasistema,
        dataexame: this.item.dataexame,
        nomeexame: this.nomeExame,
        statusExameId: this.item.statusExameId,
        paciente: this.paciente,
        medico: this.medico
      })
    }

    this.listNomeExame();
    this.listPaciente();
    this.listMedico();
  }

  listNomeExame(){
    this.nomeExameService.findAll().subscribe(response =>{
      this.listaNomeExame = response;
    })
  }

  listPaciente(){
    this.pacienteService.findAll().subscribe(response =>{
        this.listaPaciente = response;
    })
  }

  listMedico(){
    this.medicoService.findAll().subscribe(response => {
      this.listaMedico = response;
    })
  }

  saveExame(){
    const exame = this.formGroup.value as ExameDTO;
    // TODO - verificar se os dados foram preenchidos
    if (exame.id) { 
      this.updateExame(exame);
    } else {
      this.insertExame(exame);
    }
  }

  insertExame(exame: ExameDTO){
    this.showLoading();
    this.exameService.insert(exame).subscribe(response => {
    this.closeLoading();
        let alert = this.alertControl.create({
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

  /**
   * Atualizo os dados do exame
   * @param exame
   */

  private updateExame(exame: ExameDTO) {
    this.showLoading();
    this.exameService.update(exame).subscribe(response => {
        this.closeLoading();
        let alert = this.alertControl.create({
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
        this.closeLoading();
        // TODO - verificar erro e exibir msg de erro
      }
    )
  }

  compareFun(nome1: NomeExameDTO, nome2: NomeExameDTO): boolean{
    return nome1 && nome2 ? nome1.id === nome2.id : nome1 == nome2; 
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
      this.navCtrl.setRoot('TelaInicialPage');
    }
  }

}
