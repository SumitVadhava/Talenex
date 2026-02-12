// import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// export default function ScrollButton() {
//   const [atBottom, setAtBottom] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const windowHeight = window.innerHeight;
//       const pageHeight = document.body.scrollHeight;

//       // If user reached BOTTOM → show UP
//       if (scrollTop + windowHeight >= pageHeight - 10) {
//         setAtBottom(true);
//       } else {
//         setAtBottom(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const scrollToBottom = () => {
//     window.scrollTo({
//       top: document.body.scrollHeight,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="fixed bottom-6 right-6">
//       {/* Show DOWN until bottom */}
//       {!atBottom && (
//         <button
//           onClick={scrollToBottom}
//           className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
//         >
//           <FontAwesomeIcon icon={faChevronDown} />
//         </button>
//       )}

//       {/* Show UP only when fully scrolled */}
//       {atBottom && (
//         <button
//           onClick={scrollToTop}
//           className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
//         >
//           <FontAwesomeIcon icon={faChevronUp} />
//         </button>
//       )}
//     </div>
//   );
// }  


import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

export default function ScrollButton() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button only after scrolling down a bit
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6">
      {showTop && (
        <button
          onClick={scrollToTop}
          className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition cursor-pointer"
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
    </div>
  );
}