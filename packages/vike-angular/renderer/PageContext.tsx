export { PageContext }

import { InjectionToken } from '@angular/core'
import type { PageContext } from 'vike/types'
import { getGlobalObject } from './utils/getGlobalObject'

const { PageContext } = getGlobalObject('PageContext.ts', {
  PageContext: new InjectionToken<PageContext>('PageContext')
})
