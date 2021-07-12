import { Component, OnInit } from '@angular/core';
import { ElectronStoreService } from 'card-builder-framework';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss']
})
export class UtilitiesComponent implements OnInit {

  constructor(private electronStoreService: ElectronStoreService) { }

  ngOnInit() {
  }

  copyAllData() {
    const promises = [
      this.electronStoreService.getStorage('monsters'),
      this.electronStoreService.getStorage('icons'),
      this.electronStoreService.getStorage('backgrounds'),
    ];
    Promise.all(promises).then(res => {
      var pom = document.createElement('a');
      pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(res, null, 2)));
      pom.setAttribute('download', 'all-data.txt');
      if (document.createEvent) {
          var event = document.createEvent('MouseEvents');
          event.initEvent('click', true, true);
          pom.dispatchEvent(event);
      }
      else {
          pom.click();
      }
    });
  }

}
