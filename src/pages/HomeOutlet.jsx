/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Loading from "../components/Loading";

const HomeOutlet = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return <>{isPageLoading ? <Loading /> : <Outlet></Outlet>}</>;
};

export default HomeOutlet;
