import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { ExameDTO } from '../../modules/exame.dto';
import { ExameService } from '../../services/domain/exame.service';
import { PacienteService } from '../../services/domain/paciente.service';
import { PacienteDTO } from '../../modules/paciente.dto';
import { NomeExameDTO } from '../../modules/nomeexame.dto';
import { MedicoDTO } from '../../modules/medico.dto';

/**
 * Generated class for the ExameListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exame-list',
  templateUrl: 'exame-list.html',
})
export class ExameListPage implements OnInit {

   // Componente utilizado para atualizar a lista da tela
  // Ao puxar para baixo, os itens serão listados novamente
  @ViewChild(Refresher) refresher: Refresher;

  loading: any;
  formGroup: FormGroup;
  items: ExameDTO[]=[];
  paci: PacienteDTO[]=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public exameService: ExameService,
    public alertControl: AlertController,
    public loadingCtrl: LoadingController,
    public pacienteService: PacienteService,
    ) {
  }

  ngOnInit(): void {
   
  }

  itemSelected(item: ExameDTO, nomeExame: NomeExameDTO, paciente: PacienteDTO, medico: MedicoDTO) {
    this.navCtrl.push('ExamePage', {item: item, nomeExame: nomeExame, paciente: paciente, medico: medico});

  }

   /**
   * Vai pra tela para cadastrar um novo estado
   */
  newItem() {
    this.navCtrl.push('ExamePage');
  }

  ionViewWillEnter() {
    this.list();
  }

  listpaciente(){
     this.pacienteService.findAll().subscribe(response => {
         this.paci = response;
     })
  }

 
  list() {
    this.items = [];
    this.showLoading();
    this.exameService.findAll()
      .subscribe(response => {
        this.closeLoading();
        this.items = response;
      }, error => {
        this.loading = false;
        // TODO - verificar erro e exibir msg de erro
      })
  }

  deletar(id){
    this.exameService.deletar(id).subscribe(response => {
      this.items = response;
      this.list();
      let alert = this.alertControl.create({
        title: "Sucesso",
        message: "Exame removido com sucesso!",
        buttons: [{
          text: "OK"
        }]
      });
      alert.present();
    })
  }

  

   /**
   * Abre o loading
   */
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    this.loading.present();
  }

  /**
   * Fecha o loading
   */
  closeLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
    if (this.refresher) { // Avisa ao refresher que os itens foram listados
      this.refresher.complete();
    }
  }

  statusExame(id: number){
    let exame = "";   

    if(id == 1){
      exame = "Marcado";
    }else {
      exame = "Não Marcado";
    }      
    return exame;
}
}
