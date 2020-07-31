import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, throwError} from 'rxjs';
import {catchError, filter, map, pluck, switchMapTo} from 'rxjs/operators';
import {User} from 'firebase';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUser$: Observable<User | null> = this.auth.authState;

  isAuthenticated$: Observable<boolean> = this.authUser$.pipe(map(Boolean));
  userEmail$: Observable<string> = this.authUser$.pipe(pluck('email'));
  userUuid$: Observable<string> = this.authUser$.pipe(pluck('uid'));


  constructor(private auth: AngularFireAuth) {}

  protected createUser(email: string, password: string): Observable<User> {
    return from(this.auth.createUserWithEmailAndPassword(email, password))
      .pipe(
        catchError((error) => throwError(error.message)),
        filter(Boolean),
        pluck('user'),
      );
  }

  protected login(email: string, password: string): Observable<User> {
    return from(this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)).pipe(
      switchMapTo(from(this.auth.signInWithEmailAndPassword(email, password))),
    ).pipe(
      catchError((error) => throwError(error.message)),
      filter(Boolean),
      pluck('user'),
    );

  }

  signOut(): Observable<void> {
    return from(this.auth.signOut());
  }
}
