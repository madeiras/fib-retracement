import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptEslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['coverage', 'dist']),
  eslint.configs.recommended,
  typescriptEslint.configs.recommended,
  {
    rules: {
      curly: ['error', 'all'],
      'id-length': ['error', { min: 2 }],
      'no-restricted-syntax': [
        'error',
        {
          message: 'Use an early return or default-then-override instead of `else`',
          selector: 'IfStatement[alternate]'
        }
      ],
      'no-ternary': 'error'
    }
  }
);
