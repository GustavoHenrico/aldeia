import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./contexts/authProvider"
import { AppLayout } from "./pages/app/layout"
import { AuthLayout } from "./pages/auth/layout"
import { LoginPage } from "./pages/auth/login"
import { StudentsPage } from "./pages/app/students"
import { TeacherPage } from "./pages/app/teachers"
import { OnboardingLayout } from "./pages/onboarding/layout"
import { OnboardingPage } from "./pages/onboarding"
import { ClassesPage } from "./pages/app/classes"
import { DashboardPage } from "./pages/app/dashboard"
import { SettingsPage } from "./pages/app/settings"

export const App = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<AppLayout />} >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="teachers" element={<TeacherPage />} />
            <Route path="classes" element={<ClassesPage />} />
            <Route path="lessons" element={<h1>Dashboard</h1>} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />} >
            <Route path="login" element={<LoginPage />} />
          </Route>

          <Route path="/onboarding" element={<OnboardingLayout />} >
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
