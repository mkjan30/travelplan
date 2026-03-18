import { useState } from "react";
import { getMapsDirectionUrl, getOSMUrl } from "../data/tripData";
import { Map, MapPin, Globe, Copy, ChevronDown } from "lucide-react";

/**
 * A small button that opens Google Maps directions (or OSM fallback) for a given place.
 * Works on mobile (opens native Maps app) and desktop (opens in browser).
 * 100% free — no API key required.
 */
export default function MapButton({ lat, lng, placeName, compact = false }) {
    const [open, setOpen] = useState(false);

    const googleUrl = getMapsDirectionUrl(lat, lng, placeName);
    const osmUrl = getOSMUrl(lat, lng, placeName);

    if (compact) {
        return (
            <a
                href={googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: "rgba(56,189,248,0.1)",
                    border: "1px solid rgba(56,189,248,0.25)",
                    color: "var(--accent)",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(56,189,248,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(56,189,248,0.1)")}
            >
                <Map size={14} /> Maps
            </a>
        );
    }

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <button
                onClick={() => setOpen((p) => !p)}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: "rgba(56,189,248,0.1)",
                    border: "1px solid rgba(56,189,248,0.25)",
                    color: "var(--accent)",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(56,189,248,0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(56,189,248,0.1)")}
            >
                <Map size={16} /> Directions <ChevronDown size={14} />
            </button>

            {open && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setOpen(false)}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 200,
                        }}
                    />
                    {/* Dropdown */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: "calc(100% + 8px)",
                            left: 0,
                            zIndex: 201,
                            background: "var(--bg-card)",
                            border: "1px solid var(--border)",
                            borderRadius: 10,
                            padding: 6,
                            minWidth: 210,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                        }}
                    >
                        <div style={{ fontSize: 11, color: "var(--text-muted)", padding: "4px 8px 6px", fontWeight: 600, letterSpacing: "0.06em" }}>
                            OPEN IN MAPS
                        </div>

                        {/* Google Maps */}
                        <a
                            href={googleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            style={dropdownItemStyle}
                        >
                            <div style={{ width: 24, display: "flex", justifyContent: "center" }}><MapPin size={18} color="var(--accent)" /></div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 13 }}>Google Maps</div>
                                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Directions + navigation</div>
                            </div>
                        </a>

                        {/* OpenStreetMap */}
                        <a
                            href={osmUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            style={dropdownItemStyle}
                        >
                            <div style={{ width: 24, display: "flex", justifyContent: "center" }}><Globe size={18} color="var(--green)" /></div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 13 }}>OpenStreetMap</div>
                                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>View on map (no sign-in)</div>
                            </div>
                        </a>

                        {/* Copy coordinates */}
                        {lat && lng && (
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(`${lat}, ${lng}`);
                                    setOpen(false);
                                }}
                                style={{ ...dropdownItemStyle, background: "none", border: "none", width: "100%", textAlign: "left", cursor: "pointer" }}
                            >
                                <div style={{ width: 24, display: "flex", justifyContent: "center" }}><Copy size={18} color="var(--text-muted)" /></div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 13 }}>Copy Coordinates</div>
                                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{lat.toFixed(4)}, {lng.toFixed(4)}</div>
                                </div>
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

const dropdownItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 10px",
    borderRadius: 8,
    textDecoration: "none",
    color: "var(--text)",
    transition: "background 0.15s",
    cursor: "pointer",
};
