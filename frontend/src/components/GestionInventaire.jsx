import React from "react";
import { Outlet } from "react-router-dom";

export default function GestionInventaire() {
  return (
    <div style={{ padding: "20px" }}>
      {/* aucune donnée ici */}
      <Outlet />
    </div>
  );
}