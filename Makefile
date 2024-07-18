.PHONY: watch clean fresh

clean:
	find . \( -name 'node_modules' -o -name '.turbo' -o -name 'build' \) -type d -prune -print -exec rm -rf '{}' \;
	find . -type f -name 'tsconfig.tsbuildinfo' -exec rm -f {} +

fresh: clean
	pnpm install

node_modules: package.json pnpm-lock.yaml
	pnpm install
	
watch: node_modules
	pnpm build && pnpm watch