import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/_service/alert.service';
import { Alert } from '../../_model/alert'
import { MatSort, MatTableDataSource, MatTable, MatDialog, MatPaginator } from '@angular/material';
import { ManageAlertsComponent } from '../manage-alerts/manage-alerts.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  public dataSource = new MatTableDataSource<Alert>();
  obj: any = {};
  displayedColumns: string[] = ['alertname', 'alertdeliverydate','edit'];
  constructor(private alertService: AlertService, private dialog: MatDialog) { }
  
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  ngOnInit() {

    this.alertService.getAllAlerts()
    .subscribe((alert: Alert[]) => {
      this.dataSource.data =  alert;

    });

  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(action: string, value: Alert, event: any): void {
    console.log(value);
    this.obj.alert = { ...value };
    this.obj.action = action;
    const dialogRef = this.dialog.open(ManageAlertsComponent, {
      data: this.obj,
      width: '430px'

    });


    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Create') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      }
      // else if(result.event == 'Delete'){
      //   this.deleteRowData(result.data);
      // }
    });

  }

  addRowData(row_obj: Alert) {
    this.dataSource.data.push(row_obj);
    this.table.renderRows();
  }
  
  updateRowData(row_obj: Alert) {
   this.dataSource.data.filter((value, key) => {
      if (value.alertid === row_obj.alertid) {
    value.alertname = row_obj.alertname;
    value.alertdeliverydate = row_obj.alertdeliverydate;
    value.alerttype = row_obj.alerttype;
      }
      return true;
    });
  }
}
