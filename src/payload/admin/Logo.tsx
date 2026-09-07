import React from "react";

/** The login screen. First thing Mustafa sees — make it feel like his. */
export const Logo = () => (
  <div className="vg-login-logo">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/logo/visgrow-logo.svg" alt="Visgrow" width={196} height={70} />
    <p>Website content &amp; enquiries</p>
  </div>
);

export default Logo;
