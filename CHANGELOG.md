## [1.1.5](https://github.com/gabeosx/skx/compare/v1.1.4...v1.1.5) (2026-01-18)


### Bug Fixes

* **ci:** add NPM_TOKEN and retry logic for brew update ([f727142](https://github.com/gabeosx/skx/commit/f72714229c8ee7fec5eb07308a74be1c7ffb2c40))
* **lint:** ignore scripts/verification_archive directory ([aacfc6e](https://github.com/gabeosx/skx/commit/aacfc6ea41775d23ac504118bea538b2abd1639d))

## [1.1.4](https://github.com/gabeosx/skx/compare/v1.1.3...v1.1.4) (2026-01-18)


### Bug Fixes

* ensure skills are installed in subdirectories during interactive install ([a3bfd09](https://github.com/gabeosx/skx/commit/a3bfd09d2142fe42071bb95a38c18779f829354f))

## [1.1.3](https://github.com/gabeosx/skx/compare/v1.1.2...v1.1.3) (2026-01-18)


### Bug Fixes

* correct CLI entry point and interactive mode installation logic ([3336488](https://github.com/gabeosx/skx/commit/33364880fecbb2fd67867c21ec4409cbce6d7a3f))

## [1.1.2](https://github.com/gabeosx/skx/compare/v1.1.1...v1.1.2) (2026-01-18)


### Bug Fixes

* **cli:** Add missing shebang for executable ([181902e](https://github.com/gabeosx/skx/commit/181902e924ed12435f87b86845162602ce7c75a2))

## [1.1.1](https://github.com/gabeosx/skx/compare/v1.1.0...v1.1.1) (2026-01-18)


### Bug Fixes

* **release:** Use local formula as template for Homebrew update ([d6e9ceb](https://github.com/gabeosx/skx/commit/d6e9ceb2dadd6ae03f2a4654d9d00a1bc6517a78))

# [1.1.0](https://github.com/gabeosx/skx/compare/v1.0.2...v1.1.0) (2026-01-18)


### Bug Fixes

* **release:** Remove broken heredoc from Homebrew update script ([0899256](https://github.com/gabeosx/skx/commit/089925673e8197d000cfc9adb2f7826c4c296773))


### Features

* **release:** Replace Homebrew action with manual update script for better reliability ([8cf7e9c](https://github.com/gabeosx/skx/commit/8cf7e9c972d7700e65c0cca4f19bab57504a974d))

## [1.0.2](https://github.com/gabeosx/skx/compare/v1.0.1...v1.0.2) (2026-01-18)


### Bug Fixes

* **release:** Remove base-branch to let homebrew action auto-detect ([f6ee5c2](https://github.com/gabeosx/skx/commit/f6ee5c2767e5d6b79eb61282b12d6ac50a648f9f))

## [1.0.1](https://github.com/gabeosx/skx/compare/v1.0.0...v1.0.1) (2026-01-18)


### Bug Fixes

* **release:** Bump version to 1.0.1 to resolve NPM conflict ([4ccf790](https://github.com/gabeosx/skx/commit/4ccf790acd0b19561cdd86f228d04dc1e0882c51))

# 1.0.0 (2026-01-18)


### Bug Fixes

* **build:** Separate tsconfig for build and IDE to support tests outside src ([218a9d7](https://github.com/gabeosx/skx/commit/218a9d721f8d0e37a73a69a8f2a4ba5a1555d8e0))
* **ci:** Upgrade Node.js to v22 for semantic-release compatibility ([2832d91](https://github.com/gabeosx/skx/commit/2832d918c8ad0327e7cad825b47ac99de33f0bdc))
* **install:** Install skill into its own subdirectory ([ca852d5](https://github.com/gabeosx/skx/commit/ca852d54592c01ca45d98980bab20f82dc854e19))
* **install:** Use packageName for skill subdirectory ([fa3ded3](https://github.com/gabeosx/skx/commit/fa3ded3451537f474f86ee1231955e0cc969defd))
* **registry:** Update schema to match actual skills.json format ([5d3a666](https://github.com/gabeosx/skx/commit/5d3a66636bdcfc8a6f8bcdfce26705d615653f90))
* **release:** Rename package to @gabeosx/skx and update publish config ([3ae473e](https://github.com/gabeosx/skx/commit/3ae473e002411d396cff200edd0b7ef8c9c51579))


### Features

* **adapter:** Implement ClaudeAdapter ([35dd3a7](https://github.com/gabeosx/skx/commit/35dd3a794488d857be665499694c3d4168e0d89e))
* **adapter:** Implement CodexAdapter ([0149f19](https://github.com/gabeosx/skx/commit/0149f1925e0c4e11ace6fed896d34cf495a9cd81))
* **adapter:** Implement GeminiAdapter ([7e13a08](https://github.com/gabeosx/skx/commit/7e13a08001108c48a6cdbfbbefcd7455a368889f))
* **adapter:** Implement listSkills and uninstallSkill logic ([154edbf](https://github.com/gabeosx/skx/commit/154edbffa25aea7aa40b2174e0d96e815b050629))
* **adapter:** Update Adapter interface to support listing and uninstalling skills ([e9d99e2](https://github.com/gabeosx/skx/commit/e9d99e21291035e87a47f95a9a7f9fab3b60fb3c))
* **cli:** Implement 'list' command ([0944817](https://github.com/gabeosx/skx/commit/0944817502db54e03065e8bd1632815fe9b031b7))
* **cli:** Implement 'uninstall' command ([1e52ce9](https://github.com/gabeosx/skx/commit/1e52ce962c33f68c2d79fa21560578e8b1160825))
* **cli:** Implement basic Commander.js CLI with search command ([4c2c8a8](https://github.com/gabeosx/skx/commit/4c2c8a80926997218251fa517193000d81889de1))
* **cli:** Integrate install command with framework discovery ([16e0de7](https://github.com/gabeosx/skx/commit/16e0de78a83bc765a37791ca28ba3e390cd2c4d0))
* **cli:** Integrate real download and installation flow in install command ([880ec10](https://github.com/gabeosx/skx/commit/880ec1049da6c686d9c08e325257c2cb7977aab4))
* **cli:** Make scope selection interactive when not provided ([44309ae](https://github.com/gabeosx/skx/commit/44309ae77a9a739cee253a418064358510172a77))
* **core:** Implement SkillManager for skill detection ([77d37d8](https://github.com/gabeosx/skx/commit/77d37d8800a8ecd48ae401985787f6bb97fe7b3c))
* **homebrew:** Add formula template and update release workflow ([86792eb](https://github.com/gabeosx/skx/commit/86792eb3ab40df341684c7d1f8209c318b29808d))
* **infra:** Add CI Quality Gate workflow ([949f551](https://github.com/gabeosx/skx/commit/949f551494a55db0d624671f9dc8a466c49516a8))
* **infra:** Add Homebrew formula bump to publish workflow ([dc9e207](https://github.com/gabeosx/skx/commit/dc9e2075de1d4e68971307f619d3b88fc9183b18))
* **infra:** Add NPM publish workflow ([166ad49](https://github.com/gabeosx/skx/commit/166ad4930edc933424321cc190a3cbb0b3c967df))
* **infra:** Create .gitignore and foundation tests ([8220bec](https://github.com/gabeosx/skx/commit/8220bec189fe75ab2fdccf5b8c089a5232707209))
* **installer:** Implement installFromUrl with temp directory management ([9123448](https://github.com/gabeosx/skx/commit/912344814f7de628ddd60e16e394c3e04062fe21))
* **installer:** Implement SkillInstaller for file management ([825a3a0](https://github.com/gabeosx/skx/commit/825a3a079bf53017bbe5b7240410e26d2fbd6f71))
* **registry:** Implement registry fetching and validation logic ([f339033](https://github.com/gabeosx/skx/commit/f33903304db8b8fd37b8a6b782d7755f9873bde7))
* **release:** Configure semantic-release and GitHub Actions for NPM publishing ([4e00585](https://github.com/gabeosx/skx/commit/4e005851f96819add523aeaa84d178ab717b431f))
* **release:** Trigger first automated release via Trusted Publishing ([2240ded](https://github.com/gabeosx/skx/commit/2240dedf9bfcc4f8b9ce03d1905b38750a324f2b))
* **resolver:** Add 'detect' method to FrameworkResolver ([c726102](https://github.com/gabeosx/skx/commit/c7261025ca602cda41524bf7399f226a1b2c83f6))
* **resolver:** Implement FrameworkResolver logic ([9815fc4](https://github.com/gabeosx/skx/commit/9815fc48128b88342a94b4bd74a2b0c2bf71f148))
* **resolver:** Implement ScopeResolver ([bef6b9c](https://github.com/gabeosx/skx/commit/bef6b9c11973a8e8191b9642b0edb7f3a5105dda))
* **search:** Implement search functionality and integrate with CLI ([8c5939d](https://github.com/gabeosx/skx/commit/8c5939d5c6be068a27a81f33ba23280982170255))
* **types:** Define AgentFrameworkAdapter interface and Scope enum ([3f4431e](https://github.com/gabeosx/skx/commit/3f4431ebe27889072f49914b08bb550e441dbe8b))
* **ui:** Implement interactive mode using Clack ([b6621f6](https://github.com/gabeosx/skx/commit/b6621f616007b23236f5b0689e2839ea08528193))
* **ui:** Implement SkillSearch component ([fcd9de1](https://github.com/gabeosx/skx/commit/fcd9de1a17051fac956dd45ae60ee03bedcd6c3b))
* **utils:** Create basic Downloader utility using tiged ([c0c7f1a](https://github.com/gabeosx/skx/commit/c0c7f1a5e0d49c0adfa9952500e9b93c91547594))
* **utils:** Implement AdapterRegistry ([1f8a388](https://github.com/gabeosx/skx/commit/1f8a388bca5242a01350705c7b08decd2dc5ded6))
* **utils:** Implement robust GitHub URL parsing in Downloader ([85652cb](https://github.com/gabeosx/skx/commit/85652cb0f6cf5be56756d1e8b6cf5dfaada5580a))
* **wizard:** Implement interactive wizard flow ([ac20e0f](https://github.com/gabeosx/skx/commit/ac20e0f9a8fdc64a3154bee819f577cf8e402777))
