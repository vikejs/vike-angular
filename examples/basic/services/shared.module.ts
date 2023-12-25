import { NgModule } from '@angular/core';
import { AppService } from '#root/services/app.service';

// SharedModule provides AppService on client and server
@NgModule({
  imports: [],
  providers: [AppService],
})
export class SharedModule {
  constructor() {
    console.log('This is a shared module, it is imported on client and server');
  }
}
