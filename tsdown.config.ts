import { type UserConfig, defineConfig } from 'tsdown';

const config: UserConfig = defineConfig({
  dts: true,
  entry: ['index.ts'],
  format: ['esm', 'cjs'],
  target: 'es2022'
});

export default config;
