// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr'; // Import svgr plugin

export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		svgr(), // Include svgr plugin for SVG handling
	],
});
