import { ChakraProvider } from "@chakra-ui/react";
import "../app/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

type AppProps = {
  Component: React.ElementType;
  pageProps: any;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="195044032993-1eohkc391ob5ltbtflj69rfse2960sn5.apps.googleusercontent.com">
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </GoogleOAuthProvider>
  );
}
