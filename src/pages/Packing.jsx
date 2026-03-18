import { useState } from "react";
import { PACKING_LIST } from "../data/tripData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { RotateCcw, Plus, Check } from "lucide-react";

export default function Packing() {
    const [items, setItems] = useLocalStorage("packing_data", PACKING_LIST);
    const [newItem, setNewItem] = useState("");
    const [newCategory, setNewCategory] = useState("Other");

    const categories = [...new Set(items.map((i) => i.category))];
    const checkedCount = items.filter((i) => i.checked).length;

    function toggleItem(id) {
        setItems((prev) => prev.map((i) => i.id === id ? { ...i, checked: !i.checked } : i));
    }

    function addItem() {
        if (!newItem.trim()) return;
        const id = `custom_${Date.now()}`;
        setItems((prev) => [...prev, { id, category: newCategory || "Other", item: newItem.trim(), checked: false }]);
        setNewItem("");
    }

    function resetAll() {
        if (window.confirm("Reset all checkboxes?")) {
            setItems((prev) => prev.map((i) => ({ ...i, checked: false })));
        }
    }

    return (
        <div className="page fade-in">
            <div className="page-header">
                <h1>Packing List</h1>
                <p>{checkedCount}/{items.length} packed</p>
            </div>

            {/* Progress */}
            <div className="progress-track" style={{ marginBottom: 6 }}>
                <div
                    className="progress-fill"
                    style={{
                        width: `${(checkedCount / items.length) * 100}%`,
                        background: "linear-gradient(90deg, var(--accent), var(--green))",
                    }}
                />
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20, textAlign: "right" }}>
                {Math.round((checkedCount / items.length) * 100)}% ready
            </div>

            {/* Add custom item */}
            <div className="card" style={{ marginBottom: 20 }}>
                <p className="section-label" style={{ marginTop: 0 }}>Add custom item</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <input
                        className="input"
                        style={{ flex: 2, minWidth: 140 }}
                        placeholder="Item name..."
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addItem()}
                    />
                    <input
                        className="input"
                        style={{ flex: 1, minWidth: 100 }}
                        placeholder="Category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button className="btn btn-primary" style={{ flexShrink: 0 }} onClick={addItem}>+ Add</button>
                </div>
            </div>

            {/* Items by category */}
            {categories.map((category) => {
                const catItems = items.filter((i) => i.category === category);
                const catChecked = catItems.filter((i) => i.checked).length;
                return (
                    <div key={category} style={{ marginBottom: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <p className="section-label" style={{ marginTop: 0 }}>{category}</p>
                            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{catChecked}/{catItems.length}</span>
                        </div>
                        {catItems.map((item) => (
                            <div
                                key={item.id}
                                className="card-sm"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    cursor: "pointer",
                                    opacity: item.checked ? 0.5 : 1,
                                    transition: "opacity 0.2s",
                                }}
                                onClick={() => toggleItem(item.id)}
                            >
                                <div className={`check-circle ${item.checked ? "checked" : ""}`}>
                                    {item.checked && <Check size={14} strokeWidth={3} />}
                                </div>
                                <span
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        textDecoration: item.checked ? "line-through" : "none",
                                        color: item.checked ? "var(--text-muted)" : "var(--text)",
                                        flex: 1,
                                    }}
                                >
                                    {item.item}
                                </span>
                            </div>
                        ))}
                    </div>
                );
            })}

            {/* Reset button */}
            <button
                className="btn btn-ghost"
                style={{ width: "100%", marginTop: 8, color: "var(--red)", borderColor: "rgba(248,113,113,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                onClick={resetAll}
            >
                <RotateCcw size={16} /> Reset All
            </button>
        </div>
    );
}
