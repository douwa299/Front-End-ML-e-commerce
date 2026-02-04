import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
// 1. REMOVE HttpClientModule
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// 2. IMPORT provideHttpClient and withFetch
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BoutiqueComponent } from './boutique/boutique.component';

// Note: ArticleComponent and PanierComponent are commented out
// because they are likely "Standalone Components". This is correct.

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BoutiqueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // 3. REMOVE HttpClientModule here too
    FormsModule,
    CommonModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    // 4. ADD THIS LINE (Fixes the warning and speeds up SSR)
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
