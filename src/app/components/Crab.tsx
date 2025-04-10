// "use client";
// import { useEffect, useState } from "react";

// export default function Crab() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (event: MouseEvent) => {
//       setPosition({ x: event.clientX, y: event.clientY });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <img
//       src="/crab.png" // make sure to place the file in your /public folder as crab.png
//       alt="Crab"
//       style={{
//         position: "fixed",
//         left: position.x,
//         top: position.y,
//         width: 80,
//         height: 80,
//         pointerEvents: "none",
//         transform: "translate(-50%, -50%)",
//         transition: "transform 0.1s ease",
//         zIndex: 9999,
//       }}
//     />
//   );
// }
