/* eslint-disable */
/* tslint:disable */
// Payload admin root layout.
// Only the Visgrow font + stylesheet additions below are ours.

import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import localFont from "next/font/local";
import React from "react";

import { importMap } from "./admin/importMap";
import "@payloadcms/next/css";
// Visgrow branding. Loaded after Payload's own styles so it can override them.
import "@/payload/admin/custom.css";

// Same typefaces as the public site, so the admin feels like part of the
// same product rather than a separate tool bolted on.
const bebas = localFont({
  src: "../../fonts/BebasNeue-Regular.ttf",
  variable: "--vg-font-heading",
  weight: "400",
  display: "swap",
});

const raleway = localFont({
  src: "../../fonts/Raleway-Variable.ttf",
  variable: "--vg-font-body",
  weight: "100 900",
  display: "swap",
});

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    <div className={`${bebas.variable} ${raleway.variable} vg-admin`}>
      {children}
    </div>
  </RootLayout>
);

export default Layout;
