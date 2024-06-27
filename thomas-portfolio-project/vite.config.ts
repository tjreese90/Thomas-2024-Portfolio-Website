import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export default defineConfig({
	plugins: [react(), tsconfigPaths(), svgr()],
	define: {
		'process.env': {
			VITE_GOOGLE_GEN_AI_KEY: JSON.stringify(
				process.env.REACT_APP_GOOGLE_GEN_AI_KEY
			),
			VITE_GEN_AI_MODEL_NAME: JSON.stringify(
				process.env.REACT_APP_GEN_AI_MODEL_NAME
			),
		},
	},
});
