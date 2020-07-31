import {Observable} from 'rxjs';
import {User} from 'firebase';

export abstract class RegisterService {
  abstract createUser: (email: string, password: string) => Observable<User>;
}
