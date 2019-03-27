import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

const rotas: Routes = [
    { path: 'lancamentos', component: LancamentosPesquisaComponent},
    { path: 'lancamentos/novo', component: LancamentoCadastroComponent},
    { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent}
];

@NgModule({
    imports: [
      RouterModule.forChild(rotas),
    ],
    exports: [RouterModule]
  })
  export class LancamentosRoutingModule { }
