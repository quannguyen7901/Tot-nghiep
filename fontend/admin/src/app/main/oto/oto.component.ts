import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'src/app/core/common/base-component';
import { ApiService } from 'src/app/core/services/api.service';


declare var $:any;

@Component({
  selector: 'app-oto',
  templateUrl: './oto.component.html',
  styleUrls: ['./oto.component.css'],
  providers:[MessageService]
})
export class OtoComponent extends BaseComponent implements OnInit{
  public page = 1;
  public isLoading: boolean;
  public totalRecords: any;
  public pageSize: any;
  public namemodel: any;
  public alo2: any;
  public frma: FormGroup;
  public error = '';
  // public lp:any;
  
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
      txt_ten: new FormControl('',[Validators.required]),
      txt_mau: new FormControl(),
      txt_hang: new FormControl(),
      txt_loai: new FormControl(),
      txt_gia: new FormControl(),
    });
    this.search();
  }
  loadPage(page: any) {
    // this.isLoading = true;
    // setTimeout(() => {
    this.api.post('/api/xe/search', { index: (page.page + 1), size: this.pageSize }).subscribe(res => {
      this.alo2 = res.result;
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
    this.api.post('/api/Hoadon/search', { index: 1, size: 7 }).subscribe(res => {
      res.alo.forEach(function (a: any) {
        const d = new Date(a.ngay);
        a.ngay = (d.getDate() > 9 ? d.getDate() : "0" + d.getDate()) + "-" + (d.getMonth() > 8 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1)) + "-" + d.getFullYear();
      });
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
  //     txt_mau: new FormControl(' '),
  //     txt_hang: new FormControl(' '),
  //     txt_loai: new FormControl(' '),
  //     txt_gia: new FormControl(0),
  //   });
  // }
  // get so() {
  //   return this.frma.get('txt_ten')!;
  // }
  // aloget(id1: any) {
  //   this.namemodel = "Sửa"
  //   // this.showSuccess(id1);
  //   this.api.post('/api/Hoadon/getid', { id: id1 }).subscribe(res => {
  //     $('#lp').val(res.loai).change();
  //     this.frma = new FormGroup({
  //     id: new FormControl(res.id),
  //     txt_ten: new FormControl(res.ten,[Validators.required]),
  //     txt_mau: new FormControl(res.mau),
  //     txt_hang: new FormControl(res.hang),
  //     txt_loai: new FormControl(res.loai),
  //     txt_gia: new FormControl(res.gia),
  //     });
      
  //   });
  // }
  // closeModal(id:any) {
  //   $(`#${id}`).closest('.modal').modal('hide');
  // }
  // save(vl:any){
  //   if (this.namemodel=="Thêm mới"){
  //     this.aloaddd(vl.txt_ten,vl.txt_mau,vl.txt_hang,vl.txt_loai,vl.txt_gia);
  //     this.showSuccess("Thêm thành công!");
  //   }
  //   else{
  //     vl.txt_loai=$("#lp").val();
  //     // this.showSuccess(vl.txt_loai);
  //     this.aloup(vl.id,vl.txt_ten,vl.txt_mau,vl.txt_hang,vl.txt_loai,vl.txt_gia);
  //     this.showSuccess("Sửa thành công!");
  //   }
  //   this.closeModal("modal_default");
  //   this.search();
  // }
  // aloaddd(sophong: any,idlp: any,mota: any,loai:any,gia: any) {
  //   this.api.post('/api/xe/add', { ten:sophong,mau: idlp,hang: mota,loai: loai,gia: gia }).subscribe(res => {
  //   });
  // };
  // aloup(id:any,sophong: any,idlp: any,mota: any,loai:any,gia: any) {
  //   this.api.post('/api/xe/update', {id:id, ten:sophong,mau: idlp,hang: mota,loai:loai,gia: gia }).subscribe(res => {
  //   });
  // };
delte(id1: any) {
  // this.namemodel="Sửa"
  this.api.post('/api/xe/delete', { id: id1 }).subscribe(res => {
    this.showSuccess("Đã chặn");
    this.ngOnInit();
  });
}
redelte(id1: any) {
  this.api.post('/api/xe/redelete', { id: id1 }).subscribe(res => {
    this.showSuccess("Đã bỏ chặn");
    this.ngOnInit();  
  });
}
ngAfterViewInit() {
  this.loadScripts('assets/js/core/libraries/jquery_ui/interactions.min.js','assets/js/plugins/forms/selects/select2.min.js','assets/js/core/app.js');
}
}