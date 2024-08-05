import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegistrationComponent } from './Pages/registration/registration.component';
import { ViewEditContentComponent } from './Pages/view-edit-content/view-edit-content.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './Pages/logout/logout.component';

export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path:"login",component:LoginComponent},
    {path:"register",component:RegistrationComponent},
    {path:"view",component:ViewEditContentComponent, canActivate:[AuthGuard]},
    {path:'logout', component: LogoutComponent}

    

];
