# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
