import { useState, useMemo } from "react";
import { TRIPS, CATEGORY_META } from "../data/tripData";

function formatCurrency(amount, currency) {
    const symbols = { THB: "฿", MYR: "RM ", USD: "$" };
    const rates = { THB: 1, MYR: 0.127, USD: 0.028 };
    const sym = symbols[currency] || "$";
    const val = Math.round(amount * (rates[currency] || 1));
    return `${sym}${val.toLocaleString()}`;
}

export default function Budget({ budgetData, setBudgetData }) {
    const [activeCurrency, setActiveCurrency] = useState("USD");
    const [activeTrip, setActiveTrip] = useState("bangkok");
    const [editingId, setEditingId] = useState(null);
    const [tempVal, setTempVal] = useState("");

    const trip = TRIPS[activeTrip];

    const dayStats = useMemo(() => {
        return trip.days.map((day) => {
            let est = 0, actual = 0, logged = 0;
            day.slots.forEach((slot) => {
                est += slot.estimatedCost || 0;
                const a = budgetData[slot.id];
                if (a !== undefined && a !== "") {
                    actual += Number(a);
                    logged++;
                }
            });
            return { est, actual, logged, total: day.slots.length };
        });
    }, [trip, budgetData]);

    const grandEst = dayStats.reduce((s, d) => s + d.est, 0);
    const grandActual = dayStats.reduce((s, d) => s + d.actual, 0);
    const diff = grandActual - grandEst;

    function saveActual(slotId) {
        setBudgetData((prev) => ({ ...prev, [slotId]: tempVal }));
        setEditingId(null);
    }

    return (
        <div className="page fade-in">
            <div className="page-header">
                <h1>Budget Tracker</h1>
                <p>Estimated vs. actual spending</p>
            </div>

            {/* Trip selector */}
            <div className="tab-row">
                {["bangkok", "chiang_mai", "phuket", "malaysia"].map((key) => (
                    <button
                        key={key}
                        className={`tab-btn ${activeTrip === key ? "active" : ""}`}
                        onClick={() => setActiveTrip(key)}
                    >
                        {TRIPS[key].flag} {TRIPS[key].destination.split(",")[0]}
                    </button>
                ))}
            </div>

            {/* Currency switcher */}
            <div className="tab-row" style={{ marginBottom: 20 }}>
                {["THB", "MYR", "USD"].map((c) => (
                    <button
                        key={c}
                        className={`tab-btn ${activeCurrency === c ? "active" : ""}`}
                        onClick={() => setActiveCurrency(c)}
                        style={{ fontSize: 12 }}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {/* Grand total card */}
            <div
                className="card"
                style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                    border: "1px solid rgba(56,189,248,0.2)",
                    marginBottom: 20,
                }}
            >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>ESTIMATED TOTAL</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: "var(--text)" }}>
                            {formatCurrency(grandEst, activeCurrency)}
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>ACTUALLY SPENT</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: grandActual === 0 ? "var(--text-muted)" : grandActual > grandEst ? "var(--red)" : "var(--green)" }}>
                            {grandActual === 0 ? "—" : formatCurrency(grandActual, activeCurrency)}
                        </div>
                    </div>
                </div>

                {grandActual > 0 && (
                    <>
                        <div className="progress-track" style={{ marginBottom: 8 }}>
                            <div
                                className="progress-fill"
                                style={{
                                    width: `${Math.min((grandActual / grandEst) * 100, 100)}%`,
                                    background: grandActual > grandEst
                                        ? "linear-gradient(90deg, var(--amber), var(--red))"
                                        : "linear-gradient(90deg, var(--accent), var(--green))",
                                }}
                            />
                        </div>
                        <div style={{ fontSize: 13, color: diff > 0 ? "var(--red)" : "var(--green)" }}>
                            {diff > 0 ? `▲ Over by ${formatCurrency(diff, activeCurrency)}` : `▼ Saved ${formatCurrency(Math.abs(diff), activeCurrency)}`}
                        </div>
                    </>
                )}
            </div>

            {/* Day-by-day */}
            {trip.days.map((day, dayIdx) => {
                const ds = dayStats[dayIdx];
                return (
                    <div key={day.id} className="card" style={{ marginBottom: 14 }}>
                        {/* Day header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                            <div>
                                <span
                                    style={{
                                        background: trip.coverColor,
                                        color: "#fff",
                                        borderRadius: 6,
                                        padding: "2px 8px",
                                        fontSize: 11,
                                        fontWeight: 700,
                                        marginRight: 8,
                                    }}
                                >
                                    Day {day.day}
                                </span>
                                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{day.theme}</span>
                            </div>
                        </div>
                        <div className="stat-row" style={{ marginBottom: 8 }}>
                            <span className="stat-label">Day estimated</span>
                            <span className="stat-value">{formatCurrency(ds.est, activeCurrency)}</span>
                        </div>
                        {ds.actual > 0 && (
                            <div className="stat-row" style={{ marginBottom: 8 }}>
                                <span className="stat-label">Day spent</span>
                                <span className="stat-value" style={{ color: ds.actual > ds.est ? "var(--red)" : "var(--green)" }}>
                                    {formatCurrency(ds.actual, activeCurrency)}
                                </span>
                            </div>
                        )}
                        <div className="divider" />

                        {/* Slots */}
                        {day.slots.map((slot) => {
                            const isEditing = editingId === slot.id;
                            const savedVal = budgetData[slot.id];
                            const hasValue = savedVal !== undefined && savedVal !== "";

                            return (
                                <div key={slot.id} style={{ marginBottom: 10 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontWeight: 600, fontSize: 14 }}>{slot.place}</div>
                                            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{slot.time}</div>
                                        </div>

                                        {/* Estimated */}
                                        <div style={{ textAlign: "right", marginLeft: 12 }}>
                                            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Est.</div>
                                            <div style={{ fontSize: 14, fontWeight: 600 }}>
                                                {formatCurrency(slot.estimatedCost, activeCurrency)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actual cost input */}
                                    <div style={{ marginTop: 6, display: "flex", gap: 8, alignItems: "center" }}>
                                        <span style={{ fontSize: 12, color: "var(--text-muted)", minWidth: 60 }}>
                                            Actually:
                                        </span>
                                        {isEditing ? (
                                            <>
                                                <input
                                                    className="input"
                                                    style={{ flex: 1, height: 34, padding: "4px 10px" }}
                                                    type="number"
                                                    placeholder="Enter amount in USD"
                                                    value={tempVal}
                                                    onChange={(e) => setTempVal(e.target.value)}
                                                    onKeyDown={(e) => e.key === "Enter" && saveActual(slot.id)}
                                                    autoFocus
                                                />
                                                <button
                                                    className="btn btn-primary"
                                                    style={{ padding: "4px 12px", fontSize: 13, height: 34 }}
                                                    onClick={() => saveActual(slot.id)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="btn btn-ghost"
                                                    style={{ padding: "4px 10px", fontSize: 13, height: 34 }}
                                                    onClick={() => setEditingId(null)}
                                                >
                                                    ✕
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                style={{
                                                    flex: 1,
                                                    textAlign: "left",
                                                    padding: "6px 10px",
                                                    borderRadius: 8,
                                                    border: `1px dashed ${hasValue ? "var(--green)" : "var(--border)"}`,
                                                    color: hasValue ? "var(--green)" : "var(--text-muted)",
                                                    fontSize: 13,
                                                    fontWeight: hasValue ? 600 : 400,
                                                    background: hasValue ? "rgba(52,211,153,0.07)" : "transparent",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s",
                                                }}
                                                onClick={() => {
                                                    setTempVal(hasValue ? savedVal : "");
                                                    setEditingId(slot.id);
                                                }}
                                            >
                                                {hasValue
                                                    ? `$${Number(savedVal).toLocaleString()} ✏️`
                                                    : "+ Tap to log actual spend"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
