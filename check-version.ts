import fs from 'fs';
import { VERSION } from './version';

const main = () => {
  const pkg = JSON.parse(fs.readFileSync('package.json').toString()) as Record<string, unknown>;
  const version = pkg['version'];
  if (!version) throw 'The version property is not set in the package.json file';
  if (typeof version !== 'string') {
    throw `Unexpected type for the package.json version field; got ${typeof version}, expected string`;
  }
  if (version !== VERSION) {
    throw (
      `Version mismatch; package.json = ${version}, version.ts = ${VERSION}; ` +
      `Please update the package.json version property or modify the VERSION variable in version.ts to ensure they match`
    );
  }
  console.log(`Versions ${version} (package.json) and ${VERSION} (version.ts) match`);
};

if (require.main === module) {
  main();
}
