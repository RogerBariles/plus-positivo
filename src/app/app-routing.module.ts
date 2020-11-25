import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { LoginComponent } from "./components/authentication/login/login.component";
import { CompetencyAssessmentComponent } from "./components/home/ Competency-assessment/competency-assessment.component";
import { SearchComponent } from "./components/home/search/search.component";
import { MenuComponent } from "./components/home/menu/menu.component";
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
        //1component: HomeComponent
        component: MenuComponent
    },
    {
        path: "search/:idUser",
        component: SearchComponent
    },
    {
        path: "persona/:idPersona",
        component: PersonaComponent,
    },
    {
        path: "profile/:idUser",
        component: ProfileComponent
    },
    {
        path: 'competency/:idUser',
        component: CompetencyAssessmentComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
})
export class AppRoutingModule { }
