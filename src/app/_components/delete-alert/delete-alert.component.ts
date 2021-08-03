import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InvesmentsService } from 'src/app/_service/invesments.service';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.css']
})
export class DeleteAlertComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public invesmentsService:InvesmentsService) {}
   
  ngOnInit() {
  }

  onClose(): void {
    this.dialogRef.close();
  }
  onDelete(){
    if(this.data.type == "fixedDeposit")
    this.invesmentsService.deleteInvestments(this.data.value);
    else if(this.data.type == "mutualFunds")
    this.invesmentsService.deleteMutualFund(this.data.value);
    this.dialogRef.close({event: 'deleted'});
  }
}
