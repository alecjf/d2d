function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import "./list-box.css";
import React, { useRef, useEffect } from "react";
import dharmaLists, { paliWords } from "d2d-all-info";

function capitalize(str) {
  const firstChar = str.charAt(0),
        rest = str.substr(1);
  return firstChar.toUpperCase() + rest;
}

const ListBox = ({
  title,
  list,
  setList
}) => {
  const prevlistRef = useRef(),
        fadeTime = 1250,
        fadeOverlap = 500;
  useEffect(() => {
    if (list) {
      const dom = document.getElementById(title),
            hasPrevRef = prevlistRef.current !== "TITLE";

      if (list === title) {
        setTimeout(() => {
          dom.style.zIndex = 3;
          dom.style.transform = "translateZ(100px)";
          dom.className = "list-box shown";
        }, hasPrevRef ? fadeTime - fadeOverlap : 0);
      } else if (prevlistRef.current === title) {
        dom.className = "list-box hidden";
        setTimeout(() => {
          dom.style.zIndex = -3; // same measurement as #scene.clicked

          dom.style.transform = "translateZ(-1000px)";
        }, fadeTime);
      }

      prevlistRef.current = list;
    }
  }, [list, title]);

  const WordPair = ({
    left,
    right
  }) => {
    return /*#__PURE__*/React.createElement("div", {
      key: `pair-${left}`,
      className: "pair"
    }, /*#__PURE__*/React.createElement("div", {
      className: "left"
    }, left), /*#__PURE__*/React.createElement("div", {
      className: "right"
    }, right));
  };

  const Suttas = ({
    suttas
  }) => {
    const Sutta = ({
      title,
      section,
      verse,
      link
    }) => {
      return /*#__PURE__*/React.createElement("div", {
        className: "sutta-template"
      }, /*#__PURE__*/React.createElement("a", {
        href: link,
        target: "_blank",
        rel: "noreferrer"
      }, title, " (", section, " ", verse, ")"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null));
    };

    return /*#__PURE__*/React.createElement("div", {
      className: "suttas-template"
    }, /*#__PURE__*/React.createElement("h3", null, `Sutta${suttas.length > 1 ? "s" : ""}`), suttas.map(sutta => /*#__PURE__*/React.createElement(Sutta, _extends({}, sutta, {
      key: sutta.title
    }))));
  };

  function recursiveListing(obj, recursionLevel, parentKey) {
    const isParentKeyPali = parentKey === "pali",
          isTopLevelPali = isParentKeyPali && recursionLevel === 2;
    let holder;

    if (typeof obj === "string") {
      holder = isParentKeyPali ? /*#__PURE__*/React.createElement(WordPair, {
        left: obj,
        right: paliWords[obj],
        key: `word-pair-${obj}`
      }) : /*#__PURE__*/React.createElement("div", {
        className: parentKey === "definition" ? "definition" : "word",
        key: `word-${obj}`
      }, obj);
      return parentKey === "definition" ? holder : /*#__PURE__*/React.createElement("div", {
        className: `sub${isTopLevelPali ? " top-level-pali" : ""}`,
        key: `holder-${obj}`
      }, holder);
    } else if (obj instanceof Array) {
      return obj.map(item => recursiveListing(item, recursionLevel + 1, parentKey));
    } else if (obj?.constructor === {}.constructor) {
      return [recursionLevel === 0 && /*#__PURE__*/React.createElement("div", {
        className: "title",
        key: parentKey
      }, capitalize(parentKey)), ...Object.keys(obj) //				.sort()
      .map(key => {
        if (key !== "definition" && key !== "parts" && key !== "bodyparts" && key !== "pali") {
          return key === "suttas" ? /*#__PURE__*/React.createElement(Suttas, {
            suttas: obj[key],
            key: `sutta-${obj[key]}`
          }) : parentKey === "bodyparts" ? /*#__PURE__*/React.createElement("div", {
            className: "sub",
            key: key
          }, /*#__PURE__*/React.createElement(WordPair, {
            left: key,
            right: obj[key]
          })) : key !== "isOrdered" && key !== "concatenate" && /*#__PURE__*/React.createElement("div", {
            key: `array-${key}`,
            className: "sub"
          }, /*#__PURE__*/React.createElement("div", {
            className: "header"
          }, capitalize(key)), typeof obj[key] === "string" ? obj[key] : key !== "suttas" && recursiveListing(obj[key], recursionLevel + 1, key));
        } else {
          return recursiveListing(obj[key], recursionLevel + 1, key);
        }
      })];
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: `list-box${list ? " hidden" : ""}`,
    id: `${title}${!list ? " lookup" : ""}`,
    style: {
      zIndex: -3,
      transform: "translateZ(-1000px)",
      // eslint-disable-next-line no-restricted-globals
      maxWidth: (screen.width < 600 ? screen.width : 600) - 25,
      left: `calc(50% - ${// eslint-disable-next-line no-restricted-globals
      ((screen.width < 600 ? screen.width : 600) - 25) / 2}px)`
    }
  }, setList && /*#__PURE__*/React.createElement("div", {
    className: "close-info",
    onClick: () => setList("TITLE")
  }, "X"), recursiveListing(dharmaLists[title], 0, title));
};

export default ListBox;
export { capitalize };