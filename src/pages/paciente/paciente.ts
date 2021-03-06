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
  estado: EstadoDTO;
  cidade: CidadeDTO;
  alergia: AlergiaDTO;
  listaEstado: EstadoDTO[];
  listaCidade: CidadeDTO[];
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

      const estado = this.navParams.get('estado');
      if(estado && estado.id){
        this.estado = estado;
      }

      const cidade = this.navParams.get('cidade');
      if(cidade && cidade.id){
        this.cidade = cidade;
      }

      const alergia = this.navParams.get('alergia');
      if(alergia && alergia.id){
        this.alergia = alergia;
      }
     
      this.listAlergia();
      this.listEstado();
      this.listCidade();
  
    }
  
    public date: string = new Date().toISOString();

    public  data = new Date();
    public dia  = this.data.getDate().toString();
    public mes  = (this.data.getMonth()+1).toString(); //+1 pois no getMonth() Janeiro começa com zero
    public anoF = this.data.getFullYear();

    public datafinal = this.dia + "/" + this.mes + "/" + this.anoF;


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
      tipoSanguineoId:[null,Validators.required],
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
        estado: this.estado,
        cidade: this.cidade,
        alergia: this.alergia,
        tipoSanguineoId: this.item.tipoSanguineoId,
        residenciaId: this.item.residenciaId,

      })
    }
  }

 listEstado(){
    this.estadoService.findAll().subscribe(response =>{
      this.listaEstado = response;
      this.updateCidades();
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

  insertPaciente(paciente: PacienteDTO){
    this.showLoading();
    this.pacienteService.insert(paciente).subscribe(response => {
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

  private updatePaciente(paciente: PacienteDTO) {
    this.showLoading();
    this.pacienteService.update(paciente).subscribe(response => {
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

  updateCidades() {
    let estado_id = this.formGroup.value.estado;
    console.log(estado_id);
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
      this.navCtrl.setRoot('TelaInicialPage');
    }
  }

}
