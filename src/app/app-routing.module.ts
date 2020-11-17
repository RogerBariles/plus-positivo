import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { LoginComponent } from "./components/authentication/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/home/profile/profile.component";
import { PersonaComponent } from "./components/persona/persona.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "home/:user",
        //component: HomeComponent
        component: ProfileComponent,
    },
    {
        path: "persona/:idPersona",
        component: PersonaComponent,
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
