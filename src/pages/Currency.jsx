import { useState, useEffect, useCallback } from "react";
import { ArrowUpDown, RefreshCcw, CheckCircle2, AlertTriangle, AlertCircle, Clock } from "lucide-react";

// Frankfurter API — free, no API key, ECB data updated daily
// Supports: AUD, BGN, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP,
//           HKD, HUF, IDR, ILS, INR, ISK, JPY, KRW, MXN, MYR,
//           NOK, NZD, PHP, PLN, RON, SEK, SGD, THB, TRY, USD, ZAR
const FRANKFURTER_BASE = "https://api.frankfurter.app";

const SUPPORTED_CURRENCIES = ["THB", "MYR", "USD", "SGD", "EUR", "GBP", "JPY"];

const CURRENCY_META = {
    THB: { name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
    MYR: { name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾" },
    USD: { name: "US Dollar", symbol: "$", flag: "🇺🇸" },
    SGD: { name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
    EUR: { name: "Euro", symbol: "€", flag: "🇪🇺" },
    GBP: { name: "British Pound", symbol: "£", flag: "🇬🇧" },
    JPY: { name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
};

// Fallback rates (used when offline) relative to THB
const FALLBACK_RATES_FROM_THB = {
    THB: 1,
    MYR: 0.127,
    USD: 0.028,
    SGD: 0.038,
    EUR: 0.026,
    GBP: 0.022,
    JPY: 4.35,
};

const QUICK_AMOUNTS = [100, 500, 1000, 5000, 10000];

function fmt(val, currency) {
    const sym = CURRENCY_META[currency]?.symbol || "";
    if (Math.abs(val) >= 1000) {
        return `${sym}${val.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    }
    return `${sym}${val.toFixed(2)}`;
}

function formatTimestamp(ts) {
    if (!ts) return "";
    const d = new Date(ts);
    return d.toLocaleString("en-US", {
        month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit",
    });
}

export default function Currency() {
    const [amount, setAmount] = useState("100");
    const [fromCurrency, setFromCurrency] = useState("USD");

    // Live rate state
    // rates[from][to] = conversion factor
    const [rates, setRates] = useState(null);
    const [ratesDate, setRatesDate] = useState(null);
    const [fetchedAt, setFetchedAt] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLive, setIsLive] = useState(false);

    // Fetch live rates from Frankfurter with fromCurrency as base
    const fetchRates = useCallback(async (base = "USD") => {
        setLoading(true);
        setError(null);
        try {
            const targets = SUPPORTED_CURRENCIES.filter((c) => c !== base).join(",");
            const res = await fetch(
                `${FRANKFURTER_BASE}/latest?from=${base}&to=${targets}`,
                { signal: AbortSignal.timeout(8000) }
            );
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            // data.rates = { THB: xx, MYR: xx, ... } (from base)
            const allRates = { ...data.rates, [base]: 1 };
            setRates({ base, rates: allRates });
            setRatesDate(data.date);
            setFetchedAt(Date.now());
            setIsLive(true);
        } catch (err) {
            setError("Could not fetch live rates. Using approximate offline rates.");
            setIsLive(false);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch on mount and when base currency changes
    useEffect(() => {
        // Use USD as canonical base for Frankfurter (THB works too but USD is more stable)
        fetchRates("USD");
    }, [fetchRates]);

    // Convert amount from fromCurrency to toCurrency
    function convert(to) {
        if (fromCurrency === to) return parseFloat(amount) || 0;
        const num = parseFloat(amount) || 0;

        if (isLive && rates) {
            // All rates are relative to rates.base (USD)
            // Convert: from → USD → to
            const fromInBase = num / (rates.rates[fromCurrency] || 1);
            return fromInBase * (rates.rates[to] || 1);
        }

        // Fallback: use static THB-based rates
        const inThb = num / (FALLBACK_RATES_FROM_THB[fromCurrency] || 1);
        return inThb * (FALLBACK_RATES_FROM_THB[to] || 1);
    }

    const numAmount = parseFloat(amount) || 0;
    const targetCurrencies = SUPPORTED_CURRENCIES.filter((c) => c !== fromCurrency);

    return (
        <div className="page fade-in">
            <div className="page-header">
                <h1>Currency Converter</h1>
                <p>Quick reference for your trip</p>
            </div>

            {/* Live rate status bar */}
            <div
                className="card"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    marginBottom: 16,
                    background: isLive
                        ? "rgba(52,211,153,0.08)"
                        : error
                            ? "rgba(248,113,113,0.08)"
                            : "rgba(251,191,36,0.08)",
                    border: `1px solid ${isLive ? "rgba(52,211,153,0.25)" : error ? "rgba(248,113,113,0.25)" : "rgba(251,191,36,0.25)"}`,
                }}
            >
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: isLive ? "var(--green)" : error ? "var(--red)" : "var(--amber)" }}>
                        {loading ? <><Clock size={14} /> Fetching live rates…</> : isLive ? <><CheckCircle2 size={14} /> Live rates (ECB via Frankfurter)</> : error ? <><AlertCircle size={14} /> Offline — approximate rates</> : <><Clock size={14} /> Loading…</>}
                    </div>
                    {ratesDate && !loading && (
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                            Rate date: {ratesDate} · Updated {formatTimestamp(fetchedAt)}
                        </div>
                    )}
                    {error && (
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{error}</div>
                    )}
                </div>
                <button
                    className="btn btn-ghost"
                    style={{ padding: "5px 12px", fontSize: 12, flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}
                    onClick={() => fetchRates("USD")}
                    disabled={loading}
                >
                    <RefreshCcw size={12} className={loading ? "spin" : ""} /> {loading ? "Refreshing" : "Refresh"}
                </button>
            </div>

            {/* From currency selector */}
            <p className="section-label" style={{ marginTop: 0 }}>Convert from</p>
            <div className="tab-row" style={{ marginBottom: 16 }}>
                {SUPPORTED_CURRENCIES.map((c) => (
                    <button
                        key={c}
                        className={`tab-btn ${fromCurrency === c ? "active" : ""}`}
                        onClick={() => setFromCurrency(c)}
                        style={{ fontSize: 12 }}
                    >
                        {CURRENCY_META[c].flag} {c}
                    </button>
                ))}
            </div>

            {/* Amount input */}
            <div className="card" style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 32 }}>{CURRENCY_META[fromCurrency].flag}</span>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>
                            {CURRENCY_META[fromCurrency].name}
                        </div>
                        <input
                            className="input"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            style={{ fontSize: 22, fontWeight: 700, height: 48 }}
                        />
                    </div>
                </div>

                {/* Quick amounts */}
                <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                    {QUICK_AMOUNTS.map((qa) => (
                        <button
                            key={qa}
                            className="btn btn-ghost"
                            style={{ padding: "4px 12px", fontSize: 12 }}
                            onClick={() => setAmount(String(qa))}
                        >
                            {CURRENCY_META[fromCurrency].symbol}{qa.toLocaleString()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Conversion results */}
            <p className="section-label">Equals</p>
            {targetCurrencies.map((to) => {
                const converted = convert(to);
                const isPrimary = to === "THB" || to === "MYR";
                return (
                    <div
                        key={to}
                        className="card"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            border: isPrimary ? "1px solid rgba(56,189,248,0.3)" : "1px solid var(--border)",
                            marginBottom: 8,
                        }}
                    >
                        <span style={{ fontSize: 28 }}>{CURRENCY_META[to].flag}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{CURRENCY_META[to].name}</div>
                            <div
                                style={{
                                    fontSize: isPrimary ? 22 : 18,
                                    fontWeight: 700,
                                    color: isPrimary ? "var(--accent)" : "var(--text)",
                                }}
                            >
                                {loading ? (
                                    <span style={{ color: "var(--text-muted)", fontSize: 15 }}>Loading…</span>
                                ) : (
                                    fmt(converted, to)
                                )}
                            </div>
                        </div>
                        <button
                            className="btn btn-ghost"
                            style={{ padding: "6px", fontSize: 12 }}
                            onClick={() => {
                                setAmount(converted.toFixed(2));
                                setFromCurrency(to);
                            }}
                        >
                            <ArrowUpDown size={16} />
                        </button>
                    </div>
                );
            })}

            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 16, textAlign: "center", lineHeight: 1.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                {isLive
                    ? <><CheckCircle2 size={12} color="var(--green)" /> Live rates from European Central Bank via Frankfurter.app · Free & no API key required</>
                    : <><AlertTriangle size={12} color="var(--amber)" /> Using approximate offline rates. Check your bank for exact amounts.</>}
            </div>
        </div>
    );
}
