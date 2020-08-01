import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import {Feature} from './interfaces/feature';
import {from, Observable} from 'rxjs';
import {DocumentChangeAction} from '@angular/fire/firestore/interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CraftNoteService {
  private featureCollection = this.firestore.collection<Feature>('Feature');

  constructor(private firestore: AngularFirestore) {
  }

  getFeatures(): Observable<Feature[]> {
    return this
      .featureCollection
      .snapshotChanges()
      .pipe(
        map((resp: (DocumentChangeAction<Feature>)[]) => resp
          .map(
            (docChangeAction) => docChangeAction.payload.doc.data()
          )
        )
      );
  }

  addFeature(feature: Feature): Observable<DocumentReference> {
    return from(this.featureCollection.add(feature));
  }
}
