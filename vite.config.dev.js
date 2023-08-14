"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vite = require("vite");

var _pluginReactSwc = _interopRequireDefault(require("@vitejs/plugin-react-swc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// https://vitejs.dev/config/
var _default = (0, _vite.defineConfig)({
  plugins: [(0, _pluginReactSwc["default"])()]
});

exports["default"] = _default;