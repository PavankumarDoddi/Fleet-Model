import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

// Ensure in public/index.html:
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
// <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">

const data = {
  historical: [
    { label: "Employees Booked", value: 1200, icon: "bi-people-fill" },
    { label: "3-Seater Rides", value: 50, icon: "bi-car-front-fill" },
    { label: "5-Seater Rides", value: 75, icon: "bi-car-front" },
    { label: "8-Seater Rides", value: 20, icon: "bi-bus-front-fill" },
    { label: "No-Show Rate %", value: 5, icon: "bi-percent" },
  ],
  weekly: [
    { week: "Week 1", usage: [30, 40, 35, 50, 45, 60, 55] },
    { week: "Week 2", usage: [40, 55, 50, 65, 60, 70, 75] },
    { week: "Week 3", usage: [50, 65, 60, 70, 80, 85, 90] },
    { week: "Week 4", usage: [60, 75, 70, 80, 85, 95, 100] },
  ],
  forecast: [
    { label: "Employees Forecast", value: 1300, icon: "bi-person-fill" },
    { label: "3-Seater Forecast", value: 60, icon: "bi-car-front-fill" },
    { label: "5-Seater Forecast", value: 80, icon: "bi-car-front" },
    { label: "8-Seater Forecast", value: 25, icon: "bi-bus-front-fill" },
    { label: "No-Show Forecast %", value: 4, icon: "bi-percent" },
  ],
  weeklyForecast: [
    { week: "Week 1", usage: [35, 45, 40, 55, 50, 65, 60] },
    { week: "Week 2", usage: [45, 60, 55, 70, 65, 75, 80] },
    { week: "Week 3", usage: [55, 70, 65, 75, 85, 90, 95] },
    { week: "Week 4", usage: [65, 80, 75, 85, 90, 100, 105] },
  ],
};

function ChartCard({ title, dataPoints, color }) {
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{ data: dataPoints, backgroundColor: color, borderWidth: 0 }],
  };
  return (
    <div className="card shadow-sm p-2">
      <h6 className="text-center mb-2 small">{title}</h6>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: { x: { display: false }, y: { display: false } },
          plugins: { legend: { display: false }, tooltip: { enabled: true } },
        }}
      />
    </div>
  );
}

export default function CabAllocationDashboard() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Hero with CTA */}
      <header
        className="bg-gradient-info text-white text-center py-5 mb-4"
        style={{ background: "linear-gradient(to right, #4facfe, #00f2fe)" }}
      >
        <div className="container">
          <h1 className="display-5 fw-bold">Cab Allocation Forecasting</h1>
          <p className="lead mb-4">
            Quickly visualize your historical data and forecast future needs.
          </p>
          <button className="btn btn-light me-2">Upload Data</button>
          <button className="btn btn-outline-light">Download Report</button>
        </div>
      </header>

      {/* Filters Accordion */}
      <div className="container mb-4">
        <div className="accordion" id="filterAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFilters">
              <button
                className="accordion-button collapsed"
                type="button"
                onClick={() => setShowFilters((prev) => !prev)}
                aria-expanded={showFilters}
                aria-controls="collapseFilters"
              >
                Filters
              </button>
            </h2>
            <div
              id="collapseFilters"
              className={`accordion-collapse collapse ${
                showFilters ? "show" : ""
              }`}
              aria-labelledby="headingFilters"
            >
              <div className="accordion-body row g-3">
                <div className="col-md-6">
                  <label className="form-label">Shift Timings</label>
                  <select className="form-select">
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Night</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Select Date</label>
                  <input
                    type="date"
                    className="form-control"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical KPIs */}
      <div className="container mb-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
          {data.historical.map((item, idx) => (
            <div className="col" key={idx}>
              <div className="card text-center h-100 shadow-sm">
                <div className="card-body">
                  <i className={`bi ${item.icon} fs-1 text-primary mb-2`}></i>
                  <h5 className="card-title fw-bold">{item.value}</h5>
                  <p className="card-text small text-muted">{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="container mb-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {data.weekly.map((w, i) => (
            <div className="col" key={i}>
              <ChartCard
                title={w.week}
                dataPoints={w.usage}
                color="rgba(66,133,244,0.6)"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Forecast KPIs */}
      <div className="container mb-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4">
          {data.forecast.map((item, idx) => (
            <div className="col" key={idx}>
              <div className="card text-center h-100 shadow-sm border-danger">
                <div className="card-body">
                  <i className={`bi ${item.icon} fs-1 text-danger mb-2`}></i>
                  <h5 className="card-title fw-bold">{item.value}</h5>
                  <p className="card-text small text-muted">{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast Weekly Trends */}
      <div className="container flex-grow-1 mb-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {data.weeklyForecast.map((w, i) => (
            <div className="col" key={i}>
              <ChartCard
                title={w.week}
                dataPoints={w.usage}
                color="rgba(219,68,55,0.6)"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer with actions */}
      <footer className="bg-light py-4 mt-auto">
        <div className="container d-flex justify-content-between align-items-center">
          <small className="text-muted">© 2025 Cab System.</small>
          <div>
            <a href="#top" className="me-3">
              Back to Top
            </a>
            <a href="#help">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
