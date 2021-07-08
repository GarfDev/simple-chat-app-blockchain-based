import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./app";

const rootNote = document.getElementById("root");
ReactDOM.render(
  <RecoilRoot>
    <Suspense fallback={<></>}>
      <App />
    </Suspense>
  </RecoilRoot>,
  rootNote
);
