import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FixedDeposit } from '../../_model/fixeddeposit';
import { InvesmentsService } from '../../_service/invesments.service';
import { state, style, trigger, transition, animate } from '@angular/animations';
import { CreateComponent } from '../create/create.component';
import { MatDialog, MatTable, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { DeleteAlertComponent } from '../delete-alert/delete-alert.component';

@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./fixed-deposit.component.css']
})
export class FixedDepositComponent implements OnInit {
  investments: FixedDeposit[];
  columnsToDisplay = ['id', 'bank','investmentHolderName', 'depositAmount', 'maturityAmount','interestRate','maturityDate', 'edit', 'delete'];
  expandedElement: FixedDeposit | null;
  public dataSource = new MatTableDataSource<FixedDeposit>();
  obj: any = {};

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private investmentsService: InvesmentsService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
  }
  
  ngOnInit() {
    this.getAllFixedDeposit();

  }
  getAllFixedDeposit(){
    this.investmentsService.getAllInvestments()
    .subscribe(res => {
      this.dataSource.data = res as FixedDeposit[];
      this.changeDetectorRefs.detectChanges();
    });
  
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(action: string, value: FixedDeposit, event: any): void {
    console.log(value);
    this.obj.investment = { ...value };
    this.obj.action = action;
    const dialogRef = this.dialog.open(CreateComponent, {
      data: this.obj,
      height: '650px',
      width: '700px',

    });


    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Create') {
        this.getAllFixedDeposit();
      } else if (result.event === 'Update') {
        this.getAllFixedDeposit();
      }
    });

  }
 
  delete(element: FixedDeposit){
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      data: {value: element.id, type: 'fixedDeposit'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'deleted') 
        this.getAllFixedDeposit();
    });
   
  }

}
