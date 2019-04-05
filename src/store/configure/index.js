// Hack for webpack alias with typescript
// Add to default ES module for export after parse .js for webpack alias
// Note: no it's possible add webpack alias to .ts or .tsx extension files see webpack repo issues
/* tslint:disable */
const { configureStore } = require('configureStore');
export default configureStore;
