import { Component, OnInit } from '@angular/core';
import { HorasExtrasService } from './horas-extras.service';
import { HorasExtrasStatus } from './dto/horas-extras-status.enum';
import { ToolbarService } from '../toolbar/toolbar.service';

@Component({
  selector: 'app-horas-extras',
  templateUrl: './horas-extras.component.html',
  styleUrls: ['./horas-extras.component.scss']
})
export class HorasExtrasComponent implements OnInit {

  constructor(
    private service: HorasExtrasService,
    private toolbarService: ToolbarService
  ) {}

  ngOnInit(): void {
    this.service.list(HorasExtrasStatus.SOLICITADO).subscribe({
      next: resp => console.log(resp),
      error: err => console.log(err)
    });

    this.toolbarService.emitPageName("Horas extras");
  }

}
