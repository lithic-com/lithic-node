# Changelog

## [0.26.3](https://github.com/lithic-com/lithic-node/compare/v0.26.2...v0.26.3) (2023-08-24)


### Features

* **types:** export RequestOptions type ([#171](https://github.com/lithic-com/lithic-node/issues/171)) ([23b17a5](https://github.com/lithic-com/lithic-node/commit/23b17a58c897b5cd4fed93bb1de346442ed8f94b))


### Bug Fixes

* **core:** fix navigator check for strange environments ([#169](https://github.com/lithic-com/lithic-node/issues/169)) ([2effb1e](https://github.com/lithic-com/lithic-node/commit/2effb1eacb6c83497f1c17c39d68e0bc3aa9bc85))


### Chores

* **internal:** add missing eslint-plugin-prettier ([#168](https://github.com/lithic-com/lithic-node/issues/168)) ([f633bec](https://github.com/lithic-com/lithic-node/commit/f633bec5e82a6096b4de9d6c11c4f47e6766b4fe))
* **internal:** export HeadersInit type shim ([#172](https://github.com/lithic-com/lithic-node/issues/172)) ([7087a5e](https://github.com/lithic-com/lithic-node/commit/7087a5e1e7f2746da3e66385a70b09d7e5163f80))
* **internal:** minor reformatting of code ([#166](https://github.com/lithic-com/lithic-node/issues/166)) ([4fe0f2e](https://github.com/lithic-com/lithic-node/commit/4fe0f2ee4d86cf3152b5bec1e3779902d9140f5b))

## [0.26.2](https://github.com/lithic-com/lithic-node/compare/v0.26.1...v0.26.2) (2023-08-17)


### Features

* **client:** improve compatibility with Bun ([#164](https://github.com/lithic-com/lithic-node/issues/164)) ([83be353](https://github.com/lithic-com/lithic-node/commit/83be353583a543e86ecec579d0cbdb6062a526ab))
* **docs:** add documentation to the client constructor ([#162](https://github.com/lithic-com/lithic-node/issues/162)) ([085b3ce](https://github.com/lithic-com/lithic-node/commit/085b3ce5342f8cb96543902eafe8c673eb8df477))

## [0.26.1](https://github.com/lithic-com/lithic-node/compare/v0.26.0...v0.26.1) (2023-08-16)


### Bug Fixes

* **client:** fix TypeError when a request gets retried ([#159](https://github.com/lithic-com/lithic-node/issues/159)) ([2479a1d](https://github.com/lithic-com/lithic-node/commit/2479a1deca834002d8a1a23af1ef9abeb6ffd00b))

## [0.26.0](https://github.com/lithic-com/lithic-node/compare/v0.25.0...v0.26.0) (2023-08-15)


### ⚠ BREAKING CHANGES

* **api:** change `key` to `secret` ([#151](https://github.com/lithic-com/lithic-node/issues/151))

### Features

* allow a default timeout to be set for clients ([#153](https://github.com/lithic-com/lithic-node/issues/153)) ([cfcf540](https://github.com/lithic-com/lithic-node/commit/cfcf540c9aa2469db86d4d2955e572fa4077bc46))
* **api:** change `key` to `secret` ([#151](https://github.com/lithic-com/lithic-node/issues/151)) ([cbdf6ff](https://github.com/lithic-com/lithic-node/commit/cbdf6ff24b7dac25c7adda0fc052b3621667a995))


### Chores

* assign default reviewers to release PRs ([#154](https://github.com/lithic-com/lithic-node/issues/154)) ([6f2d47c](https://github.com/lithic-com/lithic-node/commit/6f2d47c0a6a1fd8a1f599fc464e1b9b53987847d))
* **client:** send Idempotency-Key header ([#157](https://github.com/lithic-com/lithic-node/issues/157)) ([c4cc591](https://github.com/lithic-com/lithic-node/commit/c4cc591b9936f348d528cc3ae202f340e08555d2))
* **internal:** fix error happening in CloudFlare pages ([#155](https://github.com/lithic-com/lithic-node/issues/155)) ([e92275b](https://github.com/lithic-com/lithic-node/commit/e92275b077d6fe2d3c5b2112ac4fe12b40d95260))
* **internal:** improve error message when option is missing ([#156](https://github.com/lithic-com/lithic-node/issues/156)) ([2b611e1](https://github.com/lithic-com/lithic-node/commit/2b611e107b4da4207c43dc0c53a8a64e6530d1ca))

## [0.25.0](https://github.com/lithic-com/lithic-node/compare/v0.24.7...v0.25.0) (2023-08-11)


### ⚠ BREAKING CHANGES

* **client:** support accessing raw response + remove deprecated features ([#144](https://github.com/lithic-com/lithic-node/issues/144))

### Features

* allOf models now have toXxx methods to access the separate allOf models ([#147](https://github.com/lithic-com/lithic-node/issues/147)) ([0894926](https://github.com/lithic-com/lithic-node/commit/0894926d88998603601d3a6be48224c8e039237d))
* **api:** add card reissue shipping options ([#146](https://github.com/lithic-com/lithic-node/issues/146)) ([6994187](https://github.com/lithic-com/lithic-node/commit/6994187c7b7f0c0d01974b9847cb8e934a5bbbe5))
* **client:** support accessing raw response + remove deprecated features ([#144](https://github.com/lithic-com/lithic-node/issues/144)) ([e878150](https://github.com/lithic-com/lithic-node/commit/e87815013b4ad52e1679a6eee5b5646602cc0616))


### Documentation

* **readme:** minor updates ([#148](https://github.com/lithic-com/lithic-node/issues/148)) ([f8cb722](https://github.com/lithic-com/lithic-node/commit/f8cb722626e6bfa4d12ff43f09b9c8357365d132))


### Chores

* **internal:** conditionally include bin during build output ([#149](https://github.com/lithic-com/lithic-node/issues/149)) ([f40814b](https://github.com/lithic-com/lithic-node/commit/f40814b88c3b33895d136573b3935318f1a1edae))

## [0.24.7](https://github.com/lithic-com/lithic-node/compare/v0.24.6...v0.24.7) (2023-08-08)


### Features

* **api:** add carrier property to card create and reissue params ([#142](https://github.com/lithic-com/lithic-node/issues/142)) ([e4c2f80](https://github.com/lithic-com/lithic-node/commit/e4c2f80bc1ac9189d16e91ece605a3a2d0b7e2fc))
* **client:** detect browser usage ([#134](https://github.com/lithic-com/lithic-node/issues/134)) ([435048b](https://github.com/lithic-com/lithic-node/commit/435048b45406c186bd72335a0d915061c2d75212))
* **streaming:** add `.toReadableStream()` method ([#137](https://github.com/lithic-com/lithic-node/issues/137)) ([ef39493](https://github.com/lithic-com/lithic-node/commit/ef394938acfb064ab37d9cde87e27a846c9e9170))


### Documentation

* **api:** improve custom method arguments ([#136](https://github.com/lithic-com/lithic-node/issues/136)) ([4aac347](https://github.com/lithic-com/lithic-node/commit/4aac3476e39a399d50ed6b5362ecea29565b037a))
* **readme:** remove beta status + document versioning policy ([#133](https://github.com/lithic-com/lithic-node/issues/133)) ([025b4da](https://github.com/lithic-com/lithic-node/commit/025b4da0474f56f393c54a85ae56f28ad4d362c9))


### Chores

* **internal:** change jest exclude patterns ([#141](https://github.com/lithic-com/lithic-node/issues/141)) ([a05b1f5](https://github.com/lithic-com/lithic-node/commit/a05b1f531b570da0d5cd7b721625cb01b83c2449))
* **internal:** fix deno build ([#130](https://github.com/lithic-com/lithic-node/issues/130)) ([4c3f0ec](https://github.com/lithic-com/lithic-node/commit/4c3f0ec594f2a801817c7528fd61185fa7ecc102))
* **internal:** fix deno build ([#132](https://github.com/lithic-com/lithic-node/issues/132)) ([577285e](https://github.com/lithic-com/lithic-node/commit/577285efc167fd57168a8088c78410344330e94d))
* **internal:** remove deno build ([#135](https://github.com/lithic-com/lithic-node/issues/135)) ([0adca64](https://github.com/lithic-com/lithic-node/commit/0adca64e93ab0761720c165a0bfd7236b5e8bb91))
* **internal:** update eslint ([#139](https://github.com/lithic-com/lithic-node/issues/139)) ([f7f3958](https://github.com/lithic-com/lithic-node/commit/f7f3958985eaadf4f7b46ec16f0e96cba8e03ba1))
* **internal:** update tsconfig-paths dep ([#140](https://github.com/lithic-com/lithic-node/issues/140)) ([6a74bb0](https://github.com/lithic-com/lithic-node/commit/6a74bb0dd6891849c4d95a1758798bab0c52263c))
* **internal:** update typescript ([#138](https://github.com/lithic-com/lithic-node/issues/138)) ([f835405](https://github.com/lithic-com/lithic-node/commit/f8354056956cf8c58525307de363bcf09aa9ff55))

## [0.24.6](https://github.com/lithic-com/lithic-node/compare/v0.24.5...v0.24.6) (2023-08-01)


### Features

* **api:** updates ([#126](https://github.com/lithic-com/lithic-node/issues/126)) ([c3577a8](https://github.com/lithic-com/lithic-node/commit/c3577a8b6027462cad47ee3a5a0cf76ca8f0b8a5))


### Bug Fixes

* adjust typo of 'descisioning' to 'decisioning' ([#127](https://github.com/lithic-com/lithic-node/issues/127)) ([96dace8](https://github.com/lithic-com/lithic-node/commit/96dace804788f23c9703d40aa4de6304c7433e37))


### Chores

* **internal:** allow the build script to be run without yarn installed ([#124](https://github.com/lithic-com/lithic-node/issues/124)) ([6dfd64a](https://github.com/lithic-com/lithic-node/commit/6dfd64add41a376a54f973d26bc63cd87d3e9723))


### Refactors

* create build for deno.land ([#128](https://github.com/lithic-com/lithic-node/issues/128)) ([bb328f1](https://github.com/lithic-com/lithic-node/commit/bb328f1c4c1b98591b671bff98640e0b311163eb))

## [0.24.5](https://github.com/lithic-com/lithic-node/compare/v0.24.4...v0.24.5) (2023-07-29)


### Bug Fixes

* **client:** handle undefined process in more places ([#120](https://github.com/lithic-com/lithic-node/issues/120)) ([b7db3b0](https://github.com/lithic-com/lithic-node/commit/b7db3b0397992ef1027858254d879c49095d4afa))
* fix undefined message in errors ([#118](https://github.com/lithic-com/lithic-node/issues/118)) ([dbf75e1](https://github.com/lithic-com/lithic-node/commit/dbf75e16ae9351093cff9ee3d0e35480baf4d990))


### Chores

* **internal:** minor refactoring of client instantiation ([#121](https://github.com/lithic-com/lithic-node/issues/121)) ([295ce37](https://github.com/lithic-com/lithic-node/commit/295ce37d0c2703ef71cde77440f70682c1be9d22))


### Refactors

* use destructuring arguments in client constructor and respect false values ([#122](https://github.com/lithic-com/lithic-node/issues/122)) ([7541c30](https://github.com/lithic-com/lithic-node/commit/7541c3040af5b0a78b7f81b57f97fdb9dba129cd))

## [0.24.4](https://github.com/lithic-com/lithic-node/compare/v0.24.3...v0.24.4) (2023-07-27)


### Features

* **api:** add payment and external bank accounts resource ([#115](https://github.com/lithic-com/lithic-node/issues/115)) ([5e05974](https://github.com/lithic-com/lithic-node/commit/5e05974b8dd129ac703af0d26178593e55298458))

## [0.24.3](https://github.com/lithic-com/lithic-node/compare/v0.24.2...v0.24.3) (2023-07-21)


### Features

* **api:** add `with_content` param ([#112](https://github.com/lithic-com/lithic-node/issues/112)) ([ba96fbc](https://github.com/lithic-com/lithic-node/commit/ba96fbcc68f5ef843a88c193e12911c399bcc10b))
* **streaming:** make requests immediately throw an error if an aborted signal is passed in ([#113](https://github.com/lithic-com/lithic-node/issues/113)) ([954d123](https://github.com/lithic-com/lithic-node/commit/954d12398d7e20fa7dab8ab23da5cddd14071443))


### Bug Fixes

* **client:** fix errors with file uploads in the browser ([#110](https://github.com/lithic-com/lithic-node/issues/110)) ([9ec8513](https://github.com/lithic-com/lithic-node/commit/9ec8513c597391917abf90443e78f2a1b8fce37c))

## [0.24.2](https://github.com/lithic-com/lithic-node/compare/v0.24.1...v0.24.2) (2023-07-18)


### Features

* **api:** add event message attempts ([#108](https://github.com/lithic-com/lithic-node/issues/108)) ([6782634](https://github.com/lithic-com/lithic-node/commit/678263497e125daef1fea63bc7ea572bf2edfb7d))
* **client:** export ClientOptions interface ([#107](https://github.com/lithic-com/lithic-node/issues/107)) ([f3b95da](https://github.com/lithic-com/lithic-node/commit/f3b95da69ffdaec37bfd12b356ed935fa6b686b0))


### Bug Fixes

* fix error in environments without `TextEncoder` ([#103](https://github.com/lithic-com/lithic-node/issues/103)) ([7b52d28](https://github.com/lithic-com/lithic-node/commit/7b52d281622c7c041fdc4e470b2694ddf71660d8))
* fix export map order ([#106](https://github.com/lithic-com/lithic-node/issues/106)) ([f50c121](https://github.com/lithic-com/lithic-node/commit/f50c12199c0dfca9f33ddce3406d46c6b557355b))


### Chores

* **internal:** restructure code to stringify query ([#105](https://github.com/lithic-com/lithic-node/issues/105)) ([b0250e6](https://github.com/lithic-com/lithic-node/commit/b0250e6301534ad093c5b87d631ed4b08c189309))

## [0.24.1](https://github.com/lithic-com/lithic-node/compare/v0.24.0...v0.24.1) (2023-07-17)


### Features

* **api:** add more enum members to event types ([#97](https://github.com/lithic-com/lithic-node/issues/97)) ([f3d00ab](https://github.com/lithic-com/lithic-node/commit/f3d00aba092def3e5a0892a786b0629e95808f6f))
* **api:** no longer require `website_url` property on KYB object ([#101](https://github.com/lithic-com/lithic-node/issues/101)) ([e3ef210](https://github.com/lithic-com/lithic-node/commit/e3ef210fb4364c1c75627882ad7679b641431eec))


### Bug Fixes

* fix errors with "named" client export in CJS ([#100](https://github.com/lithic-com/lithic-node/issues/100)) ([21b5761](https://github.com/lithic-com/lithic-node/commit/21b5761ae9163457c0aab159a188f77e583bb920))


### Documentation

* **readme:** improvements to formatting code snippets ([#94](https://github.com/lithic-com/lithic-node/issues/94)) ([55fc71c](https://github.com/lithic-com/lithic-node/commit/55fc71c22f350698923d45410c6bbc52189af439))


### Chores

* **internal:** add helper function for b64 ([#98](https://github.com/lithic-com/lithic-node/issues/98)) ([0dff514](https://github.com/lithic-com/lithic-node/commit/0dff5145a8c60b9b9281a2e2221716daff5f1c0d))
* **internal:** let `toFile` helper accept promises to objects with name/type properties ([#99](https://github.com/lithic-com/lithic-node/issues/99)) ([a5b6bd2](https://github.com/lithic-com/lithic-node/commit/a5b6bd20b5e4c38443eb6486d1eaf2abbc5bd4c4))
* **internal:** remove unused streaming implementation ([#96](https://github.com/lithic-com/lithic-node/issues/96)) ([8f291b0](https://github.com/lithic-com/lithic-node/commit/8f291b0921fd91f9008d60a9a78129f7918e8ee1))

## [0.24.0](https://github.com/lithic-com/lithic-node/compare/v0.23.1...v0.24.0) (2023-07-12)


### ⚠ BREAKING CHANGES

* **api:** remove previous_auth_rule_tokens from auth rules ([#69](https://github.com/lithic-com/lithic-node/issues/69))
* import issue with ESM ([#67](https://github.com/lithic-com/lithic-node/issues/67))

### Features

* **api:** add `state` query param for cards ([#75](https://github.com/lithic-com/lithic-node/issues/75)) ([c96b7c2](https://github.com/lithic-com/lithic-node/commit/c96b7c2d89d5d2cec11f041e7892641130fd94b9))
* **api:** add digital wallet tokenization result event type ([#78](https://github.com/lithic-com/lithic-node/issues/78)) ([b19aa40](https://github.com/lithic-com/lithic-node/commit/b19aa4062089e9462e19f93bf9ab047e722048e0))
* **client:** add support for `defaultQuery` option ([#65](https://github.com/lithic-com/lithic-node/issues/65)) ([7717bab](https://github.com/lithic-com/lithic-node/commit/7717bab9ac29d6ec13e940502afb6f9c8133c86c))
* **client:** add support for passing a `signal` request option ([#93](https://github.com/lithic-com/lithic-node/issues/93)) ([282b130](https://github.com/lithic-com/lithic-node/commit/282b130e721038fbc4da5592c73ef644d59d3498))
* **client:** improve timeout handling to reuse agent ([#85](https://github.com/lithic-com/lithic-node/issues/85)) ([4234475](https://github.com/lithic-com/lithic-node/commit/42344759b3832c840cba25b19993b03abbb3ab5a))
* **client:** support passing a custom `fetch` function ([#89](https://github.com/lithic-com/lithic-node/issues/89)) ([31f7043](https://github.com/lithic-com/lithic-node/commit/31f70434f53a7383eed2ae2760797693cc489f71))


### Bug Fixes

* **client:** properly handle multi-byte characters in Content-Length ([#90](https://github.com/lithic-com/lithic-node/issues/90)) ([2b5b8a4](https://github.com/lithic-com/lithic-node/commit/2b5b8a4e2b2e858cfa579c6cabaefc75528179d1))
* **examples:** avoid swallowing errors in example scripts ([#87](https://github.com/lithic-com/lithic-node/issues/87)) ([eb99d8b](https://github.com/lithic-com/lithic-node/commit/eb99d8be2355cdb54e138e930cc92c8fab8d7152))
* fix errors in package source files when users go to definition in VSCode ([#84](https://github.com/lithic-com/lithic-node/issues/84)) ([b5a5187](https://github.com/lithic-com/lithic-node/commit/b5a518700d03715ccfc1b82469bc4c2a98d11292))
* import issue with ESM ([#67](https://github.com/lithic-com/lithic-node/issues/67)) ([1f4dd35](https://github.com/lithic-com/lithic-node/commit/1f4dd353fc819f15b85d3d882cdf79d9b1d686c4))
* include README.md, LICENSE and CHANGELOG.md in published package ([#81](https://github.com/lithic-com/lithic-node/issues/81)) ([67322a5](https://github.com/lithic-com/lithic-node/commit/67322a511ae239c13b3244f36d847da36f7468b0))
* **streaming:** do not abort successfully completed streams ([#92](https://github.com/lithic-com/lithic-node/issues/92)) ([055c148](https://github.com/lithic-com/lithic-node/commit/055c148e1805b8d447942e12d3b9f95136d9d4e1))
* **streaming:** fix response body streaming in non-Chrome environments ([#86](https://github.com/lithic-com/lithic-node/issues/86)) ([19dac17](https://github.com/lithic-com/lithic-node/commit/19dac1730b35a6ffdb77dcd4d04ec53a5d3deb99))
* **streaming:** polyfill ReadableStream async iterator and text decoding ([#80](https://github.com/lithic-com/lithic-node/issues/80)) ([e9284dd](https://github.com/lithic-com/lithic-node/commit/e9284dd96f35199bc14b126c4a7e5deb670c3b01))
* support `PromiseLike` input to `toFile` ([#83](https://github.com/lithic-com/lithic-node/issues/83)) ([042d985](https://github.com/lithic-com/lithic-node/commit/042d985831d04b41ceec9b90c1774d30374660e3))


### Chores

* **internal:** fix release please version config ([#79](https://github.com/lithic-com/lithic-node/issues/79)) ([b5e66bd](https://github.com/lithic-com/lithic-node/commit/b5e66bdf63b4561cce18840b5a4ffb7ec6ba2203))
* **internal:** fix tsc usage ([#71](https://github.com/lithic-com/lithic-node/issues/71)) ([43aaf98](https://github.com/lithic-com/lithic-node/commit/43aaf98876beb40deb11fdb907d285a9fad763e8))
* set `noEmit: true` in `tsconfig.json`, since it's for typechecking only ([#76](https://github.com/lithic-com/lithic-node/issues/76)) ([d8af616](https://github.com/lithic-com/lithic-node/commit/d8af616285b143e4c70fbb626b60f6df22893822))


### Refactors

* **api:** remove previous_auth_rule_tokens from auth rules ([#69](https://github.com/lithic-com/lithic-node/issues/69)) ([7b02c26](https://github.com/lithic-com/lithic-node/commit/7b02c269b4df76cae2ff8b33aa2469fde54a6e13))
* improve streaming implementation ([#82](https://github.com/lithic-com/lithic-node/issues/82)) ([3461f73](https://github.com/lithic-com/lithic-node/commit/3461f732576536dfe007020100c592be75326226))
* mark `.responseHeaders` and `.response` as deprecated ([#73](https://github.com/lithic-com/lithic-node/issues/73)) ([3948d6c](https://github.com/lithic-com/lithic-node/commit/3948d6c46a5be7e2eff9377e81fa86393d196279))
* move to src directory, improve ecosystem compatibility ([#63](https://github.com/lithic-com/lithic-node/issues/63)) ([cb34e4d](https://github.com/lithic-com/lithic-node/commit/cb34e4da686179f37366514429e894c003c205ff))
* **streaming:** make response body streaming polyfill more spec-compliant ([#88](https://github.com/lithic-com/lithic-node/issues/88)) ([4d39ed3](https://github.com/lithic-com/lithic-node/commit/4d39ed3957843c509432dc7762b019c40d518251))


### Documentation

* **api.md:** add context to types exported in a different resource ([#77](https://github.com/lithic-com/lithic-node/issues/77)) ([f9e2369](https://github.com/lithic-com/lithic-node/commit/f9e23691f1491ff4706c060e0a728bdd1d80664b))
* **api.md:** fix links not referencing `src` directory ([#66](https://github.com/lithic-com/lithic-node/issues/66)) ([92ce20f](https://github.com/lithic-com/lithic-node/commit/92ce20fa304f13ea677db8880ae55ac482cff3dd))
* **client:** improve documentation for client options ([#68](https://github.com/lithic-com/lithic-node/issues/68)) ([6bf3856](https://github.com/lithic-com/lithic-node/commit/6bf38561198a3f1378a2c37634d8c6ae20cb100a))
* **readme:** minor improvements ([#91](https://github.com/lithic-com/lithic-node/issues/91)) ([589416b](https://github.com/lithic-com/lithic-node/commit/589416b8cec33efd552976371afe4a1a30336971))

## [0.23.1](https://github.com/lithic-com/lithic-node/compare/v0.23.0...v0.23.1) (2023-06-30)


### Bug Fixes

* **types:** remove incorrect duplicated `Promise` from some return types ([#59](https://github.com/lithic-com/lithic-node/issues/59)) ([60a0994](https://github.com/lithic-com/lithic-node/commit/60a0994c47fe51997e36b4d8cbf42965757048f5))


### Documentation

* **api.md:** minor restructuring ([#61](https://github.com/lithic-com/lithic-node/issues/61)) ([e812012](https://github.com/lithic-com/lithic-node/commit/e812012d5b3bf9c321636b9ea6eb8f30e96fb8a7))

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
