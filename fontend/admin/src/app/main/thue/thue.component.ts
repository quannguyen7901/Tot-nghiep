import { Component, Injector, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/core/common/base-component';

@Component({
  selector: 'app-thue',
  templateUrl: './thue.component.html',
  styleUrls: ['./thue.component.css'],
  providers: [MessageService]
})
export class ThueComponent extends BaseComponent implements OnInit {
  public page = 1;
  // public isLoading: boolean;
  public totalRecords: any;
  public pageSize: any;
  // public namemodel: any;
  public alo2: any;
  // public frma: FormGroup;
  public error = '';
  // public lp:any;

  constructor(injector: Injector, public mess: MessageService) {
    super(injector);
  }
  ngOnInit(): void {
    this.search();
  }
  showSuccess(message: any) {
    this.mess.add({ severity: 'success', summary: 'Thành công', detail: message });

  }
  showError(message: any) {
    this.mess.add({ severity: 'error', summary: 'Trả phòng', detail: message });
  }
  loadPage(page: any) {
    // this.isLoading = true;
    // setTimeout(() => {
    this.api.post('/api/Nhantra/search', { index: (page.page + 1), size: this.pageSize }).subscribe(res => {
      res.alo.forEach(function (a: any) {
        const d = new Date(a.ngaybd);
        a.ngaybd = (d.getDate() > 9 ? d.getDate() : "0" + d.getDate()) + "-" + (d.getMonth() > 8 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1)) + "-" + d.getFullYear();
        const da = new Date(a.ngaykt);
        a.ngaykt = (da.getDate() > 9 ? da.getDate() : "0" + da.getDate()) + "-" + (da.getMonth() > 8 ? (da.getMonth() + 1) : "0" + (da.getMonth() + 1)) + "-" + da.getFullYear();
      });
      this.alo2 = res.alo;
      // console.log(this.alo2);
      this.totalRecords = res.total;
      this.pageSize = this.pageSize;
    });
    //   this.isLoading = false;
    // }, 750);
  }
  search() {
    this.page = 1;
    this.pageSize = 7;
    this.api.post('/api/Nhantra/search', { index: 1, size: 7 }).subscribe(res => {
      res.alo.forEach(function (a: any) {
        const d = new Date(a.ngaybd);
        a.ngaybd = (d.getDate() > 9 ? d.getDate() : "0" + d.getDate()) + "-" + (d.getMonth() > 8 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1)) + "-" + d.getFullYear();
        const da = new Date(a.ngaykt);
        a.ngaykt = (da.getDate() > 9 ? da.getDate() : "0" + da.getDate()) + "-" + (da.getMonth() > 8 ? (da.getMonth() + 1) : "0" + (da.getMonth() + 1)) + "-" + da.getFullYear();
      });
      // console.log(res.result);
      this.alo2 = res.alo;
      this.totalRecords = res.total;
      this.pageSize = this.pageSize;
      // this.isLoading = false;
      // console.log(this.alo2);
    });
  }
  // aloadd() {
  //   this.namemodel = "Thêm mới";
  //   this.frma = new FormGroup({
  //     id: new FormControl(),
  //     txt_ten: new FormControl(' ',[Validators.required]),
  //     txt_mota: new FormControl(' '),
  //     txt_gia: new FormControl(0),
  //   });
  // }
  // get so() {
  //   return this.frma.get('txt_ten')!;
  // }
  // aloget(id1: any) {
  //   this.namemodel = "Sửa"
  //   this.api.post('/api/thucdon/getid', { id: id1 }).subscribe(res => {
  //     this.frma = new FormGroup({
  //     id: new FormControl(res.id),
  //     txt_ten: new FormControl(res.tenmon,[Validators.required]),
  //     txt_mota: new FormControl(res.mota),
  //     txt_gia: new FormControl(res.gia),
  //     });

  //   });
  // }
  // closeModal(id: any) {
  //   $(`#${id}`).closest('.modal').modal('hide');
  // }
  // save(vl:any){
  //   if (this.namemodel=="Thêm mới"){
  //     this.aloaddd(vl.txt_ten,vl.txt_mota,vl.txt_gia);
  //     this.showSuccess("Thêm thành công!");
  //   }
  //   else{
  //     this.aloup(vl.id,vl.txt_ten,vl.txt_mota,vl.txt_gia);
  //     this.showSuccess("Sửa thành công!");
  //   }
  //   this.closeModal("modal_default");
  //   this.search();
  // }
  // aloaddd(sophong: any,mota: any,gia: any) {
  //   this.api.post('/api/thucdon/add', { tenmon:sophong,mota: mota,gia: gia }).subscribe(res => {
  //   });
  // };
  // aloup(id:any,sophong: any,mota: any,gia: any) {
  //   this.api.post('/api/thucdon/update', {id:id, tenmon:sophong,mota: mota,gia: gia }).subscribe(res => {
  //   });
  // };
  delte(id1: any) {
    this.api.post('/api/Nhantra/delete', { id: id1 }).subscribe(res => {
      this.showError("Đã trả phòng !")
      this.ngOnInit();
    });
  }
  redelte(id1: any) { 
    this.api.post('/api/Thuephong/getid', { id: id1}).subscribe(res => {
      const d = new Date(res.ngaybd);
      const e=new Date(Date.now());
      if(d <= e){
        this.api.post('/api/Nhantra/redelete', { id: id1}).subscribe(res => {
          this.showSuccess("Đã nhận phòng !")
          this.ngOnInit();  
        });
      }  
      else{
        this.showError("Chưa đến thời gian nhận phòng")
      }
    });
  }
  ngAfterViewInit() {
    this.loadScripts('assets/js/core/libraries/jquery_ui/interactions.min.js', 'assets/js/plugins/forms/selects/select2.min.js', 'assets/js/core/app.js');
  }
}