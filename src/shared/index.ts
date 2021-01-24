import { InjectionKey, Ref } from 'vue';
import { IGoogleMapsAPI, IMap } from '../@types/index';

export const ApiSymbol: InjectionKey<Ref<IGoogleMapsAPI | null>> = Symbol('api');
export const MapSymbol: InjectionKey<Ref<IMap | null>> = Symbol('map');

export const mapEvents = [
  'bounds_changed',
  'center_changed',
  'click',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'heading_changed',
  'idle',
  'maptypeid_changed',
  'mousemove',
  'mouseout',
  'mouseover',
  'projection_changed',
  'resize',
  'rightclick',
  'tilesloaded',
  'tilt_changed',
  'zoom_changed',
];

export const markerEvents = [
  'animation_changed',
  'click',
  'dblclick',
  'rightclick',
  'dragstart',
  'dragend',
  'drag',
  'mouseover',
  'mousedown',
  'mouseout',
  'mouseup',
  'draggable_changed',
  'clickable_changed',
  'contextmenu',
  'cursor_changed',
  'flat_changed',
  'rightclick',
  'zindex_changed',
  'icon_changed',
  'position_changed',
  'shape_changed',
  'title_changed',
  'visible_changed',
];

export const polylineEvents = [
  'click',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'rightclick',
];

export const polygonEvents = polylineEvents;

export const rectangleEvents = polylineEvents.concat(['bounds_changed']);

export const circleEvents = polylineEvents.concat(['center_changed', 'radius_changed']);
