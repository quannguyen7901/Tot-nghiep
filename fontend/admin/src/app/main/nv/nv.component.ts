import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';

declare var $: any;
@Component({
  selector: 'app-nv',
  templateUrl: './nv.component.html',
  styleUrls: ['./nv.component.css'],
  providers:[MessageService]
})
export class NvComponent extends BaseComponent implements OnInit {
  // public alo2: any;
  public page = 1;
  public isLoading: boolean;
  public totalRecords: any;
  public pageSize: any;
  public namemodel: any;
  public alo: any;
  public frma: FormGroup;
  public loading=true;
  public error = '';
  constructor(private frm: FormBuilder,public mess:MessageService,i:Injector) {super(i) }
  ngOnInit(): void {
    this.frma = new FormGroup({
      id: new FormControl(),
      txt_ten: new FormControl('', [Validators.required]),
      txt_email: new FormControl(),
      txt_chucvu: new FormControl(),
      txt_sdt: new FormControl('', [Validators.required]),
      txt_cccd: new FormControl(),
      txt_quequan: new FormControl(),
    });
    this.search();
  }
  showSuccess(message: any) {
    this.mess.add({severity:'success', summary: 'Thành công', detail: message});
    
  }
  showError(message: any) {
    this.mess.add({severity:'error', summary: 'Từ chối', detail: message});
  }
  loadPage(page: any) {
    // this.isLoading = true;
    // setTimeout(() => {
    this.api.post('/api/Nhanvien/search', { index: (page.page + 1), size: this.pageSize }).subscribe(res => {
      this.alo = res.result;
      // console.log(this.alo);
      this.totalRecords = res.total;
      this.pageSize = this.pageSize;
      this.loading=false;
    });
    //   this.isLoading = false;
    // }, 750);
  }

  reload(){
    this.loading = true;
    this.alo=null;
    setTimeout(()=>this.search(),1000);
  }

  search() {
    this.page = 1;
    this.pageSize = 7;
    this.api.post('/api/Nhanvien/search', { index: 1, size: 7 }).subscribe(res => {
      this.alo = res.result;
      this.totalRecords = res.total;
      this.pageSize = this.pageSize;
      this.loading=false;
      // this.isLoading = false;
      // console.log(this.alo);
    });
  }
  aloadd() {
    this.namemodel = "Thêm mới";
    this.frma = new FormGroup({
      id: new FormControl(),
      txt_ten: new FormControl('', [Validators.required]),
      txt_email: new FormControl(),
      txt_chucvu: new FormControl(),
      txt_sdt: new FormControl('', [Validators.required]),
      txt_cccd: new FormControl(),
      txt_quequan:new FormControl(),
    });
  }
  get ten() {
    return this.frma.get('txt_ten')!;
  }
  get sdt() {
    return this.frma.get('txt_sdt')!;
  }
  aloget(id1: any) {
    this.namemodel = "Sửa"
    this.api.post('/api/Nhanvien/getid', { id: id1 }).subscribe(res => { 
     this.frma = new FormGroup({
        id: new FormControl(res.id),
        txt_ten: new FormControl(res.tennv, [Validators.required]),
        txt_email: new FormControl(res.email),
        txt_chucvu: new FormControl(res.chucvu),
        txt_sdt: new FormControl('0' + res.sdt, [Validators.required]),
        txt_cccd: new FormControl(res.scccd),
        txt_quequan: new FormControl(res.quequan)
      });
    });
  }
  closeModal(id: any) {
    $(`#${id}`).closest('.modal').modal('hide');
  }
  save(vl: any) {
    if (this.namemodel == "Thêm mới") {
      this.aloaddd(vl.txt_ten, vl.txt_email, vl.txt_chucvu, vl.txt_sdt, vl.txt_cccd,vl.txt_quequan);
      this.showSuccess("Thêm thành công!");
    }
    else {
      this.aloup(vl.id, vl.txt_ten, vl.txt_email, vl.txt_chucvu, vl.txt_sdt, vl.txt_cccd,vl.txt_quequan);
      this.showSuccess("Sửa thành công!");
    }
    this.closeModal("modal_default");
    this.reload();
  }
  aloaddd(ten: any, email: any, chucvu: any, sdt: any, cccd: any, quequan:any) {
    this.api.post('/api/Nhanvien/add', { hoten: ten, email: email, sdt: sdt, scccd: cccd, chucvu: chucvu, quequan:quequan }).subscribe(res => {
    });
  };
  aloup(id: any, ten: any, email: any, chucvu: any, sdt: any, cccd: any, quequan:any) {
    this.api.post('/api/Nhanvien/update', { id: id, tennv: ten, email: email, sdt: sdt, scccd: cccd, chucvu: chucvu,quequan:quequan}).subscribe(res => {
    });
  };
  delte(id1: any) {
    this.api.post('/api/Nhanvien/delete', { id: id1 }).subscribe(res => {
      this.showSuccess("Đã chặn");
      this.ngOnInit();
    });
  }
  redelte(id1: any) {
    this.api.post('/api/Nhanvien/redelete', { id: id1 }).subscribe(res => {
      this.showSuccess("Đã bỏ chặn !");
      this.ngOnInit();
    });
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/core/libraries/jquery_ui/interactions.min.js','assets/js/plugins/forms/selects/select2.min.js','assets/js/core/app.js');
  }

}