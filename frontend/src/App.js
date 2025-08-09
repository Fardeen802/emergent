import { useEffect, useState } from "react";
import Tree from "./components/Tree";

export default function App() {
  const [root, setRoot] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8080/api/tree");
        console.log(res);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRoot(data);
      } catch (e) {
        setError(e.message || "Failed to load tree");
      }
    })();
  }, []);

  if (error) return <div style={{ color: "crimson" }}>Error: {error}</div>;
  if (!root) return <div>Loading…</div>;

  return (
    <main style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h2 style={{ marginBottom: 8 }}>Explorer</h2>
      <Tree root={root} />
    </main>
  );
}
