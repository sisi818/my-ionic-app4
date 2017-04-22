import { Component, Input, Output, EventEmitter} from '@angular/core';
import { AlertController} from 'ionic-angular';

@Component({
  selector: 'edit-check',
  templateUrl: 'edit-check.html'
})
export class EditCheck {
  checkIds: Array<any>;
  _options: any;
  @Input() title: string = "选项";
  @Input('option') _option: any;
  @Output() optionChange = new EventEmitter<any>();

  get option(): any {
    return this._option
  }
  set option(v) {
    this.optionChange.emit(v)
    this._option = v
  }

  @Input('options')
  set options(v: any) {
    this._options = v;
    console.log("options:", this._options);
    this.checkIds = Object.keys(this._options);
    console.log("checkIds:", this.checkIds);
  }
  constructor(public alertCtrl: AlertController) {
  }

  selectOption() {
    let alert = this.alertCtrl.create();
    alert.setTitle(this.title);

    this.checkIds.forEach(checkId => {
      let setting = {
        type: 'radio',
        label: this._options[checkId],
        value: checkId,
        check: false
      }
      if (checkId == this._option.indexOf(this._options)) {
        console.log("this.option: ", this._option);
        setting.check = true
      }
      alert.addInput(setting);
    })

    alert.addButton('取消');

    alert.addButton({
      text: '确定',
      handler: checkId => {
        this.option = this._option;
        console.log("checkId: ", checkId);
        if (checkId == "0") this.option = 'sun';
        if (checkId == "1") this.option = 'little-rain';
        if (checkId == "2") this.option = 'mid-rain';
        if (checkId == "3") this.option = 'heavy-rain';
      }
    });

    alert.present()
  }



}
