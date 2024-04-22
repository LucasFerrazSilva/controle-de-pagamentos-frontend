import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  getLoadingSubject() {
    return this.loadingSubject.asObservable();
  }

  emit(loading: boolean) {
    this.loadingSubject.next(loading);
  }

}
