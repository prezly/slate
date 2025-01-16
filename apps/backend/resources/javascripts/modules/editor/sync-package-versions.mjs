import fs from 'node:fs';

const rootPackage = JSON.parse(fs.readFileSync('./package.json'));

const subPackages = rootPackage.workspaces
    .map((packagePath) => {
        const contents = fs.readFileSync(`./${packagePath}/package.json`);
        return {
            path: packagePath,
            package: JSON.parse(contents),
            contents: String(contents),
        };
    });

const { packages = [] } = rootPackage['sync-package-versions'] ?? {};

const updatedSubPackages = subPackages.map((subPackage) => {
    let contents = subPackage.contents;

    contents = packages.reduce((contents, packageName) => {
        const packageVersion = rootPackage.dependencies?.[packageName]
            ?? rootPackage.peerDependencies?.[packageName]
            ?? rootPackage.devDependencies?.[packageName];

        if (!packageVersion) return contents;

        return contents.replace(
            new RegExp(`"${packageName}":\\s+"([^"]+)"`, 'g'),
            (matchedString, matchedVersion) => matchedString.replace(matchedVersion, packageVersion),
        );
    }, contents);

    if (contents === subPackage.contents) {
        return undefined;
    }

    return { ...subPackage, contents }
}).filter(Boolean);

updatedSubPackages.forEach((subPackage) => {
    console.log(`Writing ${subPackage.path}/package.json`);

    fs.writeFileSync(`${subPackage.path}/package.json`, subPackage.contents);
})
