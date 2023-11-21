/// <reference lib="dom" />
import main from "./main.css";

export const sheet = new CSSStyleSheet();

sheet.replaceSync(main);

document.adoptedStyleSheets = [sheet];

export * from "./atoms";
export * from "./molecules";
export * from "./organisms";
export * from "./templates";
export * from "./pages";
