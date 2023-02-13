import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { FadeLoader } from "react-spinners";
import useLoadingStore from "../stores/loading";

/**
  TODO - spinner
  TODO - password encryption

 */
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const loading = useLoadingStore((state) => state.loading);

  return (
    <SessionProvider session={session}>
      {loading && (
        <div id="preloader">
          <FadeLoader className="spinner" color="#ff5500" loading={loading} />
        </div>
      )}
      <main style={{ opacity: loading ? 0.2 : 1 }}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
