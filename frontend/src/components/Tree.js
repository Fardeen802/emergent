import { useCallback, useState } from "react";


export default function Tree({ root }) {
  const [open, setOpen] = useState(() => new Set());

  const toggle = useCallback((id) => {
    setOpen(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const renderNode = useCallback(function renderNode(node, depth = 0) {
    const isOpen = open.has(node.id);
    const isFolder = !!node.isFolder;

    return (
      <div key={node.id} style={{ paddingLeft: depth * 16, marginTop: 6 }}>
        <div
          className="row"
          role="treeitem"
          aria-expanded={isFolder ? isOpen : undefined}
          onClick={() => isFolder && toggle(node.id)}
          style={{
            cursor: isFolder ? "pointer" : "default",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>{isFolder ? (isOpen ? "📂" : "📁") : "📄"}</span>
          <span>{node.name}</span>
        </div>

        {isFolder && isOpen && node.items?.map(child => renderNode(child, depth + 1))}
      </div>
    );
  }, [open, toggle]);

  return (
    <div role="tree" aria-label="File Explorer">
      {renderNode(root)}
    </div>
  );
}
