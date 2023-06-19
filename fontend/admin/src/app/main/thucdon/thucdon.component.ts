import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';


declare var $: any;

@Component({
  selector: 'app-thucdon',
  templateUrl: './thucdon.component.html',
  styleUrls: ['./thucdon.component.css'],
  providers: [MessageService]
})
export class ThucdonComponent extends BaseComponent implements OnInit {
  public page = 1;
  public loading = true;
  public isLoading: boolean;
  public totalRecords: any;
  public size: any;
  public namemodel: any;
  public alo2: any;
  public frma: FormGroup;
  public anh: any;
  public error = '';
  public link = '../../../assets/img/monan';
  // public lp:any;

  constructor(private frm: FormBuilder, injector: Injector, public mess: MessageService) {
    super(injector);
  }
  showSuccess(message: any) {
    this.mess.add({ severity: 'success', summary: 'Thành công', detail: message });

  }
  reload() {
    this.loading = true;
    this.alo2 = null;
    setTimeout(() => this.search(), 1000);
  }
  showError(message: any) {
    this.mess.add({ severity: 'error', summary: 'Từ chối', detail: message });
  }
  ngOnInit(): void {
    this.frma = new FormGroup({
      id: new FormControl(),
      txt_ten: new FormControl('', [Validators.required]),
      txt_mota: new FormControl(),
      txt_gia: new FormControl()
    });
    this.search();
  }
  loadPage(page: any) {
    // this.isLoading = true;
    // setTimeout(() => {
    this.api.post('/api/Monans/search', { index: (page.page + 1), size: this.size }).subscribe(res => {
      this.alo2 = res.result;
      // console.log(this.alo2);
      this.totalRecords = res.total;
      this.size = this.size;
      this.loading = false;

    });
    //   this.isLoading = false;
    // }, 750);
  }
  search() {
    this.page = 1;
    this.size = 7;
    this.api.post('/api/Monans/search', { index: 1, size: 7 }).subscribe(res => {
      this.alo2 = res.result;
      this.totalRecords = res.total;
      this.size = this.size;
      // this.isLoading = false;
      // console.log(this.alo2);
      this.loading = false;
    });
  }
  aloadd() {
    this.namemodel = "Thêm mới";
    this.frma = new FormGroup({
      id: new FormControl(),
      txt_ten: new FormControl(' ', [Validators.required]),
      txt_mota: new FormControl(' '),
      txt_gia: new FormControl(0)
    });
  }
  get so() {
    return this.frma.get('txt_ten')!;
  }
  aloget(id1: any) {
    this.namemodel = "Sửa"
    this.api.post('/api/Monans/getid', { id: id1 }).subscribe(res => {
      console.log(res)
      this.frma = new FormGroup({
        id: new FormControl(res.id),
        txt_ten: new FormControl(res.ten, [Validators.required]),
        txt_mota: new FormControl(res.mota),
        txt_gia: new FormControl(res.gia)
      });
      this.anh = res.anh;
    });
  }
  file(event:any) {
    if (event.target.files.length > 0) {
      this.anh='/'+event.target.files[0].name;
    }
  }
  closeModal(id: any) {
    $(`#${id}`).closest('.modal').modal('hide');
  }
  save(vl: any) {
    if (this.namemodel == "Thêm mới") {
      this.aloaddd(vl.txt_ten, vl.txt_mota, vl.txt_gia);
      this.showSuccess("Thêm thành công!");
    }
    else {
      this.aloup(vl.id, vl.txt_ten, vl.txt_mota, vl.txt_gia, this.anh);
      this.showSuccess("Sửa thành công!");
    }
    setTimeout(()=>this.search(),1000);
    // this.search();
    this.closeModal("modal_default");
  }
  aloaddd(sophong: any, mota: any, gia: any) {
    this.api.post('/api/Monans/add', { tenmon: sophong, mota: mota, gia: gia }).subscribe(res => {
    });
  };
  aloup(id: any, sophong: any, mota: any, gia: any, anh: any) {
    this.api.post('/api/Monans/update', { id: id, tenmon: sophong, mota: mota, gia: gia, anh: anh }).subscribe(res => {
    });
  };
  delte(id1: any) {
    this.api.post('/api/Monans/delete', { id: id1 }).subscribe(res => {
      this.showSuccess("Đã chặn");
      this.ngOnInit();
    });
  }
  redelte(id1: any) {
    this.api.post('/api/Monans/redelete', { id: id1 }).subscribe(res => {
      this.showSuccess("Đã bỏ chặn");
      this.ngOnInit();
    });
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/core/libraries/jquery_ui/interactions.min.js', 'assets/js/plugins/forms/selects/select2.min.js', 'assets/js/core/app.js');
  }
}