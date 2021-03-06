import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Refresher } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PacienteDTO } from '../../modules/paciente.dto';
import { PacienteService } from '../../services/domain/paciente.service';
import { CidadeDTO } from '../../modules/cidade.dto';
import { EstadoDTO } from '../../modules/estado.dto';
import { AlergiaDTO } from '../../modules/alergia.dto';


@IonicPage()
@Component({
  selector: 'page-paciente-list',
  templateUrl: 'paciente-list.html',
})
export class PacienteListPage implements OnInit {
  
  @ViewChild(Refresher) refresher: Refresher;

  loading: any;
  formGroup: FormGroup;
  items: PacienteDTO [] = [];
  cidade: CidadeDTO[] = [];
  estado: EstadoDTO[] = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtl: LoadingController,
    public alertControler: AlertController,
    public pacienteService: PacienteService) {
  }

 ionViewWillEnter(){
    this.list();
  }

  list(){
    this.items = [];
    this.showLoading();
    this.pacienteService.findAll().subscribe(response => {
      this.closeLoading();
      this.items = response;
    },error => {
      // TODO - EXIBIR MSG DE ERRO NA TELA
      this.closeLoading();
    });
  }

  ngOnInit(): void {
    
  }

  showLoading(){
    this.loading = this.loadingCtl.create({
      content: "Aguarde..."
    });
    this.loading.present();
  }
  closeLoading(){
    if(this.loading){
      this.loading.dismiss();
    }
    if(this.refresher){
      this.refresher.complete();
    }
  }

  itemSelected(item: PacienteDTO,estado: EstadoDTO, cidade: CidadeDTO,alergia: AlergiaDTO){
    this.navCtrl.push('PacientePage', {item: item, estado:estado, cidade: cidade, alergia: alergia});
  }

  newItem(){
    this.navCtrl.push('PacientePage');
  }

  verficiaResidencia(id: number){
    let residencia = "";
    
    if(id == 1){
        residencia = "Casa";  
    }else if(id == 2){
       residencia = "Apartamento";
    }else{
      residencia = "Alugado";
    }

    return residencia;
  
  }

  verificaTipoSanguineo(id: number){
    let tipo = "";

    if(id == 1){
      tipo = "A+";
    } 

    if(id == 2){
      tipo = "A-";
    }

    if(id == 3){
      tipo = "B+";
    }

    if(id == 4){
      tipo = "B-";
    }

    if(id == 5){
      tipo = "AB+";
    }

    if(id == 6){
      tipo = "AB-";
    }
    if(id == 7){
      tipo = "O+";
    }
     
    if(id == 8){
      tipo = "O-";
    }

    return tipo;
  
    }

  
}
