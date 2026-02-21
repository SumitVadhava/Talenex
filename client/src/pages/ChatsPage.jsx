import { useTalenexChat } from "@/context/ChatContext";
import { useSearchParams } from "react-router-dom";
import { MessageCircle, Search, Lock, ChevronDown, ArrowLeft, MessageCircleIcon, MessageCircleHeart } from "lucide-react";
import ChatBg from "../assets/chat-bg-4.png";
import TalenexLogo from "/logo.png";
import React, { useEffect, useState, useRef } from "react";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  Window,
  ChannelList,
  Thread,
  useChatContext as useStreamChatContext,
  useMessageContext,
  useChannelActionContext,
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";
import "../chat_overrides.css";

/* ─── Global font + keyframes ─────────────────────────── */
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }

    @keyframes bounce3dot {
      0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
      40%            { transform: translateY(-7px); opacity: 1; }
    }
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Micro-interaction chat background ── */
    @keyframes bgShimmer {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes floatOrb1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33%       { transform: translate(30px, -20px) scale(1.08); }
      66%       { transform: translate(-15px, 15px) scale(0.95); }
    }
    @keyframes floatOrb2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      40%       { transform: translate(-25px, 20px) scale(1.06); }
      70%       { transform: translate(20px, -10px) scale(0.97); }
    }
    @keyframes floatOrb3 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50%       { transform: translate(15px, 25px) scale(1.04); }
    }
  `}</style>
);

/* ─── Pin Indicator (shown above pinned messages) ────── */
const CustomPinIndicator = () => {
  const { message } = useMessageContext("CustomPinIndicator");
  if (!message?.pinned) return null;
  const pinnedBy = message.pinned_by?.name || message.pinned_by?.id || "";
  return (
    <div className="talenex-pin-indicator">
      <svg width="12" height="12" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        <path d="M13.3518 6.686L6.75251 0.0866699L5.80984 1.02867L6.75318 1.972V1.97334L3.45318 5.272L3.45251 5.27334L2.50984 4.32934L1.56718 5.27267L4.39584 8.10067L0.624512 11.8713L1.56718 12.814L5.33851 9.04334L8.16718 11.8713L9.10984 10.9293L8.16718 9.986L11.4672 6.686L12.4098 7.62867L13.3518 6.686ZM7.22451 9.04267L7.22385 9.04334L4.39584 6.21467L7.69518 2.91467L10.5232 5.74267L7.22451 9.04267Z" fill="currentColor" fillRule="evenodd" />
      </svg>
      <span>{pinnedBy ? `Pinned by ${pinnedBy}` : "Pinned message"}</span>
    </div>
  );
};

/* ─── Window width hook (for mobile layout) ──────────────── */
const useWindowWidth = () => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
};

/* ─── Sync Stream channel → context ──────────────────────────
   Fires when the user clicks a channel in the ChannelList.
   Also clears pendingChannelCid if the user manually picks a
   different channel than the one we pre-set from the Message button.
───────────────────────────────────────────────────────────── */
const ChannelSelectionWatcher = ({ onChannelSelected }) => {
  const { channel: streamChannel, setActiveChannel: setStreamChannel } = useStreamChatContext();
  const { setActiveChannel, activeChannel, pendingChannelCid, setPendingChannelCid } = useTalenexChat();

  // Use a ref to prevent bidirectional sync loops
  const syncLock = useRef(false);

  // 1. Sync Stream -> Our Context (When user clicks a list item)
  useEffect(() => {
    if (streamChannel && streamChannel.cid !== activeChannel?.cid) {
      if (syncLock.current) {
        syncLock.current = false;
        return;
      }
      setActiveChannel(streamChannel);
      // Clear the pending pin if user switched to a different channel manually
      if (pendingChannelCid && streamChannel.cid !== pendingChannelCid) {
        setPendingChannelCid(null);
      }
      onChannelSelected?.(streamChannel);
    }
  }, [streamChannel]); // Only depend on streamChannel change

  // 2. Sync Our Context -> Stream (When navigating from profile button)
  useEffect(() => {
    if (activeChannel && activeChannel.cid !== streamChannel?.cid) {
      syncLock.current = true;
      setStreamChannel(activeChannel);
    }
  }, [activeChannel, setStreamChannel]); // Only depend on activeChannel change

  return null;
};

/* ─── Avatar ──────────────────────────────────────────── */
const Avatar = React.memo(({ name = "", image = "", size = 40 }) => {
  const initials = React.useMemo(() =>
    name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase(),
    [name]
  );
  return (
    <div
      style={{
        width: size, height: size, minWidth: size,
        borderRadius: "50%",
        background: image
          ? `url(${image}) center/cover no-repeat`
          : "linear-gradient(135deg, #334155 0%, #0f172a 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size * 0.37, fontWeight: 700, color: "#fff",
        flexShrink: 0, userSelect: "none",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        boxShadow: "0 0 0 2px rgba(255,255,255,0.8)",
      }}
    >
      {!image && initials}
    </div>
  );
});
Avatar.displayName = "Avatar";

/* ─── Sidebar search ──────────────────────────────────── */
const SidebarSearch = ({ value, onChange }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <Search size={13} style={{
        position: "absolute", left: 14, top: "50%",
        transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none",
      }} />
      <input
        type="text"
        placeholder="Search conversations…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", paddingLeft: 34, paddingRight: 12,
          paddingTop: 9, paddingBottom: 9,
          borderRadius: 999,
          border: `1.5px solid ${focused ? "#0f172a" : "#e2e8f0"}`,
          background: focused ? "#fff" : "#f8fafc",
          fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: "#0f172a", outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
          boxShadow: focused ? "0 0 0 3px rgba(15,23,42,0.07)" : "none",
        }}
      />
    </div>
  );
};

/* ─── Custom Channel Header ───────────────────────────── */
const CustomChannelHeader = ({ activeChannel, currentUserId, onBackClick }) => {
  const members = Object.values(activeChannel?.state?.members || {});
  const otherMember = members.find((m) => m.user?.id !== currentUserId);
  const otherUser = otherMember?.user;
  const name = otherUser?.name || activeChannel?.data?.name || "Conversation";
  const image = otherUser?.image || "";
  const isOnline = otherUser?.online ?? false;

  const [showSearch, setShowSearch] = useState(false);
  const [msgQuery, setMsgQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const searchInputRef = useRef(null);
  const debounceRef = useRef(null);
  const { jumpToMessage } = useChannelActionContext();

  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus();
    else { setMsgQuery(""); setResults([]); }
  }, [showSearch]);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!msgQuery.trim()) { setResults([]); return; }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const q = msgQuery.toLowerCase().trim();

        // 1. Local Search (Active messages)
        const localMessages = activeChannel.state.messages || [];
        const localResults = [];
        for (let i = 0; i < localMessages.length; i++) {
          const m = localMessages[i];
          if ((m.text || "").toLowerCase().includes(q)) {
            localResults.push({ message: m });
          }
        }

        // 2. Server Search (Deep History)
        const res = await activeChannel.search(
          msgQuery.trim(),
          { limit: 500, sort: [{ created_at: -1 }] }
        );
        const serverResults = res.results || [];

        // 3. High-performance Merge
        const mergedMap = new Map();

        // Server results first
        for (let i = 0; i < serverResults.length; i++) {
          mergedMap.set(serverResults[i].message.id, serverResults[i]);
        }

        // Local results
        for (let i = 0; i < localResults.length; i++) {
          mergedMap.set(localResults[i].message.id, localResults[i]);
        }

        const mergedList = Array.from(mergedMap.values())
          .filter(item => (item.message.text || "").toLowerCase().includes(q))
          .sort((a, b) => {
            const timeA = a.message.created_at;
            const timeB = b.message.created_at;
            // Native string comparison is faster than new Date()
            return (timeB < timeA ? -1 : (timeB > timeA ? 1 : 0));
          });

        setResults(mergedList.slice(0, 50));
      } catch (err) {
        console.error("Message search error:", err);
        setResults([]);
      } finally { setSearching(false); }
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [msgQuery, activeChannel]);

  const formatTime = (ts) => {
    if (!ts) return "";
    const d = new Date(ts);
    return d.toLocaleDateString([], { month: "short", day: "numeric" }) +
      " · " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", boxShadow: "0 1px 0 #e2e8f0", position: "relative" }}>
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px 20px", minHeight: 62, gap: 12 }}>
        {onBackClick && (
          <button onClick={onBackClick} className="chat-back-btn" style={{
            background: "none", border: "none", cursor: "pointer", padding: "6px",
            borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
            color: "#64748b", flexShrink: 0, transition: "background 0.15s",
          }}>
            <ArrowLeft size={20} strokeWidth={2} />
          </button>
        )}
        <Avatar name={name} image={image} size={40} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.2 }}>
            {name}
          </div>
          <div style={{ fontSize: 12, color: isOnline ? "#22c55e" : "#94a3b8", fontFamily: "'Plus Jakarta Sans', sans-serif", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
            {isOnline && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />}
            {isOnline ? "online" : "offline"}
          </div>
        </div>
        {/* Search toggle button */}
        <button
          onClick={() => setShowSearch((v) => !v)}
          title="Search messages"
          style={{
            background: showSearch ? "#f1f5f9" : "none", border: "none", cursor: "pointer",
            padding: "7px", borderRadius: "50%", display: "flex", alignItems: "center",
            color: showSearch ? "#0f172a" : "#94a3b8", flexShrink: 0,
            transition: "background 0.15s, color 0.15s",
          }}
        >
          <Search size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Slide-in search bar */}
      {showSearch && (
        <div style={{
          padding: "8px 16px 10px", borderTop: "1px solid #f1f5f9",
          display: "flex", alignItems: "center", gap: 8, background: "#fafafa",
          animation: "fadeSlideIn 0.18s ease both",
        }}>
          <Search size={15} color="#94a3b8" style={{ flexShrink: 0 }} />
          <input
            ref={searchInputRef}
            value={msgQuery}
            onChange={(e) => setMsgQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setShowSearch(false)}
            placeholder="Search messages…"
            style={{
              flex: 1, border: "none", background: "transparent", outline: "none",
              fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#0f172a",
            }}
          />
          {searching && <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Searching…</span>}
          <button onClick={() => setShowSearch(false)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 4, borderRadius: "50%", color: "#94a3b8",
            display: "flex", alignItems: "center",
          }}>
            <ChevronDown size={15} />
          </button>
        </div>
      )}

      {/* Floating results panel */}
      {showSearch && msgQuery.trim() && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "#ffffff", boxShadow: "0 8px 32px rgba(15,23,42,0.12)",
          borderRadius: "0 0 14px 14px", zIndex: 100,
          maxHeight: 360, overflowY: "auto",
          borderTop: "1px solid #e2e8f0",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
          {!searching && results.length === 0 && (
            <div style={{ padding: "24px 20px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
              No messages found for &ldquo;{msgQuery}&rdquo;
            </div>
          )}
          {results.map(({ message }) => (
            <div key={message.id} style={{
              display: "flex", gap: 11, padding: "12px 16px",
              borderBottom: "1px solid #f8fafc", cursor: "pointer",
              transition: "background 0.12s",
            }}
              onClick={() => {
                jumpToMessage(message.id);
                setShowSearch(false);
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
              onMouseLeave={(e) => e.currentTarget.style.background = ""}
            >
              <div style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
              }}>
                {message.user?.image
                  ? <img src={message.user.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                  : <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{(message.user?.name || "?")[0].toUpperCase()}</span>
                }
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{message.user?.name || message.user?.id || "Unknown"}</span>
                  <span style={{ fontSize: 11, color: "#94a3b8" }}>{formatTime(message.created_at)}</span>
                </div>
                <div style={{ fontSize: 12.5, color: "#475569", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {message.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Animated chat background ───────────────────────── */
const AnimatedChatBg = () => (
  <div style={{
    position: "absolute", inset: 0, zIndex: 0,
    background: "#eef2f7",
    overflow: "hidden", pointerEvents: "none",
  }}>
    {/* Soft floating orbs for micro-interaction feel */}
    <div style={{
      position: "absolute", width: 420, height: 420,
      borderRadius: "50%", top: "-80px", left: "-60px",
      background: "radial-gradient(circle, rgba(203,213,225,0.55) 0%, transparent 70%)",
      animation: "floatOrb1 18s ease-in-out infinite",
    }} />
    <div style={{
      position: "absolute", width: 380, height: 380,
      borderRadius: "50%", bottom: "10%", right: "-80px",
      background: "radial-gradient(circle, rgba(186,230,253,0.3) 0%, transparent 70%)",
      animation: "floatOrb2 22s ease-in-out infinite",
    }} />
    <div style={{
      position: "absolute", width: 300, height: 300,
      borderRadius: "50%", top: "40%", left: "30%",
      background: "radial-gradient(circle, rgba(226,232,240,0.5) 0%, transparent 70%)",
      animation: "floatOrb3 16s ease-in-out infinite",
    }} />
    {/* Subtle grid overlay */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `
        linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)
      `,
      backgroundSize: "32px 32px",
    }} />
  </div>
);

/* ─── Empty State ─────────────────────────────────────── */
const EmptyState = () => (
  <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
    <AnimatedChatBg />
    <div className="talenex-chat-empty" style={{ position: "relative", zIndex: 1 }}>
      <div style={{
        background: "#ffffff",
        borderRadius: "50%", width: 96, height: 96,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 24px rgba(15,23,42,0.10)",
        animation: "fadeSlideIn 0.4s ease both",
      }}>
        <MessageCircle size={44} color="#0f172a" strokeWidth={1.4} />
      </div>
      <h3 style={{ animation: "fadeSlideIn 0.4s 0.08s ease both" }}>Your messages</h3>
      <p style={{ animation: "fadeSlideIn 0.4s 0.16s ease both" }}>
        Select a conversation from the sidebar to start chatting.
      </p>
      <div className="talenex-lock-badge" style={{ animation: "fadeSlideIn 0.4s 0.24s ease both", marginTop: 4 }}>
        <Lock size={11} strokeWidth={2.5} />
        End-to-end encrypted
      </div>
    </div>
  </div>
);

/* ─── Loading Screen ──────────────────────────────────── */
const LoadingScreen = () => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "center",
    height: "100vh", background: "#f1f5f9",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <div style={{
        width: 54, height: 54, borderRadius: "50%",
        background: "#0f172a", display: "flex",
        alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(15,23,42,0.25)",
      }}>
        <MessageCircle size={24} color="#fff" strokeWidth={1.8} />
      </div>
      <div style={{ display: "flex", gap: 5 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: "50%", background: "#0f172a",
            animation: `bounce3dot 1.2s ${i * 0.16}s ease-in-out infinite`,
          }} />
        ))}
      </div>
      <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>Connecting…</p>
    </div>
  </div>
);

/* ─── Main ChatPage ───────────────────────────────────── */
export default function ChatPage() {
  const { client, activeChannel, setActiveChannel, pendingChannelCid, setPendingChannelCid } = useTalenexChat();
  const [searchParams, setSearchParams] = useSearchParams();
  const rawQueryCid = searchParams.get("cid");

  // Normalize queryCid (ensure it has "messaging:" prefix if missing)
  const queryCid = rawQueryCid
    ? (rawQueryCid.includes(":") ? rawQueryCid : `messaging:${rawQueryCid}`)
    : null;

  const [searchQuery, setSearchQuery] = useState("");
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 640;

  // Sync initial channel from URL (for multi-window support)
  useEffect(() => {
    if (client && queryCid && (!activeChannel || activeChannel.cid !== queryCid)) {
      const initFromQuery = async () => {
        try {
          const [type, id] = queryCid.split(":");
          const channel = client.channel(type, id);
          await channel.watch();
          setActiveChannel(channel);
          setPendingChannelCid(queryCid);
        } catch (err) {
          console.error("Error initializing channel from URL query:", err);
        }
      };
      initFromQuery();
    }
  }, [client, queryCid]); // Reduced dependencies to prevent loops

  // Independent mobile panel state — decoupled from Stream's channel state
  // so ChannelSelectionWatcher can't re-open chat after pressing back
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(true);

  // If we navigated here via the "Message" button, close sidebar on mobile
  useEffect(() => {
    if (isMobile && (pendingChannelCid || queryCid)) {
      setMobileSidebarOpen(false);
    }
  }, [isMobile, pendingChannelCid, queryCid]);

  // ── Resizable sidebar ──────────────────────────────────
  const [sidebarWidth, setSidebarWidth] = useState(296);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartWidth = useRef(296);

  const onDragHandleMouseDown = (e) => {
    if (isMobile) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartWidth.current = sidebarWidth;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const delta = e.clientX - dragStartX.current;
      const newWidth = Math.min(500, Math.max(220, dragStartWidth.current + delta));
      setSidebarWidth(newWidth);
    };
    const onMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const showSidebar = !isMobile || mobileSidebarOpen;
  const showChat = !isMobile || !mobileSidebarOpen;

  // Lock body scroll when in Chat (prevent mobile "bounce" and parent scroll)
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isMobile) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isMobile]);

  // Memoized channel filter (Must be before any early returns to satisfy Rules of Hooks)
  const channelRenderFilterFn = React.useCallback((channels) => {
    let processedChannels = [...channels];
    if (pendingChannelCid) {
      const pendingIdx = processedChannels.findIndex(c => c.cid === pendingChannelCid);
      if (pendingIdx > -1) {
        const [pendingChannel] = processedChannels.splice(pendingIdx, 1);
        processedChannels.unshift(pendingChannel);
      }
    }

    if (!searchQuery.trim()) return processedChannels;
    const q = searchQuery.toLowerCase().trim();
    const currentUserID = client?.userID;

    return processedChannels.filter((channel) => {
      const channelFields = [
        channel.data?.name,
        channel.data?.title,
        channel.id,
      ].filter(Boolean);

      if (channelFields.some(f => f.toLowerCase().includes(q))) return true;

      const members = Object.values(channel.state?.members || {});
      return members
        .filter((m) => m.user?.id !== currentUserID)
        .some((m) => {
          const user = m.user || {};
          return [user.name, user.id, user.firstName, user.lastName, user.email]
            .filter(Boolean)
            .some(f => f.toLowerCase().includes(q));
        });
    });
  }, [pendingChannelCid, searchQuery, client?.userID]);

  if (!client) return (<><FontStyle /><LoadingScreen /></>);

  const currentUserName = client.user?.name || "You";
  const currentUserImage = client.user?.image || "";

  return (
    <>
      <FontStyle />
      <div style={{
        position: isMobile ? "fixed" : "relative",
        top: 0, left: 0, right: 0, bottom: 0,
        height: isMobile ? "100dvh" : "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: isMobile ? 0 : 16,
        overflow: "hidden", // Prevent redundant page-level scrolling
      }}>
        {/* Card */}
        <div style={{
          width: "100vw",
          height: isMobile ? "100dvh" : "calc(100vh - 32px)",
          background: "#ffffff",
          borderRadius: isMobile ? 0 : 20,
          boxShadow: isMobile ? "none" : "0 20px 60px rgba(15,23,42,0.12), 0 4px 16px rgba(15,23,42,0.06)",
          overflow: "hidden", display: "flex",
        }}>
          <Chat client={client} theme="messaging light">
            <ChannelSelectionWatcher
              onChannelSelected={(channel) => {
                if (isMobile) setMobileSidebarOpen(false);
                // Update URL when channel changes (Guard strictly against current queryCid)
                if (channel?.cid && channel.cid !== queryCid) {
                  setSearchParams({ cid: channel.cid }, { replace: true });
                }
              }}
            />

            {/* ══ SIDEBAR ══ */}
            <div style={{
              width: isMobile ? "100%" : sidebarWidth,
              flexShrink: 0,
              display: showSidebar ? "flex" : "none",
              flexDirection: "column",
              borderRight: isMobile ? "none" : "1px solid #e2e8f0",
              background: "#ffffff",
              position: "relative",
            }}>
              {/* Drag-to-resize handle */}
              {!isMobile && (
                <div
                  onMouseDown={onDragHandleMouseDown}
                  style={{
                    position: "absolute", top: 0, right: -3, bottom: 0,
                    width: 6, cursor: "col-resize", zIndex: 10,
                    background: "transparent",
                  }}
                  title="Drag to resize"
                />
              )}
              {/* Header (Fixed) */}
              <div style={{ flexShrink: 0, padding: "16px 16px 12px", display: "flex", flexDirection: "column", gap: 15, borderBottom: "1px solid #e2e8f0", background: "#ffffff", zIndex: 11 }}>
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between", marginBottom: 12,
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 6 }}>
                    <img
                      src={TalenexLogo}
                      alt="Talenex"
                      style={{ height: 30, width: "auto", display: "block" }}
                    />
                    {/* <span style={{
                      fontSize: 11, fontWeight: 600, color: "#94a3b8",
                      letterSpacing: "0.04em", textTransform: "uppercase",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                      Messages
                    </span> */}
                    <MessageCircle color="#0f172a" size={24} />
                  </div>
                </div>
                <SidebarSearch value={searchQuery} onChange={setSearchQuery} />
              </div>

              {/* Channel list (Scrollable) */}
              <div style={{ flex: 1, minHeight: 0, overflowY: "auto", paddingTop: 4 }}>
                <ChannelList
                  filters={{ type: "messaging", members: { $in: [client.userID] } }}
                  sort={{ last_message_at: -1, created_at: -1 }}
                  options={{ limit: 100 }}
                  setActiveChannelOnMount={false}
                  sendChannelsToList
                  channelRenderFilterFn={channelRenderFilterFn}
                />
              </div>

              {/* Current user footer (Fixed) */}
              <div style={{
                flexShrink: 0,
                padding: "10px 14px",
                borderTop: "1px solid #e2e8f0",
                display: "flex", alignItems: "center", gap: 10,
                background: "#fafafa",
              }}>
                <Avatar name={currentUserName} image={currentUserImage} size={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13, fontWeight: 600, color: "#0f172a",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {currentUserName}
                  </div>
                </div>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#22c55e", flexShrink: 0,
                  boxShadow: "0 0 0 2px #fafafa, 0 0 0 3.5px rgba(34,197,94,0.35)",
                }} />
              </div>
            </div>

            {/* ══ CHAT AREA ══ */}
            <div style={{
              flex: 1, minHeight: 0, display: showChat ? "flex" : "none", flexDirection: "column",
              position: "relative", minWidth: 0, overflow: "hidden",
            }}>
              {activeChannel ? (
                <Channel channel={activeChannel} PinIndicator={CustomPinIndicator}>
                  <Window>
                    <CustomChannelHeader
                      activeChannel={activeChannel}
                      currentUserId={client.userID}
                      onBackClick={isMobile ? () => setMobileSidebarOpen(true) : undefined}
                    />
                    <div style={{
                      flex: 1,
                      minHeight: 0,
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      /* ── Chat background image ── */
                      backgroundImage: `url(${ChatBg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                      backgroundRepeat: "no-repeat",
                    }}>
                      <div style={{ position: "relative", zIndex: 1, flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                        <MessageList
                          scrolledUpThreshold={200}
                          messageActions={["delete", "edit", "markUnread", "mute", "pin", "quote", "react", "remindMe", "reply", "saveForLater"]}
                        />
                        <MessageInput grow maxRows={6} />
                      </div>
                    </div>
                    <Thread />
                  </Window>
                </Channel>
              ) : (
                <EmptyState />
              )}
            </div>
          </Chat>
        </div>
      </div >
    </>
  );
}