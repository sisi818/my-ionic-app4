import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import {UserService} from "../../../providers/user"

@Component({
  selector: 'page-member-edit',
  templateUrl: 'member-edit.html',
})
export class MemberEdit {
  startTime:any
  object:any = {
    checkDate:"",
    city:"",
    weather:"",
    win:""
    // ,
    // age:"",
    // exam1:"",
    // exam2:"",
    // exam3:""
  }
  currentMember:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public userServ:UserService,public viewCtrl:ViewController) {
    this.startTime = new Date()
    this.currentMember = this.navParams.data.member
    if(this.currentMember){
      this.object.checkDate = this.currentMember.checkDate
      this.object.city = this.currentMember.city
      this.object.weather = this.currentMember.weather
      this.object.win = this.currentMember.win
      // this.object.age = this.currentMember.age
      // this.object.exam1 = this.currentMember.exam1
      // this.object.exam2 = this.currentMember.exam2
      // this.object.exam3 = this.currentMember.exam3
    }
  }

save(){
  console.log("weather: "+this.object.weather)
  console.log("win: "+this.object.win)
  if(!this.object.checkDate || !this.object.city){
    console.log("您的信息不完整，请重新填写")
  }

  if(this.currentMember){
    this.userServ.updateClass("RainBet",this.currentMember.objectId,this.object).then(data=>{
      Object.keys(this.object).forEach(key=>{
        this.currentMember[key] = this.object[key]
      })
      this.viewCtrl.dismiss()
    }).catch(err=>{
    console.log(err)
  })
  }else{
  console.log("city: "+this.object.city)
  console.log("win: "+this.object.win)
  this.userServ.saveClass("RainBet",this.object).then(data=>{
    this.object.objectId = data.json().objectId
    this.object.createdAt = data.json().createAt
    this.viewCtrl.dismiss(this.object)
  }).catch(err=>{
    console.log(err)
  })
 }

}
returnToHistory(){
   this.viewCtrl.dismiss()
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberEdit');
  }
ngOnDestroy(){
  console.log("您访问该页面的时间：",this.startTime)
}

}
