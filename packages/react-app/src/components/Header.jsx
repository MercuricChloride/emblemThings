import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="/">
      <div style={{ position: "absolute", left: -20, top: -30 }}>
      </div>
      <PageHeader
        title={<div style={{ marginLeft: 50 }}>SVG Skill Tree</div>}
        subTitle=""
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
