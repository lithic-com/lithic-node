# Changelog

## 0.63.0 (2024-08-09)

Full Changelog: [v0.62.0...v0.63.0](https://github.com/lithic-com/lithic-node/compare/v0.62.0...v0.63.0)

### ⚠ BREAKING CHANGES

* **api:** rename property 'FinancialAccounts.Statement.AccountStanding.state' to 'period_state' ([#461](https://github.com/lithic-com/lithic-node/issues/461))

### Features

* **api:** add event type 'card.reissued' ([#456](https://github.com/lithic-com/lithic-node/issues/456)) ([171491e](https://github.com/lithic-com/lithic-node/commit/171491e5361fe889769f4ccd5cc93d6fd5fdcfdb))
* **api:** add methods to simulate enrollment review and enrollment document review ([#458](https://github.com/lithic-com/lithic-node/issues/458)) ([a944668](https://github.com/lithic-com/lithic-node/commit/a9446682d3deec78bb8116fff4a2de3c2785fb03))
* **api:** rename property 'FinancialAccounts.Statement.AccountStanding.state' to 'period_state' ([#461](https://github.com/lithic-com/lithic-node/issues/461)) ([216cd59](https://github.com/lithic-com/lithic-node/commit/216cd59cfa4535d17d6af77309b142cac1e24126))


### Chores

* **internal:** updates ([#460](https://github.com/lithic-com/lithic-node/issues/460)) ([55b045d](https://github.com/lithic-com/lithic-node/commit/55b045d64eda14e2dee2b9f1b527e2af23bceea2))

## 0.62.0 (2024-08-05)

Full Changelog: [v0.61.3...v0.62.0](https://github.com/lithic-com/lithic-node/compare/v0.61.3...v0.62.0)

### Features

* **api:** add event type 'statements.created' ([#454](https://github.com/lithic-com/lithic-node/issues/454)) ([43b66a1](https://github.com/lithic-com/lithic-node/commit/43b66a145e2309d5f90885217d6ce4794728f7a0))

## 0.61.3 (2024-08-02)

Full Changelog: [v0.61.2...v0.61.3](https://github.com/lithic-com/lithic-node/compare/v0.61.2...v0.61.3)

### Chores

* **ci:** run transactions example ([#452](https://github.com/lithic-com/lithic-node/issues/452)) ([f6e89ab](https://github.com/lithic-com/lithic-node/commit/f6e89aba187c1325d336f08c72e67bca99419bce))

## 0.61.2 (2024-07-31)

Full Changelog: [v0.61.1...v0.61.2](https://github.com/lithic-com/lithic-node/compare/v0.61.1...v0.61.2)

### Chores

* **ci:** correctly tag pre-release npm packages ([#450](https://github.com/lithic-com/lithic-node/issues/450)) ([065ff64](https://github.com/lithic-com/lithic-node/commit/065ff64dff498208492894b2039e2bce593a4fa4))
* **docs:** fix incorrect client var names ([ebd3519](https://github.com/lithic-com/lithic-node/commit/ebd351992a98ee693b9d1de26c27e94f45bf9676))
* **internal:** add constant for default timeout ([#449](https://github.com/lithic-com/lithic-node/issues/449)) ([140a01e](https://github.com/lithic-com/lithic-node/commit/140a01ec7636b017dac39e4f90c45c490fb2dec1))

## 0.61.1 (2024-07-25)

Full Changelog: [v0.61.0...v0.61.1](https://github.com/lithic-com/lithic-node/compare/v0.61.0...v0.61.1)

### Bug Fixes

* **compat:** remove ReadableStream polyfill redundant since node v16 ([#442](https://github.com/lithic-com/lithic-node/issues/442)) ([e09eb97](https://github.com/lithic-com/lithic-node/commit/e09eb97a7c24814aa883ac8b758bb1c3e36d4a21))

## 0.61.0 (2024-07-23)

Full Changelog: [v0.60.0...v0.61.0](https://github.com/lithic-com/lithic-node/compare/v0.60.0...v0.61.0)

### ⚠ BREAKING CHANGES

* **api:** deprecate 'auth rule token' in 'card' and 'account holder' models ([#441](https://github.com/lithic-com/lithic-node/issues/441))

### Features

* **api:** deprecate 'auth rule token' in 'card' and 'account holder' models ([#441](https://github.com/lithic-com/lithic-node/issues/441)) ([9691937](https://github.com/lithic-com/lithic-node/commit/9691937282109dbd4dbd139d749c343343463b84))


### Chores

* **tests:** update prism version ([#439](https://github.com/lithic-com/lithic-node/issues/439)) ([7f7e93f](https://github.com/lithic-com/lithic-node/commit/7f7e93f4bdb026a5051e6ee4d15c03ef77a941f0))

## 0.60.0 (2024-07-19)

Full Changelog: [v0.59.0...v0.60.0](https://github.com/lithic-com/lithic-node/compare/v0.59.0...v0.60.0)

### Features

* **api:** add method to retrieve a transaction's enhanced commercial data ([#438](https://github.com/lithic-com/lithic-node/issues/438)) ([17f3900](https://github.com/lithic-com/lithic-node/commit/17f39000b7c42b6efa2aeed4bfecdc17d39e349e))


### Chores

* **ci:** limit release doctor target branches ([#437](https://github.com/lithic-com/lithic-node/issues/437)) ([668b387](https://github.com/lithic-com/lithic-node/commit/668b387bc45cb129baa8fcf954216f2c1a6b3e35))
* **docs:** use client instead of package name in Node examples ([#435](https://github.com/lithic-com/lithic-node/issues/435)) ([8b79aa7](https://github.com/lithic-com/lithic-node/commit/8b79aa79a93f85892391044a7edc55176fa6a02a))

## 0.59.0 (2024-07-17)

Full Changelog: [v0.58.0...v0.59.0](https://github.com/lithic-com/lithic-node/compare/v0.58.0...v0.59.0)

### Features

* **api:** updates ([#434](https://github.com/lithic-com/lithic-node/issues/434)) ([c4a84f5](https://github.com/lithic-com/lithic-node/commit/c4a84f50ea520b8ae0badaf4e0484ce81020136c))


### Chores

* **docs:** mention support of web browser runtimes ([#433](https://github.com/lithic-com/lithic-node/issues/433)) ([9066fb8](https://github.com/lithic-com/lithic-node/commit/9066fb820b43c91b81e52dc450d87f9a37f8486b))
* **docs:** minor update to formatting of API link in README ([#431](https://github.com/lithic-com/lithic-node/issues/431)) ([e29b335](https://github.com/lithic-com/lithic-node/commit/e29b3351bed33faf5ea2428a1da7968e3e1fcecd))

## 0.58.0 (2024-07-11)

Full Changelog: [v0.57.1...v0.58.0](https://github.com/lithic-com/lithic-node/compare/v0.57.1...v0.58.0)

### ⚠ BREAKING CHANGES

* **api:** param 'financial_account_token' for 'externalBankAccounts.create()' is now required ([#429](https://github.com/lithic-com/lithic-node/issues/429))

### Features

* **api:** param 'financial_account_token' for 'externalBankAccounts.create()' is now required ([#429](https://github.com/lithic-com/lithic-node/issues/429)) ([6e6d493](https://github.com/lithic-com/lithic-node/commit/6e6d493d43f412cb2c781e71e7b3ac7d0ffcbbb8))

## 0.57.1 (2024-07-11)

Full Changelog: [v0.57.0...v0.57.1](https://github.com/lithic-com/lithic-node/compare/v0.57.0...v0.57.1)

### Chores

* **ci:** also run workflows for PRs targeting `next` ([#427](https://github.com/lithic-com/lithic-node/issues/427)) ([b9a08fc](https://github.com/lithic-com/lithic-node/commit/b9a08fc25a69f44563a0aeb9c17bc4e75647515c))
* gitignore test server logs ([#426](https://github.com/lithic-com/lithic-node/issues/426)) ([d26c312](https://github.com/lithic-com/lithic-node/commit/d26c3121f3189567c74729db09ebf162d6451c2f))
* **internal:** minor reformatting ([#423](https://github.com/lithic-com/lithic-node/issues/423)) ([54710b1](https://github.com/lithic-com/lithic-node/commit/54710b10678613d60584c8918bc16e78afa61ed9))


### Documentation

* **examples:** update example values ([#428](https://github.com/lithic-com/lithic-node/issues/428)) ([7675cc8](https://github.com/lithic-com/lithic-node/commit/7675cc86cbbef1d2f3863980ffff70652391285c))

## 0.57.0 (2024-06-21)

Full Changelog: [v0.56.0...v0.57.0](https://github.com/lithic-com/lithic-node/compare/v0.56.0...v0.57.0)

### ⚠ BREAKING CHANGES

* **api:** remove unused event type 'statement.created'
* **api:** remove unused business account type
* **api:** remove unused embed request params type
* **api:** updates ([#421](https://github.com/lithic-com/lithic-node/issues/421))

### Features

* **api:** add 'reverse' method for book transfers ([7be7b26](https://github.com/lithic-com/lithic-node/commit/7be7b2643916c2802e4a50152001689bc6399eac))
* **api:** add field 'trace numbers' to payment method attribute model ([7be7b26](https://github.com/lithic-com/lithic-node/commit/7be7b2643916c2802e4a50152001689bc6399eac))
* **api:** remove unused business account type ([7be7b26](https://github.com/lithic-com/lithic-node/commit/7be7b2643916c2802e4a50152001689bc6399eac))
* **api:** remove unused embed request params type ([7be7b26](https://github.com/lithic-com/lithic-node/commit/7be7b2643916c2802e4a50152001689bc6399eac))
* **api:** remove unused event type 'statement.created' ([7be7b26](https://github.com/lithic-com/lithic-node/commit/7be7b2643916c2802e4a50152001689bc6399eac))
* **api:** updates ([#421](https://github.com/lithic-com/lithic-node/issues/421)) ([7be7b26](https://github.com/lithic-com/lithic-node/commit/7be7b2643916c2802e4a50152001689bc6399eac))

## 0.56.0 (2024-06-12)

Full Changelog: [v0.55.0...v0.56.0](https://github.com/lithic-com/lithic-node/compare/v0.55.0...v0.56.0)

### Features

* **api:** updates ([#420](https://github.com/lithic-com/lithic-node/issues/420)) ([4fc3a79](https://github.com/lithic-com/lithic-node/commit/4fc3a79f0cfb3db0ba95bbfc4d928ab2254c9cc1))
* support `application/octet-stream` request bodies ([#418](https://github.com/lithic-com/lithic-node/issues/418)) ([2bde2bf](https://github.com/lithic-com/lithic-node/commit/2bde2bf1ddf281354af4b9440cd60efefeba19b0))

## 0.55.0 (2024-06-05)

Full Changelog: [v0.54.1...v0.55.0](https://github.com/lithic-com/lithic-node/compare/v0.54.1...v0.55.0)

### ⚠ BREAKING CHANGES

* **api:** remove some endpoints and other API updates ([#416](https://github.com/lithic-com/lithic-node/issues/416))

### Features

* **api:** remove some endpoints and other API updates ([#416](https://github.com/lithic-com/lithic-node/issues/416)) ([9d0c5ef](https://github.com/lithic-com/lithic-node/commit/9d0c5efa3852fa189d3de49d12e5a812bed712ac))

## 0.54.1 (2024-05-31)

Full Changelog: [v0.54.0...v0.54.1](https://github.com/lithic-com/lithic-node/compare/v0.54.0...v0.54.1)

### Bug Fixes

* allow git imports for pnpm ([#414](https://github.com/lithic-com/lithic-node/issues/414)) ([0676f77](https://github.com/lithic-com/lithic-node/commit/0676f77d8f7cf8a084790ba08e7c8be770a9a38f))

## 0.54.0 (2024-05-30)

Full Changelog: [v0.53.0...v0.54.0](https://github.com/lithic-com/lithic-node/compare/v0.53.0...v0.54.0)

### Features

* **api:** update detailed_results enum values ([#412](https://github.com/lithic-com/lithic-node/issues/412)) ([80f89e0](https://github.com/lithic-com/lithic-node/commit/80f89e054d1573bc20595f986dc765a32220aab1))

## 0.53.0 (2024-05-29)

Full Changelog: [v0.52.0...v0.53.0](https://github.com/lithic-com/lithic-node/compare/v0.52.0...v0.53.0)

### Features

* **api:** add simulate_receipt and simulate_action endpoints ([#410](https://github.com/lithic-com/lithic-node/issues/410)) ([80cf1d6](https://github.com/lithic-com/lithic-node/commit/80cf1d6b1c940690af18d6060998d74534baf0e7))

## 0.52.0 (2024-05-29)

Full Changelog: [v0.51.2...v0.52.0](https://github.com/lithic-com/lithic-node/compare/v0.51.2...v0.52.0)

### Features

* **api:** updates ([#409](https://github.com/lithic-com/lithic-node/issues/409)) ([c64e290](https://github.com/lithic-com/lithic-node/commit/c64e290623a68474a8a6cec7e9f10c5536237170))


### Chores

* **client:** update unset params headers handling ([#407](https://github.com/lithic-com/lithic-node/issues/407)) ([76d6a54](https://github.com/lithic-com/lithic-node/commit/76d6a547106fe01c10d3d4a66efb4665c2aa89ee))
* **internal:** add slightly better logging to scripts ([#404](https://github.com/lithic-com/lithic-node/issues/404)) ([6248367](https://github.com/lithic-com/lithic-node/commit/6248367255670d47247334e0ae81303a4542b6df))
* **tests:** update some example values ([#406](https://github.com/lithic-com/lithic-node/issues/406)) ([d636a76](https://github.com/lithic-com/lithic-node/commit/d636a7646d4a0c0d58bd4d2f47fa3dad08ef6a76))


### Documentation

* **readme:** add bundle size badge ([#408](https://github.com/lithic-com/lithic-node/issues/408)) ([4838c01](https://github.com/lithic-com/lithic-node/commit/4838c018a772ee0d7bc9a105a2cc29468c77403c))


### Refactors

* change import paths to be relative ([#402](https://github.com/lithic-com/lithic-node/issues/402)) ([d36de3d](https://github.com/lithic-com/lithic-node/commit/d36de3d99c628269897d735d90db6e9c5d4c8483))

## 0.51.2 (2024-05-10)

Full Changelog: [v0.51.1...v0.51.2](https://github.com/lithic-com/lithic-node/compare/v0.51.1...v0.51.2)

### Bug Fixes

* remove lingering file ([83456da](https://github.com/lithic-com/lithic-node/commit/83456da9127e920b97a3b1648618e4e71017c44e))


### Chores

* **docs:** add SECURITY.md ([#400](https://github.com/lithic-com/lithic-node/issues/400)) ([3118c71](https://github.com/lithic-com/lithic-node/commit/3118c71109325a141966c6699f109455592f3237))

## 0.51.1 (2024-05-03)

Full Changelog: [v0.51.0...v0.51.1](https://github.com/lithic-com/lithic-node/compare/v0.51.0...v0.51.1)

### Bug Fixes

* **package:** revert recent client file change ([#394](https://github.com/lithic-com/lithic-node/issues/394)) ([824bf8d](https://github.com/lithic-com/lithic-node/commit/824bf8d6fb2768c539f47ec953743d0538b5d5c3))

## 0.51.0 (2024-05-02)

Full Changelog: [v0.50.0...v0.51.0](https://github.com/lithic-com/lithic-node/compare/v0.50.0...v0.51.0)

### Features

* **api:** changes to balance-related return types and other API changes ([#386](https://github.com/lithic-com/lithic-node/issues/386)) ([7d8bf1a](https://github.com/lithic-com/lithic-node/commit/7d8bf1a6241c884aea9ee9dddf7f1299788ea381))
* **api:** updates ([#391](https://github.com/lithic-com/lithic-node/issues/391)) ([c964452](https://github.com/lithic-com/lithic-node/commit/c964452dd3c339e9bf88d3be4f3ba8045146c8eb))


### Chores

* **internal:** add scripts/test and scripts/mock ([#387](https://github.com/lithic-com/lithic-node/issues/387)) ([98ca806](https://github.com/lithic-com/lithic-node/commit/98ca8066f1d3f22f504fbc1e842e69b87c2aa529))
* **internal:** add scripts/test, scripts/mock and add ci job ([#389](https://github.com/lithic-com/lithic-node/issues/389)) ([15735d8](https://github.com/lithic-com/lithic-node/commit/15735d82426a265d01a4a56c7bfb17f2b306a74f))
* **internal:** forward arguments in scripts/test ([#390](https://github.com/lithic-com/lithic-node/issues/390)) ([56e734f](https://github.com/lithic-com/lithic-node/commit/56e734f1257ad806ba755208b3bb3fab02ebfb54))
* **internal:** move client class to separate file ([#392](https://github.com/lithic-com/lithic-node/issues/392)) ([0f48e7f](https://github.com/lithic-com/lithic-node/commit/0f48e7f557a8bee54e3ae8016cde8062ec1d1a33))
* **internal:** refactor scripts ([#388](https://github.com/lithic-com/lithic-node/issues/388)) ([2c5a367](https://github.com/lithic-com/lithic-node/commit/2c5a3679b0d746a0b3a3361810f4cd53a98ba3de))
* **internal:** use actions/checkout@v4 for codeflow ([#384](https://github.com/lithic-com/lithic-node/issues/384)) ([c40b31d](https://github.com/lithic-com/lithic-node/commit/c40b31d999f7a97b4c0f4326042d1a5a4728b86e))

## 0.50.0 (2024-04-17)

Full Changelog: [v0.49.0...v0.50.0](https://github.com/lithic-com/lithic-node/compare/v0.49.0...v0.50.0)

### Features

* **api:** updates ([#377](https://github.com/lithic-com/lithic-node/issues/377)) ([2147eef](https://github.com/lithic-com/lithic-node/commit/2147eef48118e990aa026d1ea309fad05df9b268))
* **api:** updates ([#382](https://github.com/lithic-com/lithic-node/issues/382)) ([45b94f0](https://github.com/lithic-com/lithic-node/commit/45b94f02ac5f079710f416f2a0c313eb04562ee6))


### Chores

* **internal:** formatting ([#380](https://github.com/lithic-com/lithic-node/issues/380)) ([7fad7aa](https://github.com/lithic-com/lithic-node/commit/7fad7aa0c5742cad52dae8532741504c14b5aaf1))
* **internal:** update gitignore ([#379](https://github.com/lithic-com/lithic-node/issues/379)) ([458e748](https://github.com/lithic-com/lithic-node/commit/458e748194c9a54f746fe5d8f90152233d03a449))


### Build System

* configure UTF-8 locale in devcontainer ([#381](https://github.com/lithic-com/lithic-node/issues/381)) ([8ee3b5a](https://github.com/lithic-com/lithic-node/commit/8ee3b5ad7f8fa131ba865bc41b00d854ddbd4edc))

## 0.49.0 (2024-04-05)

Full Changelog: [v0.48.0...v0.49.0](https://github.com/lithic-com/lithic-node/compare/v0.48.0...v0.49.0)

### Features

* **api:** add detailed result CARD_NOT_ACTIVATED ([#375](https://github.com/lithic-com/lithic-node/issues/375)) ([602f79f](https://github.com/lithic-com/lithic-node/commit/602f79f7392726bef8dab1306d1d00c61cea6ba4))
* **api:** add event type digital_wallet.tokenization_two_factor_authentication_code_sent ([#371](https://github.com/lithic-com/lithic-node/issues/371)) ([7fd4853](https://github.com/lithic-com/lithic-node/commit/7fd48530e1b01d5417b309bca8af102a084c7707))
* **api:** add params spend_limit and spend_velocity ([#374](https://github.com/lithic-com/lithic-node/issues/374)) ([8abb9f9](https://github.com/lithic-com/lithic-node/commit/8abb9f906b25f09d4ce6747fd60cd2bf90ca76c9))
* **api:** add settlement_report.updated enum ([#366](https://github.com/lithic-com/lithic-node/issues/366)) ([6cc2baf](https://github.com/lithic-com/lithic-node/commit/6cc2baf8b9f49f393063f413c5b64aff0bf3a04c))
* **api:** update financial transaction status enum ([#369](https://github.com/lithic-com/lithic-node/issues/369)) ([7cdb881](https://github.com/lithic-com/lithic-node/commit/7cdb8818e2c4851a39c818341ab475d56139e4f9))
* **api:** update link to encrypted PIN block docs ([#376](https://github.com/lithic-com/lithic-node/issues/376)) ([7a9616e](https://github.com/lithic-com/lithic-node/commit/7a9616e23d396646985adfd409a0fa171d015dbf))
* **api:** updates ([#367](https://github.com/lithic-com/lithic-node/issues/367)) ([e14bf71](https://github.com/lithic-com/lithic-node/commit/e14bf7138ee3c76ce6e114b7225dfd3d79c449fe))


### Bug Fixes

* **client:** correctly send deno version header ([#364](https://github.com/lithic-com/lithic-node/issues/364)) ([573421e](https://github.com/lithic-com/lithic-node/commit/573421ec3ae4d992120fac2f5cadb9ae7a046022))


### Chores

* **deps:** bump yarn to v1.22.22 ([#373](https://github.com/lithic-com/lithic-node/issues/373)) ([a430c64](https://github.com/lithic-com/lithic-node/commit/a430c640862d7927ac0f57a02ee6e076e39c1ded))
* **deps:** remove unused dependency digest-fetch ([#372](https://github.com/lithic-com/lithic-node/issues/372)) ([66415bf](https://github.com/lithic-com/lithic-node/commit/66415bf4e18b8df1600d0087c4084e6c1a35da5b))
* **internal:** bump dependencies ([#368](https://github.com/lithic-com/lithic-node/issues/368)) ([94f8f5a](https://github.com/lithic-com/lithic-node/commit/94f8f5aa5d58d6f2f9e18cd4ad3da530e489b472))

## 0.48.0 (2024-03-21)

Full Changelog: [v0.47.0...v0.48.0](https://github.com/lithic-com/lithic-node/compare/v0.47.0...v0.48.0)

### Features

* **api:** adds closed state ([#363](https://github.com/lithic-com/lithic-node/issues/363)) ([06ad4b4](https://github.com/lithic-com/lithic-node/commit/06ad4b46652a7c41e95902d2fea05f441538b4de))
* **api:** updates ([#361](https://github.com/lithic-com/lithic-node/issues/361)) ([d6a20b2](https://github.com/lithic-com/lithic-node/commit/d6a20b29013f0a6fffbfc2d21c51ad5fd83479c0))


### Bug Fixes

* handle process.env being undefined in debug func ([#360](https://github.com/lithic-com/lithic-node/issues/360)) ([a110110](https://github.com/lithic-com/lithic-node/commit/a110110e2430c3a33d6b11a2b0b857b0d6fb3271))
* **internal:** make toFile use input file's options ([#357](https://github.com/lithic-com/lithic-node/issues/357)) ([7596a98](https://github.com/lithic-com/lithic-node/commit/7596a985951d02aae200f6fc2ebb4f042e8d9545))


### Chores

* add back examples ([d7d0cd7](https://github.com/lithic-com/lithic-node/commit/d7d0cd70b908c87c87030b39b2fb70e65e140972))
* add back removed code ([2805043](https://github.com/lithic-com/lithic-node/commit/2805043c47bbb9e622c140f6e73370813b6cd0e0))
* **docs:** add back custom readme code ([006ea15](https://github.com/lithic-com/lithic-node/commit/006ea15cf2ccda27733994b3f17374a6efa22438))
* **docs:** mention install from git repo ([#347](https://github.com/lithic-com/lithic-node/issues/347)) ([15d85c7](https://github.com/lithic-com/lithic-node/commit/15d85c74fec7b174f1a0521765a6fae766e9a715))
* **docs:** temporarily remove custom readme code ([#352](https://github.com/lithic-com/lithic-node/issues/352)) ([91afcaf](https://github.com/lithic-com/lithic-node/commit/91afcafebf688df3f7d96f6f3dd47e01c1133c4d))
* fix error handler in readme ([#348](https://github.com/lithic-com/lithic-node/issues/348)) ([cd14271](https://github.com/lithic-com/lithic-node/commit/cd142718a2c330b35dd817098c0686d935898e39))
* **internal:** update generated pragma comment ([#356](https://github.com/lithic-com/lithic-node/issues/356)) ([63c0e2e](https://github.com/lithic-com/lithic-node/commit/63c0e2eeb50584ebd50b013eef7a6931c51856f0))
* temporarily remove examples for migration ([0ed20a4](https://github.com/lithic-com/lithic-node/commit/0ed20a4f0dc63b1585d5d4c968f975804afa6b43))
* temporarily remove various code as part of refactor ([#354](https://github.com/lithic-com/lithic-node/issues/354)) ([69e70c5](https://github.com/lithic-com/lithic-node/commit/69e70c5a4a6a9691131b7de4a7b443c529ea218b))


### Documentation

* **contributing:** improve wording ([#344](https://github.com/lithic-com/lithic-node/issues/344)) ([37ece41](https://github.com/lithic-com/lithic-node/commit/37ece41dfdc9030aecb5064f7108a8fcbcf39d67))
* fix typo in CONTRIBUTING.md ([#355](https://github.com/lithic-com/lithic-node/issues/355)) ([f8f02cc](https://github.com/lithic-com/lithic-node/commit/f8f02cc06092c9ed04303968a070ef8b502cec05))
* **readme:** consistent use of sentence case in headings ([#358](https://github.com/lithic-com/lithic-node/issues/358)) ([ea571c3](https://github.com/lithic-com/lithic-node/commit/ea571c3a182725878bab7530d012898d454f722b))
* **readme:** document how to make undocumented requests ([#359](https://github.com/lithic-com/lithic-node/issues/359)) ([c218930](https://github.com/lithic-com/lithic-node/commit/c218930006576317a84a5fc6973e01fe21ee5f5e))
* **readme:** fix https proxy example ([#349](https://github.com/lithic-com/lithic-node/issues/349)) ([e40c8a8](https://github.com/lithic-com/lithic-node/commit/e40c8a8aa4302a32447af40e10faeeddea1dbcd9))
* **readme:** fix typo in custom fetch implementation ([#346](https://github.com/lithic-com/lithic-node/issues/346)) ([aedf750](https://github.com/lithic-com/lithic-node/commit/aedf7508a1afa9384d8bb9f0b33bb2327ed43866))
* remove extraneous --save and yarn install instructions ([#350](https://github.com/lithic-com/lithic-node/issues/350)) ([22d7f05](https://github.com/lithic-com/lithic-node/commit/22d7f057644060ad145b24ac90147a833c976021))

## 0.47.0 (2024-02-27)

Full Changelog: [v0.46.0...v0.47.0](https://github.com/lithic-com/lithic-node/compare/v0.46.0...v0.47.0)

### Features

* **api:** updates ([#342](https://github.com/lithic-com/lithic-node/issues/342)) ([d926ea3](https://github.com/lithic-com/lithic-node/commit/d926ea3f8d53ad618ab567bf7da40925ca3362d7))

## 0.46.0 (2024-02-23)

Full Changelog: [v0.45.0...v0.46.0](https://github.com/lithic-com/lithic-node/compare/v0.45.0...v0.46.0)

### Features

* **api:** tokenizations ([#341](https://github.com/lithic-com/lithic-node/issues/341)) ([d2c7eca](https://github.com/lithic-com/lithic-node/commit/d2c7ecad30e54d78b6a591fb77c17d01d46a5d52))


### Chores

* **internal:** update deps ([#339](https://github.com/lithic-com/lithic-node/issues/339)) ([0732da4](https://github.com/lithic-com/lithic-node/commit/0732da4b0042b186f4f980e58a924fc795ec7b2b))

## 0.45.0 (2024-02-21)

Full Changelog: [v0.44.0...v0.45.0](https://github.com/lithic-com/lithic-node/compare/v0.44.0...v0.45.0)

### Features

* **api:** create financial account and retry microdeposits endpoints ([#337](https://github.com/lithic-com/lithic-node/issues/337)) ([dff7d2e](https://github.com/lithic-com/lithic-node/commit/dff7d2e5d85ff03651d40f9156ac62b79903ce5f))

## 0.44.0 (2024-02-19)

Full Changelog: [v0.43.0...v0.44.0](https://github.com/lithic-com/lithic-node/compare/v0.43.0...v0.44.0)

### Features

* **api:** update financial_account_type and documentation ([#336](https://github.com/lithic-com/lithic-node/issues/336)) ([98ce85e](https://github.com/lithic-com/lithic-node/commit/98ce85e4dfe5e8598bcd3c22a7921818737db140))


### Chores

* **internal:** refactor release environment script ([#334](https://github.com/lithic-com/lithic-node/issues/334)) ([20478c1](https://github.com/lithic-com/lithic-node/commit/20478c1723839df06c05ce2a7117d8cac7805949))
* **tests:** add integration test for pagination ([#332](https://github.com/lithic-com/lithic-node/issues/332)) ([a9ebd05](https://github.com/lithic-com/lithic-node/commit/a9ebd05610384dadaed346997b61a76b0f7dcb54))

## 0.43.0 (2024-02-07)

Full Changelog: [v0.42.0...v0.43.0](https://github.com/lithic-com/lithic-node/compare/v0.42.0...v0.43.0)

### Features

* **api:** updates ([#331](https://github.com/lithic-com/lithic-node/issues/331)) ([902f5ce](https://github.com/lithic-com/lithic-node/commit/902f5ce31886d0603ff86e883edf9dd732ebfbf8))


### Chores

* **interal:** make link to api.md relative ([#325](https://github.com/lithic-com/lithic-node/issues/325)) ([3f8d597](https://github.com/lithic-com/lithic-node/commit/3f8d5972962834ae59fe972604c7761f849adb43))
* **internal:** enable building when git installed ([#328](https://github.com/lithic-com/lithic-node/issues/328)) ([7de9cb7](https://github.com/lithic-com/lithic-node/commit/7de9cb7247bcd6bce237ae5fde3dddcd6afdce12))
* **internal:** re-order pagination import ([#327](https://github.com/lithic-com/lithic-node/issues/327)) ([8cad9e1](https://github.com/lithic-com/lithic-node/commit/8cad9e1fb81710aeabc71003d3eed60b8ad95564))
* respect `application/vnd.api+json` content-type header ([#330](https://github.com/lithic-com/lithic-node/issues/330)) ([f52310a](https://github.com/lithic-com/lithic-node/commit/f52310aff80839bfd0638afd712ec56ed8551c01))


### Documentation

* add a CONTRIBUTING.md ([#329](https://github.com/lithic-com/lithic-node/issues/329)) ([c4131e8](https://github.com/lithic-com/lithic-node/commit/c4131e8a631e0e605135a75db4663e6832544d50))

## 0.42.0 (2024-01-31)

Full Changelog: [v0.41.0...v0.42.0](https://github.com/lithic-com/lithic-node/compare/v0.41.0...v0.42.0)

### Features

* **api:** add `account_token` and `card_program_token` to `Card` ([#323](https://github.com/lithic-com/lithic-node/issues/323)) ([8ba732b](https://github.com/lithic-com/lithic-node/commit/8ba732b03a17d4e9b4f8db0ae60abe3321ab768d))

## 0.41.0 (2024-01-31)

Full Changelog: [v0.40.0...v0.41.0](https://github.com/lithic-com/lithic-node/compare/v0.40.0...v0.41.0)

### Features

* remove idempotency headers ([#322](https://github.com/lithic-com/lithic-node/issues/322)) ([05dc237](https://github.com/lithic-com/lithic-node/commit/05dc237aa646abbdecbf3c5431b3d53ccf302039))


### Chores

* **internal:** support pre-release versioning ([#320](https://github.com/lithic-com/lithic-node/issues/320)) ([4798a86](https://github.com/lithic-com/lithic-node/commit/4798a86bf3f2652304bd999813d960acd836546b))

## 0.40.0 (2024-01-30)

Full Changelog: [v0.39.0...v0.40.0](https://github.com/lithic-com/lithic-node/compare/v0.39.0...v0.40.0)

### Features

* **api:** add search_by_pan endpoint ([#317](https://github.com/lithic-com/lithic-node/issues/317)) ([8d91e10](https://github.com/lithic-com/lithic-node/commit/8d91e101282b57362ecc68602a5932fd1adcfc43))


### Bug Fixes

* **pagination:** send correct request param ([#319](https://github.com/lithic-com/lithic-node/issues/319)) ([525bb09](https://github.com/lithic-com/lithic-node/commit/525bb09548977025c7cef3e564f9fafeef773f67))

## 0.39.0 (2024-01-23)

Full Changelog: [v0.38.3...v0.39.0](https://github.com/lithic-com/lithic-node/compare/v0.38.3...v0.39.0)

### ⚠ BREAKING CHANGES

* **api:** change account holder creation response, new settlement detail type ([#316](https://github.com/lithic-com/lithic-node/issues/316))

### Features

* **api:** change account holder creation response, new settlement detail type ([#316](https://github.com/lithic-com/lithic-node/issues/316)) ([fe91c2c](https://github.com/lithic-com/lithic-node/commit/fe91c2ca5bae3390807959a143366b970301363f))


### Chores

* **internal:** add internal helpers & improve build scripts ([#314](https://github.com/lithic-com/lithic-node/issues/314)) ([6053728](https://github.com/lithic-com/lithic-node/commit/605372816a51451a707c672089d6366a19724907))

## 0.38.3 (2024-01-18)

Full Changelog: [v0.38.2...v0.38.3](https://github.com/lithic-com/lithic-node/compare/v0.38.2...v0.38.3)

### Bug Fixes

* allow body type in RequestOptions to be null ([#313](https://github.com/lithic-com/lithic-node/issues/313)) ([ebdbd9b](https://github.com/lithic-com/lithic-node/commit/ebdbd9bdad7b1b096ed03ef2498ab724100dc313))


### Chores

* **ci:** rely on Stainless GitHub App for releases ([#311](https://github.com/lithic-com/lithic-node/issues/311)) ([f477c92](https://github.com/lithic-com/lithic-node/commit/f477c92bb51d6d4f855807d95fd3a8a900cd325c))

## 0.38.2 (2024-01-17)

Full Changelog: [v0.38.1...v0.38.2](https://github.com/lithic-com/lithic-node/compare/v0.38.1...v0.38.2)

### Features

* **api:** updates ([#307](https://github.com/lithic-com/lithic-node/issues/307)) ([5e96e05](https://github.com/lithic-com/lithic-node/commit/5e96e053dd8bba20680d8033bd135d70ab67a01f))


### Chores

* **internal:** narrow type into stringifyQuery ([#303](https://github.com/lithic-com/lithic-node/issues/303)) ([d7ae5fa](https://github.com/lithic-com/lithic-node/commit/d7ae5faa5e2c6b013ed20b46256887c36b449866))


### Documentation

* fix missing async in readme code sample ([#306](https://github.com/lithic-com/lithic-node/issues/306)) ([b5fb8e6](https://github.com/lithic-com/lithic-node/commit/b5fb8e6761d1d0c9292a03271ccf5e051c52241a))
* **readme:** improve api reference ([#305](https://github.com/lithic-com/lithic-node/issues/305)) ([9522c00](https://github.com/lithic-com/lithic-node/commit/9522c006e3992a48451a0b1322c260e04d25b33b))

## 0.38.1 (2024-01-10)

Full Changelog: [v0.38.0...v0.38.1](https://github.com/lithic-com/lithic-node/compare/v0.38.0...v0.38.1)

### Bug Fixes

* use default base url if BASE_URL env var is blank ([#301](https://github.com/lithic-com/lithic-node/issues/301)) ([d3e8c86](https://github.com/lithic-com/lithic-node/commit/d3e8c861c9315dfc2aae8c4b42e6bf7ac6f35ed3))

## 0.38.0 (2024-01-09)

Full Changelog: [v0.37.1...v0.38.0](https://github.com/lithic-com/lithic-node/compare/v0.37.1...v0.38.0)

### Features

* **api:** add card renew endpoint ([#300](https://github.com/lithic-com/lithic-node/issues/300)) ([70e0a62](https://github.com/lithic-com/lithic-node/commit/70e0a62450325abe4d212aa427e2609ba72b7082))


### Chores

* add .keep files for examples and custom code directories ([#299](https://github.com/lithic-com/lithic-node/issues/299)) ([3005a13](https://github.com/lithic-com/lithic-node/commit/3005a13fe201bdf8e3e8766b8e28a191cde0fdb5))
* **internal:** improve type signatures ([#297](https://github.com/lithic-com/lithic-node/issues/297)) ([001e3d6](https://github.com/lithic-com/lithic-node/commit/001e3d6b9958fa88f3cad8337894cb7d3d966d15))

## 0.37.1 (2024-01-04)

Full Changelog: [v0.37.0...v0.37.1](https://github.com/lithic-com/lithic-node/compare/v0.37.0...v0.37.1)

### Bug Fixes

* **headers:** always send lowercase headers and strip undefined (BREAKING in rare cases) ([#296](https://github.com/lithic-com/lithic-node/issues/296)) ([8043177](https://github.com/lithic-com/lithic-node/commit/8043177b64bff647735a90c08ef161b17e25683a))


### Chores

* **deps:** update jest ([#290](https://github.com/lithic-com/lithic-node/issues/290)) ([2d4c21a](https://github.com/lithic-com/lithic-node/commit/2d4c21a8b363a8d56fe14d3ec0f1092156aebd26))
* **internal:** bump license ([#295](https://github.com/lithic-com/lithic-node/issues/295)) ([1da8c05](https://github.com/lithic-com/lithic-node/commit/1da8c05575322011ea04b58ffa2c99bf3da94df0))
* **internal:** minor updates to pagination ([#293](https://github.com/lithic-com/lithic-node/issues/293)) ([af09ce3](https://github.com/lithic-com/lithic-node/commit/af09ce37fa59f7ccdb68d3bd38aa0617a5b98639))


### Documentation

* reformat README.md ([#294](https://github.com/lithic-com/lithic-node/issues/294)) ([5d6ac23](https://github.com/lithic-com/lithic-node/commit/5d6ac236bdce41de15dc6166f26761267d54a7db))


### Refactors

* write jest config in typescript ([#292](https://github.com/lithic-com/lithic-node/issues/292)) ([d33f6a9](https://github.com/lithic-com/lithic-node/commit/d33f6a99a80b01fd7760c9cb7bce64dfbc59abed))

## 0.37.0 (2023-12-18)

Full Changelog: [v0.36.0...v0.37.0](https://github.com/lithic-com/lithic-node/compare/v0.36.0...v0.37.0)

### Features

* **api:** remove /auth_stream enrollment endpoints ([#289](https://github.com/lithic-com/lithic-node/issues/289)) ([6bd65c2](https://github.com/lithic-com/lithic-node/commit/6bd65c243a1528347d728ef6c797f2601173c0f9))


### Chores

* **ci:** run release workflow once per day ([#287](https://github.com/lithic-com/lithic-node/issues/287)) ([4b0d12b](https://github.com/lithic-com/lithic-node/commit/4b0d12bdedfcd423b8d13fa520d16881fc67adb3))
* **deps:** update dependency ts-jest to v29.1.1 ([#288](https://github.com/lithic-com/lithic-node/issues/288)) ([91d0bf5](https://github.com/lithic-com/lithic-node/commit/91d0bf5d5cc24f29dbb7f175baf0d5a5fe40b93d))
* update dependencies ([#285](https://github.com/lithic-com/lithic-node/issues/285)) ([682fe93](https://github.com/lithic-com/lithic-node/commit/682fe93cd2e31f78b38b8addb3c858ea72061ed7))

## 0.36.0 (2023-12-15)

Full Changelog: [v0.35.0...v0.36.0](https://github.com/lithic-com/lithic-node/compare/v0.35.0...v0.36.0)

### Features

* **api:** rename `token` and `type` to `financial_account_token` and `financial_account_type` ([#284](https://github.com/lithic-com/lithic-node/issues/284)) ([b1a5ca3](https://github.com/lithic-com/lithic-node/commit/b1a5ca3f412f75f8b91331a4b3e4a896b348b2eb))


### Chores

* update prettier ([#283](https://github.com/lithic-com/lithic-node/issues/283)) ([d93b312](https://github.com/lithic-com/lithic-node/commit/d93b312003324eb6a8c5b7751b3de45901ac7e1a))


### Build System

* specify `packageManager: yarn` ([#282](https://github.com/lithic-com/lithic-node/issues/282)) ([272aa2f](https://github.com/lithic-com/lithic-node/commit/272aa2f537722f469ed936ee376ca3ef25c1f8c4))

## 0.35.0 (2023-12-05)

Full Changelog: [v0.34.0...v0.35.0](https://github.com/lithic-com/lithic-node/compare/v0.34.0...v0.35.0)

### Features

* **api:** remove `CLOSED` account enum and update docstrings ([#279](https://github.com/lithic-com/lithic-node/issues/279)) ([2b80c73](https://github.com/lithic-com/lithic-node/commit/2b80c73adc9e886805b15657be4a0e8f196a2968))
* **client:** support reading the base url from an env variable ([#277](https://github.com/lithic-com/lithic-node/issues/277)) ([b14eb4e](https://github.com/lithic-com/lithic-node/commit/b14eb4e2fffd6d0f1586e13fff18c72b3f070ca4))


### Documentation

* **readme:** update example snippets ([#275](https://github.com/lithic-com/lithic-node/issues/275)) ([a576c08](https://github.com/lithic-com/lithic-node/commit/a576c08f0189151ec01cfbffe7e919dfe57d396e))

## 0.34.0 (2023-11-28)

Full Changelog: [v0.33.0...v0.34.0](https://github.com/lithic-com/lithic-node/compare/v0.33.0...v0.34.0)

### Features

* allow installing package directly from github ([#270](https://github.com/lithic-com/lithic-node/issues/270)) ([555692a](https://github.com/lithic-com/lithic-node/commit/555692ac90c11178eb7dd6e411270b5f2218f469))
* **api:** add `get spend_limits` endpoints to `cards` and `accounts` ([#274](https://github.com/lithic-com/lithic-node/issues/274)) ([5d33f20](https://github.com/lithic-com/lithic-node/commit/5d33f202966e92f5e7b9c80172ca07083742e34c))


### Chores

* **internal:** don't call prepare in dist ([#271](https://github.com/lithic-com/lithic-node/issues/271)) ([5420731](https://github.com/lithic-com/lithic-node/commit/54207317048e73e68571ad96a4be4b908d0cb29d))
* **internal:** remove file import and conditionally run prepare ([#272](https://github.com/lithic-com/lithic-node/issues/272)) ([cb40535](https://github.com/lithic-com/lithic-node/commit/cb40535f39f7ee6bc0d80e82b818fdfcceb9cfa0))
* **internal:** update stats file ([#268](https://github.com/lithic-com/lithic-node/issues/268)) ([67a820a](https://github.com/lithic-com/lithic-node/commit/67a820aeadb9d4070e7c1ca319f8c0d73f8a99ea))

## 0.33.0 (2023-11-16)

Full Changelog: [v0.32.0...v0.33.0](https://github.com/lithic-com/lithic-node/compare/v0.32.0...v0.33.0)

### Features

* **api:** updates ([#267](https://github.com/lithic-com/lithic-node/issues/267)) ([0dcdd40](https://github.com/lithic-com/lithic-node/commit/0dcdd40c11c82efda40baead1089ababc886fb66))


### Chores

* **internal:** update APIResource structure ([#266](https://github.com/lithic-com/lithic-node/issues/266)) ([d34c847](https://github.com/lithic-com/lithic-node/commit/d34c8473d516e7beee540a869de50936dbbd0631))
* **internal:** update jest config ([#264](https://github.com/lithic-com/lithic-node/issues/264)) ([5118b1c](https://github.com/lithic-com/lithic-node/commit/5118b1c06f22aeab66650329aa6e5765008247c6))

## 0.32.0 (2023-11-09)

Full Changelog: [v0.31.0...v0.32.0](https://github.com/lithic-com/lithic-node/compare/v0.31.0...v0.32.0)

### Features

* **api:** updates ([#262](https://github.com/lithic-com/lithic-node/issues/262)) ([e1a8210](https://github.com/lithic-com/lithic-node/commit/e1a82105853f56414520c1cd388b5d19238a424e))

## 0.31.0 (2023-11-08)

Full Changelog: [v0.30.0...v0.31.0](https://github.com/lithic-com/lithic-node/compare/v0.30.0...v0.31.0)

### Features

* **client:** allow binary returns ([#254](https://github.com/lithic-com/lithic-node/issues/254)) ([81e167f](https://github.com/lithic-com/lithic-node/commit/81e167f2ef0ca6d1f8608b71e5939b4caaba592b))


### Bug Fixes

* **api:** correct type for other fees details ([#261](https://github.com/lithic-com/lithic-node/issues/261)) ([f1712b7](https://github.com/lithic-com/lithic-node/commit/f1712b71dfdece83545ca4418fd65f13a7b50818))


### Chores

* **ci:** update release-please config ([#258](https://github.com/lithic-com/lithic-node/issues/258)) ([7287470](https://github.com/lithic-com/lithic-node/commit/7287470b448057ea3f22784afc44f201316606ed))
* **docs:** fix github links ([#259](https://github.com/lithic-com/lithic-node/issues/259)) ([0536726](https://github.com/lithic-com/lithic-node/commit/0536726cac6c0d5fbe817bcc03294bb8b8337f29))
* **internal:** update tsconfig ([#260](https://github.com/lithic-com/lithic-node/issues/260)) ([3d54a22](https://github.com/lithic-com/lithic-node/commit/3d54a22856d0b2bd2c2598f322b308d61f8f5a49))


### Documentation

* document customizing fetch ([#257](https://github.com/lithic-com/lithic-node/issues/257)) ([79cc0c4](https://github.com/lithic-com/lithic-node/commit/79cc0c49d68063352478aba7f8379bd27c474080))
* improve account holder control person documentation ([#256](https://github.com/lithic-com/lithic-node/issues/256)) ([7d86876](https://github.com/lithic-com/lithic-node/commit/7d868765109f5adf4de1d845d8ee27ee60728214))

## 0.30.0 (2023-11-01)

Full Changelog: [v0.29.0...v0.30.0](https://github.com/lithic-com/lithic-node/compare/v0.29.0...v0.30.0)

### Features

* **api:** add verification_attempts response property ([#253](https://github.com/lithic-com/lithic-node/issues/253)) ([6789b54](https://github.com/lithic-com/lithic-node/commit/6789b543bb0b97bde269d70ef58f293ce2e88189))
* **github:** include a devcontainer setup ([#252](https://github.com/lithic-com/lithic-node/issues/252)) ([72f981e](https://github.com/lithic-com/lithic-node/commit/72f981ed2b7fa79aad2d37532721d6628d10972e))


### Chores

* **internal:** update gitignore ([#250](https://github.com/lithic-com/lithic-node/issues/250)) ([8cbcaf7](https://github.com/lithic-com/lithic-node/commit/8cbcaf7e6f68a862b7a926769cae3b4835312326))

## 0.29.0 (2023-10-26)

Full Changelog: [v0.28.1...v0.29.0](https://github.com/lithic-com/lithic-node/compare/v0.28.1...v0.29.0)

### Features

* **api:** add CardProgram and DigitalCardArt resources ([#248](https://github.com/lithic-com/lithic-node/issues/248)) ([f25fbcd](https://github.com/lithic-com/lithic-node/commit/f25fbcdb5a454f10754dfc02de62350d8bd67d74))

## 0.28.1 (2023-10-25)

Full Changelog: [v0.28.0...v0.28.1](https://github.com/lithic-com/lithic-node/compare/v0.28.0...v0.28.1)

### Bug Fixes

* typo in build script ([#247](https://github.com/lithic-com/lithic-node/issues/247)) ([8d76631](https://github.com/lithic-com/lithic-node/commit/8d76631f29965a04ee9583e957c024a4c537ab32))

## 0.28.0 (2023-10-24)

Full Changelog: [v0.27.4...v0.28.0](https://github.com/lithic-com/lithic-node/compare/v0.27.4...v0.28.0)

### Features

* **api:** add AUTH_STREAM_ACCESS to responder endpoints ([#243](https://github.com/lithic-com/lithic-node/issues/243)) ([d1570e4](https://github.com/lithic-com/lithic-node/commit/d1570e46a8208a5ca427dcb87915af1a38f2aba2))
* **api:** add verification_failed_reason ([#240](https://github.com/lithic-com/lithic-node/issues/240)) ([479105b](https://github.com/lithic-com/lithic-node/commit/479105b8b1abd7772e92b9346dd0f94932edb960))
* **api:** updates ([#238](https://github.com/lithic-com/lithic-node/issues/238)) ([ad1a63d](https://github.com/lithic-com/lithic-node/commit/ad1a63d9bb86ca5d34eb314a46908d1568e6d1dd))
* **client:** adjust retry behavior to be exponential backoff ([#244](https://github.com/lithic-com/lithic-node/issues/244)) ([c0ef94a](https://github.com/lithic-com/lithic-node/commit/c0ef94ad094ca3bf8dd60dfe010aa7ff2978655f))
* handle 204 No Content gracefully ([#242](https://github.com/lithic-com/lithic-node/issues/242)) ([ebfe705](https://github.com/lithic-com/lithic-node/commit/ebfe705d95a737d4650013448cc53a0ab6f8f9bc))
* make webhook headers case insensitive ([#234](https://github.com/lithic-com/lithic-node/issues/234)) ([5afd7d6](https://github.com/lithic-com/lithic-node/commit/5afd7d673a5751fde8003ed54563e3e006b589fc))


### Bug Fixes

* import web-streams-polyfill without overriding globals ([#239](https://github.com/lithic-com/lithic-node/issues/239)) ([c617c1d](https://github.com/lithic-com/lithic-node/commit/c617c1d5755bb1ef586ad12a0baca549ffcf396b))
* improve status code in error messages ([#236](https://github.com/lithic-com/lithic-node/issues/236)) ([adc5e38](https://github.com/lithic-com/lithic-node/commit/adc5e384e03dc7ae1674fcf267faa0b1a13b83fa))


### Chores

* **internal:** refactor status code printing in error ([#231](https://github.com/lithic-com/lithic-node/issues/231)) ([216d5e8](https://github.com/lithic-com/lithic-node/commit/216d5e809fcf6c8d80b2ca19ecd4a0ea58584e21))
* show deprecation notice on re-export ([#229](https://github.com/lithic-com/lithic-node/issues/229)) ([788052d](https://github.com/lithic-com/lithic-node/commit/788052dbac6dde9d779c5218f5b8710873fb386c))
* update comment ([#235](https://github.com/lithic-com/lithic-node/issues/235)) ([0344965](https://github.com/lithic-com/lithic-node/commit/03449651df36c56289be10177dcaeb915d5ddb2d))


### Documentation

* organisation -&gt; organization (UK to US English) ([#237](https://github.com/lithic-com/lithic-node/issues/237)) ([106fc60](https://github.com/lithic-com/lithic-node/commit/106fc601f4675ca304d2b81f90c99e52fd26fc2c))


### Refactors

* **test:** refactor authentication tests ([#232](https://github.com/lithic-com/lithic-node/issues/232)) ([bb38ca7](https://github.com/lithic-com/lithic-node/commit/bb38ca72597b990f60f45248c31b5ced436dbc7e))

## 0.27.4 (2023-10-11)

Full Changelog: [v0.27.3...v0.27.4](https://github.com/lithic-com/lithic-node/compare/v0.27.3...v0.27.4)

### Bug Fixes

* fix namespace exports regression ([#227](https://github.com/lithic-com/lithic-node/issues/227)) ([2741a5e](https://github.com/lithic-com/lithic-node/commit/2741a5e7cfa3dae1169ac2f95bce69cda669bfbf))

## 0.27.3 (2023-10-11)

Full Changelog: [v0.27.2...v0.27.3](https://github.com/lithic-com/lithic-node/compare/v0.27.2...v0.27.3)

### Bug Fixes

* **client:** eliminate circular imports, which cause runtime errors in webpack dev bundles ([#226](https://github.com/lithic-com/lithic-node/issues/226)) ([9c58051](https://github.com/lithic-com/lithic-node/commit/9c58051e7c1d7d4269bad070fef4cecb0d813b2e))
* prevent ReferenceError, update compatibility to ES2020 and Node 18+ ([#224](https://github.com/lithic-com/lithic-node/issues/224)) ([add547a](https://github.com/lithic-com/lithic-node/commit/add547a09ac41f28653719366bb528efe5441c12))


### Chores

* bump ([2f7e59f](https://github.com/lithic-com/lithic-node/commit/2f7e59fb18c8475b72afa4487047672ea077e600))

## 0.27.2 (2023-10-05)

Full Changelog: [v0.27.1...v0.27.2](https://github.com/lithic-com/lithic-node/compare/v0.27.1...v0.27.2)

### Features

* **api:** updates ([#223](https://github.com/lithic-com/lithic-node/issues/223)) ([e9524ba](https://github.com/lithic-com/lithic-node/commit/e9524ba233a86c2af38d3b9a08c25f9ac4081639))

## 0.27.1 (2023-10-03)

Full Changelog: [v0.27.0...v0.27.1](https://github.com/lithic-com/lithic-node/compare/v0.27.0...v0.27.1)

### Chores

* **ci:** remove reviewer ([#219](https://github.com/lithic-com/lithic-node/issues/219)) ([a8b6fa2](https://github.com/lithic-com/lithic-node/commit/a8b6fa2371328d217690d8c9127803abcbdbcdc6))
* **internal:** update lock file ([#217](https://github.com/lithic-com/lithic-node/issues/217)) ([63ffd1e](https://github.com/lithic-com/lithic-node/commit/63ffd1ecce1446d4156c265547297e2ccdd93946))
* **tests:** update test examples ([#221](https://github.com/lithic-com/lithic-node/issues/221)) ([1b85ec7](https://github.com/lithic-com/lithic-node/commit/1b85ec75ab03aca5f0ba6df0b6fb46c30b2ee6fc))

## 0.27.0 (2023-09-29)

Full Changelog: [v0.26.9...v0.27.0](https://github.com/lithic-com/lithic-node/compare/v0.26.9...v0.27.0)

### ⚠ BREAKING CHANGES

* **api:** remove `post /webhooks/account_holders` endpoint ([#214](https://github.com/lithic-com/lithic-node/issues/214))

### Refactors

* **api:** remove `post /webhooks/account_holders` endpoint ([#214](https://github.com/lithic-com/lithic-node/issues/214)) ([b9191ae](https://github.com/lithic-com/lithic-node/commit/b9191aec3803ba64c7787a1486926502d03b3f45))

## 0.26.9 (2023-09-25)

Full Changelog: [v0.26.8...v0.26.9](https://github.com/lithic-com/lithic-node/compare/v0.26.8...v0.26.9)

### Features

* **client:** handle retry-after with a date ([#213](https://github.com/lithic-com/lithic-node/issues/213)) ([53eb832](https://github.com/lithic-com/lithic-node/commit/53eb832e403bcd6ccf1820f66ecd47b44b8aad3f))
* **package:** export a root error type ([#212](https://github.com/lithic-com/lithic-node/issues/212)) ([78f89c1](https://github.com/lithic-com/lithic-node/commit/78f89c1b8ff5bf7e521c178da7af8abb2b466963))


### Documentation

* **api.md:** add shared models ([#211](https://github.com/lithic-com/lithic-node/issues/211)) ([bd02f27](https://github.com/lithic-com/lithic-node/commit/bd02f27a3126ffa6ccaee90b71c7c0a5b3301af5))
* **README:** fix variable names in some examples ([#209](https://github.com/lithic-com/lithic-node/issues/209)) ([4b28d0d](https://github.com/lithic-com/lithic-node/commit/4b28d0dcac8ab512eaff022608da00bdb74459d3))

## 0.26.8 (2023-09-20)

Full Changelog: [v0.26.7...v0.26.8](https://github.com/lithic-com/lithic-node/compare/v0.26.7...v0.26.8)

### Features

* **api:** add simulation endpoints, event types, fix transfer request AuthRule ([#208](https://github.com/lithic-com/lithic-node/issues/208)) ([871707e](https://github.com/lithic-com/lithic-node/commit/871707e4fc158019a835c253a8a0ea1eea17ed57))
* **client:** support importing node or web shims manually ([#207](https://github.com/lithic-com/lithic-node/issues/207)) ([0f6a2c5](https://github.com/lithic-com/lithic-node/commit/0f6a2c509a92054cafb44c8eec00ff43906930be))


### Documentation

* **readme:** remove incorrect wording in opening ([#205](https://github.com/lithic-com/lithic-node/issues/205)) ([c51c676](https://github.com/lithic-com/lithic-node/commit/c51c676ac098525164719c71bcc4247b5af57627))

## 0.26.7 (2023-09-15)

Full Changelog: [v0.26.6...v0.26.7](https://github.com/lithic-com/lithic-node/compare/v0.26.6...v0.26.7)

### Features

* **client:** retry on 408 Request Timeout ([#200](https://github.com/lithic-com/lithic-node/issues/200)) ([177aac2](https://github.com/lithic-com/lithic-node/commit/177aac2041d2991fd2feaaa2a72ab1a3ac95fcfa))
* **errors:** add status code to error message ([#204](https://github.com/lithic-com/lithic-node/issues/204)) ([161bac0](https://github.com/lithic-com/lithic-node/commit/161bac0176d76b057c21bc70744941d6c13d520f))


### Documentation

* declare Bun 1.0 officially supported ([#203](https://github.com/lithic-com/lithic-node/issues/203)) ([8c0bd7b](https://github.com/lithic-com/lithic-node/commit/8c0bd7be188d2fd44360192b21eed1db0c47d859))

## 0.26.6 (2023-09-11)

Full Changelog: [v0.26.5...v0.26.6](https://github.com/lithic-com/lithic-node/compare/v0.26.5...v0.26.6)

### Features

* **api:** add Simulate Return Payment endpoint ([#197](https://github.com/lithic-com/lithic-node/issues/197)) ([aa14a06](https://github.com/lithic-com/lithic-node/commit/aa14a06ba6120b4396873ed725e37bbf5ea08d44))
* **api:** add tokenizations.simulate and correct typo'd enum  ([#194](https://github.com/lithic-com/lithic-node/issues/194)) ([f1dbedd](https://github.com/lithic-com/lithic-node/commit/f1dbedd8e578aa30c41f38ef4ee5c372784ce938))
* **api:** add user defined id ([#186](https://github.com/lithic-com/lithic-node/issues/186)) ([8c481b0](https://github.com/lithic-com/lithic-node/commit/8c481b0d6b7c3370f71016340a87cbdbcd16e5ac))
* fixes tests where an array has to have unique enum values ([#190](https://github.com/lithic-com/lithic-node/issues/190)) ([e01263e](https://github.com/lithic-com/lithic-node/commit/e01263e9226dcae3475a50871318a4bf7356be19))
* **package:** add Bun export map ([#182](https://github.com/lithic-com/lithic-node/issues/182)) ([ef48557](https://github.com/lithic-com/lithic-node/commit/ef48557a10349db5742c867f11e0c6b5f1b6f716))


### Bug Fixes

* **client:** fix TS errors that appear when users Go to Source in VSCode ([#188](https://github.com/lithic-com/lithic-node/issues/188)) ([6e8ac02](https://github.com/lithic-com/lithic-node/commit/6e8ac02e4128696e866b0745cf702301f904f283))
* **client:** handle case where the client is instantiated with a undefined baseURL ([#189](https://github.com/lithic-com/lithic-node/issues/189)) ([c212d5c](https://github.com/lithic-com/lithic-node/commit/c212d5c7158dd93ab5b959771e56bc34209bc056))
* **client:** use explicit file extensions in _shims imports ([#185](https://github.com/lithic-com/lithic-node/issues/185)) ([9b4ef88](https://github.com/lithic-com/lithic-node/commit/9b4ef885e7694fe5146401f7d97afdfbabab9e34))
* fix module not found errors in Vercel edge ([#196](https://github.com/lithic-com/lithic-node/issues/196)) ([404400c](https://github.com/lithic-com/lithic-node/commit/404400c50def4dd357cd93b36abc12e31e9e4b8a))
* **readme:** update link to api.md to use the correct branch ([#192](https://github.com/lithic-com/lithic-node/issues/192)) ([d6e4a79](https://github.com/lithic-com/lithic-node/commit/d6e4a79d441f8cdbd2caca949086cddfdca77577))


### Chores

* **internal:** export helper from core ([#193](https://github.com/lithic-com/lithic-node/issues/193)) ([b50dc2f](https://github.com/lithic-com/lithic-node/commit/b50dc2fb29ed49349d75efb59c714116be009706))
* **internal:** fix the names of method param objects ([#187](https://github.com/lithic-com/lithic-node/issues/187)) ([058538e](https://github.com/lithic-com/lithic-node/commit/058538e1ad8c9283063925a3f6a7324076c4eccc))
* **internal:** minor formatting changes ([#195](https://github.com/lithic-com/lithic-node/issues/195)) ([4e26640](https://github.com/lithic-com/lithic-node/commit/4e26640dda01497aeeef2be354b7943ad54a55c7))


### Documentation

* **readme:** add link to api.md ([#191](https://github.com/lithic-com/lithic-node/issues/191)) ([8810055](https://github.com/lithic-com/lithic-node/commit/88100551fd10dd9361cb94681c9bef412226ef51))

## 0.26.5 (2023-08-29)

Full Changelog: [v0.26.4...v0.26.5](https://github.com/lithic-com/lithic-node/compare/v0.26.4...v0.26.5)

### Bug Fixes

* **types:** improve getNextPage() return type ([#180](https://github.com/lithic-com/lithic-node/issues/180)) ([4b62f59](https://github.com/lithic-com/lithic-node/commit/4b62f59005e623d6620e11ad0e65d4f94dadb1f7))


### Chores

* **ci:** setup workflows to create releases and release PRs ([#177](https://github.com/lithic-com/lithic-node/issues/177)) ([34892ee](https://github.com/lithic-com/lithic-node/commit/34892ee60338e1c941310bbb4917eae4d673cc98))


### Documentation

* **api.md:** improve names ([#181](https://github.com/lithic-com/lithic-node/issues/181)) ([b999542](https://github.com/lithic-com/lithic-node/commit/b999542a85f8d8684ccde9d464c645a8d6a9da0f))

## [0.26.4](https://github.com/lithic-com/lithic-node/compare/v0.26.3...v0.26.4) (2023-08-26)


### Chores

* **internal:** add helper method ([#174](https://github.com/lithic-com/lithic-node/issues/174)) ([25c194d](https://github.com/lithic-com/lithic-node/commit/25c194d7fe600f4b96914b13b67f9db3b1c70ee4))

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
