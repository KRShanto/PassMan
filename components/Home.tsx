import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Dashboard from "./dashboard/Dashboard";
import LandingPage from "./LandingPage";
import useLoadingStore from "../stores/loading";

export default function Home() {
  const { data: session, status } = useSession();
  const turnOn = useLoadingStore((state) => state.turnOn);
  const turnOff = useLoadingStore((state) => state.turnOff);

  useEffect(() => {
    if (status === "loading") {
      turnOn();
    } else {
      turnOff();
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <>
        <Dashboard />
      </>
    );
  } else if (status === "unauthenticated") {
    return (
      <>
        <LandingPage />
      </>
    );
  }

  return <></>;
}
