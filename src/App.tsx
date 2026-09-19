import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { AppShell } from "./components/AppShell";
import { RequireAuth } from "./components/RequireAuth";
import { AdminsPage } from "./pages/AdminsPage";
import { CitiesPage } from "./pages/CitiesPage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { MemberDetailPage } from "./pages/MemberDetailPage";
import { MembersPage } from "./pages/MembersPage";
import { RestrictedPage } from "./pages/RestrictedPage";
import { SuggestionsPage } from "./pages/SuggestionsPage";
import { VenuesPage } from "./pages/VenuesPage";
import { WaitlistPage } from "./pages/WaitlistPage";

function RedirectLegacyMemberPath() {
  const { id } = useParams<{ id: string }>();
  return <Navigate to={id ? `/members/${id}` : "/members"} replace />;
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<AppShell />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/waitlist" element={<WaitlistPage />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/members/:id" element={<MemberDetailPage />} />
              <Route path="/restricted" element={<RestrictedPage />} />
              <Route path="/audit" element={<Navigate to="/restricted" replace />} />
              <Route path="/applicants" element={<Navigate to="/members" replace />} />
              <Route path="/applicants/:id" element={<RedirectLegacyMemberPath />} />
              <Route path="/cities" element={<CitiesPage />} />
              <Route path="/venues" element={<VenuesPage />} />
              <Route path="/suggestions" element={<SuggestionsPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/admins" element={<AdminsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
