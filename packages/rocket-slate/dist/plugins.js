"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Leaf = exports.Element = exports.addLeaf = exports.leaves = exports.addElement = exports.elements = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elements = {};
exports.elements = elements;

const addElement = function (pluginName, typeName, RenderFunction) {
  if (elements[typeName]) {
    throw `Error: cannot register element ${typeName} from ${pluginName} - already registered by ${elements[typeName].pluginName}`;
  }

  elements[typeName] = {
    pluginName,
    RenderFunction
  };
};

exports.addElement = addElement;
var leaves = {};
exports.leaves = leaves;

const addLeaf = function (pluginName, typeName, RenderFunction) {
  if (elements[typeName]) {
    throw `Error: cannot register leaf ${typeName} from ${pluginName} - already registered by ${elements[typeName].pluginName}`;
  }

  leaves[typeName] = {
    pluginName,
    RenderFunction
  };
};

exports.addLeaf = addLeaf;

const Element = ({
  attributes,
  children,
  element
}) => {
  if (elements[element.type]) {
    const {
      pluginName,
      RenderFunction
    } = elements[element.type];
    console.log("render element", element.type, "with function from", pluginName);
    return _react.default.createElement(RenderFunction, attributes, children);
  }

  console.log("render element", element.type, "with div");
  return _react.default.createElement("div", attributes, children);
};

exports.Element = Element;

const Leaf = ({
  attributes,
  children,
  leaf
}) => {
  Object.keys(elements).forEach(function (typeName) {
    if (leaf[typeName]) {
      const {
        pluginName,
        RenderFunction
      } = leaf[typeName];
      console.log("render leaf", typeName, "with function from", pluginName);
      children = RenderFunction(children);
    }
  });
  return _react.default.createElement("span", attributes, children);
};

exports.Leaf = Leaf;
//# sourceMappingURL=plugins.js.map