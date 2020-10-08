import { ref } from 'vue'
import { GoogleMapsAPI, IMap } from '/@/@types/index'

const map = ref<IMap | null>(null)
const api = ref<GoogleMapsAPI | null>(null)

export const useMap = () => {
  return { map, api }
}
