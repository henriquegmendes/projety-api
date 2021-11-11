"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.get('/', (req, res) => res.json({
  message: 'Hello Projety API! :-)'
}));
app.listen(5050, () => console.log('App connected at PORT 5050'));