import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HomeComponent } from './home/home.component';
import { authAdminGuardFn, authGuardFn } from './shared/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChoicePointComponent } from './choice-point/choice-point.component';
import { AddPcComponent } from './add-pc/add-pc.component';
import { AddServersComponent } from './add-servers/add-servers.component';
import { AddAccessoriesComponent } from './add-accessories/add-accessories.component';
import { AddMobileDeviceComponent } from './add-mobile-device/add-mobile-device.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SupportComponent } from './support/support.component';
import { UserProblemComponent } from './support/user-problem/user-problem.component';
import { ProductProblemComponent } from './support/product-problem/product-problem.component';
import { UndetectedBugComponent } from './support/undetected-bug/undetected-bug.component';
import { MissleadingInformationComponent } from './support/missleading-information/missleading-information.component';
import { CyberSecurityProblemComponent } from './support/cyber-security-problem/cyber-security-problem.component';
import { AnotherProblemComponent } from './support/another-problem/another-problem.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { PCComponent } from './pc/pc.component';
import { FullProductComponent } from './full-product/full-product.component';
import { ServersComponent } from './servers/servers.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { MobileDeviceComponent } from './mobile-device/mobile-device.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'registration', component: RegistrationFormComponent},
  { path: 'login', component: LoginFormComponent},
  { path: 'home', component: HomeComponent, canActivate: [authGuardFn]},
  { path: 'privacy', component: PrivacyComponent, canActivate: [authGuardFn]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuardFn, authAdminGuardFn]},
  { path: 'choicePoint', component: ChoicePointComponent, canActivate: [authGuardFn, authAdminGuardFn]},
  { path: 'addPc', component: AddPcComponent, canActivate: [authGuardFn, authAdminGuardFn]},
  { path: 'addServers', component: AddServersComponent, canActivate: [authGuardFn, authAdminGuardFn]},
  { path: 'addAccessories', component: AddAccessoriesComponent, canActivate: [authGuardFn, authAdminGuardFn]},
  { path: 'addMobileDevice', component: AddMobileDeviceComponent, canActivate: [authGuardFn, authAdminGuardFn]},
  { path: 'editProduct/:id', component: EditProductComponent, canActivate: [authGuardFn, authAdminGuardFn]},
  { path: 'ticketDetail/:id', component: EditTicketComponent, canActivate: [authGuardFn, authAdminGuardFn]},
  { path: 'fullProduct/:id', component: FullProductComponent, canActivate: [authGuardFn]},
  { path: 'support', component: SupportComponent, canActivate: [authGuardFn]},
  { path: 'user-issues', component: UserProblemComponent, canActivate: [authGuardFn]},
  { path: 'product-issues', component: ProductProblemComponent, canActivate: [authGuardFn]},
  { path: 'bug-issues', component: UndetectedBugComponent, canActivate: [authGuardFn]},
  { path: 'informationa-issues', component: MissleadingInformationComponent, canActivate: [authGuardFn]},
  { path: 'security-issues', component: CyberSecurityProblemComponent, canActivate: [authGuardFn]},
  { path: 'other-issues', component: AnotherProblemComponent, canActivate: [authGuardFn]},
  { path: 'pc', component: PCComponent, canActivate: [authGuardFn]},
  { path: 'servers', component: ServersComponent, canActivate: [authGuardFn]},
  { path: 'accessories', component: AccessoriesComponent, canActivate: [authGuardFn]},
  { path: 'mobileDevice', component: MobileDeviceComponent, canActivate: [authGuardFn]},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }