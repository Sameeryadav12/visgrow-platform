import React from "react";

/**
 * The mark beside the breadcrumb on every admin page.
 *
 * SVG rather than the PNG, because Payload renders this at ~26px and the
 * 2892px-wide raster was collapsing into an unreadable smudge.
 */
export const Icon = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/logo/visgrow-logo.svg"
    alt="Visgrow"
    className="vg-admin-icon"
    width={73}
    height={26}
  />
);

export default Icon;
