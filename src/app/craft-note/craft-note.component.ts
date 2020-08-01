import {Component, OnInit} from '@angular/core';
import {CraftNoteService} from './craft-note.service';
import {Feature} from './interfaces/feature';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BarchartData} from '../shared/barchart/barchart.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-craft-note',
  templateUrl: './craft-note.component.html',
  styleUrls: ['./craft-note.component.scss']
})
export class CraftNoteComponent implements OnInit {
  barchartData$: Observable<BarchartData[]> = this.craftNoteService.getFeatures()
    .pipe(
      map((fl: Feature[]) => fl
        .map((feature: Feature) => ({name: feature.featureName, value: feature.quantity})))
    );

  constructor(private craftNoteService: CraftNoteService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  addFeature(feature: Feature): void {
    feature.quantity = +feature.quantity;
    feature.importance = +feature.importance;

    this.craftNoteService.addFeature(feature).subscribe(() => {
      this.snackBar.open('Feature successful added');
    });
  }

}
