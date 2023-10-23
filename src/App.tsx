import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Essay from "./pages/essay";
import Assessment from "./pages/assessment";
import LessonPlan from "./pages/lessonplan";
import Analytics from "./pages/analytics";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 1️⃣ Wrap your routes in a pathless layout route */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/essay" element={<Essay />} />
            <Route path="/lessonplan" element={<LessonPlan />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/analytics" element={<Analytics />} />
            {/* <Route path="/blog/*" element={<BlogApp />} />
          <Route path="/users/*" element={<UserApp />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
