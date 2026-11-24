# Travel Plan

A mobile-first trip planner built with React and Vite. It keeps a multi-city itinerary, budget, places list and packing list in one app, and works without any API keys.

The bundled trip data covers Bangkok, Chiang Mai, Phuket and Malaysia. Swap in your own trip by editing one file.

## Features

- **Dashboard:** trip overview at a glance
- **Itinerary:** day-by-day plan with time slots, must-visit notes and estimated versus actual cost
- **Budget:** spending tracked against the plan
- **Places:** places to visit by category, with visited status and notes
- **Packing:** packing checklist
- **Currency:** converter with live rates and offline fallback rates
- **Notes:** free-form trip notes
- **Photo tools:** golden-hour and sun times for each location, calculated with SunCalc
- **Maps:** one-tap Google Maps directions or OpenStreetMap for any place

Your changes are saved in the browser's local storage, so there is no account and no backend.

## Tech stack

React 19, React Router 7, Vite, lucide-react, SunCalc

## Getting started

```bash
git clone https://github.com/mkjan30/travelplan.git
cd travelplan
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Use your own trip

Edit `src/data/tripData.js`. Each trip has a destination, dates, currency and a list of days; each day has time slots with a place, cost estimate and coordinates.

## Project structure

```
src/
  pages/        One file per screen (Dashboard, Itinerary, Budget, ...)
  components/   Shared UI such as MapButton
  data/         Trip data and photo spots
  hooks/        useLocalStorage
```
