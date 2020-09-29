import { ref } from 'vue'
import { GoogleMapsAPI, Map } from '@types'

const map = ref<Map | null>(null)
const api = ref<GoogleMapsAPI | null>(null)

export const useMap = () => {
  return { map, api }
}
