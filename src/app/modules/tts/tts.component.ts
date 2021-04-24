import { ElectronStoreService } from 'card-builder-framework';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Monster } from '../monster/monster/monster';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tts',
  templateUrl: './tts.component.html',
  styleUrls: ['./tts.component.scss']
})
export class TtsComponent implements OnInit {
  @ViewChild('tts', {static: true}) public template: TemplateRef<any>;
  monsters: Array<Monster>;

  constructor(
    private route: ActivatedRoute,
    private electronStoreService: ElectronStoreService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name: string = this.route.snapshot.paramMap.get('name');
      if (name) {
        this.electronStoreService.getStorageRecord('monsters', name).then((res: Monster) => {
          this.monsters = [res];
        });
      } else {
        this.electronStoreService.getStorageList('monsters').then((res: Array<Monster>) => {
          this.monsters = res;
        });
      }
    });
  }
}
