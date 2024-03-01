import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CoockiesComponent } from './coockies/coockies.component';
import { PrivacyComponent } from './privacy/privacy.component';
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
import { ContentFilterComponent } from './content-filter/content-filter.component';
import { SearchComponent } from './search/search.component';
import { FullProductComponent } from './full-product/full-product.component';
import { ServersComponent } from './servers/servers.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { MobileDeviceComponent } from './mobile-device/mobile-device.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    FooterComponent,
    CoockiesComponent,
    PrivacyComponent,
    DashboardComponent,
    ChoicePointComponent,
    AddPcComponent,
    AddServersComponent,
    AddAccessoriesComponent,
    AddMobileDeviceComponent,
    EditProductComponent,
    SupportComponent,
    UserProblemComponent,
    ProductProblemComponent,
    UndetectedBugComponent,
    MissleadingInformationComponent,
    CyberSecurityProblemComponent,
    AnotherProblemComponent,
    EditTicketComponent,
    PCComponent,
    ContentFilterComponent,
    SearchComponent,
    FullProductComponent,
    ServersComponent,
    AccessoriesComponent,
    MobileDeviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
