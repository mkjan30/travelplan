import { useState, useEffect, useMemo } from "react";
import SunCalc from "suncalc";
import { TRIPS } from "../data/tripData";
import { Sunrise, Sunset, Moon, Sun, Camera, Compass } from "lucide-react";

// Format time from Date object to 12-hour AM/PM string
function formatTime(date) {
    if (!date || isNaN(date.getTime())) return "--:--";
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
}

// Generate the specific intervals we care about for photography
function getPhotoTimes(date, lat, lng) {
    // SunCalc returns a times object for the given date and coordinates
    const times = SunCalc.getTimes(date, lat, lng);

    return [
        {
            id: "blue-morning",
            label: "Morning Blue Hour",
            desc: "Deep blue sky, streetlights still on. Great for cityscapes.",
            start: times.dawn,
            end: times.sunriseEnd,
            icon: Moon,
            color: "#60a5fa" // blue-400
        },
        {
            id: "golden-morning",
            label: "Morning Golden Hour",
            desc: "Soft, warm light. Perfect for portraits and landscapes with long shadows.",
            start: times.sunriseEnd,
            end: times.goldenHourEnd,
            icon: Sunrise,
            color: "#f59e0b" // amber-500
        },
        {
            id: "solar-noon",
            label: "Solar Noon",
            desc: "Harsh, top-down lighting. Best time to shoot indoors, in shade, or grab lunch.",
            start: times.solarNoon,
            end: null, // Just a point in time
            icon: Sun,
            color: "#fbbf24", // amber-400
            singleTime: true
        },
        {
            id: "golden-evening",
            label: "Evening Golden Hour",
            desc: "The classic warm, golden light. Ideal for almost all outdoor photography.",
            start: times.goldenHour,
            end: times.sunsetStart,
            icon: Sunset,
            color: "#f97316" // orange-500
        },
        {
            id: "sunset",
            label: "Sunset",
            desc: "The sun dips below the horizon. Sky colors peak.",
            start: times.sunsetStart,
            end: times.sunset,
            icon: Sunset,
            color: "#ef4444", // red-500
            singleTime: true
        },
        {
            id: "blue-evening",
            label: "Evening Blue Hour",
            desc: "City lights balance perfectly with the deep blue twilight sky.",
            start: times.sunset,
            end: times.dusk,
            icon: Moon,
            color: "#818cf8" // indigo-400
        }
    ];
}

export default function PhotoTools() {
    const tripKeys = ["bangkok", "chiang_mai", "phuket", "malaysia"];
    
    // Default to the first trip in the sequence
    const [activeTripKey, setActiveTripKey] = useState(tripKeys[0]);
    
    // Default to the start date of the active trip
    const [selectedDateStr, setSelectedDateStr] = useState("");

    // Update the date picker default string when switching trips
    useEffect(() => {
        setSelectedDateStr(TRIPS[activeTripKey].startDate);
    }, [activeTripKey]);

    const activeTrip = TRIPS[activeTripKey];
    
    // Derive the date object from the string (compensating for local timezone rendering if needed, 
    // but for SunCalc, providing a standard noon date object avoids edge-case bugs)
    const renderDate = useMemo(() => {
        if (!selectedDateStr) return new Date();
        const [y, m, d] = selectedDateStr.split("-");
        // Create date object at noon local time to avoid previous-day shifting
        return new Date(y, m - 1, d, 12, 0, 0);
    }, [selectedDateStr]);

    // We need latitude and longitude to calculate sun times.
    // If the trip days have slots, we average the lat/lng of the first day as a proxy for the city,
    // or we can just grab the very first slot's lat/lng to represent the trip destination.
    const coordinates = useMemo(() => {
        let lat = 13.7563; // generic Bangkok fallback
        let lng = 100.5018;

        if (activeTrip && activeTrip.days.length > 0 && activeTrip.days[0].slots.length > 0) {
            lat = activeTrip.days[0].slots[0].lat;
            lng = activeTrip.days[0].slots[0].lng;
        }
        return { lat, lng };
    }, [activeTrip]);

    const photoTimes = getPhotoTimes(renderDate, coordinates.lat, coordinates.lng);

    return (
        <div className="page fade-in">
            <div className="page-header" style={{ marginBottom: 16 }}>
                <h1>Photo Tools</h1>
                <p>Nail the perfect shot with Golden Hour tracking</p>
            </div>

            {/* Trip Selector Tabs */}
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

            {/* Date Picker & Location Info Card */}
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

            {/* Timeline Header */}
            <p className="section-label" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Camera size={16} /> Lighting Schedule
            </p>

            {/* Render the lighting timeline */}
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
                            {/* Icon Column */}
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
                                    flexShrink: 0
                                }}
                            >
                                <Icon size={20} />
                            </div>

                            {/* Info Column */}
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
                <br />For maximum accuracy, ensure your device timezone matches your travel destination when traveling.
            </div>
        </div>
    );
}
