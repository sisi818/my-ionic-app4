import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'member-detail',
  templateUrl: 'member-detail.html'
})
export class MemberDetailComponent {
  @Input() member:any
  @Output() getMemberData = new EventEmitter<any[]>();
  @Output() deleteMember = new EventEmitter<any[]>();
  constructor() {
  }
  chooseMember(){
    this.getMemberData.emit(this.member)
  }
  gotoCity(city){
    window.open("http://www.baidu.com/s?wd="+city+"&cl=3","_blank")
  }
  delete(){
    this.deleteMember.emit(this.member)
  }
}
