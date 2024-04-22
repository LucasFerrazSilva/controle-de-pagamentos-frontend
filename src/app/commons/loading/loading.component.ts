import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  
  loading = false;

  constructor(
    loadingService: LoadingService
  ){
    loadingService.getLoadingSubject().subscribe(loading => this.loading = loading);
  }

}
