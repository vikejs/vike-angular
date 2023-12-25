import { Component } from '@angular/core'

@Component({
  standalone: true,
  selector: 'client-only',
  template: `<div>Rendered only in browser</div>`
})
export class ClientOnlyComponent {}
