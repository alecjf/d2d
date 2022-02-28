import "./navigation.css";
import React, { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "navigation",
    className: isOpen ? "open" : "closed"
  }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://fern.haus/d2d"
  }, "HOME")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://fern.haus/d2d/dharma-gem"
  }, "DHARMA GEM")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://fern.haus/d2d/dharma-lookup"
  }, "DHARMA LOOKUP")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://fern.haus/d2d/dharma-quiz"
  }, "DHARMA QUIZ")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://fern.haus/d2d/pali-lookup"
  }, "PALI LOOKUP")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "https://fern.haus/d2d/pali-quiz"
  }, "PALI QUIZ")))), /*#__PURE__*/React.createElement("div", {
    id: "hamburger",
    className: isOpen ? "hamburger-open" : "hamburger-closed",
    onClick: () => setIsOpen(!isOpen)
  }, /*#__PURE__*/React.createElement("div", {
    id: "top-line"
  }), /*#__PURE__*/React.createElement("div", {
    id: "mid-line"
  }), /*#__PURE__*/React.createElement("div", {
    id: "btm-line"
  })));
};

export default Navigation;