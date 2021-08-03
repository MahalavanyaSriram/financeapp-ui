import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Alert } from 'src/app/_model/alert';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/_service/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlerttypeObject } from 'src/app/_model/alerttypes';

@Component({
  selector: 'app-manage-alerts',
  templateUrl: './manage-alerts.component.html',
  styleUrls: ['./manage-alerts.component.css']
})
export class ManageAlertsComponent implements OnInit {
  alert: Alert;
  alertTypeList: AlerttypeObject[];
  updatedAlert: any = { };
   alertForm = new FormGroup({
    alertname: new FormControl(this.object.alert.alertname),
    alertdeliverydate: new FormControl(this.object.alert.alertdeliverydate),
    alerttype: new FormControl(this.object.alert.alerttype),
  });

  constructor(private alertService: AlertService,
    public dialogRef: MatDialogRef<ManageAlertsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public object: any ) {}
 
    
  ngOnInit() {
    this.alertService.getAlertTypes().then(response => this.alertTypeList = response); 
    if(this.object.action === 'Update'){
        this.alertForm.controls['alerttype'].setValue(this.object.alert.alerttype);
    }
  }

  display: boolean = false;
  showDialog() {
    this.display = true;
  }

  onClose() :void{
    this.dialogRef.close();
  }
  onSubmit(): void {
    this.dialogRef.close({event:this.object.action,data:this.alertForm.value});
    if(this.object.action === 'Update'){
      console.log('inside alert update');
    this.alertService.addAlert(this.setSelectedObject(this.alertForm.value)).then(()=>this.alertService.getAllAlerts());  
    }else if(this.object.action === 'Create'){
      this.alertService.addAlert(this.alertForm.value).then(()=>this.alertService.getAllAlerts());  ;
    }
    this.display = false;
  }

  setSelectedObject(updatedAlert:Alert):Alert{
    console.log(this.object);
    this.updatedAlert.alertid = this.object.alert.alertid;
    this.updatedAlert.alertname = updatedAlert.alertname;
    this.updatedAlert.alertdeliverydate = updatedAlert.alertdeliverydate;
    this.updatedAlert.alerttype = updatedAlert.alerttype;
return this.updatedAlert;
  }
}
