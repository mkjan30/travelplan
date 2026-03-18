import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TRIPS } from "../data/tripData";
import { NotebookPen, Clock, Pin, Trash2 } from "lucide-react";

const ALL_DAYS = [
    ...TRIPS.bangkok.days.map((d, i) => ({ id: `bangkok-d${i + 1}`, label: `🇹🇭 Bangkok Day ${i + 1}: ${d.theme}` })),
    ...TRIPS.chiang_mai.days.map((d, i) => ({ id: `chiang_mai-d${i + 1}`, label: `🇹🇭 Chiang Mai Day ${i + 1}: ${d.theme}` })),
    ...TRIPS.phuket.days.map((d, i) => ({ id: `phuket-d${i + 1}`, label: `🇹🇭 Phuket Day ${i + 1}: ${d.theme}` })),
    ...TRIPS.malaysia.days.map((d, i) => ({ id: `malaysia-d${i + 1}`, label: `🇲🇾 Malaysia Day ${i + 1}: ${d.theme}` })),
    { id: "general", label: "General Notes" },
];

function formatDate(ts) {
    return new Date(ts).toLocaleString("en-US", {
        month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit",
    });
}

export default function Notes() {
    const [notes, setNotes] = useLocalStorage("notes_data", {});
    const [activeDay, setActiveDay] = useState("general");
    const [input, setInput] = useState("");

    function addNote() {
        if (!input.trim()) return;
        const entry = { id: Date.now(), text: input.trim(), ts: Date.now() };
        setNotes((prev) => ({
            ...prev,
            [activeDay]: [...(prev[activeDay] || []), entry],
        }));
        setInput("");
    }

    function deleteNote(dayId, noteId) {
        setNotes((prev) => ({
            ...prev,
            [dayId]: (prev[dayId] || []).filter((n) => n.id !== noteId),
        }));
    }

    const currentNotes = notes[activeDay] || [];
    const totalNotes = Object.values(notes).reduce((sum, arr) => sum + (arr?.length || 0), 0);

    return (
        <div className="page fade-in">
            <div className="page-header">
                <h1>Travel Journal</h1>
                <p>{totalNotes} {totalNotes === 1 ? "entry" : "entries"} saved</p>
            </div>

            {/* Day selector */}
            <div className="tab-row" style={{ marginBottom: 20 }}>
                {ALL_DAYS.map((d) => {
                    const count = (notes[d.id] || []).length;
                    return (
                        <button
                            key={d.id}
                            className={`tab-btn ${activeDay === d.id ? "active" : ""}`}
                            onClick={() => setActiveDay(d.id)}
                            style={{ fontSize: 12, gap: 6 }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                {d.id === "general" && <Pin size={12} />}
                                {d.label.split(":")[0]}
                            </div>
                            {count > 0 && (
                                <span
                                    style={{
                                        background: "var(--accent)",
                                        color: "#0a0e1a",
                                        borderRadius: "50%",
                                        fontSize: 10,
                                        fontWeight: 700,
                                        padding: "1px 5px",
                                        marginLeft: 4,
                                    }}
                                >
                                    {count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Current section label */}
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
                {ALL_DAYS.find((d) => d.id === activeDay)?.label}
            </p>

            {/* Add note */}
            <div className="card" style={{ marginBottom: 20 }}>
                <textarea
                    className="input"
                    placeholder="Write a note, highlight, or memory..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ minHeight: 80, marginBottom: 10 }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) addNote();
                    }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Ctrl+Enter to save</span>
                    <button className="btn btn-primary" style={{ padding: "6px 18px" }} onClick={addNote}>
                        + Add Note
                    </button>
                </div>
            </div>

            {/* Notes list */}
            {currentNotes.length === 0 ? (
                <div className="empty-state">
                    <div className="emoji" style={{ color: "var(--accent)" }}><NotebookPen size={48} strokeWidth={1.5} /></div>
                    <p>No notes yet for this day.<br />Add your first memory above!</p>
                </div>
            ) : (
                [...currentNotes].reverse().map((note) => (
                    <div key={note.id} className="card" style={{ position: "relative", marginBottom: 10 }}>
                        <p style={{ fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{note.text}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-muted)" }}>
                                <Clock size={12} /> {formatDate(note.ts)}
                            </span>
                            <button
                                style={{
                                    display: "flex", alignItems: "center", gap: 4,
                                    fontSize: 11,
                                    color: "var(--red)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "2px 6px",
                                }}
                                onClick={() => deleteNote(activeDay, note.id)}
                            >
                                <Trash2 size={12} /> Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
