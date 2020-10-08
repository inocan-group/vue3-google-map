import theme from 'vitepress/dist/client/theme-default'
import * as libraryComponents from '/@/components/index'

export default {
  ...theme,
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
    for (const key in libraryComponents) {
      app.component(key, libraryComponents[key])
    }
  },
}
