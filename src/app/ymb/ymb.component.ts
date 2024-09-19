import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ymb',
  templateUrl: './ymb.component.html',
  styleUrl: './ymb.component.scss'
})
export class YMBComponent {
  generalInfo:FormGroup = this.fb.group({
    faultNotificationDate:[new Date(), {disabled:true}],
    
  });

  constructor(private fb:FormBuilder){}
}
