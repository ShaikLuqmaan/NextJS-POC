"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
const google_1 = require("next/font/google");
require("../../styles/globals.css");
const inter = (0, google_1.Inter)({ subsets: ["latin"] });
exports.metadata = {
    title: "Share Prompt",
    description: "Discover and share AI prompts",
};
function RootLayout({ children, }) {
    return (<html lang="en">
      <body>
        <div className="main">
          <div className="gradient"/>
        </div>

        <main className="app">{children}</main>
      </body>
    </html>);
}
exports.default = RootLayout;
