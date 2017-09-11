# ensure-directory
A promise based node.js module that checks to see if a directory exists and if it doesn't, it creates it for you.

# Install
```
npm install ensure-directory
```

# Usage
```
\\ Typescript
import ensureDirectory from 'ensure-directory';

\\ ES6
const ED = require('ensure-directory');
ED.ensureDirectory('/tmp/test').then(...);
```