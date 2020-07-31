import {Observable} from 'rxjs';
import {User} from 'firebase';

export abstract class LoginService {
  abstract login: (email: string, password: string) => Observable<User>;
}
