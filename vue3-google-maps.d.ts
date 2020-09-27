import Vue, { PluginFunction, VueConstructor } from 'vue';


interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const Vue3GoogleMaps: { install: InstallFunction };
export default Vue3GoogleMaps;

export const Vue3GoogleMapsSample: VueConstructor<Vue>;
