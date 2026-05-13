# Changelog

All notable changes to this project will be documented in this file. Versions are managed automatically by [release-please](https://github.com/googleapis/release-please) from [Conventional Commits](https://www.conventionalcommits.org/).

## [0.28.0](https://github.com/inocan-group/vue3-google-map/compare/vue3-google-map-v0.27.1...vue3-google-map-v0.28.0) (2026-05-13)


### ⚠ BREAKING CHANGES

* upgrade to @googlemaps/js-api-loader v2
* allow loading api script externally
* custom markers
* marker clusters
* separate entry point for bundled themes
* ability to nest info windows inside markers

### Features

* ability to nest info windows inside markers ([c239cc7](https://github.com/inocan-group/vue3-google-map/commit/c239cc7ad0851ec0238e178e10835a9dfb0169a9))
* add lint file for markdown to avoid unwanted errors in docs ([3f8500e](https://github.com/inocan-group/vue3-google-map/commit/3f8500e589d75605a7d5d6507f13335e025b4e9d))
* add mapId in GoogleMap Component ([b72105c](https://github.com/inocan-group/vue3-google-map/commit/b72105ca33bcf115ce83fe5a09ad4ccc5530d8bc))
* add missing map props and events ([1e49172](https://github.com/inocan-group/vue3-google-map/commit/1e491722b900925b827e1b572b644f51eb269fc3))
* add missing map props and events ([0de36f6](https://github.com/inocan-group/vue3-google-map/commit/0de36f63e6fd8405f65d50d3eff13d835f2ea416))
* add more marker events ([36d375e](https://github.com/inocan-group/vue3-google-map/commit/36d375e77e72d368e16eb33b16d35046353260dd))
* add v-model to infowindow ([64ac3ac](https://github.com/inocan-group/vue3-google-map/commit/64ac3ac42a9125ccf538553e97ba5b8dd0ac2c66))
* advanced markers ([69a1b66](https://github.com/inocan-group/vue3-google-map/commit/69a1b666267e2ee840c0df7530b1fbcc810c7021))
* **AdvancedMarker:** content slot for custom content ([db0515f](https://github.com/inocan-group/vue3-google-map/commit/db0515f94fec6ebf0133f29c74ce2c79dfbc6020))
* **AdvancedMarker:** support slot custom content ([c1fdb3f](https://github.com/inocan-group/vue3-google-map/commit/c1fdb3f50234fd874a21be7d8d5f14dc0d5d0bfd))
* allow loading api script externally ([2a55b60](https://github.com/inocan-group/vue3-google-map/commit/2a55b60ae57fedf0e5315cb696bbbf9f70a1c2ae))
* api version ([923e252](https://github.com/inocan-group/vue3-google-map/commit/923e252d81e153467f01406fae999774745816c3))
* colorScheme support ([29720fb](https://github.com/inocan-group/vue3-google-map/commit/29720fbae3ebcd246e5614a5cd3a6972730ddb95))
* controlSize map option ([ac02e4d](https://github.com/inocan-group/vue3-google-map/commit/ac02e4dbc8ffd0395b853ba7f31d7013b25f21ca))
* custom markers ([ecc28b0](https://github.com/inocan-group/vue3-google-map/commit/ecc28b0455a54502734ae1ae9b1d69cde9e0652e))
* custom markers ([01c7258](https://github.com/inocan-group/vue3-google-map/commit/01c725831efa2fbc951c26e9585914c005b9502f))
* CustomControl component ([7048140](https://github.com/inocan-group/vue3-google-map/commit/704814087b48640714a64e069adc2d41b368455c))
* **CustomMarker:** add fastdom to batch reads and writes to the DOM ([cd405e9](https://github.com/inocan-group/vue3-google-map/commit/cd405e9468f561dc478d91c82cec5306309ec367))
* dev playground ([34ef843](https://github.com/inocan-group/vue3-google-map/commit/34ef843adfe0fec776f57f8e33847c459e39c01b))
* elementary map components ([671de4c](https://github.com/inocan-group/vue3-google-map/commit/671de4c28cd21f695c9dcc49c9fc9d8a23780df9))
* expose nonce option from @googlemaps/js-api-loader ([6e7bcdc](https://github.com/inocan-group/vue3-google-map/commit/6e7bcdc87919b561cc34d89fb6b7b6e7fef07e6c))
* expose open and close methods on InfoWindow ([d21dfba](https://github.com/inocan-group/vue3-google-map/commit/d21dfbaea309c94d9c9ce8a8a58676cd1760b768))
* expose underlying events ([8f903ef](https://github.com/inocan-group/vue3-google-map/commit/8f903ef2a67e393038004e9786d9d38f838dc31b))
* heatmap layer ([ed1361f](https://github.com/inocan-group/vue3-google-map/commit/ed1361f4a9ee5e7a35a234f152f3efb2a632e3d4))
* heatmap layer ([d961636](https://github.com/inocan-group/vue3-google-map/commit/d9616368e3aa263b45ad805058d73ae7e5c25ed2))
* info window enhancements ([57c895d](https://github.com/inocan-group/vue3-google-map/commit/57c895d14104dfa48467fd5e46797db9f3723363))
* info windows ([6a294f2](https://github.com/inocan-group/vue3-google-map/commit/6a294f2a86b55dca96137bde5e719923c634c4a7))
* loader libraries configurable as GoogleMap component prop ([cfd69a2](https://github.com/inocan-group/vue3-google-map/commit/cfd69a2d82ba0e867382d24749cf574c250ebb21))
* map events ([ff38c0f](https://github.com/inocan-group/vue3-google-map/commit/ff38c0ffb0943b2aaccddb05310a5fd2fef3b588))
* marker clusters ([6b00b1d](https://github.com/inocan-group/vue3-google-map/commit/6b00b1d1ad2fc3bfc13b0f0d3f70bd40992932e2))
* marker clusters ([5d58e2e](https://github.com/inocan-group/vue3-google-map/commit/5d58e2e9ead8356c972d7700b9218ba77889ad15))
* mouseout and contextmenu marker events ([ec40c6a](https://github.com/inocan-group/vue3-google-map/commit/ec40c6a781409c6b6cac24e0591b9fb10eae1556))
* **perf:** new default clustering algo ([#152](https://github.com/inocan-group/vue3-google-map/issues/152)) ([3feb791](https://github.com/inocan-group/vue3-google-map/commit/3feb791828f45066170e89aa94120a3cec36c447))
* re-export mapSymbol, apiSymbol, mapTilesLoadedSymbol for external usage ([#345](https://github.com/inocan-group/vue3-google-map/issues/345)) ([7f4aad4](https://github.com/inocan-group/vue3-google-map/commit/7f4aad40c0cb29410333b3ffd1ac3752a1e82017))
* reactivity on GoogleMap component options ([15c53bd](https://github.com/inocan-group/vue3-google-map/commit/15c53bdc976002f280ff7ce2bac2bd0a7e051efe))
* remaining map options ([3f29b84](https://github.com/inocan-group/vue3-google-map/commit/3f29b845946c8be86dcb68c68d45c487b78cf9f7))
* support cameraControl ([85b655e](https://github.com/inocan-group/vue3-google-map/commit/85b655e1397e3e9cbb28115772e3fda3ab329100))
* themes ([599968d](https://github.com/inocan-group/vue3-google-map/commit/599968dea2ac7cb9862318e04340317741e4a3d7))
* upgrade to @googlemaps/js-api-loader v2 ([5e0ccf3](https://github.com/inocan-group/vue3-google-map/commit/5e0ccf3f3393312321d847f2dd094e32a8db74b1))


### Bug Fixes

* add SafeSuperClusterViewportAlgorithm to handle empty markers ([e237270](https://github.com/inocan-group/vue3-google-map/commit/e2372704d19c6322b981429224cb7c578965b0fe)), closes [#362](https://github.com/inocan-group/vue3-google-map/issues/362)
* **AdvancedMarker:** resolve race condition with slot content rendering ([4c20cce](https://github.com/inocan-group/vue3-google-map/commit/4c20cceb7b5b8f2cc3e53e47042f6c3aa66daee0))
* api loading ([b3e824b](https://github.com/inocan-group/vue3-google-map/commit/b3e824b08f8680fd6511163a4fbb4046cff6f3f7))
* api loading ([2e817b9](https://github.com/inocan-group/vue3-google-map/commit/2e817b9211ee003e74ca618e738cd70d5919cde2))
* attrs fallthrough in custom markers and info windows ([c2a821f](https://github.com/inocan-group/vue3-google-map/commit/c2a821feb1a27254a167eea717ac9f64fdd343a1))
* **build:** fix lock file ([c011003](https://github.com/inocan-group/vue3-google-map/commit/c011003ab4176dca22244ddc62723f6d1c023067))
* **build:** lock file ([b82faeb](https://github.com/inocan-group/vue3-google-map/commit/b82faeb18d66027189c2cd4042c1ba09614af97a))
* **build:** lock file ([82f468e](https://github.com/inocan-group/vue3-google-map/commit/82f468ece16aeaf9c57ce6f1d955cbd8b612a0ca))
* **build:** update lock file ([326f22e](https://github.com/inocan-group/vue3-google-map/commit/326f22e6eab9d95bb38d829a37b67de7f77f4791))
* **build:** update lock file ([3cc083c](https://github.com/inocan-group/vue3-google-map/commit/3cc083cae03d4d2416312661d74cb72178f7b111))
* center and zoom reset when map config changes ([2af80fb](https://github.com/inocan-group/vue3-google-map/commit/2af80fbde91992f5d96175c1e50aa763ab5d567d))
* custom controls getting rendered outside of the map before its loaded ([13ff757](https://github.com/inocan-group/vue3-google-map/commit/13ff757f58f91d133a76d9f6d15bf8aef792f19b))
* custom markers reactivity ([4a06b12](https://github.com/inocan-group/vue3-google-map/commit/4a06b12b800fcb49d013c8b3cd5279f7ee0b5f25))
* **CustomControl:** ensure control index is set correctly ([7ae74fc](https://github.com/inocan-group/vue3-google-map/commit/7ae74fce615ef57a6f2ff39ad5c485a9212247ec))
* **docs:** adjust component registration to remove warning ([c019472](https://github.com/inocan-group/vue3-google-map/commit/c01947235a30af2791dda8b9ab4727c81690735e))
* **docs:** fix dev mode ([b0594ce](https://github.com/inocan-group/vue3-google-map/commit/b0594ce2324e0048b38ad3b2b9b9467dfb9fef60))
* dom management conflicts in custom markers ([f8f6bef](https://github.com/inocan-group/vue3-google-map/commit/f8f6beff78a37499e981354dd51f81b1db1eaa6a))
* dom management conflicts in info windows ([1d6e269](https://github.com/inocan-group/vue3-google-map/commit/1d6e26938012b09e7f17a0276085a8935902dcc9))
* dom managment conflicts in info windows and custom markers ([1cd817b](https://github.com/inocan-group/vue3-google-map/commit/1cd817b72cdf2a3b4c6a9812f8a7092265812210))
* explicitly declare emitted events ([5926daa](https://github.com/inocan-group/vue3-google-map/commit/5926daa45e93c5307bdc08af182e4dc52291e8f4))
* export bundled themes ([c95b2e9](https://github.com/inocan-group/vue3-google-map/commit/c95b2e9acffe067dda33f1c03f2af62ed466b925))
* expose custom marker ([68f5a3e](https://github.com/inocan-group/vue3-google-map/commit/68f5a3e2244e9a51abb3a7ccc3ebc394e3050b4b))
* fix docs build ([59f9f02](https://github.com/inocan-group/vue3-google-map/commit/59f9f02c23f953fc2e4ad1c5a82c29ef720226e4))
* fixed typing issue around Library type from google ([b30c419](https://github.com/inocan-group/vue3-google-map/commit/b30c41910a5f37fbcdbf77b55eccc4e26d2f4fb9))
* google map component styles ([13c31d6](https://github.com/inocan-group/vue3-google-map/commit/13c31d62df0a6e6d2a5cd99f023847b2cbbbe5f9))
* google map default properties ([76d5ab0](https://github.com/inocan-group/vue3-google-map/commit/76d5ab0ae57aa3e53e90c7ed09fed9db2e91e3ed))
* GoogleMap component initialization and types ([3b31cde](https://github.com/inocan-group/vue3-google-map/commit/3b31cdea4274b0dcca2b96c09c4477020c1803fa))
* heatmap layer ([ee04c85](https://github.com/inocan-group/vue3-google-map/commit/ee04c85cc4491740d4d4593465b48eb7f618746b))
* **HeatmapLayer:** support reactive data updates ([52816cf](https://github.com/inocan-group/vue3-google-map/commit/52816cfc6875f187abed92efccbe1e418b402afa))
* **InfoWindow:** resolve timing issue with nested InfoWindow in markers ([b8c3c19](https://github.com/inocan-group/vue3-google-map/commit/b8c3c199ccc607f557b464c36614e15eb4f4d18e))
* made markdown compatible with modern versions of vitepress ([c8d57bb](https://github.com/inocan-group/vue3-google-map/commit/c8d57bbf4782db269abb30cb034bb4eadeff070a))
* make js-api-loader a dependency ([a8fb747](https://github.com/inocan-group/vue3-google-map/commit/a8fb747ebd290e87a1572a2c8fcf6efd64b6f282))
* moved eslint-prettier to devDeps versus deps ([5a061ed](https://github.com/inocan-group/vue3-google-map/commit/5a061ed4cdf0fca26fa0b5ea487d88d7a80879d4))
* multiple maps ([99ffee2](https://github.com/inocan-group/vue3-google-map/commit/99ffee2337d20fd74ec065b9fb5b078c409b2d86))
* narrow event emit types from string[] to literal unions ([5aa3a26](https://github.com/inocan-group/vue3-google-map/commit/5aa3a26ade871167ba6b5ae1bbab7e18499678fa))
* prevent duplicate setOptions calls to avoid console warnings ([1c2a819](https://github.com/inocan-group/vue3-google-map/commit/1c2a819cda92dd167ebb0fccdf1b199dcf8f1759))
* prevent InfoWindow click listener setup race condition ([ceff802](https://github.com/inocan-group/vue3-google-map/commit/ceff80209e9d480d88cd187e946a80e3e0459a94))
* prevent marker flickering ([6d2cdb0](https://github.com/inocan-group/vue3-google-map/commit/6d2cdb05a4c572a5ee76d88834b1ff50ce8b4732))
* prevent trailing debounce after MarkerCluster.destroy() ([ac4a553](https://github.com/inocan-group/vue3-google-map/commit/ac4a55332f242b5c1e19b6d8bd12ffbda1edf788))
* separate map node from subcomponent nodes ([03eb860](https://github.com/inocan-group/vue3-google-map/commit/03eb86077954f3f083fbf7733e4a091b03dd18e6))
* set default as undefined for bool props ([7a2bcbf](https://github.com/inocan-group/vue3-google-map/commit/7a2bcbf4484b76b450690786bbfa67274a03da1d))
* themes types ([dc658a3](https://github.com/inocan-group/vue3-google-map/commit/dc658a3bc4f2204ea1ad1eb7df480ed245c1de58))
* type exports ([b000984](https://github.com/inocan-group/vue3-google-map/commit/b000984117f763357ad107d2ff6f0cb8271fb8c6))
* **types:** include custom marker options type ([942af39](https://github.com/inocan-group/vue3-google-map/commit/942af3917d74bcab857dc10c974e746e7aa9de3b))
* **types:** injection key types ([9691f6a](https://github.com/inocan-group/vue3-google-map/commit/9691f6ab6df61aba7b3dd1726a12f1a98b140c69))
* **types:** serve file ([caa92eb](https://github.com/inocan-group/vue3-google-map/commit/caa92eba356221b55610d3e3c578ba23dad9e330))
* unwrap component refs ([8d0443b](https://github.com/inocan-group/vue3-google-map/commit/8d0443befd842dd40169a0bda70fe5a8380ebeca))
* update Jest dependencies and resolve peer dependency issues ([aff90fc](https://github.com/inocan-group/vue3-google-map/commit/aff90fc4c5149c6bb6ee8263f29a67344b8ea507))
* updated .gitignore to fix the issue with navbar ([bf8d0a4](https://github.com/inocan-group/vue3-google-map/commit/bf8d0a41044f519dd8233ca8c44394cf1023371e))
* use composite + CLI --noEmit for typetest config to fix Vue language tools editor support ([859896d](https://github.com/inocan-group/vue3-google-map/commit/859896dddcf167942d2dba074d3c006f70d1e9d4))
* use gmp-click and PinElement directly to suppress AdvancedMarker deprecation warnings ([db2e12b](https://github.com/inocan-group/vue3-google-map/commit/db2e12b3c36b947473ccc78bac2eb5d0ede5fc1a)), closes [#371](https://github.com/inocan-group/vue3-google-map/issues/371)
* use gmp-click for InfoWindow anchor listener on AdvancedMarkerElement ([c408017](https://github.com/inocan-group/vue3-google-map/commit/c408017e6374116e0058d2324c914bf9092fd130)), closes [#373](https://github.com/inocan-group/vue3-google-map/issues/373)
* use with SSR ([5dd31c5](https://github.com/inocan-group/vue3-google-map/commit/5dd31c5f9839259683c36cc6c43dcb8e37f8475c))
* v-show with custom controls ([6cec18c](https://github.com/inocan-group/vue3-google-map/commit/6cec18c369fffc4b48b4ff7dcf77c32a024ff9d7))
* v-show with custom controls ([2716703](https://github.com/inocan-group/vue3-google-map/commit/2716703508acbf02cf3c9ee367189c679e0c47f3))


### Performance

* add debounced render for cluster markers ([ed4efc2](https://github.com/inocan-group/vue3-google-map/commit/ed4efc2ca8e3879fedb542de4f9a9d4092bdb03d))
* optimize CustomMarkerClass draw method ([93c2b50](https://github.com/inocan-group/vue3-google-map/commit/93c2b50c1199e1236dc4ddc7b5b829595964b905))
* replace JSON.stringify checks with fast-deep-equal ([4e511b2](https://github.com/inocan-group/vue3-google-map/commit/4e511b277199b680e0b351f93eebfee731e3ff5b))


### Build System

* separate entry point for bundled themes ([27ff148](https://github.com/inocan-group/vue3-google-map/commit/27ff148714656d04415d84b2c11663e4b0c84e16))

### [0.27.1](https://github.com/inocan-group/vue3-google-map/compare/v0.27.0...v0.27.1) (2026-03-17)


### Bug Fixes

* narrow event emit types from string[] to literal unions ([5aa3a26](https://github.com/inocan-group/vue3-google-map/commit/5aa3a26ade871167ba6b5ae1bbab7e18499678fa))
* use composite + CLI --noEmit for typetest config to fix Vue language tools editor support ([859896d](https://github.com/inocan-group/vue3-google-map/commit/859896dddcf167942d2dba074d3c006f70d1e9d4))
* use gmp-click and PinElement directly to suppress AdvancedMarker deprecation warnings ([db2e12b](https://github.com/inocan-group/vue3-google-map/commit/db2e12b3c36b947473ccc78bac2eb5d0ede5fc1a)), closes [#371](https://github.com/inocan-group/vue3-google-map/issues/371)
* use gmp-click for InfoWindow anchor listener on AdvancedMarkerElement ([c408017](https://github.com/inocan-group/vue3-google-map/commit/c408017e6374116e0058d2324c914bf9092fd130)), closes [#373](https://github.com/inocan-group/vue3-google-map/issues/373)

## [0.27.0](https://github.com/inocan-group/vue3-google-map/compare/v0.26.0...v0.27.0) (2026-01-09)


### Features

* export component exposed type interfaces for TypeScript users ([4455545](https://github.com/inocan-group/vue3-google-map/commit/44555457129bb22fff6b8844aecf34047ba2c444))
* export CustomMarkerOptions TypeScript interface ([56612d7](https://github.com/inocan-group/vue3-google-map/commit/56612d7f42872c8aac754fa76a8ac753b5093582))


### Bug Fixes

* add SafeSuperClusterViewportAlgorithm to handle empty markers ([e237270](https://github.com/inocan-group/vue3-google-map/commit/e2372704d19c6322b981429224cb7c578965b0fe)), closes [#362](https://github.com/inocan-group/vue3-google-map/issues/362)

## [0.26.0](https://github.com/inocan-group/vue3-google-map/compare/v0.25.1...v0.26.0) (2025-12-10)


### Features

* add debounced render for cluster markers ([ed4efc2](https://github.com/inocan-group/vue3-google-map/commit/ed4efc2ca8e3879fedb542de4f9a9d4092bdb03d))

### [0.25.1](https://github.com/inocan-group/vue3-google-map/compare/v0.25.0...v0.25.1) (2025-11-05)


### Bug Fixes

* prevent InfoWindow click listener setup race condition ([ceff802](https://github.com/inocan-group/vue3-google-map/commit/ceff80209e9d480d88cd187e946a80e3e0459a94))

### [0.25.0](https://github.com/inocan-group/vue3-google-map/compare/v0.24.1...v0.25.0) (2025-10-17)


### ⚠ BREAKING CHANGES

* upgrade to @googlemaps/js-api-loader v2

### Features

* upgrade to @googlemaps/js-api-loader v2 ([5e0ccf3](https://github.com/inocan-group/vue3-google-map/commit/5e0ccf3f3393312321d847f2dd094e32a8db74b1))

### [0.24.1](https://github.com/inocan-group/vue3-google-maps/compare/v0.24.0...v0.24.1) (2025-09-09)


### Bug Fixes

* **InfoWindow:** resolve timing issue with nested InfoWindow in markers ([b8c3c19](https://github.com/inocan-group/vue3-google-maps/commit/b8c3c199ccc607f557b464c36614e15eb4f4d18e))

### [0.24.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.23.1...v0.24.0) (2025-08-28)


### Features

* re-export mapSymbol, apiSymbol, mapTilesLoadedSymbol for external usage ([#345](https://github.com/inocan-group/vue3-google-maps/issues/345)) ([7f4aad4](https://github.com/inocan-group/vue3-google-maps/commit/7f4aad40c0cb29410333b3ffd1ac3752a1e82017))


### [0.23.1](https://github.com/inocan-group/vue3-google-maps/compare/v0.23.0...v0.23.1) (2025-07-25)


### Bug Fixes

* **AdvancedMarker:** resolve race condition with slot content rendering ([4c20cce](https://github.com/inocan-group/vue3-google-maps/commit/4c20cceb7b5b8f2cc3e53e47042f6c3aa66daee0)), closes [#322](https://github.com/inocan-group/vue3-google-maps/issues/322)
* **CustomControl:** ensure control index is set correctly ([7ae74fc](https://github.com/inocan-group/vue3-google-maps/commit/7ae74fce615ef57a6f2ff39ad5c485a9212247ec))

### [0.23.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.22.0...v0.23.0) (2025-07-07)


### ⚠ BREAKING CHANGES

* **AdvancedMarker:** Custom content now requires explicit `#content` slot instead of default slot. If you were using custom HTML content in AdvancedMarker in v0.22.0, wrap it in `<template #content>`. InfoWindow components are unaffected and continue using the default slot.


### Features

* **AdvancedMarker:** content slot for custom content ([db0515f](https://github.com/inocan-group/vue3-google-maps/commit/db0515f94fec6ebf0133f29c74ce2c79dfbc6020))


### Bug Fixes

* **HeatmapLayer:** support reactive data updates ([52816cf](https://github.com/inocan-group/vue3-google-maps/commit/52816cfc6875f187abed92efccbe1e418b402afa)), closes [#318](https://github.com/inocan-group/vue3-google-maps/issues/318) [#269](https://github.com/inocan-group/vue3-google-maps/issues/269)

### [0.22.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.21.1...v0.22.0) (2025-04-28)


### Features

* **AdvancedMarker:** support slot custom content ([c1fdb3f](https://github.com/inocan-group/vue3-google-maps/commit/c1fdb3f50234fd874a21be7d8d5f14dc0d5d0bfd))
* colorScheme support ([29720fb](https://github.com/inocan-group/vue3-google-maps/commit/29720fbae3ebcd246e5614a5cd3a6972730ddb95)), closes [#289](https://github.com/inocan-group/vue3-google-maps/issues/289)
* support cameraControl ([85b655e](https://github.com/inocan-group/vue3-google-maps/commit/85b655e1397e3e9cbb28115772e3fda3ab329100))

### [0.21.1](https://github.com/inocan-group/vue3-google-maps/compare/v0.21.0...v0.21.1) (2025-01-10)

optimize CustomMarkerClass draw method ([93c2b50](https://github.com/inocan-group/vue3-google-maps/commit/93c2b50c1199e1236dc4ddc7b5b829595964b905))


### [0.21.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.20.0...v0.21.0) (2024-08-04)


### Features

* advanced markers ([69a1b66](https://github.com/inocan-group/vue3-google-maps/commit/69a1b666267e2ee840c0df7530b1fbcc810c7021))


### [0.20.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.19.0...v0.20.0) (2024-03-19)


### Features

* expose nonce option from @googlemaps/js-api-loader ([6e7bcdc](https://github.com/inocan-group/vue3-google-maps/commit/6e7bcdc87919b561cc34d89fb6b7b6e7fef07e6c))


### Bug Fixes

* use with SSR ([5dd31c5](https://github.com/inocan-group/vue3-google-maps/commit/5dd31c5f9839259683c36cc6c43dcb8e37f8475c))

### [0.19.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.18.0...v0.19.0) (2024-01-19)


### Features

* add missing map props and events ([1e49172](https://github.com/inocan-group/vue3-google-maps/commit/1e491722b900925b827e1b572b644f51eb269fc3))


### Bug Fixes

* v-show with custom controls ([6cec18c](https://github.com/inocan-group/vue3-google-maps/commit/6cec18c369fffc4b48b4ff7dcf77c32a024ff9d7))

### [0.18.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.17.1...v0.18.0) (2023-09-28)


### Features

* add v-model to infowindow ([64ac3ac](https://github.com/inocan-group/vue3-google-maps/commit/64ac3ac42a9125ccf538553e97ba5b8dd0ac2c66))

### [0.17.1](https://github.com/inocan-group/vue3-google-maps/compare/v0.17.0...v0.17.1) (2023-08-27)


### Bug Fixes

* custom markers reactivity ([4a06b12](https://github.com/inocan-group/vue3-google-maps/commit/4a06b12b800fcb49d013c8b3cd5279f7ee0b5f25))

### [0.17.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.16.0...v0.17.0) (2023-08-12)


### Features

* **perf:** new default clustering algo ([#152](https://github.com/inocan-group/vue3-google-maps/issues/152)) ([3feb791](https://github.com/inocan-group/vue3-google-maps/commit/3feb791828f45066170e89aa94120a3cec36c447))

### [0.16.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.15.0...v0.16.0) (2023-08-07)


### Features

* expose open and close methods on InfoWindow ([d21dfba](https://github.com/inocan-group/vue3-google-maps/commit/d21dfbaea309c94d9c9ce8a8a58676cd1760b768))
* info window enhancements ([57c895d](https://github.com/inocan-group/vue3-google-maps/commit/57c895d14104dfa48467fd5e46797db9f3723363))


### Bug Fixes

* expose custom marker ([68f5a3e](https://github.com/inocan-group/vue3-google-maps/commit/68f5a3e2244e9a51abb3a7ccc3ebc394e3050b4b))

### [0.15.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.14.1...v0.15.0) (2022-09-03)

### [0.14.1](https://github.com/inocan-group/vue3-google-maps/compare/v0.14.0...v0.14.1) (2022-08-31)


### Bug Fixes

* heatmap layer ([ee04c85](https://github.com/inocan-group/vue3-google-maps/commit/ee04c85cc4491740d4d4593465b48eb7f618746b))

### [0.14.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.13.2...v0.14.0) (2022-08-24)


### Features

* heatmap layer ([d961636](https://github.com/inocan-group/vue3-google-maps/commit/d9616368e3aa263b45ad805058d73ae7e5c25ed2))

### [0.13.2](https://github.com/inocan-group/vue3-google-maps/compare/v0.13.1...v0.13.2) (2022-06-28)


### Bug Fixes

* attrs fallthrough in custom markers and info windows ([c2a821f](https://github.com/inocan-group/vue3-google-maps/commit/c2a821feb1a27254a167eea717ac9f64fdd343a1))

### [0.13.1](https://github.com/inocan-group/vue3-google-maps/compare/v0.13.0...v0.13.1) (2022-06-27)


### Bug Fixes

* dom management conflicts in custom markers ([f8f6bef](https://github.com/inocan-group/vue3-google-maps/commit/f8f6beff78a37499e981354dd51f81b1db1eaa6a))
* dom management conflicts in info windows ([1d6e269](https://github.com/inocan-group/vue3-google-maps/commit/1d6e26938012b09e7f17a0276085a8935902dcc9))

## [0.13.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.12.0...v0.13.0) (2022-05-28)


### Features

* allow loading api script externally ([2a55b60](https://github.com/inocan-group/vue3-google-maps/commit/2a55b60ae57fedf0e5315cb696bbbf9f70a1c2ae))

## [0.12.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.10.0...v0.12.0) (2022-05-19)


### Features

* custom markers ([ecc28b0](https://github.com/inocan-group/vue3-google-maps/commit/ecc28b0455a54502734ae1ae9b1d69cde9e0652e))
* add mapId in GoogleMap Component ([b72105c](https://github.com/inocan-group/vue3-google-maps/commit/b72105ca33bcf115ce83fe5a09ad4ccc5530d8bc))
## [0.11.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.10.0...v0.11.0) (2022-05-11)


### Features

* marker clusters ([5d58e2e](https://github.com/inocan-group/vue3-google-maps/commit/5d58e2e9ead8356c972d7700b9218ba77889ad15))

## [0.10.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.9.0...v0.10.0) (2022-03-25)


### ⚠ BREAKING CHANGES

* separate entry point for bundled themes

### build

* separate entry point for bundled themes ([27ff148](https://github.com/inocan-group/vue3-google-maps/commit/27ff148714656d04415d84b2c11663e4b0c84e16))

## [0.9.0](https://github.com/inocan-group/vue3-google-maps/compare/v0.8.5...v0.9.0) (2022-03-22)


### Features

* ability to nest info windows inside markers ([c239cc7](https://github.com/inocan-group/vue3-google-maps/commit/c239cc7ad0851ec0238e178e10835a9dfb0169a9))

### [0.8.5](https://github.com/inocan-group/vue3-google-maps/compare/v0.8.4...v0.8.5) (2022-03-21)


### Bug Fixes

* unwrap component refs ([8d0443b](https://github.com/inocan-group/vue3-google-maps/commit/8d0443befd842dd40169a0bda70fe5a8380ebeca))

### [0.8.4](https://github.com/inocan-group/vue3-google-maps/compare/v0.8.3...v0.8.4) (2022-03-20)


### Features

* info windows ([6a294f2](https://github.com/inocan-group/vue3-google-maps/commit/6a294f2a86b55dca96137bde5e719923c634c4a7))

### [0.8.3](https://github.com/inocan-group/vue3-google-maps/compare/v0.8.2...v0.8.3) (2021-12-12)


### Bug Fixes

* make js-api-loader a dependency ([a8fb747](https://github.com/inocan-group/vue3-google-maps/commit/a8fb747ebd290e87a1572a2c8fcf6efd64b6f282))
