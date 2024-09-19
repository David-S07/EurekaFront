import { Component  } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';


@Component({
  standalone: true,
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  imports: [
    MatButtonModule, MatDividerModule, MatIconModule,MatListModule
  ]
})


export class IndexComponent {
 
  constructor( 
    private router: Router, 
    ) {   }

  cadastrarRoteiro() {
    this.router.navigate(['/cliente']);
  }

  fazerLogin() {
    this.router.navigate(['/login']);
  }

  AcompanharStatus() {
    this.router.navigate(['/index']);
  }

  seCadastrar(){
    this.router.navigate(['signup'])
  }

}
