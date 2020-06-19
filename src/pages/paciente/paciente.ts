import { AlergiaService } from './../../services/domain/alergia.service';
import { AlergiaDTO } from './../../modules/alergia.dto';
import { PacienteService } from './../../services/domain/paciente.service';
import { EstadoService } from './../../services/domain/estado.service';
import { EstadoDTO } from './../../modules/estado.dto';
import { CidadeService } from './../../services/domain/cidade.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CidadeDTO } from '../../modules/cidade.dto';
import { PacienteDTO } from '../../modules/paciente.dto';


@IonicPage()
@Component({
  selector: 'page-paciente',
  templateUrl: 'paciente.html',
})
export class PacientePage implements OnInit{

  formGroup: FormGroup;
  loading: any;
  item: PacienteDTO;
  listaEstado: EstadoDTO[] = [];
  listaCidade: CidadeDTO[] = [];
  listaAlergia: AlergiaDTO[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertControl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public pacienteService: PacienteService,
    public alergiaService: AlergiaService,){

      const paciente = this.navParams.get('item');
      if(paciente && paciente.id){
          this.item = paciente;
      } 
      
      this.listEstado();
      this.listCidade();
      this.listAlergia();
    }
  
    public date: string = new Date().toISOString();

  ngOnInit(): void {
     // Monta os dados necessários para o formulário
     this.formGroup = this.formBuilder.group({
      // o id é obrigatório somente em casos de edição
      id: [null, this.item && this.item.id ? Validators.required : null],
      datasistema: [null, Validators.required],
      nome: [null, Validators.required], 
      sobrenome:[null, Validators.required],
      datanascimento:[null, Validators.required],
      idade:[null, Validators.required],
      rg:[null, Validators.required],
      cpf:[null, Validators.required],
      sexo:[null, Validators.required],
      cor:[null, Validators.required],
      endereco:[null, Validators.required],
      complemento:[null, Validators.required],
      cep:[null, Validators.required],
      bairro:[null, Validators.required],
      estadocivil:[null, Validators.required],
      obs:[null,[]],
      telefone1:[null, Validators.required],
      telefone2:[null, []],
      telefone3:[null, []],
      nomedamae:[null, Validators.required],
      nomedopai:[null, Validators.required],
      estado:[null, Validators.required],
      cidade:[null, Validators.required],
      alergia:[null, Validators.required],
      residenciaId:[null, Validators.required],
    });

    if (this.item && this.item.id) {
      // seta os dados do registro de edição no formulário
      this.formGroup.patchValue({
        id: this.item.id,
        datasistema: this.item.datasistema,
        nome: this.item.nome,
        sobrenome: this.item.sobrenome,
        datanascimento: this.item.datanascimento,
        idade: this.item.idade,
        rg: this.item.rg,
        cpf: this.item.cpf,
        sexo: this.item.sexo,
        cor: this.item.cor,
        endereco: this.item.endereco,
        complemento: this.item.complemento,
        cep: this.item.cep,
        bairro: this.item.bairro,
        estadocivil: this.item.estadocivil,
        obs: this.item.obs,
        telefone1: this.item.telefone1,
        telefone2: this.item.telefone2,
        telefone3: this.item.telefone3,
        nomedamae: this.item.nomedamae,
        nomedopai: this.item.nomedopai,
        estado: this.item.estado,
        cidade: this.item.cidade,
        alergia: this.item.alergia,
        residenciaId: this.item.residenciaId,

      })
    }
  }

 listEstado(){
    this.estadoService.findAll().subscribe(response =>{
      this.listaEstado = response;
    })
  }

  listCidade(){
    this.cidadeService.findAll().subscribe(response =>{
      this.listaCidade = response;
    })
  }

  listAlergia(){
    this.alergiaService.findAll().subscribe(response =>{
      this.listaAlergia = response;
    })
  }

  savePaciente(){
    const paciente = this.formGroup.value as PacienteDTO;
    // TODO - verificar se os dados foram preenchidos
    if (paciente.id) { // se o estado já tem id ele já foi cadastrado na base, então faço um update
      this.updatePaciente(paciente);
    } else {
      this.insertPaciente(paciente);
    }
  }

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.listaEstado = response;
        this.formGroup.controls.estado.setValue(this.listaEstado[0].id);
        this.updateCidades();
      },
      error => {});
  }

  insertPaciente(paciente: PacienteDTO){
    this.showLoading();
    this.pacienteService.insert(paciente).subscribe(response => {
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

  private updatePaciente(paciente: PacienteDTO) {
    this.showLoading();
    this.pacienteService.update(paciente).subscribe(response => {
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

  updateCidades() {
    let estado_id = this.formGroup.value.estado;
    this.cidadeService.findCidade(estado_id)
      .subscribe(response => {
        this.listaCidade = response;
        this.formGroup.controls.cidade.setValue(null);
      },
      error => {});
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
