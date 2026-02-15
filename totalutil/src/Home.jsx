import { useMemo, useState } from "react";

const TABS = [
  { key: "calculators", label: "Calculators", icon: "🧮", subTabs: [
    { key: "math", label: "Math Calculator" },
    { key: "finance", label: "Finance Calculator" },
    { key: "health", label: "Health Calculator" }
  ] },
  { key: "converters", label: "File Converters", icon: "🔁", subTabs: []},
  { key: "files", label: "File Tools", icon: "📄", subTabs: []},
  { key: "image", label: "Image Tools", icon: "🖼️", subTabs: []},
  { key: "video", label: "Video Tools", icon: "🎬", subTabs: []},
  { key:"other", label: "IT Tools", icon: "🔧", subTabs: []},
  { key: "geo", label: "Geo Tools", icon: "🧭", subTabs: []},
];

export default function Home() {
  const [active, setActive] = useState("calculators");
  const current = TABS.find(t => t.key === active);

  const activeCategory = useMemo(
    () => TABS.find((x) => x.key === active),
    [active]
  );

  // Default sub-tab per category
  const [activeSub, setActiveSub] = useState(
    TABS.find((x) => x.key === "calculators")?.subTabs?.[0]?.key ?? ""
  );

  // When switching main category, reset sub tab to that category’s first tab
  const onSelectMain = (key) => {
    setActiveMain(key);
    const cat = TABS.find((x) => x.key === key);
    setActiveSub(cat?.subTabs?.[0]?.key ?? "");
  };

  return (
    <div className="layout">
      <aside className="sidebar glass">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`tabBtn ${active === t.key ? "active" : ""}`}
            onClick={() => setActive(t.key)}
            title={t.label}
          >
            <span className="tabIcon">{t.icon}</span>
          </button>
        ))}
      </aside>

      <main className="content">
        <div className="glass panel">
          <h2 style={{ marginTop: 0 }}>{activeCategory?.label}</h2>
          <div className="subTabRow">
            {activeCategory?.subTabs.map((s) => (
              <button
                key={s.key}
                className={`subTab ${activeSub === s.key ? "active" : ""}`}
                onClick={() => setActiveSub(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="subContent">
            <p style={{ color: "var(--muted)", marginTop: 0 }}>
              Showing: <strong>{activeCategory?.label}</strong> →{" "}
              <strong>
                {activeCategory?.subTabs?.find((x) => x.key === activeSub)?.label}
              </strong>
            </p>
          
        <div className="glass innerPanel">
              <p style={{ margin: 0, color: "var(--muted)" }}>
                This is where the <strong>{activeSub}</strong> tool UI will go.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

