import { Component } from '@angular/core'

@Component({
  standalone: true,
  selector: 'client-only',
  template: `<h1>Rendered only in browser</h1>`
})
export class ClientOnlyComponent {}
