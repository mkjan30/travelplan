import { useState, useEffect } from "react";
import { PLACES_TO_VISIT, CATEGORY_META } from "../data/tripData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import MapButton from "../components/MapButton";

const FILTERS = [
    { key: "all", label: "All" },
    { key: "culture", label: "Culture" },
    { key: "nature", label: "Nature" },
    { key: "beach", label: "Beach" },
    { key: "adventure", label: "Adventure" },
    { key: "food", label: "Food" },
    { key: "nightlife", label: "Nightlife" },
];

export default function Places() {
    const [places, setPlaces] = useLocalStorage("places_data", PLACES_TO_VISIT);
    const [filter, setFilter] = useState("all");
    const [tripFilter, setTripFilter] = useState("all");
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [tempNote, setTempNote] = useState("");

    useEffect(() => {
        const missing = PLACES_TO_VISIT.filter(p1 => !places.some(p2 => p2.id === p1.id));
        if (missing.length > 0) {
            setPlaces(prev => [...prev, ...missing]);
        }
    }, [places, setPlaces]);

    const filtered = places.filter((p) => {
        const catMatch = filter === "all" || p.category === filter;
        const tripMatch = tripFilter === "all" || p.trip === tripFilter;
        return catMatch && tripMatch;
    });

    const visitedCount = places.filter((p) => p.visited).length;

    function toggleVisited(id) {
        setPlaces((prev) => prev.map((p) => p.id === id ? { ...p, visited: !p.visited } : p));
    }

    function saveNote(id) {
        setPlaces((prev) => prev.map((p) => p.id === id ? { ...p, notes: tempNote } : p));
        setEditingNoteId(null);
    }

    return (
        <div className="page fade-in">
            <div className="page-header">
                <h1>Places to Visit</h1>
                <p>{visitedCount}/{places.length} visited</p>
            </div>

            {/* Progress */}
            <div className="progress-track" style={{ marginBottom: 20 }}>
                <div
                    className="progress-fill"
                    style={{
                        width: `${(visitedCount / places.length) * 100}%`,
                        background: "linear-gradient(90deg, var(--accent), var(--green))",
                    }}
                />
            </div>

            {/* Trip filter */}
            <div className="tab-row">
                {[
                    { key: "all", label: "All" },
                    { key: "bangkok", label: "🇹🇭 Bangkok" },
                    { key: "chiang_mai", label: "🇹🇭 Chiang Mai" },
                    { key: "phuket", label: "🇹🇭 Phuket" },
                    { key: "malaysia", label: "🇲🇾 Malaysia" },
                ].map((t) => (
                    <button
                        key={t.key}
                        className={`tab-btn ${tripFilter === t.key ? "active" : ""}`}
                        onClick={() => setTripFilter(t.key)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Category filter */}
            <div className="tab-row" style={{ marginBottom: 20 }}>
                {FILTERS.map((f) => {
                    const CatIcon = CATEGORY_META[f.key]?.icon;
                    return (
                        <button
                            key={f.key}
                            className={`tab-btn ${filter === f.key ? "active" : ""}`}
                            onClick={() => setFilter(f.key)}
                            style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}
                        >
                            {f.key !== "all" && CatIcon && <CatIcon size={14} />}
                            {f.label}
                        </button>
                    );
                })}
            </div>

            {/* Place cards */}
            {filtered.length === 0 ? (
                <div className="empty-state">
                    <div className="emoji">📍</div>
                    <p>No places match this filter</p>
                </div>
            ) : (
                filtered.map((place) => {
                    const cat = CATEGORY_META[place.category] || {};
                    const CatIcon = cat.icon;
                    return (
                        <div
                            key={place.id}
                            className="card"
                            style={{
                                opacity: place.visited ? 0.6 : 1,
                                transition: "opacity 0.2s",
                            }}
                        >
                            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                                {/* Check circle */}
                                <div
                                    className={`check-circle ${place.visited ? "checked" : ""}`}
                                    onClick={() => toggleVisited(place.id)}
                                    style={{ marginTop: 2, flexShrink: 0 }}
                                >
                                    {place.visited && "✓"}
                                </div>

                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                                        <span
                                            style={{
                                                fontWeight: 600,
                                                fontSize: 15,
                                                textDecoration: place.visited ? "line-through" : "none",
                                                color: place.visited ? "var(--text-muted)" : "var(--text)",
                                            }}
                                        >
                                            {place.name}
                                        </span>
                                        <span
                                            className="badge"
                                            style={{ background: `${cat.color}22`, color: cat.color }}
                                        >
                                            {CatIcon && <CatIcon size={14} style={{ marginRight: 4 }} />} {cat.label}
                                        </span>
                                    </div>

                                    {/* Map button */}
                                    <div style={{ marginTop: 8 }}>
                                        <MapButton lat={place.lat} lng={place.lng} placeName={place.name} compact />
                                    </div>

                                    {/* Note area */}
                                    {editingNoteId === place.id ? (
                                        <div style={{ marginTop: 8 }}>
                                            <textarea
                                                className="input"
                                                value={tempNote}
                                                onChange={(e) => setTempNote(e.target.value)}
                                                placeholder="Add a note..."
                                                style={{ minHeight: 60, fontSize: 13 }}
                                                autoFocus
                                            />
                                            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                                                <button className="btn btn-primary" style={{ padding: "5px 14px", fontSize: 12 }} onClick={() => saveNote(place.id)}>Save</button>
                                                <button className="btn btn-ghost" style={{ padding: "5px 10px", fontSize: 12 }} onClick={() => setEditingNoteId(null)}>Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            style={{
                                                marginTop: 6,
                                                fontSize: 12,
                                                color: place.notes ? "var(--text-muted)" : "var(--accent)",
                                                background: "none",
                                                cursor: "pointer",
                                                textAlign: "left",
                                                padding: 0,
                                                display: "block",
                                            }}
                                            onClick={() => { setTempNote(place.notes || ""); setEditingNoteId(place.id); }}
                                        >
                                            {place.notes ? `📝 ${place.notes}` : "+ Add a note"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
