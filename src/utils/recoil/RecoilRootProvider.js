"use client";

const { RecoilRoot } = require("recoil");

const RecoilRootProvider = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootProvider;
