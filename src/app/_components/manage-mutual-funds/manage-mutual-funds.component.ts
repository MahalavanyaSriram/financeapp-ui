import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MutualFund } from 'src/app/_model/mutualfund';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { InvesmentsService } from 'src/app/_service/invesments.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorAlertService } from 'src/app/_service/error-alert.service';

@Component({
  selector: 'app-manage-mutual-funds',
  templateUrl: './manage-mutual-funds.component.html',
  styleUrls: ['./manage-mutual-funds.component.css']
})
export class ManageMutualFundsComponent implements OnInit {

  mutualFund: MutualFund;
  updatedMutualFund: any = { };
  mutualFundForm = new FormGroup({
    folioNumber: new FormControl(this.object.mutualFund.folioNumber, {updateOn: 'blur', validators: Validators.compose([Validators.maxLength(100), this.redundentFolionumber.bind(this),Validators.required])}),
    portfolioName:new FormControl(this.object.mutualFund.portfolioName),
    name: new FormControl(this.object.mutualFund.name),
    purchaseDate: new FormControl(this.object.mutualFund.purchaseDate),
    purchaseAmount:new FormControl(this.object.mutualFund.purchaseAmount),
    currentAmount:new FormControl(this.object.mutualFund.currentAmount),
    dividendAmount:new FormControl(this.object.mutualFund.dividendAmount),
    netAmount:new FormControl(this.object.mutualFund.netAmount)
  });

  constructor(private investmentService: InvesmentsService,
    public dialogRef: MatDialogRef<ManageMutualFundsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public object: any , private errorAlertService: ErrorAlertService) {}
 
    
  ngOnInit() {
  }

  display: boolean = false;
  showDialog() {
    this.display = true;
  }

  onClose() :void{
    this.dialogRef.close();
  }
  onSubmit(): void {
    if(this.object.action === 'Update'){
      this.investmentService.addAllMutualFunds(this.setSelectedObject(this.mutualFundForm.value)).then((res)=> this.dialogRef.close({event:this.object.action,data:this.mutualFundForm.value}));  
      }else if(this.object.action === 'Create'){
        this.investmentService.addAllMutualFunds(this.mutualFundForm.value).then((res)=> this.dialogRef.close({event:this.object.action,data:this.mutualFundForm.value}));  
      }
      this.display = false;
      
  }
  handleInput(e: any) {
    this.mutualFundForm.get('folioNumber').setValue(e);
  }
  
  setSelectedObject(updatedMutualFund:MutualFund):MutualFund{
    this.updatedMutualFund.folioNumber = updatedMutualFund.folioNumber;
    this.updatedMutualFund.portfolioName = updatedMutualFund.portfolioName;
    this.updatedMutualFund.name = updatedMutualFund.name;
    this.updatedMutualFund.purchaseDate = updatedMutualFund.purchaseDate;
    this.updatedMutualFund.purchaseAmount = updatedMutualFund.purchaseAmount;
    this.updatedMutualFund.currentAmount = updatedMutualFund.currentAmount;
    this.updatedMutualFund.dividendAmount = updatedMutualFund.dividendAmount;
    this.updatedMutualFund.netAmount = updatedMutualFund.netAmount;

return this.updatedMutualFund;
  }
  get folioNumber(){ return this.mutualFundForm.get('folioNumber');}

  redundentFolionumber(control: FormControl): ValidationErrors {
    console.log(control.value);
    console.log(this.object.action);
    if (control.value !== null && this.object.action === 'Create') {
      return this.investmentService.checkMutualFundId(control.value).toPromise().then(res => {
        console.log(res);
        return this.errorAlertService.success(null,true);
      }).catch(err=>{
        console.log(err);
        return this.errorAlertService.error(err);
      });
    }
    return null;
  }

}
