import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
	name: 'fileCache',
});

export const fetchPlugin = (inputCode: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {
			build.onLoad({ filter: /.*/ }, async (args: any): Promise<esbuild.OnLoadResult> => {
				if (args.path === 'index.js') {
					return {
						loader: 'jsx',
						contents: inputCode,
					};
				}

				const cashedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

				if (cashedResult) {
					return cashedResult;
				}

				const { data, request } = await axios.get(args.path);

				const loader = args.path.match(/.css$/) ? 'css' : 'jsx';

				const result: esbuild.OnLoadResult = {
					loader,
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				};

				await fileCache.setItem(args.path, result);

				return result;
			});
		},
	};
};
