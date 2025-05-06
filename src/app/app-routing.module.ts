import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormConfigComponent } from './form-config/form-config.component';
import { GeneratedFormComponent } from './generated-form/generated-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'form-config', pathMatch: 'full' },
  { path: 'form-config', component: FormConfigComponent },
  { path: 'generated-form', component:GeneratedFormComponent },
  { path: '**', redirectTo: 'form-config' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
