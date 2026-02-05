// src/index.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
var AnimatedGithubCalendar = ({
  username = "",
  blockSize = 12,
  blockMargin = 2,
  animateOnce = false
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: animateOnce,
    threshold: 0.2
  });
  useEffect(() => {
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
  if (loading) return /* @__PURE__ */ React.createElement("div", null, "Loading...");
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
  return /* @__PURE__ */ React.createElement("div", { style: {
    padding: "20px",
    backgroundColor: "#252525fe",
    borderRadius: "20px",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "100vw",
    // Prevents the card itself from pushing the page out
    overflow: "hidden"
    // Clips any accidental overflow from the title/padding
  } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { color: "white", fontWeight: "bolder", fontSize: "1.5rem" } }, "Contribution Activity")), /* @__PURE__ */ React.createElement("div", { ref, style: {
    overflowX: "auto",
    overflowY: "hidden",
    boxSizing: "border-box",
    width: "100%",
    WebkitOverflowScrolling: "touch",
    paddingBottom: "10px"
  } }, /* @__PURE__ */ React.createElement(
    motion.div,
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
      return /* @__PURE__ */ React.createElement(
        motion.div,
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
        week.map((day, j) => /* @__PURE__ */ React.createElement(
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
  )), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "15px", fontSize: "12px", color: "white", opacity: 0.7, display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: "100%", boxSizing: "border-box" } }, /* @__PURE__ */ React.createElement("p", null, "Total Contributions: ", data.totalContributions)), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", boxSizing: "border-box", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px" } }, /* @__PURE__ */ React.createElement("p", null, "Less"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4 } }, legendColors.map((color, i) => /* @__PURE__ */ React.createElement(
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
  ))), /* @__PURE__ */ React.createElement("p", null, "More"))));
};
export {
  AnimatedGithubCalendar
};
