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

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function VideoCall({ setHideNavbar }) {
  const { roomId } = useParams();

  const zegoRef = useRef(null);
  const hasJoinedRef = useRef(false);
  const [isJoined, setIsJoined] = useState(false);

  // Detect if device is mobile
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768
    );
  };

  useEffect(() => {
    if (!roomId) return;

    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;
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

    // Mobile-optimized configuration
    const isMobileDevice = isMobile();

    zp.joinRoom({
      container: document.getElementById("zego-container"),
      scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
      showPreJoinView: true,
      showRoomDetailsButton: true, // Hide on mobile to save space
      showInviteButton: true, // Less critical on mobile screens
      showScreenSharingButton: true, // Usually fails or is clunky on mobile browsers
      showTurnOffRemoteCameraButton: false,
      showTurnOffRemoteMicrophoneButton: false,
      showRemoveUserButton: false,
      videoResolutionDefault: ZegoUIKitPrebuilt.VideoResolution_720P,
      // Mobile-friendly layout settings
      layout: isMobileDevice ? "Auto" : "Grid",
      showLayoutButton: true, // Limit participants on mobile for performance
      onJoinRoom: () => {
        hasJoinedRef.current = true;
        setIsJoined(true);
        setHideNavbar(true);
      },
      onLeaveRoom: () => {
        hasJoinedRef.current = false;
        setIsJoined(false);
        setHideNavbar(false);
      },
      sharedLinks: [
        {
          name: "Copy Link",
          url: `${window.location.origin}/join/${roomId}`,
        },
      ],

      preJoinViewConfig: {
        showAvatarInPreJoinView: !isMobileDevice,
      },
    });

    return () => {
      zegoRef.current?.destroy();
      zegoRef.current = null;

      hasJoinedRef.current = false;
      setHideNavbar(false);
    };
  }, [roomId, setHideNavbar]);

  return (
    <div
      id="zego-container"
      className="zego-responsive-container"
      style={{
        position: isJoined ? "fixed" : "relative",
        top: 0,
        left: 0,
        width: "100%",
        maxWidth: "100vw",
        // Using svh for better mobile stability, and dvh for the joined state
        height: isJoined ? "100dvh" : "calc(100svh - 64px)",
        zIndex: isJoined ? 999 : 1,
        marginTop: isJoined ? "0px" : "26px",
        paddingBottom: "env(safe-area-inset-bottom)", // Account for mobile home indicators
        boxSizing: "border-box",
        overflow: "visible", // Changed from hidden to show popups
        WebkitOverflowScrolling: "touch",
        touchAction: "manipulation",
      }}
    />
  );
}

