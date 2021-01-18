import { render } from "@prezly/slate-renderer";
import React from "react";

import story from "./story.json";

const Index = () => {
  return <article>{render(story.children)}</article>;
};

export default Index;
