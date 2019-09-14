import { Component, ViewChild } from '@angular/core';
import { CsvRecord } from './csvModel';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'assignment-FE';

  public records: any[] =  [];
  public dataSource: any;
  @ViewChild('csvReader') csvReader: any;

  displayedColumns: string[] = ['id', 'firstName', 'surName', 'issueCount', 'dateOfBirth'];

  uploadListener($event: any): void {
    const files = $event.srcElement.files;
    if (this.isValidCSVFile(files[0])) {
      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        const headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        this.dataSource = new MatTableDataSource(this.records);
      };
      
      this.fileReset();
      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };
    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length === headerLength) {
        const csvRecord: CsvRecord = new CsvRecord();
        csvRecord.id = i;
        csvRecord.firstName = (curruntRecord[0].trim()).replace(/"+/g, '');
        csvRecord.surName = (curruntRecord[1].trim()).replace(/"+/g, '');
        csvRecord.issueCount = (parseInt)(curruntRecord[2].trim());
        csvRecord.dateOfBirth = (curruntRecord[3].trim()).replace(/"+/g, '');
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  getHeaderArray(csvRecordsArr: any) {
    const headers = (<string>csvRecordsArr[0]).split(',');
    const headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }
  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.records = [];
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

