import { Component, OnInit, Input } from '@angular/core';
import { Move } from '../../models/move';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss']
})
export class MoveComponent implements OnInit {
  @Input() levelLearnedAt:number;
  @Input() move:Move;
  constructor() {

   }
  ngOnInit(): void {
  }
}
