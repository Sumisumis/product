export const styles = {
  body: {
    fontFamily: "sans-serif",
    background: "#F6F2E8",
    height: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
    position: "relative" as const,
  },

  header: {
    height: "60px",
    background: "#CBA990",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as const,
    flexShrink: 0,
  },

  menuBtn: {
  position: "absolute" as const,
  left: "16px",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "28px",
  cursor: "pointer",
  background: "none",
  border: "none",
  color: "white",
},

  headerTitle: {
    fontSize: "20px",
    color: "white",
  },

  sidebar: {
    position: "fixed" as const,
    top: 0,
    width: "250px",
    height: "100%",
    background: "#6A4C3A",
    color: "white",
    transition: "0.3s",
    zIndex: 1000,
  },

  closeBtn: {
    height: "60px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px",
    fontSize: "28px",
    cursor: "pointer",
    borderBottom:
      "1px solid rgba(255,255,255,0.2)",
  },

  sidebarList: {
    listStyle: "none" as const,
    padding: 0,
    margin: 0,
  },

  sidebarItem: {
    padding: "18px 24px",
    borderBottom:
      "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
  },

  overlay: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 999,
  },

  main: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "16px",
  },

  searchBox: {
    marginBottom: "24px",
    display: "flex",
  },

  searchInput: {
    width: "100%",
    padding: "12px 16px",
    border: "none",
    borderRadius: "12px",
    fontSize: "24px",
    outline: "none",
  },

  searchButton: {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "24px",
  },

  searchInfo: {
    marginBottom: "20px",
  },

  searchKeyword: {
    fontSize: "22px",
    color: "#6A4C3A",
    marginBottom: "6px",
  },

  searchCount: {
    color: "#666",
  },

  shopCard: {
    background: "white",
    borderRadius: "18px",
    padding: "14px",
    marginBottom: "16px",
    display: "flex",
    gap: "14px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  },

  shopInfo: {
    flex: 1,
  },

  shopName: {
    fontSize: "20px",
    fontWeight: "bold" as const,
    color: "#6A4C3A",
    marginBottom: "10px",
  },

  shopDetail: {
    fontSize: "14px",
    color: "#444",
    marginBottom: "6px",
    lineHeight: 1.4,
  },

  shopImage: {
    width: "120px",
    height: "120px",
    borderRadius: "14px",
    overflow: "hidden",
    flexShrink: 0,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },

  footer: {
    height: "60px",
    display: "flex",
    flexShrink: 0,
  },

  navItem: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "14px",
    background: "#CBA990",
  },

  activeNav: {
    background: "#6A4C3A",
  },
};