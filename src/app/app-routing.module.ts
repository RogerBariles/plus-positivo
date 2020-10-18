import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";


import { LoginComponent } from "./components/authentication/login/login.component";
import { HomeComponent } from './components/home/home.component'

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { 
        path: "login",
        component: LoginComponent
    },
    {
        path:"home/:{user}",
        component: HomeComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
