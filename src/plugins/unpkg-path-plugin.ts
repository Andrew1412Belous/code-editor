import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from "localforage"

const fileCache = localForage.createInstance({
	name: 'fileCache',

})

export const unpkgPathPlugin = (inputCode: string) => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return { path: 'index.js', namespace: 'a' };
			})

			build.onResolve({ filter: /^\.+\// }, (args: any) => {
				return {
					namespace: 'a',
					path: new URL(
						args.path,
						'https://unpkg.com' + args.resolveDir + '/'
					).href,
				};
			})

			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: 'a',
					path: `https://unpkg.com/${args.path}`,
				};
			});

			build.onLoad({ filter: /.*/ }, async (args: any): Promise<esbuild.OnLoadResult> => {
				if (args.path === 'index.js') {
					return {
						loader: 'jsx',
						contents: inputCode,
					};
				}

				const cashedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

				if (cashedResult) {
					return cashedResult
				}

				const { data, request } = await axios.get(args.path);
				const result: esbuild.OnLoadResult =  {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				};

				await fileCache.setItem(args.path, result)

				return result
			});
		},
	};
};
