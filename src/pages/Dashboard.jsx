import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TRIPS, CATEGORY_META } from "../data/tripData";
import { CalendarDays, Wallet, MapPin, Briefcase, DollarSign, NotebookPen, Plane, ChevronRight, Info, Camera } from "lucide-react";

function daysUntil(dateStr) {
    const now = new Date();
    const target = new Date(dateStr);
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    return diff;
}

function formatCurrency(amount, currency = "USD") {
    return `$${amount.toLocaleString()}`;
}

export default function Dashboard({ budgetData }) {
    const navigate = useNavigate();

    const stats = useMemo(() => {
        let totalEstimated = 0;
        let totalActual = 0;
        let activitiesLogged = 0;
        let totalActivities = 0;

        Object.values(TRIPS).forEach((trip) => {
            trip.days.forEach((day) => {
                day.slots.forEach((slot) => {
                    totalEstimated += slot.estimatedCost || 0;
                    totalActivities++;
                    const actual = budgetData[slot.id];
                    if (actual !== undefined && actual !== null && actual !== "") {
                        totalActual += Number(actual);
                        activitiesLogged++;
                    }
                });
            });
        });

        return { totalEstimated, totalActual, activitiesLogged, totalActivities };
    }, [budgetData]);

    const bangkokDays = daysUntil(TRIPS.bangkok.startDate);

    const quickLinks = [
        { icon: CalendarDays, label: "Itinerary", path: "/itinerary", color: "#38bdf8" },
        { icon: Wallet, label: "Budget", path: "/budget", color: "#34d399" },
        { icon: MapPin, label: "Places", path: "/places", color: "#a78bfa" },
        { icon: Briefcase, label: "Packing", path: "/packing", color: "#f59e0b" },
        { icon: DollarSign, label: "Currency", path: "/currency", color: "#fb923c" },
        { icon: NotebookPen, label: "Notes", path: "/notes", color: "#f472b6" },
        { icon: Camera, label: "Photo", path: "/photo-tools", color: "#6366f1" },
    ];

    const spentPct = stats.totalEstimated > 0
        ? Math.min((stats.totalActual / stats.totalEstimated) * 100, 100)
        : 0;

    const trips = [TRIPS.bangkok, TRIPS.chiang_mai, TRIPS.phuket, TRIPS.malaysia];

    return (
        <div className="page fade-in">
            {/* Header */}
            <div className="page-header" style={{ marginBottom: 24 }}>
                <p style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: 13, marginBottom: 2 }}>
                    <Plane size={14} /> Next adventure
                </p>
                <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>
                    Thailand &amp; Malaysia
                </h1>
            </div>

            {/* Countdown cards */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
                {trips.map((trip) => {
                    const days = daysUntil(trip.startDate);
                    return (
                        <div
                            key={trip.id}
                            className="card"
                            style={{ flex: 1, textAlign: "center", padding: "16px 12px", borderColor: `${trip.coverColor}33` }}
                        >
                            <div style={{ fontSize: 28 }}>{trip.flag}</div>
                            <div style={{ fontSize: 32, fontWeight: 800, color: trip.coverColor, lineHeight: 1 }}>
                                {days > 0 ? days : "🎉"}
                            </div>
                            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                                {days > 0 ? "days to go" : "It's time!"}
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>
                                {trip.destination.split(",")[0]}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Budget overview card */}
            <div className="card" style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontWeight: 600 }}>💰 Budget Overview</span>
                    <button
                        className="btn btn-ghost"
                        style={{ padding: "4px 12px", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}
                        onClick={() => navigate("/budget")}
                    >
                        Details <ChevronRight size={14} />
                    </button>
                </div>

                <div className="stat-row" style={{ marginBottom: 6 }}>
                    <span className="stat-label">Estimated</span>
                    <span className="stat-value" style={{ color: "var(--text-muted)" }}>
                        {formatCurrency(stats.totalEstimated)}
                    </span>
                </div>
                <div className="stat-row" style={{ marginBottom: 10 }}>
                    <span className="stat-label">Spent so far</span>
                    <span className="stat-value" style={{ color: spentPct > 90 ? "var(--red)" : "var(--green)" }}>
                        {formatCurrency(stats.totalActual)}
                    </span>
                </div>

                <div className="progress-track">
                    <div
                        className="progress-fill"
                        style={{
                            width: `${spentPct}%`,
                            background: spentPct > 90
                                ? "linear-gradient(90deg, var(--amber), var(--red))"
                                : "linear-gradient(90deg, var(--accent), var(--green))",
                        }}
                    />
                </div>

                <div style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 8 }}>
                    {stats.activitiesLogged}/{stats.totalActivities} activities logged
                </div>
            </div>

            {/* Quick links grid */}
            <p className="section-label">Quick access</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                {quickLinks.map((link) => (
                    <button
                        key={link.path}
                        className="card"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 4,
                            padding: "14px 6px",
                            cursor: "pointer",
                            border: `1px solid ${link.color}22`,
                            transition: "all 0.2s",
                            textAlign: "center",
                        }}
                        onClick={() => navigate(link.path)}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${link.color}66`)}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${link.color}22`)}
                    >
                        <span className="nav-icon" style={{ color: link.color }}><link.icon size={22} strokeWidth={1.5} /></span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text)" }}>{link.label}</span>
                    </button>
                ))}
            </div>

            {/* Upcoming activity preview */}
            <p className="section-label" style={{ marginTop: 24 }}>Bangkok Day 1 Preview</p>
            {TRIPS.bangkok.days[0].slots.slice(0, 3).map((slot) => {
                const cat = CATEGORY_META[slot.category];
                return (
                    <div key={slot.id} className="card-sm" style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div
                            style={{
                                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                                background: `${cat.color}22`, color: cat.color,
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >
                            <cat.icon size={20} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {slot.place}
                            </div>
                            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{slot.time}</div>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)", flexShrink: 0 }}>
                            ${slot.estimatedCost}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
