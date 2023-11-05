import { ChakraProvider } from "@chakra-ui/react";
import "../app/globals.css";

type AppProps = {
  Component: React.ElementType;
  pageProps: any;
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
