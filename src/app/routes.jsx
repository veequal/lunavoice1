import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { getRouteAnimationKey } from '../lib/routeKeys.js'

import DoctorDashboardPage from '../pages/DoctorDashboardPage.jsx'
import ParentDashboardPage from '../pages/ParentDashboardPage.jsx'
import ChildDashboardPage from '../pages/ChildDashboardPage.jsx'

const LoginPage = lazy(() => import('../pages/LoginPage.jsx'))
const RoleLoginPage = lazy(() => import('../pages/RoleLoginPage.jsx'))

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-400/30 border-t-indigo-400" />
    </div>
  )
}

/** Dashboards mount instantly — no AnimatePresence wait blocking sidebar navigation. */
function AppOutlet() {
  const { pathname } = useLocation()
  const layoutKey = getRouteAnimationKey(pathname)
  const isDashboard = layoutKey.includes('dashboard')

  if (isDashboard) {
    return <Outlet />
  }

  return (
    <div key={layoutKey} className="min-h-screen">
      <Outlet />
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<AppOutlet />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login/:role" element={<RoleLoginPage />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboardPage />} />
          <Route path="/parent-dashboard/*" element={<ParentDashboardPage />} />
          <Route path="/child-dashboard/*" element={<ChildDashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
