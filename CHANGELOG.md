# Changelog

## [0.23.0](https://github.com/lithic-com/lithic-node/compare/v0.22.0...v0.23.0) (2023-06-29)


### ⚠ BREAKING CHANGES

* **types:** singularize array item types ([#51](https://github.com/lithic-com/lithic-node/issues/51))

### Features

* support ESM and web platform runtimes; easier file uploads ([#54](https://github.com/lithic-com/lithic-node/issues/54)) ([fbd72c9](https://github.com/lithic-com/lithic-node/commit/fbd72c983cfb10390b220c071b055fb0fdb17717))
* **types:** export nested types through the root client export ([#49](https://github.com/lithic-com/lithic-node/issues/49)) ([461c917](https://github.com/lithic-com/lithic-node/commit/461c91799409e2838f2608d92e5d24b252cf3e9b))


### Bug Fixes

* **form-data:** strip out undefined properties ([#47](https://github.com/lithic-com/lithic-node/issues/47)) ([537a86f](https://github.com/lithic-com/lithic-node/commit/537a86fe9485bd018880eb320038d9a33268776c))


### Refactors

* **types:** singularize array item types ([#51](https://github.com/lithic-com/lithic-node/issues/51)) ([9256ccb](https://github.com/lithic-com/lithic-node/commit/9256ccb20acf4f15f5fb723e8173f1066e073d69))


### Styles

* minor reordering of types and properties ([#55](https://github.com/lithic-com/lithic-node/issues/55)) ([3a749fe](https://github.com/lithic-com/lithic-node/commit/3a749fe4bdc2eb3c7f63e583f04dd1141f609167))


### Chores

* speed up build script slightly ([#56](https://github.com/lithic-com/lithic-node/issues/56)) ([f717247](https://github.com/lithic-com/lithic-node/commit/f7172470b14655fccfc6779e276ec89e6ea6bdf1))


### Documentation

* **api.md:** fix custom methods section listing too many methods ([#53](https://github.com/lithic-com/lithic-node/issues/53)) ([ccca3c8](https://github.com/lithic-com/lithic-node/commit/ccca3c8caf330ecfe792f84301e6c217341ceaaf))
* **api:** update account limits docstrings ([#50](https://github.com/lithic-com/lithic-node/issues/50)) ([3125649](https://github.com/lithic-com/lithic-node/commit/31256490143a5292d6d31dc89a090c0ff89ca6d8))
* **api:** update limits docstrings ([#52](https://github.com/lithic-com/lithic-node/issues/52)) ([12f07f2](https://github.com/lithic-com/lithic-node/commit/12f07f2eed8b137b3efa496f23f708dbe4493ba5))
* rearrange sections in api.md ([#57](https://github.com/lithic-com/lithic-node/issues/57)) ([9c59157](https://github.com/lithic-com/lithic-node/commit/9c59157cee15ba1b7125cc36ff9eb6a29dc779ee))

## [0.22.0](https://github.com/lithic-com/lithic-node/compare/v0.21.0...v0.22.0) (2023-06-19)


### ⚠ BREAKING CHANGES

* drop official support for EOL Node versions (Node 12, 13, 14, 15) ([#44](https://github.com/lithic-com/lithic-node/issues/44))

### Bug Fixes

* **internal:** improve stream cancellation handling of abort controllers ([#43](https://github.com/lithic-com/lithic-node/issues/43)) ([5ce8f9c](https://github.com/lithic-com/lithic-node/commit/5ce8f9c6d315946803ffe5de65bd58d70b96f242))


### Refactors

* move error type definitions to error.ts ([#40](https://github.com/lithic-com/lithic-node/issues/40)) ([55507d6](https://github.com/lithic-com/lithic-node/commit/55507d6b06ace054b7125cb1972517970f2b935d))


### Documentation

* **api:** clarify dispute evidence filename docstring ([#42](https://github.com/lithic-com/lithic-node/issues/42)) ([e56cb1b](https://github.com/lithic-com/lithic-node/commit/e56cb1b2734880474901e90aea954a4074f18eca))
* drop official support for EOL Node versions (Node 12, 13, 14, 15) ([#44](https://github.com/lithic-com/lithic-node/issues/44)) ([cb3e710](https://github.com/lithic-com/lithic-node/commit/cb3e710fa49b137355ff59f524b4ab811c715eeb))


### Build System

* add `.github` folder to `.npmignore` ([#45](https://github.com/lithic-com/lithic-node/issues/45)) ([b536747](https://github.com/lithic-com/lithic-node/commit/b536747a7ad41f45b078b4b28231281168ac2612))

## [0.21.0](https://github.com/lithic-com/lithic-node/compare/v0.20.1...v0.21.0) (2023-06-15)


### ⚠ BREAKING CHANGES

* **api:** remove avs_type property, add dispute evidence filename, and mark properties nullable ([#38](https://github.com/lithic-com/lithic-node/issues/38))

### Features

* **api:** remove avs_type property, add dispute evidence filename, and mark properties nullable ([#38](https://github.com/lithic-com/lithic-node/issues/38)) ([ba61e63](https://github.com/lithic-com/lithic-node/commit/ba61e63bab2ef2fb3cc92596c440e3a03b4eb132))


### Documentation

* point to github repo instead of email contact ([#35](https://github.com/lithic-com/lithic-node/issues/35)) ([4e91480](https://github.com/lithic-com/lithic-node/commit/4e91480f372da5a011894c012e51d1b75f8ab053))


### Chores

* **internal:** improve SSE decoding of lines ([#36](https://github.com/lithic-com/lithic-node/issues/36)) ([300a3b5](https://github.com/lithic-com/lithic-node/commit/300a3b5f1de1c32645dbce52cd4d37223ea32947))

## [0.20.1](https://github.com/lithic-com/lithic-node/compare/lithic-v0.20.0...lithic-v0.20.1) (2023-06-12)


### Features

* **client:** add support for specifying client-level default headers ([#29](https://github.com/lithic-com/lithic-node/issues/29)) ([f0134a0](https://github.com/lithic-com/lithic-node/commit/f0134a0d5a0a486aad648bb3a1b78cd6e95c4389))


### Bug Fixes

* **client:** handle trailing slash in base url properly ([#25](https://github.com/lithic-com/lithic-node/issues/25)) ([1362c29](https://github.com/lithic-com/lithic-node/commit/1362c297e858ac82d5b29e3a86e04b4fa49c831a))

## [0.20.0](https://github.com/lithic-com/lithic-node/compare/lithic-v0.19.0...lithic-v0.20.0) (2023-05-12)

### ⚠ BREAKING CHANGES

- **api:** replace `transaction_token` param in favour of `transaction_tokens` ([#17](https://github.com/lithic-com/lithic-node/issues/17))

### Refactors

- **api:** replace `transaction_token` param in favour of `transaction_tokens` ([#17](https://github.com/lithic-com/lithic-node/issues/17)) ([afdfa1f](https://github.com/lithic-com/lithic-node/commit/afdfa1f0c0b3b3d03a823b78ebea7a3d40fbb2a3))

## [0.19.0](https://github.com/lithic-com/lithic-node/compare/lithic-v0.18.0...lithic-v0.19.0) (2023-05-12)

### ⚠ BREAKING CHANGES

- rename `event_types[]` param to `event_types` ([#13](https://github.com/lithic-com/lithic-node/issues/13))
