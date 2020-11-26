import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptModule,
} from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

//---------- Services
import { AuthHttpInterceptor } from "../app/services/auth-http.interceptor";
import { AuthenticationService } from "../app/services/authentication.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PersonsService } from "../app/services/persons.service";
import { OpinionsService } from "./services/opinions.service";
import { CommonService } from "@services/common.service";
import { CompetencyService } from "@services/competency.service";

//------- Components
import { SearchComponent } from "./components/home/search/search.component";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/authentication/login/login.component";
import { PersonaComponent } from "./components/persona/persona.component";
import { ModalContextComponent } from "./components/persona/modal-context/modal-context.component";
import { BrowserModule } from "@angular/platform-browser";
import { ProfileComponent } from "./components/home/profile/profile.component";
import { CompetencyAssessmentComponent } from "./components/home/ Competency-assessment/competency-assessment.component";
import { MenuComponent } from './components/home/menu/menu.component';
@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptHttpClientModule,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        SearchComponent,
        PersonaComponent,
        ModalContextComponent,
        ProfileComponent,
        CompetencyAssessmentComponent,
        MenuComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        },
        AuthenticationService,
        PersonsService,
        OpinionsService,
        CommonService,
        CompetencyService
    ],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [ModalContextComponent],
})
export class AppModule { }
