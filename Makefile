install:
	npm install

dev--linux: install
	multitail -s 2 \
		-cT ANSI -t "[playground] " -l "npm start --prefix packages/playground" \
		-cT ANSI -t "[slate-renderer] " -l "npm run build:watch --prefix packages/slate-renderer" \
		-cT ANSI -t "[docx-cleaner] " -l "npm run build:watch --prefix packages/docx-cleaner" \
		-cT ANSI -t "[slate-commons] " -l "npm run build:watch --prefix packages/slate-commons" \
		-cT ANSI -t "[slate-editor] " -l "npm run build:watch --prefix packages/slate-editor" \
		-cT ANSI -t "[slate-hyperscript] " -l "npm run build:watch --prefix packages/slate-hyperscript" \
		-cT ANSI -t "[slate-lists] " -l "npm run build:watch --prefix packages/slate-lists" \
		-cT ANSI -t "[slate-types] " -l "npm run build:watch --prefix packages/slate-types";
