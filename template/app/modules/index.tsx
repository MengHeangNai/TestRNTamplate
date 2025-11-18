import layout from './layout'
import colors from './colors';

export { default as IMAGES } from './images'
export { default as LOTTIES } from './lotties'
export { default as ICONS } from './icon'

const modules = {
  ...colors,
  ...layout,
}

export default modules
