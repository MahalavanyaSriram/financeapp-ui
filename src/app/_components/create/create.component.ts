import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { InvesmentsService } from '../../_service/invesments.service';
import { InstitutionObject } from '../../_model/institution';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FixedDeposit } from '../../_model/fixeddeposit';
import { ErrorAlertService } from '../../_service/error-alert.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  institutionList: InstitutionObject[];
  investment: FixedDeposit;
  updatedInvestment: any = { };
    investmentForm = new FormGroup({
    id: new FormControl(this.object.investment.id, {updateOn: 'blur', validators: Validators.compose([Validators.maxLength(100), this.redundentId.bind(this),Validators.required])}),
    //investmentType: new FormControl(this.object.investment.investmentType,[Validators.required]),
    //investmentName: new FormControl(this.object.investment.investmentName),
    depositAmount: new FormControl(this.object.investment.depositAmount),
    period: new FormControl(this.object.investment.period),
    maturityAmount: new FormControl(this.object.investment.maturityAmount),
    depositDate: new FormControl(this.object.investment.depositDate),
    bank: new FormControl(this.object.investment.bank),
    name: new FormControl(this.object.investment.name),
    interestRate: new FormControl(this.object.investment.interestRate),
    maturityDate: new FormControl(this.object.investment.maturityDate),
    nomineeName: new FormControl(this.object.investment.nomineeName),
    email: new FormControl(this.object.investment.email, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(this.object.investment.phoneNumber,),
  });

  constructor(private investmentService: InvesmentsService,
    public dialogRef: MatDialogRef<CreateComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public object: any , private errorAlertService: ErrorAlertService) {}
 
    
  ngOnInit() {
    this.investmentService.getAllInstitution().then(response => this.institutionList = response); 
    if(this.object.action === 'Update'){
        this.investmentForm.controls['institution'].setValue(this.object.investment.institution);
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
    if(this.object.action === 'Update'){
    this.investmentService.addInvestment(this.setSelectedObject(this.investmentForm.value)).then((res)=> this.dialogRef.close({event:this.object.action,data:this.investmentForm.value}));  
    }else if(this.object.action === 'Create'){
      this.investmentService.addInvestment(this.investmentForm.value).then((res)=> this.dialogRef.close({event:this.object.action,data:this.investmentForm.value}));  
    }
    this.display = false;
    
  }
  handleInput(e: any) {
    this.investmentForm.get('id').setValue(e);
  }
  
  setSelectedObject(updatedInvestment:FixedDeposit):FixedDeposit{
    this.updatedInvestment.id = updatedInvestment.id;
    this.updatedInvestment.depositAmount = updatedInvestment.depositAmount;
    this.updatedInvestment.period = updatedInvestment.period;
    this.updatedInvestment.interestRate = updatedInvestment.interestRate;
    this.updatedInvestment.maturityAmount = updatedInvestment.maturityAmount;
    this.updatedInvestment.depositDate = updatedInvestment.depositDate;
    this.updatedInvestment.maturityDate = updatedInvestment.maturityDate;
    this.updatedInvestment.bank = updatedInvestment.bank;
    this.updatedInvestment.name = updatedInvestment.name;
    this.updatedInvestment.nomineeName = updatedInvestment.nomineeName;
    this.updatedInvestment.email = updatedInvestment.email;
    this.updatedInvestment.phoneNumber = updatedInvestment.phoneNumber;
    this.updatedInvestment.username = this.object.investment.username;
    this.updatedInvestment.alertid = this.object.investment.alertid;
    this.updatedInvestment.alert = {...this.object.investment.alert};

return this.updatedInvestment;
  }
  get email() { return this.investmentForm.get('email'); }
  get id(){ return this.investmentForm.get('id');}
  get depositDate() { return this.investmentForm.get('depositDate'); }
  get maturityDate() { return this.investmentForm.get('maturityDate'); }

  getErrorEamilMessage() {
    return this.investmentForm.get('email').hasError('required') ? 'You must enter a value' :
      this.investmentForm.get('email').hasError('email') ? 'Not a valid email' :
        '';
  }

  redundentId(control: FormControl): ValidationErrors {
    console.log(control.value);
    console.log(this.object.action);
    if (control.value !== null && this.object.action === 'Create') {
      return this.investmentService.checkIvestmentId(control.value).toPromise().then(res => {
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
