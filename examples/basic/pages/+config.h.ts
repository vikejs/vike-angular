import type { Config } from 'vike/types'
import { Layout } from './LayoutDefault'
import logoUrl from '../assets/logo.svg'
import vikeAngular from 'vike-angular/config'

export default {
  Layout,
  title: 'My Vike + Angular App',
  description: 'Demo showcasing Vike + Angular',
  favicon: logoUrl,
  extends: vikeAngular
} satisfies Config
