import { useState } from "react";
import { TRIPS, CATEGORY_META, TIME_ICONS } from "../data/tripData";
import MapButton from "../components/MapButton";

export default function Itinerary({ budgetData }) {
    const tripKeys = ["bangkok", "chiang_mai", "phuket", "malaysia"];
    const [activeTrip, setActiveTrip] = useState("bangkok");
    const [expandedDay, setExpandedDay] = useState(0);

    const trip = TRIPS[activeTrip];

    return (
        <div className="page fade-in">
            <div className="page-header">
                <h1>Itinerary</h1>
                <p>Your day-by-day schedule</p>
            </div>

            {/* Trip selector */}
            <div className="tab-row">
                {tripKeys.map((key) => (
                    <button
                        key={key}
                        className={`tab-btn ${activeTrip === key ? "active" : ""}`}
                        onClick={() => { setActiveTrip(key); setExpandedDay(0); }}
                    >
                        {TRIPS[key].flag} {TRIPS[key].destination.split(",")[0]}
                    </button>
                ))}
            </div>

            {/* Days */}
            {trip.days.map((day, dayIdx) => (
                <div key={day.id} className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 12 }}>
                    {/* Day header */}
                    <button
                        style={{
                            width: "100%",
                            padding: "14px 16px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer",
                            background: expandedDay === dayIdx
                                ? `${trip.coverColor}15`
                                : "transparent",
                            transition: "background 0.2s",
                        }}
                        onClick={() => setExpandedDay(expandedDay === dayIdx ? -1 : dayIdx)}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div
                                style={{
                                    width: 32, height: 32,
                                    borderRadius: 8,
                                    background: trip.coverColor,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontWeight: 700, fontSize: 13, color: "#fff",
                                    flexShrink: 0,
                                }}
                            >
                                D{day.day}
                            </div>
                            <div style={{ textAlign: "left" }}>
                                <div style={{ fontWeight: 600, fontSize: 14 }}>{day.theme}</div>
                                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                                    {day.slots.length} activities
                                </div>
                            </div>
                        </div>
                        <span style={{ color: "var(--text-muted)", fontSize: 18 }}>
                            {expandedDay === dayIdx ? "−" : "+"}
                        </span>
                    </button>

                    {/* Slots */}
                    {expandedDay === dayIdx && (
                        <div style={{ padding: "0 12px 12px" }}>
                            {day.slots.map((slot, i) => {
                                const cat = CATEGORY_META[slot.category] || {};
                                const TimeIcon = TIME_ICONS[slot.time];
                                const CatIcon = cat.icon;
                                return (
                                    <div
                                        key={slot.id}
                                        className="card-sm"
                                        style={{
                                            borderLeft: `3px solid ${cat.color || "var(--border)"}`,
                                            marginBottom: i < day.slots.length - 1 ? 8 : 0,
                                        }}
                                    >
                                        {/* Time + Place row */}
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <div>
                                                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>
                                                    {TimeIcon ? <TimeIcon size={14} /> : "🕐"} <span>{slot.time}</span>
                                                    {slot.optional && (
                                                        <span
                                                            className="badge"
                                                            style={{ marginLeft: 6, background: "rgba(251,191,36,0.15)", color: "var(--amber)" }}
                                                        >
                                                            Optional
                                                        </span>
                                                    )}
                                                </div>
                                                <div style={{ fontWeight: 700, fontSize: 15 }}>{slot.place}</div>
                                            </div>
                                            <span
                                                className="badge"
                                                style={{
                                                    background: `${cat.color}22`,
                                                    color: cat.color,
                                                    flexShrink: 0,
                                                    marginLeft: 8,
                                                    display: "flex", alignItems: "center", gap: 4,
                                                }}
                                            >
                                                {CatIcon && <CatIcon size={14} />} {cat.label}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6, lineHeight: 1.5 }}>
                                            {slot.description}
                                        </p>

                                        {/* Must visits */}
                                        {slot.mustVisit && slot.mustVisit.length > 0 && (
                                            <div className="chip-list">
                                                {slot.mustVisit.map((mv, idx) => (
                                                    <span key={idx} className="chip">{mv}</span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Cost + Maps row */}
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, flexWrap: "wrap", gap: 6 }}>
                                            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                                                    Est: <span style={{ color: "var(--text)", fontWeight: 600 }}>${slot.estimatedCost}</span>
                                                </span>
                                                {budgetData[slot.id] !== undefined && budgetData[slot.id] !== "" && (
                                                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
                                                        Spent: <span style={{ color: "var(--green)", fontWeight: 600 }}>
                                                            ${Number(budgetData[slot.id]).toLocaleString()}
                                                        </span>
                                                    </span>
                                                )}
                                            </div>
                                            {/* 🗺 Map Button */}
                                            <MapButton lat={slot.lat} lng={slot.lng} placeName={slot.place} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
