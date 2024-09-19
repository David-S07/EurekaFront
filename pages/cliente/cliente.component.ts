import { Component, OnInit,  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../../services/cliente.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  standalone: true,
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss',
  imports: [
    FormsModule,
    CommonModule
  ]
})

export class ClienteComponent implements OnInit {

  clientes: Cliente [] = [];
  cliente: Cliente;
  success: boolean = false;
  errors!: String[] | null;
  id: number = 0;

  _filter: string = '';
  filteredClientes:  Cliente[] = [];

  constructor( 
    private service: ClienteService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
    ) { 
    this.cliente = new Cliente();
  }

  ngOnInit() : void {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
      this.id = urlParams['id'];
      if(this.id) {
        this.service
        .getClienteById(this.id)
        .subscribe(
          response => this.cliente = response ,
          errorResponse => this.cliente = new Cliente ()
          )
      }
    })
  }

  onSubmit() {
    if(this.id) {
      this.service
      .atualizar(this.cliente)
      .subscribe(response => {
        this.success = true;
        this.errors = null;
      
        } , errorResponse => {
          this.errors = ['Erro ao atualizar o roteiro.']
        })

    } else {
      console.log(this.cliente)
      this.service
      .salvar(this.cliente)
      .subscribe(response => {
        this.success = true;
        this.errors = null;
        this.cliente = response
      } , errorResponse => {
        this.success = false;
      this.errors = errorResponse.error.errors;
      }
    )
    }    
  }

  voltarParaListagem() {
    this.router.navigate(['/index']);
  }

  set filter(value: string) {
    this._filter = value;
    this.filteredClientes = this.clientes.filter((cliente: Cliente) => cliente.name.toLocaleLowerCase().indexOf(this._filter.toLocaleLowerCase()) > -1);
  }

  get filter() : string {
    return this._filter;
  }
}