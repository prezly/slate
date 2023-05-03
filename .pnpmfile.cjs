const OMIT_DEPENDENCIES = [
    'react',
    'react-dom',
    'slate',
    'slate-react',
    'slate-history',
];

function readPackage(pkg, context) {
    if (pkg.name && pkg.name.startsWith("@prezly/slate-")) {
        OMIT_DEPENDENCIES.forEach((dependencyName) => {
            if (pkg.peerDependencies && pkg.peerDependencies[dependencyName]) {
                pkg.peerDependencies = omitDependency(pkg.peerDependencies, dependencyName);
                context.log(`Skipping "${dependencyName}" from "${pkg.name}" peerDependencies.`);
            }
        });
    }

    return pkg;
}

/**
 * @param {Record<string,string>} dependencies
 * @param {string} omit
 * @returns {Record<string,string>}
 */
function omitDependency(dependencies, omit) {
    return Object.fromEntries(
        Object.entries(dependencies).filter(([name]) => name !== omit),
    )
}

module.exports = {
    hooks: {
        readPackage
    }
};
