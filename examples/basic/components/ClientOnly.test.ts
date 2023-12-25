import 'zone.js'
import { TestBed } from '@angular/core/testing'
import { describe, beforeEach, it, expect } from 'vitest'
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'
import { ClientOnlyComponent } from './ClientOnly'

describe('ClientOnlyComponent', () => {
  beforeEach(async () => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    await TestBed.configureTestingModule({
      imports: [ClientOnlyComponent]
    }).compileComponents()
  })

  it('works', () => {
    const fixture = TestBed.createComponent(ClientOnlyComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('h1').textContent).toContain('Rendered only in browser')
  })
})
