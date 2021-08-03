import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { InvesmentsService } from '../../_service/invesments.service';
import { CreateComponent } from '../create/create.component';
import { MatDialog, MatTable, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { MutualFund } from 'src/app/_model/mutualfund';
import { ManageMutualFundsComponent } from '../manage-mutual-funds/manage-mutual-funds.component';
import { DeleteAlertComponent } from '../delete-alert/delete-alert.component';

@Component({
  selector: 'app-mutual-fund',
  templateUrl: './mutual-fund.component.html',
  styleUrls: ['./mutual-fund.component.css']
})
export class MutualFundComponent implements OnInit {
  mutualFund: MutualFund[];
  displayedColumns = ['folioNumber','portfolioName','name','purchaseDate','purchaseAmount','currentAmount','dividendAmount',
   'netAmount' , 'edit', 'delete'];

  public dataSource = new MatTableDataSource<MutualFund>();
  obj: any = {};
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private investmentsService: InvesmentsService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
  }
  
  ngOnInit() {
    this.getAllMutualFund();

  }
  getAllMutualFund(){
    this.investmentsService.getAllMutualFunds()
    .subscribe(res => {
      this.dataSource.data = res as MutualFund[];
      this.changeDetectorRefs.detectChanges();
    });
  
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(action: string, value: MutualFund, event: any): void {
    console.log(value);
    this.obj.mutualFund = { ...value };
    this.obj.action = action;
    const dialogRef = this.dialog.open(ManageMutualFundsComponent, {
      data: this.obj,
      height: '548px',
      width: '700px',

    });


    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Create') {
        this.getAllMutualFund();
      } else if (result.event === 'Update') {
        this.getAllMutualFund();
      }
    });

  }
  delete(element: MutualFund){
    const dialogRef = this.dialog.open(DeleteAlertComponent, {
      data: {value: element.folioNumber,type: 'mutualFunds'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'deleted') 
        this.getAllMutualFund();
        this.table.renderRows();
    });
  }

}