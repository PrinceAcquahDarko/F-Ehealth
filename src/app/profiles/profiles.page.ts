import { Component, OnInit } from '@angular/core';
import { map,tap } from 'rxjs/operators';
import { GeneralService } from '../home/general.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
})
export class ProfilesPage implements OnInit {
  allHealthUsers$ = this.genService.getAllHealthUsers().pipe(
    map(x => x.users),
    tap(x => console.log(x))
  )
  constructor(private genService: GeneralService) { }

  ngOnInit() {
  }

}
