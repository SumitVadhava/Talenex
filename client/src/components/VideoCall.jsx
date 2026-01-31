// import { useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { Maximize, Minimize } from "lucide-react";

// export default function VideoCall() {
//   const { roomId } = useParams();

//   const hasJoinedRef = useRef(false);   // join guard
//   const zegoRef = useRef(null); 
  
//   const isFullscreenRef = useRef(false);

// const toggleFullscreen = () => {
//   const el = document.getElementById("zego-container");

//   if (!document.fullscreenElement) {
//     el.requestFullscreen();
//     isFullscreenRef.current = true;
//   } else {
//     document.exitFullscreen();
//     isFullscreenRef.current = false;
//   }
// };

//   useEffect(() => {
//     if (!roomId) return;
//     if (hasJoinedRef.current) return;

//     hasJoinedRef.current = true; // ✅ SET IT IMMEDIATELY

//     const appID = 169896951;
//     const serverSecret = "1003a466744c70ebde697eefceaea4cc"; // ✅ ServerSecret

//     const userId = "user_" + Math.floor(Math.random() * 10000);

//     const kitToken =
//       ZegoUIKitPrebuilt.generateKitTokenForTest(
//         appID,
//         serverSecret,
//         roomId,
//         userId,
//         userId
//       );

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
//     zegoRef.current = zp; // ✅ store instance

//     zp.joinRoom({
//       container: document.getElementById("zego-container"),
//       scenario: {
//         mode: ZegoUIKitPrebuilt.VideoConference,
//       },
//       showPreJoinView: true,
//       showRoomDetailsButton: true,
//       showInviteButton: true,
//       showScreenSharingButton: true,
//       showFullscreenButton: true, // ✅ ADD THIS
//       toolbarConfig: {
//         showText: true,
//          // tooltip-like labelss  
//       },
//       sharedLinks: [
//         {
//           name: "Copy Link",
//           url: `${window.location.origin}/join/${roomId}`,
//         },
//       ],
//     });
//     // ✅ CLEANUP (VERY IMPORTANT)
//     return () => {
//       try {
//         zegoRef.current?.destroy(); // prevents repeat join
//         zegoRef.current = null;
//         hasJoinedRef.current = false;
//       } catch (e) {
//         console.warn("Zego cleanup failed", e);
//       }
//     };
//   }, [roomId]);

//   // return (


//   //   <div
//   //     id="zego-container"
//   //     style={{
//   //       width: "100vw",
//   //       height: "893px",
//   //       marginTop: "40px",
//   //     }}
//   //   />
//   // );

//   return (
//   <>
//     {/* 🔘 Fullscreen Button */}
//     <button
//       onClick={toggleFullscreen}
//       title="Fullscreen"
//       style={{
//         position: "fixed",
//         top: "80px",
//         right: "14px",
//         zIndex: 9999,
//         padding: "8px",
//         borderRadius: "8px",
//         background: "rgba(0,0,0,0.6)",
//         color: "#fff",
//         border: "none",
//         cursor: "pointer",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       {document.fullscreenElement ? (
//         <Minimize size={20} />
//       ) : (
//         <Maximize size={20} />
//       )}
//     </button>

  
//     {/* 🎥 Zego Video Container */}
//     <div
//       id="zego-container"
//       style={{
//         width: "100vw",
//         height: "100vh",
//         marginTop: "40px",
//       }}
//     />
//   </>
// );
// }  

import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function VideoCall({ setHideNavbar }) {
  const { roomId } = useParams();

  const zegoRef = useRef(null);
  const hasJoinedRef = useRef(false);

  // Request fullscreen safely
  const requestFullscreen = () => {
    const el = document.getElementById("zego-container");
    if (el && !document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    if (!roomId) return;

    const appID = 169896951;
    const serverSecret = "1003a466744c70ebde697eefceaea4cc";
    const userId = "user_" + Math.floor(Math.random() * 10000);

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userId,
      userId
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zegoRef.current = zp;

    zp.joinRoom({
      container: document.getElementById("zego-container"),
      scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
      showPreJoinView: true,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `${window.location.origin}/join/${roomId}`,
        },
      ],
    });

    const container = document.getElementById("zego-container");

    // 👀 Observe Zego UI state changes
    const observer = new MutationObserver(() => {
      const preJoinExists = container.querySelector("input");

      // ✅ JOIN DETECTED
      if (!preJoinExists && !hasJoinedRef.current) {
        hasJoinedRef.current = true;

        setHideNavbar(true);   // hide nav
        requestFullscreen();  // enter fullscreen
      }

      // ✅ LEAVE DETECTED (Return to Home Screen)
      if (preJoinExists && hasJoinedRef.current) {
        hasJoinedRef.current = false;

        setHideNavbar(false); // show nav again

        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();

      zegoRef.current?.destroy();
      zegoRef.current = null;

      hasJoinedRef.current = false;
      setHideNavbar(false);

      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, [roomId, setHideNavbar]);

  return (
      <div
        id="zego-container"
        style={{
          top : 0,
          left: 0,
          position: "fixed",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          marginTop: 0,
          padding: 0,
        }}
      />
  );
}