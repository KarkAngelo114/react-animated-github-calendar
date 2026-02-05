import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const AnimatedGithubCalendar = ({
    username = "",
    blockSize = 12,
    blockMargin = 2,
    animateOnce = false
}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Set triggerOnce based on your prop
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

    if (loading) return <div>Loading...</div>;
    if (!data) return null;

    // Define the animation logic for the container
    const containerVariants = {
        visible: { 
            transition: { 
                staggerChildren: 0.02,
                staggerDirection: 1 // Left to right
            } 
        },
        hidden: { 
            transition: { 
                staggerChildren: 0.01, 
                staggerDirection: -1 // Right to left
            } 
        }
    };

    const legendColors = [
        ...new Set(
            data.contributions
                .flat()
                .map(d => d.contributionCount > 0 ? d.color : "#333")
        )
    ];


    return (
        <div style={{
            padding: "20px",
            backgroundColor: "#252525fe",
            borderRadius: "20px",
            boxSizing: 'border-box', 
            width: '100%',
            maxWidth: '100vw', // Prevents the card itself from pushing the page out
            overflow: 'hidden'  // Clips any accidental overflow from the title/padding
        }}>
            <div>
                <p style={{color:'white', fontWeight:'bolder', fontSize:'1.5rem'}}>Contribution Activity</p>
            </div>
            <div ref={ref} style={{
                overflowX: "auto", 
                overflowY: "hidden",
                boxSizing: "border-box",
                width: "100%",
                WebkitOverflowScrolling: "touch",
                paddingBottom: "10px"
            }}>
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    style={{
                        display: "flex",
                        gap: `${blockMargin}px`,
                        width: "max-content",
                    }}
                >
                    {data.contributions.map((week, i) => {

                        return (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.5, y: 10 },
                                    visible: { opacity: 1, scale: 1, y: 0 },
                                }}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: `${blockMargin}px`,
                                }}
                            >
                                {week.map((day, j) => (
                                    <div
                                        key={j}
                                        style={{
                                            width: `${blockSize}px`,
                                            height: `${blockSize}px`,
                                            borderRadius: 3,
                                            backgroundColor: day.contributionCount > 0 ? day.color : '#333',
                                            cursor: "pointer",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            transition: "transform 0.1s ease-in-out",
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.4)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                        title={`${day.contributionCount} contributions on ${day.date}`}
                                    />
                                ))}
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
            <div style={{ marginTop: "15px", fontSize: "12px", color: "white", opacity: 0.7, display:'flex', justifyContent:"space-between", alignItems:'center' }}>
                <div style={{width:'100%', boxSizing:'border-box'}}>
                    <p>Total Contributions: {data.totalContributions}</p>
                </div>
                <div style={{width:'100%', boxSizing:'border-box', display:'flex', justifyContent:'flex-end', alignItems:'center', gap: '10px'}}>
                    <p>Less</p>
                    <div style={{ display: "flex", gap: 4 }}>
                        {legendColors.map((color, i) => (
                            <div
                                key={i}
                                style={{
                                    width: blockSize,
                                    height: blockSize,
                                    borderRadius: 3,
                                    backgroundColor: color,
                                    border: "1px solid rgba(255,255,255,0.1)",
                                }}
                            />
                        ))}
                    </div>
                    <p>More</p>
                </div>
            </div>
        </div>
    );
};