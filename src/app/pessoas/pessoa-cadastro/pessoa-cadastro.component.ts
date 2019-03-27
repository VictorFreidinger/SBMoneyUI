import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { Pessoa } from './../../core/model';
import { PessoaService } from '../pessoa.service';

import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
              private toastyService: ToastyService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova Pessoa');

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvarPessoa(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.toastyService.success('Pessoa Cadastrada com Sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa() {
    this.pessoaService.atualizar(this.pessoa)
      .then((pessoaAtualizada) => {
        this.pessoa = pessoaAtualizada;
        this.toastyService.success('Pessoa atualizada com Sucesso!');
        this.atualizaTitulo();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
    .then(retornoPessoa => {
      this.pessoa = retornoPessoa;
      this.title.setTitle('Editando Pessoa');
      this.atualizaTitulo();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

  atualizaTitulo() {
    this.title.setTitle(`Editando Pessoa: ${this.pessoa.nome}` );
  }

}
