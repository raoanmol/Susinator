import { ChakraProvider } from "@chakra-ui/react";
import "../app/globals.css";

// Define the types for Component and pageProps
type AppProps = {
  Component: React.ElementType;
  pageProps: any; // You can specify the type for pageProps if you know it
};

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
