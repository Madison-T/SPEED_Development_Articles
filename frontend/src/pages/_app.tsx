import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../context/authContext";  // Add this import
import PopulatedNavBar from "../components/PopulatedNavBar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthProvider>   {/* Wrap your app here */}
        <PopulatedNavBar />
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
