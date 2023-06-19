import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';

declare var $: any;
@Component({
  selector: 'app-kh',
  templateUrl: './kh.component.html',
  styleUrls: ['./kh.component.css'],
  providers: [MessageService]
})
export class KhComponent extends BaseComponent implements OnInit {
  // public alo2: any;
  public page = 1;
  public loading = true;
  public isLoading: boolean;
  public totalRecords: any;
  public pageSize: any;
  public namemodel: any;
  public alo: any;
  public frma: FormGroup;
  public error = '';
  constructor(private frm: FormBuilder, public mess: MessageService, i: Injector) {
    super(i)
  }
  ngOnInit(): void {
    this.frma = new FormGroup({
      id: new FormControl(),
      txt_ten: new FormControl('', [Validators.required]),
      txt_email: new FormControl(),
      txt_diachi: new FormControl(),
      txt_sdt: new FormControl('', [Validators.required]),
      txt_cccd: new FormControl()
    });
    this.loading = true;
    this.search();
  }

  reload(){
    this.loading = true;
    this.alo=null;
    setTimeout(()=>this.search(),1000);
  }

  showSuccess(message: any) {
    this.mess.add({ severity: 'success', summary: 'Thành công', detail: message });

  }
  showError(message: any) {
    this.mess.add({ severity: 'error', summary: 'Từ chối', detail: message });
  }
  loadPage(page: any) {
    // this.isLoading = true;
    // setTimeout(() => {
    this.api.post('/api/Khachhangs/search', { index: (page.page + 1), size: this.pageSize }).subscribe(res => {
      this.alo = res.result;
      // console.log(this.alo);
      this.totalRecords = res.total;
      this.pageSize = this.pageSize;
      this.loading=false;
    });
    //   this.isLoading = false;
    // }, 750);
  }
  search() {
    this.page = 1;
    this.pageSize = 7;
    this.api.post('/api/Khachhangs/search', { index: 1, size: 7 }).subscribe(res => {
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
      txt_diachi: new FormControl(),
      txt_sdt: new FormControl('', [Validators.required]),
      txt_cccd: new FormControl()
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
    this.api.post('/api/Khachhangs/getid', { id: id1 }).subscribe(res => {
      const d = new Date(res.ngaysinh);
      res.ngaysinh = d.getFullYear() + "-" + (d.getMonth() > 8 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? d.getDate() : "0" + d.getDate());
      this.frma = new FormGroup({
        id: new FormControl(res.id),
        txt_ten: new FormControl(res.hoten, [Validators.required]),
        txt_email: new FormControl(res.email),
        txt_diachi: new FormControl(res.quequan),
        txt_sdt: new FormControl('0' + res.sdt, [Validators.required]),
        txt_cccd: new FormControl(res.scccd)
      });
    });
  }
  closeModal(id: any) {
    $(`#${id}`).closest('.modal').modal('hide');
  }
  save(vl: any) {
    if (this.namemodel == "Thêm mới") {
      this.aloaddd(vl.txt_ten, vl.txt_email, vl.txt_diachi, vl.txt_sdt, vl.txt_cccd);
      this.error = "Thêm thành công!";
    }
    else {
      this.aloup(vl.id, vl.txt_ten, vl.txt_email, vl.txt_diachi, vl.txt_sdt, vl.txt_cccd);
      this.error = "Sửa thành công!";
    }
    this.closeModal("modal_default");
    this.showSuccess(this.error);
  }
  aloaddd(ten: any, email: any, diachi: any, sdt: any, cccd: any) {
    this.api.post('/api/Khachhangs/add', { hoten: ten, email: email, sdt: sdt, scccd: cccd, quequan: diachi }).subscribe(res => {
      this.search();
    });
  };
  aloup(id: any, ten: any, email: any, diachi: any, sdt: any, cccd: any) {
    this.api.post('/api/Khachhangs/update', { id: id, hoten: ten, email: email, sdt: sdt, scccd: cccd, quequan: diachi }).subscribe(res => {
      this.search();
    });
  };
  delte(id1: any) {
    // this.namemodel="Sửa"
    this.api.post('/api/Khachhangs/delete', { id: id1 }).subscribe(res => {
      this.ngOnInit();
      this.showSuccess("Đã chặn");
    });
  }
  redelte(id1: any) {
    this.api.post('/api/Khachhangs/redelete', { id: id1 }).subscribe(res => {
      this.ngOnInit();
      this.showSuccess("Đã bỏ chặn");
    });
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/core/libraries/jquery_ui/interactions.min.js', 'assets/js/plugins/forms/selects/select2.min.js', 'assets/js/core/app.js');
  }

}