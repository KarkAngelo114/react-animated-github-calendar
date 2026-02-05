var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.jsx
var index_exports = {};
__export(index_exports, {
  AnimatedGithubCalendar: () => AnimatedGithubCalendar
});
module.exports = __toCommonJS(index_exports);
var import_react = __toESM(require("react"));
var import_framer_motion = require("framer-motion");
var import_react_intersection_observer = require("react-intersection-observer");
var AnimatedGithubCalendar = ({
  username = "",
  blockSize = 12,
  blockMargin = 2,
  animateOnce = false
}) => {
  const [data, setData] = (0, import_react.useState)(null);
  const [loading, setLoading] = (0, import_react.useState)(true);
  const { ref, inView } = (0, import_react_intersection_observer.useInView)({
    triggerOnce: animateOnce,
    threshold: 0.2
  });
  (0, import_react.useEffect)(() => {
    if (username) fetchData();
  }, [username]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://github-contributions-api.deno.dev/${username}.json`
      );
      const result = await response.json();
      if (!response.ok) throw new Error("Fetch failed");
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return /* @__PURE__ */ import_react.default.createElement("div", null, "Loading...");
  if (!data) return null;
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: 1
        // Left to right
      }
    },
    hidden: {
      transition: {
        staggerChildren: 0.01,
        staggerDirection: -1
        // Right to left
      }
    }
  };
  const legendColors = [
    ...new Set(
      data.contributions.flat().map((d) => d.contributionCount > 0 ? d.color : "#333")
    )
  ];
  return /* @__PURE__ */ import_react.default.createElement("div", { style: {
    padding: "20px",
    backgroundColor: "#252525fe",
    borderRadius: "20px",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "100vw",
    // Prevents the card itself from pushing the page out
    overflow: "hidden"
    // Clips any accidental overflow from the title/padding
  } }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("p", { style: { color: "white", fontWeight: "bolder", fontSize: "1.5rem" } }, "Contribution Activity")), /* @__PURE__ */ import_react.default.createElement("div", { ref, style: {
    overflowX: "auto",
    overflowY: "hidden",
    boxSizing: "border-box",
    width: "100%",
    WebkitOverflowScrolling: "touch",
    paddingBottom: "10px"
  } }, /* @__PURE__ */ import_react.default.createElement(
    import_framer_motion.motion.div,
    {
      initial: "hidden",
      animate: inView ? "visible" : "hidden",
      variants: containerVariants,
      style: {
        display: "flex",
        gap: `${blockMargin}px`,
        width: "max-content"
      }
    },
    data.contributions.map((week, i) => {
      return /* @__PURE__ */ import_react.default.createElement(
        import_framer_motion.motion.div,
        {
          key: i,
          variants: {
            hidden: { opacity: 0, scale: 0.5, y: 10 },
            visible: { opacity: 1, scale: 1, y: 0 }
          },
          style: {
            display: "flex",
            flexDirection: "column",
            gap: `${blockMargin}px`
          }
        },
        week.map((day, j) => /* @__PURE__ */ import_react.default.createElement(
          "div",
          {
            key: j,
            style: {
              width: `${blockSize}px`,
              height: `${blockSize}px`,
              borderRadius: 3,
              backgroundColor: day.contributionCount > 0 ? day.color : "#333",
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.1)",
              transition: "transform 0.1s ease-in-out"
            },
            onMouseEnter: (e) => e.currentTarget.style.transform = "scale(1.4)",
            onMouseLeave: (e) => e.currentTarget.style.transform = "scale(1)",
            title: `${day.contributionCount} contributions on ${day.date}`
          }
        ))
      );
    })
  )), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginTop: "15px", fontSize: "12px", color: "white", opacity: 0.7, display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ import_react.default.createElement("div", { style: { width: "100%", boxSizing: "border-box" } }, /* @__PURE__ */ import_react.default.createElement("p", null, "Total Contributions: ", data.totalContributions)), /* @__PURE__ */ import_react.default.createElement("div", { style: { width: "100%", boxSizing: "border-box", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px" } }, /* @__PURE__ */ import_react.default.createElement("p", null, "Less"), /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", gap: 4 } }, legendColors.map((color, i) => /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      key: i,
      style: {
        width: blockSize,
        height: blockSize,
        borderRadius: 3,
        backgroundColor: color,
        border: "1px solid rgba(255,255,255,0.1)"
      }
    }
  ))), /* @__PURE__ */ import_react.default.createElement("p", null, "More"))));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnimatedGithubCalendar
});
