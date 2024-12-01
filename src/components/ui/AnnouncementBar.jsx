import React from "react";
import { colors } from "../../constants/colors";

const AnnouncementBar = ({ message }) => {
  return (
    <div
      style={{
        backgroundColor: colors.accent.redLight,
        color: colors.accent.red,
        padding: "12px 16px",
        textAlign: "center",
        position: "relative",
        zIndex: 1000,
        fontSize: "14px",
        fontWeight: "500",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "16px",
      }}
    >
      <span>{message}</span>
    </div>
  );
};

export default AnnouncementBar;
