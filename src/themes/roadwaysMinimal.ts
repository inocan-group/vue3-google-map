import { IMapTypeStyle } from '/@/@types/index'
import { roadways, minimal } from './index'

export const roadwaysMinimal: IMapTypeStyle[] = [...roadways, ...minimal]
