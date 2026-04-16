import { useState, useEffect, useMemo } from "react";
import SunCalc from "suncalc";
import { TRIPS } from "../data/tripData";
import { PHOTO_SPOTS, CATEGORY_META } from "../data/photoSpots";
import { Sunrise, Sunset, Moon, Sun, Camera, Compass, MapPin, Lightbulb, Clock, Zap } from "lucide-react";

function formatTime(date) {
    if (!date || isNaN(date.getTime())) return "--:--";
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

function getPhotoTimes(date, lat, lng) {
    const times = SunCalc.getTimes(date, lat, lng);
    return [
        {
            id: "blue-morning",
            label: "Morning Blue Hour",
            desc: "Deep blue sky, streetlights still on. Great for cityscapes.",
            start: times.dawn,
            end: times.sunriseEnd,
            icon: Moon,
            color: "#60a5fa",
        },
        {
            id: "golden-morning",
            label: "Morning Golden Hour",
            desc: "Soft, warm light. Perfect for portraits and landscapes with long shadows.",
            start: times.sunriseEnd,
            end: times.goldenHourEnd,
            icon: Sunrise,
            color: "#f59e0b",
        },
        {
            id: "solar-noon",
            label: "Solar Noon",
            desc: "Harsh, top-down lighting. Best time to shoot indoors, in shade, or grab lunch.",
            start: times.solarNoon,
            end: null,
            icon: Sun,
            color: "#fbbf24",
            singleTime: true,
        },
        {
            id: "golden-evening",
            label: "Evening Golden Hour",
            desc: "The classic warm, golden light. Ideal for almost all outdoor photography.",
            start: times.goldenHour,
            end: times.sunsetStart,
            icon: Sunset,
            color: "#f97316",
        },
        {
            id: "sunset",
            label: "Sunset",
            desc: "The sun dips below the horizon. Sky colors peak.",
            start: times.sunsetStart,
            end: times.sunset,
            icon: Sunset,
            color: "#ef4444",
            singleTime: true,
        },
        {
            id: "blue-evening",
            label: "Evening Blue Hour",
            desc: "City lights balance perfectly with the deep blue twilight sky.",
            start: times.sunset,
            end: times.dusk,
            icon: Moon,
            color: "#818cf8",
        },
    ];
}

const CITY_KEYS = ["bangkok", "phuket", "chiang_mai"];

export default function PhotoTools() {
    const tripKeys = ["bangkok", "chiang_mai", "phuket", "malaysia"];
    const [activeTripKey, setActiveTripKey] = useState(tripKeys[0]);
    const [selectedDateStr, setSelectedDateStr] = useState("");
    const [activeTab, setActiveTab] = useState("lighting");
    const [activeCityKey, setActiveCityKey] = useState("bangkok");
    const [activeCategory, setActiveCategory] = useState("day");

    useEffect(() => {
        setSelectedDateStr(TRIPS[activeTripKey].startDate);
    }, [activeTripKey]);

    const activeTrip = TRIPS[activeTripKey];

    const renderDate = useMemo(() => {
        if (!selectedDateStr) return new Date();
        const [y, m, d] = selectedDateStr.split("-");
        return new Date(y, m - 1, d, 12, 0, 0);
    }, [selectedDateStr]);

    const coordinates = useMemo(() => {
        let lat = 13.7563;
        let lng = 100.5018;
        if (activeTrip && activeTrip.days.length > 0 && activeTrip.days[0].slots.length > 0) {
            lat = activeTrip.days[0].slots[0].lat;
            lng = activeTrip.days[0].slots[0].lng;
        }
        return { lat, lng };
    }, [activeTrip]);

    const photoTimes = getPhotoTimes(renderDate, coordinates.lat, coordinates.lng);

    const activeCity = PHOTO_SPOTS[activeCityKey];
    const filteredSpots = activeCity.spots.filter((s) => s.category === activeCategory);

    return (
        <div className="page fade-in">
            <div className="page-header" style={{ marginBottom: 16 }}>
                <h1>Photo Tools</h1>
                <p>Golden hour timing + best spots for your trip</p>
            </div>

            <div className="tab-row" style={{ marginBottom: 20 }}>
                <button
                    className={`tab-btn ${activeTab === "lighting" ? "active" : ""}`}
                    onClick={() => setActiveTab("lighting")}
                >
                    <Camera size={13} style={{ display: "inline", marginRight: 5 }} />
                    Lighting
                </button>
                <button
                    className={`tab-btn ${activeTab === "spots" ? "active" : ""}`}
                    onClick={() => setActiveTab("spots")}
                >
                    <MapPin size={13} style={{ display: "inline", marginRight: 5 }} />
                    Photo Spots
                </button>
            </div>

            {activeTab === "lighting" && (
                <>
                    <div className="tab-row" style={{ marginBottom: 20 }}>
                        {tripKeys.map((key) => (
                            <button
                                key={key}
                                className={`tab-btn ${activeTripKey === key ? "active" : ""}`}
                                onClick={() => setActiveTripKey(key)}
                            >
                                {TRIPS[key].flag} {TRIPS[key].destination.split(",")[0]}
                            </button>
                        ))}
                    </div>

                    <div className="card" style={{ marginBottom: 24, padding: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--accent)", fontWeight: 600 }}>
                                <Compass size={18} />
                                <span>{activeTrip.destination}</span>
                            </div>
                            <input
                                type="date"
                                className="input"
                                value={selectedDateStr}
                                onChange={(e) => setSelectedDateStr(e.target.value)}
                                style={{ padding: "6px 12px", fontSize: 13, width: "auto" }}
                            />
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                            Calculated for Lat: {coordinates.lat.toFixed(4)}, Lng: {coordinates.lng.toFixed(4)}
                        </div>
                    </div>

                    <p className="section-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <Camera size={16} /> Lighting Schedule
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {photoTimes.map((period) => {
                            const Icon = period.icon;
                            return (
                                <div
                                    key={period.id}
                                    className="card"
                                    style={{
                                        display: "flex",
                                        gap: 16,
                                        padding: "16px",
                                        borderLeft: `4px solid ${period.color}`,
                                        background: `linear-gradient(90deg, ${period.color}11, transparent)`,
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            background: `${period.color}22`,
                                            color: period.color,
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Icon size={20} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                                            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>
                                                {period.label}
                                            </div>
                                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                                <div style={{ fontWeight: 600, fontSize: 13, color: period.color }}>
                                                    {formatTime(period.start)}
                                                    {!period.singleTime && period.end && ` - ${formatTime(period.end)}`}
                                                </div>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.4, margin: 0 }}>
                                            {period.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 24, textAlign: "center", lineHeight: 1.5 }}>
                        Times are calculated relative to the timezone of your current device.
                        <br />For maximum accuracy, ensure your device timezone matches your travel destination.
                    </div>
                </>
            )}

            {activeTab === "spots" && (
                <>
                    <div className="tab-row" style={{ marginBottom: 16 }}>
                        {CITY_KEYS.map((key) => (
                            <button
                                key={key}
                                className={`tab-btn ${activeCityKey === key ? "active" : ""}`}
                                onClick={() => setActiveCityKey(key)}
                            >
                                {PHOTO_SPOTS[key].flag} {PHOTO_SPOTS[key].label}
                            </button>
                        ))}
                    </div>

                    <div className="tab-row" style={{ marginBottom: 20 }}>
                        {Object.entries(CATEGORY_META).map(([key, meta]) => (
                            <button
                                key={key}
                                className={`tab-btn ${activeCategory === key ? "active" : ""}`}
                                onClick={() => setActiveCategory(key)}
                            >
                                {meta.icon} {meta.label}
                            </button>
                        ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {filteredSpots.map((spot) => {
                            const catMeta = CATEGORY_META[spot.category];
                            return (
                                <div
                                    key={spot.id}
                                    className="card"
                                    style={{
                                        padding: 16,
                                        borderLeft: `4px solid ${catMeta.color}`,
                                        background: spot.highlight
                                            ? `linear-gradient(135deg, ${catMeta.color}14, transparent)`
                                            : undefined,
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                                <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text)" }}>
                                                    {spot.name}
                                                </span>
                                                {spot.highlight && (
                                                    <span style={{
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        padding: "2px 8px",
                                                        borderRadius: 50,
                                                        background: `${catMeta.color}22`,
                                                        color: catMeta.color,
                                                        border: `1px solid ${catMeta.color}44`,
                                                        whiteSpace: "nowrap",
                                                    }}>
                                                        HIGHLIGHT
                                                    </span>
                                                )}
                                            </div>
                                            <span style={{
                                                fontSize: 11,
                                                fontWeight: 600,
                                                color: catMeta.color,
                                                marginTop: 2,
                                                display: "block",
                                            }}>
                                                {spot.badge}
                                            </span>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 4,
                                            fontSize: 11,
                                            color: "var(--text-muted)",
                                            flexShrink: 0,
                                            background: "var(--bg-card2)",
                                            padding: "4px 8px",
                                            borderRadius: 6,
                                            whiteSpace: "nowrap",
                                        }}>
                                            <Clock size={11} />
                                            {spot.bestTime}
                                        </div>
                                    </div>

                                    <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 12 }}>
                                        {spot.why}
                                    </p>

                                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                                        <Camera size={13} style={{ color: catMeta.color, flexShrink: 0, marginTop: 2 }} />
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                            {spot.ideas.map((idea, i) => (
                                                <span key={i} style={{
                                                    fontSize: 11,
                                                    padding: "3px 9px",
                                                    borderRadius: 50,
                                                    background: "var(--bg-card2)",
                                                    color: "var(--text-muted)",
                                                    border: "1px solid var(--border)",
                                                }}>
                                                    {idea}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ marginTop: 24 }}>
                        <p className="section-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Zap size={14} /> 1-Day Game Plan
                        </p>
                        <div className="card" style={{ padding: 16 }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                                {activeCity.gamePlan.map((step, i) => (
                                    <div key={i} style={{ display: "flex", gap: 16, paddingBottom: i < activeCity.gamePlan.length - 1 ? 16 : 0, position: "relative" }}>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                                            <div style={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: "50%",
                                                background: "var(--bg-card2)",
                                                border: "1px solid var(--border)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: 14,
                                                color: "var(--accent)",
                                                fontWeight: 700,
                                                flexShrink: 0,
                                            }}>
                                                {i + 1}
                                            </div>
                                            {i < activeCity.gamePlan.length - 1 && (
                                                <div style={{ width: 1, flex: 1, background: "var(--border)", marginTop: 6 }} />
                                            )}
                                        </div>
                                        <div style={{ paddingBottom: i < activeCity.gamePlan.length - 1 ? 0 : 0 }}>
                                            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                                                {step.time}
                                            </div>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>
                                                {step.places}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card" style={{
                            padding: "12px 16px",
                            background: "rgba(56,189,248,0.06)",
                            border: "1px solid rgba(56,189,248,0.2)",
                            display: "flex",
                            gap: 10,
                            alignItems: "flex-start",
                        }}>
                            <Lightbulb size={16} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 1 }} />
                            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                                {activeCity.tip}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
