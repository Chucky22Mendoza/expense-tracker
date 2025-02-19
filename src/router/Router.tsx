import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import TrackerLayout from "../layout/TrackerLayout";
import TrackerViewFactory from "../modules/tracker/TrackerViewFactory";
import HistoryViewFactory from "../modules/history/HistoryViewFactory";
import NotFoundViewFactory from "../modules/notFound/NotFoundViewFactory";
import SettingsViewFactory from "@/modules/settings/SettingsViewFactory";
import AboutViewFactory from "@/modules/about/AboutViewFactory";
import TagsViewFactory from "@/modules/tags/TagsViewFactory";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <TrackerLayout />
          </PrivateRoute>
        }
        children={[
          <Route path="" key="trackerHome" element={<TrackerViewFactory />} />,
          <Route path="/history" key="trackerHistory" element={<HistoryViewFactory />} />,
          <Route path="/settings" key="trackerSettings" element={<SettingsViewFactory />} />,
          <Route path="/about" key="trackerAbout" element={<AboutViewFactory />} />,
          <Route path="/tags" key="trackerTags" element={<TagsViewFactory />} />,
          <Route path="*" key="notFound" element={<NotFoundViewFactory />} />
        ]}
      />
    </Routes>
  )
};