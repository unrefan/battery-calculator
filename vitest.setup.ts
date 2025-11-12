import { config } from '@vue/test-utils'

config.global.stubs = {
  transition: false,
  'font-awesome-icon': true,
}

export {}
