# Changelog

## [0.21.0](https://github.com/lithic-com/lithic-node/compare/v0.20.1...v0.21.0) (2023-06-15)


### ⚠ BREAKING CHANGES

* **api:** remove avs_type property, add dispute evidence filename, and mark properties nullable ([#38](https://github.com/lithic-com/lithic-node/issues/38))
* **api:** replace `transaction_token` param in favour of `transaction_tokens` ([#17](https://github.com/lithic-com/lithic-node/issues/17))
* rename `event_types[]` param to `event_types` ([#13](https://github.com/lithic-com/lithic-node/issues/13))
* **api:** add tokenization decisioning endpoints and remove unused funding sources API
* **api:** add tokenization decisioning endpoints and remove unused funding sources API

### Features

* add additional coercion functions ([423092d](https://github.com/lithic-com/lithic-node/commit/423092df0eed7732672dc9094f63d6c48ef34d31))
* add example ([6914452](https://github.com/lithic-com/lithic-node/commit/691445235bf8c8b2c9c1d25b313219e9cb282c41))
* add example ([6914452](https://github.com/lithic-com/lithic-node/commit/691445235bf8c8b2c9c1d25b313219e9cb282c41))
* add internal support for streaming responses ([bac5539](https://github.com/lithic-com/lithic-node/commit/bac55399379e4d61aede9e1b3aabf4824c4cdb55))
* add internal support for streaming responses ([1613c60](https://github.com/lithic-com/lithic-node/commit/1613c60dd76e917ff961c716e50c6abe6fa857d6))
* add internal support for streaming responses ([1613c60](https://github.com/lithic-com/lithic-node/commit/1613c60dd76e917ff961c716e50c6abe6fa857d6))
* add new resources and misc api updates ([bbb351e](https://github.com/lithic-com/lithic-node/commit/bbb351ec03ea30e8328b3777dcc8faa2ca6e8f84))
* add webhook HMAC verification helper methods ([7b50732](https://github.com/lithic-com/lithic-node/commit/7b50732d61ca88b7f9d8198fd86ec895e0d35a68))
* add webhook HMAC verification helper methods ([7b50732](https://github.com/lithic-com/lithic-node/commit/7b50732d61ca88b7f9d8198fd86ec895e0d35a68))
* **api:** add `get /auth_stream/secret` & `post /auth_stream/secret/rotate` ([1e24e9e](https://github.com/lithic-com/lithic-node/commit/1e24e9e0cad8101dcf1a3a007c60b4b88d573e21))
* **api:** add `get /auth_stream/secret` & `post /auth_stream/secret/rotate` ([1e24e9e](https://github.com/lithic-com/lithic-node/commit/1e24e9e0cad8101dcf1a3a007c60b4b88d573e21))
* **api:** add download_url property to dispute evidence ([3965eb3](https://github.com/lithic-com/lithic-node/commit/3965eb3c73738b7fcee84d38a3bf3f8fa71eadf1))
* **api:** add events and event subscriptions ([8edc449](https://github.com/lithic-com/lithic-node/commit/8edc4493c58865d794baccd3a939cb5807987180))
* **api:** add mcc (merchant category code) properties ([d3112a4](https://github.com/lithic-com/lithic-node/commit/d3112a4bdecf2ac145252588380fb542de5b8f25))
* **api:** add tokenization decisioning endpoints and remove unused funding sources API ([8006391](https://github.com/lithic-com/lithic-node/commit/800639197f5fb8ee7da718dd8f9d2e58d05cb209))
* **api:** add tokenization decisioning endpoints and remove unused funding sources API ([8006391](https://github.com/lithic-com/lithic-node/commit/800639197f5fb8ee7da718dd8f9d2e58d05cb209))
* **api:** dispute upload custom method ([718faf2](https://github.com/lithic-com/lithic-node/commit/718faf2ef67ce517bbc54298e95781ff6a3f55e4))
* **api:** dispute upload custom method ([718faf2](https://github.com/lithic-com/lithic-node/commit/718faf2ef67ce517bbc54298e95781ff6a3f55e4))
* **api:** dispute upload custom method ([c0b3f89](https://github.com/lithic-com/lithic-node/commit/c0b3f89db9d8d8c4efb9b63566e82b8072bc62a6))
* **api:** dispute upload custom method ([c0b3f89](https://github.com/lithic-com/lithic-node/commit/c0b3f89db9d8d8c4efb9b63566e82b8072bc62a6))
* **api:** disputes & mark url as a required param in `lithic.events.subscriptions.update()` ([cb8fa35](https://github.com/lithic-com/lithic-node/commit/cb8fa35ebe3c99d87475576d518922c3528a7297))
* **api:** more detailed `post /disputes/{dispute_token}/evidences` response ([d2b5043](https://github.com/lithic-com/lithic-node/commit/d2b504354880bca7508ea9f377eee370c142df04))
* **api:** remove avs_type property, add dispute evidence filename, and mark properties nullable ([#38](https://github.com/lithic-com/lithic-node/issues/38)) ([ba61e63](https://github.com/lithic-com/lithic-node/commit/ba61e63bab2ef2fb3cc92596c440e3a03b4eb132))
* **api:** updates ([e5cf3fe](https://github.com/lithic-com/lithic-node/commit/e5cf3fe3c0333134d471ad9037135edd05efb3dd))
* **api:** updates ([80f3820](https://github.com/lithic-com/lithic-node/commit/80f382018f0ad560b8e7ca216474e90259df6b0b))
* **api:** updates ([80f3820](https://github.com/lithic-com/lithic-node/commit/80f382018f0ad560b8e7ca216474e90259df6b0b))
* **api:** updates ([d3112a4](https://github.com/lithic-com/lithic-node/commit/d3112a4bdecf2ac145252588380fb542de5b8f25))
* **api:** updates ([5a72d74](https://github.com/lithic-com/lithic-node/commit/5a72d744eb9a2724a5352d7046f11b7c8038299f))
* **api:** updates ([6a72370](https://github.com/lithic-com/lithic-node/commit/6a723701f8bad7bfecfa7f56d61e739cb8aa56d5))
* **client:** add support for specifying client-level default headers ([#29](https://github.com/lithic-com/lithic-node/issues/29)) ([f0134a0](https://github.com/lithic-com/lithic-node/commit/f0134a0d5a0a486aad648bb3a1b78cd6e95c4389))
* configure idempotency header ([a42b8f6](https://github.com/lithic-com/lithic-node/commit/a42b8f6d967c1ea3288c22806ac06f690bd9fae0))
* configure idempotency header ([a42b8f6](https://github.com/lithic-com/lithic-node/commit/a42b8f6d967c1ea3288c22806ac06f690bd9fae0))
* **docs:** add more doc comments ([3499dce](https://github.com/lithic-com/lithic-node/commit/3499dcee36cac143f397faa4c208a04202fb1c3a))
* **docs:** improve doc comments ([778a839](https://github.com/lithic-com/lithic-node/commit/778a8391a8efb5d81cb7860d5405512338d06426))
* improve error message for missing authentication ([89e0991](https://github.com/lithic-com/lithic-node/commit/89e099140c93a115e38517f3e844e5e99d00a37e))
* improve error message for missing authentication ([89e0991](https://github.com/lithic-com/lithic-node/commit/89e099140c93a115e38517f3e844e5e99d00a37e))
* improve names for KYC & KYB types ([10c5a92](https://github.com/lithic-com/lithic-node/commit/10c5a9274a54d820eceb1ba1e1502ec603ba4a22))
* **internal:** add support for positional params ([e4ef1d8](https://github.com/lithic-com/lithic-node/commit/e4ef1d8bdc4cddb640732a3d560fb962a0370eaf))
* **internal:** add support for positional params ([e4ef1d8](https://github.com/lithic-com/lithic-node/commit/e4ef1d8bdc4cddb640732a3d560fb962a0370eaf))
* **internal:** improve example generation ([502b399](https://github.com/lithic-com/lithic-node/commit/502b39989b5f03871094a9c0ac8b25d9d564adee))
* **internal:** improve example generation ([502b399](https://github.com/lithic-com/lithic-node/commit/502b39989b5f03871094a9c0ac8b25d9d564adee))
* split types file into smaller files based on resources ([40c96ab](https://github.com/lithic-com/lithic-node/commit/40c96abe3f50360da5e309506a0e7423952e3367))
* support cursor ID pagination ([6031a24](https://github.com/lithic-com/lithic-node/commit/6031a24d6565cc50a5d891bac04596bdeadb1415))
* support cursor ID pagination ([6031a24](https://github.com/lithic-com/lithic-node/commit/6031a24d6565cc50a5d891bac04596bdeadb1415))
* **tsconfig:** set declarationMap: true ([bec9e14](https://github.com/lithic-com/lithic-node/commit/bec9e14bfb65ff5ed0a3fc6188c1af0b8e868de4))
* **tsconfig:** set declarationMap: true ([bec9e14](https://github.com/lithic-com/lithic-node/commit/bec9e14bfb65ff5ed0a3fc6188c1af0b8e868de4))
* use coroutines for async services ([d0add6e](https://github.com/lithic-com/lithic-node/commit/d0add6e528388f3bba87965098351c59334b3305))
* use coroutines for async services ([d0add6e](https://github.com/lithic-com/lithic-node/commit/d0add6e528388f3bba87965098351c59334b3305))
* use more specific types for string types with the date, date-time, and uuid formats ([2261136](https://github.com/lithic-com/lithic-node/commit/2261136bdf789293390cfbfbf0f7bcffb3649a65))
* use more specific types for string types with the date, date-time, and uuid formats ([2261136](https://github.com/lithic-com/lithic-node/commit/2261136bdf789293390cfbfbf0f7bcffb3649a65))


### Bug Fixes

* **event &gt; payload** type is now any object instead of unknown ([72f3842](https://github.com/lithic-com/lithic-node/commit/72f3842ac604f61272029d018397b82df741605e))
* add missing properties to AuthRule ([bc7124b](https://github.com/lithic-com/lithic-node/commit/bc7124b0cf67a9c521befaf0e13cd0c9d0e71995))
* allow importing in typescript without manually installing @types/web ([59c3f19](https://github.com/lithic-com/lithic-node/commit/59c3f1979e746718814d615da09704d1764fb2e5))
* always send application/json headers with auth-stream enrollment endpoints ([8031eee](https://github.com/lithic-com/lithic-node/commit/8031eee4c91c2847d390b4e8114b8d2ed1f06e6d))
* **api:** set default account holder create timeout to 5 minutes ([bd2dcf6](https://github.com/lithic-com/lithic-node/commit/bd2dcf6a138b1b882e630bd2de00148efd4693d0))
* bump @types/node version ([2732353](https://github.com/lithic-com/lithic-node/commit/27323535c03ecc370849edecfed91c254b5b01ee))
* bump @types/node version ([b4b2756](https://github.com/lithic-com/lithic-node/commit/b4b2756e10592c47168f20e8bab0d3c5d09d79a3))
* **client:** correctly send array query params ([91ee451](https://github.com/lithic-com/lithic-node/commit/91ee45186db3af1de9900e197cf30fb706c7c3fe))
* **client:** handle trailing slash in base url properly ([#25](https://github.com/lithic-com/lithic-node/issues/25)) ([1362c29](https://github.com/lithic-com/lithic-node/commit/1362c297e858ac82d5b29e3a86e04b4fa49c831a))
* **client:** properly expose `maxRetries` option ([f381173](https://github.com/lithic-com/lithic-node/commit/f38117351429aa2e009041d07f7634cb6089e20b))
* **internal:** fix TS error when setting global AbortController polyfill ([433f34b](https://github.com/lithic-com/lithic-node/commit/433f34b7fad42c8e5b06c52ef6a401fbb23093d4))
* **internal:** fix TS error when setting global AbortController polyfill ([433f34b](https://github.com/lithic-com/lithic-node/commit/433f34b7fad42c8e5b06c52ef6a401fbb23093d4))
* polyfill AbortController more safely ([64a1d1e](https://github.com/lithic-com/lithic-node/commit/64a1d1e3061ee02b195b4cd53ce670c0429f8473))
* polyfill AbortController more safely ([64a1d1e](https://github.com/lithic-com/lithic-node/commit/64a1d1e3061ee02b195b4cd53ce670c0429f8473))
* rename `event_types[]` param to `event_types` ([#13](https://github.com/lithic-com/lithic-node/issues/13)) ([53ef5ef](https://github.com/lithic-com/lithic-node/commit/53ef5ef389bff5c0b91e2c8ac81cb21a1df351ec))
* unwrap webhooks into payload, not event ([a825f66](https://github.com/lithic-com/lithic-node/commit/a825f66ed79d708875c6af6e7a8ad249ea03072c))
* unwrap webhooks into payload, not event ([54df666](https://github.com/lithic-com/lithic-node/commit/54df6666e691a254a8a903b9738d0b746678fe59))
* unwrap webhooks into payload, not event ([54df666](https://github.com/lithic-com/lithic-node/commit/54df6666e691a254a8a903b9738d0b746678fe59))
* update README ([e06dad8](https://github.com/lithic-com/lithic-node/commit/e06dad87810373d340383eee66cc79299f4b9d21))
* use 5 minute timeout instead of freeSocketTimeout in keep alive agent ([7bb9996](https://github.com/lithic-com/lithic-node/commit/7bb9996ff8abc1c942ed641d3f53c593bcca7b42))


### Refactors

* **api:** replace `transaction_token` param in favour of `transaction_tokens` ([#17](https://github.com/lithic-com/lithic-node/issues/17)) ([afdfa1f](https://github.com/lithic-com/lithic-node/commit/afdfa1f0c0b3b3d03a823b78ebea7a3d40fbb2a3))
* **docs:** cleanup api.md response types ([ac89a97](https://github.com/lithic-com/lithic-node/commit/ac89a97d634deac0d8a7f5ca56dfb175db3dfdd7))
* move away from crypto for timingSafeEqual ([cc5ce4d](https://github.com/lithic-com/lithic-node/commit/cc5ce4df3e996a0f96a5cbdcaa6d7fb1523103ae))
* move away from crypto for timingSafeEqual ([cc5ce4d](https://github.com/lithic-com/lithic-node/commit/cc5ce4df3e996a0f96a5cbdcaa6d7fb1523103ae))
* remove ability to read the api key from the environment ([706515b](https://github.com/lithic-com/lithic-node/commit/706515bf667ec3cfaf4fd021fe98c312ca5e0e2d))
* reorganize pagination class definitions ([41bce70](https://github.com/lithic-com/lithic-node/commit/41bce70a248ad6e1e1c2140ca9b8a99652f8a697))
* reorganize pagination class definitions ([41bce70](https://github.com/lithic-com/lithic-node/commit/41bce70a248ad6e1e1c2140ca9b8a99652f8a697))


### Documentation

* add and tweak some docstrings ([13dbeb7](https://github.com/lithic-com/lithic-node/commit/13dbeb7285d4bea29dbded5d9e8b5e9fdac62e7c))
* add documentation on manual pagination ([693f4a1](https://github.com/lithic-com/lithic-node/commit/693f4a1419a85120debe98a85dfc2d1ccdc429a6))
* add example for HMAC verification ([1fb6f78](https://github.com/lithic-com/lithic-node/commit/1fb6f78aa108a2134ec0accc479c00b5fe8a2603))
* add example for HMAC verification ([1fb6f78](https://github.com/lithic-com/lithic-node/commit/1fb6f78aa108a2134ec0accc479c00b5fe8a2603))
* add example for uploading dispute evidence ([#27](https://github.com/lithic-com/lithic-node/issues/27)) ([a3b6b0b](https://github.com/lithic-com/lithic-node/commit/a3b6b0b3742be381738f01860192c07fd41efb09))
* improve docstrings ([#23](https://github.com/lithic-com/lithic-node/issues/23)) ([a9531d4](https://github.com/lithic-com/lithic-node/commit/a9531d4b5000fe26bf21ab0902e8a338e71b3ebe))
* point to github repo instead of email contact ([#35](https://github.com/lithic-com/lithic-node/issues/35)) ([4e91480](https://github.com/lithic-com/lithic-node/commit/4e91480f372da5a011894c012e51d1b75f8ab053))
* small grammar fix ([2a5e494](https://github.com/lithic-com/lithic-node/commit/2a5e4947c0e0c8dca96cd3ca02baffddb981585a))


### Chores

* format CHANGELOG ([#20](https://github.com/lithic-com/lithic-node/issues/20)) ([6e048c0](https://github.com/lithic-com/lithic-node/commit/6e048c0955b383f520cc653ecd9a6bf1201ce92f))
* **internal:** add empty request preparation method ([#28](https://github.com/lithic-com/lithic-node/issues/28)) ([f7534d5](https://github.com/lithic-com/lithic-node/commit/f7534d5a20f28d646a8824851bfb5752df0acdee))
* **internal:** add prettierignore ([#22](https://github.com/lithic-com/lithic-node/issues/22)) ([66a2170](https://github.com/lithic-com/lithic-node/commit/66a2170b7f07640e8211b59f94a6bdb07c0fd5d7))
* **internal:** enable automatic releases ([#11](https://github.com/lithic-com/lithic-node/issues/11)) ([69eb228](https://github.com/lithic-com/lithic-node/commit/69eb228013f39e214521f917f0c723590e725bf2))
* **internal:** fix workflow comment url ([#24](https://github.com/lithic-com/lithic-node/issues/24)) ([1efb03f](https://github.com/lithic-com/lithic-node/commit/1efb03fab4a14f92f10a554c74dcfd0a72d4e86d))
* **internal:** handle server-sent events more robustly ([#26](https://github.com/lithic-com/lithic-node/issues/26)) ([b5b13b0](https://github.com/lithic-com/lithic-node/commit/b5b13b043a007743b7b9ca66188a386a1d20b723))
* **internal:** improve check-version script ([24b62c0](https://github.com/lithic-com/lithic-node/commit/24b62c061cd29592a2cc5c863a04a022a7c64cb1))
* **internal:** improve SSE decoding of lines ([#36](https://github.com/lithic-com/lithic-node/issues/36)) ([300a3b5](https://github.com/lithic-com/lithic-node/commit/300a3b5f1de1c32645dbce52cd4d37223ea32947))
* **internal:** improve support for streaming responses ([9220609](https://github.com/lithic-com/lithic-node/commit/9220609d38db7da6635fb6f6523db9ff3d0c3e7f))
* **internal:** improve test case names ([849a309](https://github.com/lithic-com/lithic-node/commit/849a30925212a866ecde695a60ad1f8e3600e46a))
* **internal:** minor streaming cleanups ([038b20f](https://github.com/lithic-com/lithic-node/commit/038b20fce1cbea5a857a2e3d4e83ecd8a763309c))
* **internal:** minor streaming cleanups ([038b20f](https://github.com/lithic-com/lithic-node/commit/038b20fce1cbea5a857a2e3d4e83ecd8a763309c))
* **internal:** restructure core streaming implementation ([#30](https://github.com/lithic-com/lithic-node/issues/30)) ([25cb8d1](https://github.com/lithic-com/lithic-node/commit/25cb8d1c625fbe25bb8ebb5f6b10158e6ecdc09d))
* **internal:** small cleanup of error handling ([c02e614](https://github.com/lithic-com/lithic-node/commit/c02e61482c1a1cc160d1b17fafb661e44c6d9a1e))
* **internal:** small cleanup of error handling ([c02e614](https://github.com/lithic-com/lithic-node/commit/c02e61482c1a1cc160d1b17fafb661e44c6d9a1e))
* **internal:** update changelog config ([#14](https://github.com/lithic-com/lithic-node/issues/14)) ([ed07776](https://github.com/lithic-com/lithic-node/commit/ed077763f6987157e6aa23f57c5a334b538fe500))
* **internal:** update tsconfig ([bf14992](https://github.com/lithic-com/lithic-node/commit/bf149925ebdd3da5315c5d9a771e68aa911d4ef0))
* **internal:** updates to type formatting & remove duplicated types ([#31](https://github.com/lithic-com/lithic-node/issues/31)) ([5d02d5f](https://github.com/lithic-com/lithic-node/commit/5d02d5fffdf9f23a25befa9de1c43b0607a426f4))
* **main:** release lithic 0.19.0 ([#16](https://github.com/lithic-com/lithic-node/issues/16)) ([4a49ca9](https://github.com/lithic-com/lithic-node/commit/4a49ca98c7604f4944f64ec4b41ddea4e1502411))
* **main:** release lithic 0.20.0 ([f25d124](https://github.com/lithic-com/lithic-node/commit/f25d124a3117f27d273d3a9fa9a5c3be39d3ae49))
* **main:** release lithic 0.20.1 ([d241f6f](https://github.com/lithic-com/lithic-node/commit/d241f6f99d819e2516f977c0f4ff4bcd071d2e85))
* minor formatting fixes ([d3fb9bb](https://github.com/lithic-com/lithic-node/commit/d3fb9bb7ac0ee800b2d89017e06e258551f923f0))
* ordering of fields in package.json ([31052b5](https://github.com/lithic-com/lithic-node/commit/31052b548dac0ebd3bcc2b9737eb6c96e6485262))
* ordering of fields in package.json ([31052b5](https://github.com/lithic-com/lithic-node/commit/31052b548dac0ebd3bcc2b9737eb6c96e6485262))
* reformat package.json ([c537d2e](https://github.com/lithic-com/lithic-node/commit/c537d2ea23358d934ab7b1799e7e89f01dcf0322))
* reorder some methods ([e8d2462](https://github.com/lithic-com/lithic-node/commit/e8d2462ae4177952713af7ed5115a0094aeec909))
* restructuring ([0eb9e89](https://github.com/lithic-com/lithic-node/commit/0eb9e89b62e965f236b948d3728979d128db99ce))

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
