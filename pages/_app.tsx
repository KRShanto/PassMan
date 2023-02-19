import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { FadeLoader } from "react-spinners";
import useLoadingStore from "../stores/loading";
import usePopupStore from "../stores/popup";
import Popup from "../components/dashboard/Popup";

/**
  TODO - password encryption
  TODO - filter passwords
  TODO - add a password strength meter

 */
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const loading = useLoadingStore((state) => state.loading);
  const popup = usePopupStore((state) => state.popup);

  return (
    <SessionProvider session={session}>
      {loading && (
        <div id="preloader">
          <FadeLoader className="spinner" color="cyan" loading={loading} />
        </div>
      )}

      <Popup />
      <main style={{ opacity: loading || popup ? 0.2 : 1 }}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
