import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';

declare var $:any;

@Component({
  selector: 'app-phong',
  templateUrl: './phong.component.html',
  styleUrls: ['./phong.component.css'],
  providers:[MessageService]
})
export class PhongComponent extends BaseComponent implements OnInit{
  public page = 1;
  public isLoading: boolean;
  public totalRecords: any;
  public pageSize: any;
  public namemodel: any;
  public alo2: any;
  public frma: FormGroup;
  public error = '';
  public lp:any;
  
  constructor( private frm: FormBuilder,injector: Injector,public mess:MessageService) {
    super(injector);
  }
  showSuccess(message: any) {
    this.mess.add({severity:'success', summary: 'Thành công', detail: message});
    
  }
  showError(message: any) {
    this.mess.add({severity:'error', summary: 'Từ chối', detail: message});
  }
  ngOnInit(): void {
    this.frma = new FormGroup({
      id: new FormControl(),
      txt_so: new FormControl('',[Validators.required]),
      txt_idlp: new FormControl("alo"),
      txt_gia: new FormControl(),
      txt_mota: new FormControl(),
    });
    this.search();
  }
  loadPage(page: any) {
    this.api.get('/api/Phongs/getalllp').subscribe(res => {
      this.lp=res;
    });
    this.api.post('/api/Phongs/search', { index: (page.page + 1), size: this.pageSize }).subscribe(res => {
      this.alo2 = res.result;
      this.totalRecords = res.total;
      this.pageSize = this.pageSize;
    });
  }
  search() {
    this.page = 1;
    this.pageSize = 7;
    this.api.get('/api/Phongs/getalllp').subscribe(res => {
      this.lp=res;
    });
    this.api.post('/api/Phongs/search', { index: 1, size: 7 }).subscribe(res => {
      this.alo2 = res.result;
      this.totalRecords = res.total;
      this.pageSize = this.pageSize;
    });
  }
  aloadd() {
    this.namemodel = "Thêm mới";
    this.frma = new FormGroup({
      id: new FormControl(),
      txt_so: new FormControl('',[Validators.required]),
      txt_idlp: new FormControl(''),
      txt_gia: new FormControl('0')
    });
  }
  get so() {
    return this.frma.get('txt_so')!;
  }
  aloget(id1: any) {
    this.namemodel = "Sửa"
    // this.showSuccess(id1);
    this.api.post('/api/Phongs/getid', { id: id1 }).subscribe(res => {
      this.frma = new FormGroup({
        id:new FormControl(res.id),
        txt_so: new FormControl(res.sophong),
        txt_idlp: new FormControl(res.idlp),
        txt_gia: new FormControl(res.gia)
      });
      $('#lp').val(res.idLp).change();
      // alert(res.idLp);
    });
  }
  closeModal(id:any) {
    $(`#${id}`).closest('.modal').modal('hide');
  }
  save(vl:any){
    if (this.namemodel=="Thêm mới"){
      vl.txt_idlp=$('#lp').val();
      this.aloaddd(vl.txt_so,vl.txt_idlp,vl.txt_gia);
      this.showSuccess("Thêm thành công!");
    }
    else{
      vl.txt_idlp=$("#lp").val();
      this.aloup(vl.id,vl.txt_so,vl.txt_idlp,vl.txt_gia);
      this.showSuccess("Sửa thành công!");
    }
    this.closeModal("modal_default");
    this.search();
  }
  aloaddd(sophong: any,idlp: any,gia: any) {
    this.api.post('/api/Phongs/add', { sophong:sophong, idlp: idlp,gia: gia }).subscribe(res => {
    });
  };
  aloup(id:any,sophong: any,idlp: any,gia: any) {
    this.api.post('/api/Phongs/update', {id:id, sophong:sophong,idlp: idlp,gia: gia }).subscribe(res => {
    });
  };
delte(id1: any) {
  // this.namemodel="Sửa"
  this.api.post('/api/Phongs/delete', { id: id1 }).subscribe(res => {
    this.showSuccess("Đã chặn");
    this.ngOnInit();
  });
}
redelte(id1: any) {
  this.api.post('/api/Phongs/redelete', { id: id1 }).subscribe(res => {
    this.showSuccess("Đã bỏ chặn");
    this.ngOnInit();  
  });
}
ngAfterViewInit() {
  this.loadScripts('assets/js/core/libraries/jquery_ui/interactions.min.js','assets/js/plugins/forms/selects/select2.min.js','assets/js/core/app.js');
}
}