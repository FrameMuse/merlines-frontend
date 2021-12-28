// SCSS
import "./AdminStats.style.scss"

import AdminBoxLayout from "admin/layouts/AdminBoxLayout"
import { AnalyticsDashboard, PageViewsPerPathChart, SessionsByHourChart, SessionsBySourceChart } from "react-analytics-charts"
// Over ten different commonly used charts are available
import { SessionsByDateChart, SessionsGeoChart } from "react-analytics-charts"

function AdminStats() {
  return (
    <div className="admin-stats">
      <h2 className="admin-stats__title">Статистика</h2>
      <div className="admin-stats__container">
        {/* <AdminBoxLayout header="Пользователи">
          СТАТИСТИКА
          СТАТИСТИКА
        </AdminBoxLayout>
        <AdminBoxLayout header="Пользователи">
          СТАТИСТИКА
          СТАТИСТИКА
        </AdminBoxLayout>
        <AdminBoxLayout header="Пользователи">
          СТАТИСТИКА
          СТАТИСТИКА
        </AdminBoxLayout>
        <AdminBoxLayout header="Пользователи">
          СТАТИСТИКА
          СТАТИСТИКА
        </AdminBoxLayout> */}
        <AnalyticsDashboard
          authOptions={{ clientId: process.env.REACT_APP_GA_CLIENT_ID }}
          renderCharts={(gapi, viewId) => {
            const chartStyles = {
              margin: "15px",
              maxWidth: 400,
            }
            return (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {/* View ID: {viewId} */}
                <SessionsByDateChart
                  gapi={gapi}
                  viewId={viewId}
                  style={chartStyles}
                  showPageViews
                  showUsers
                />
                <SessionsGeoChart
                  gapi={gapi}
                  viewId={viewId}
                  style={chartStyles}
                  showPageViews
                  options={{ width: 400 }}
                />
                <SessionsBySourceChart
                  gapi={gapi}
                  viewId={viewId}
                  style={chartStyles}
                />
                <SessionsByHourChart gapi={gapi} viewId={viewId} style={chartStyles} />
                <PageViewsPerPathChart
                  gapi={gapi}
                  viewId={viewId}
                  style={{ margin: "15px" }}
                />
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}

export default AdminStats
