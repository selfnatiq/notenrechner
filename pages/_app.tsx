import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<Head>
				<title>Notenrechner</title>

				<link rel="icon" href="/logo.png" />
				<meta name="theme-color" content="#ffffff" />
				{/* <link rel="manifest" href="manifest.json" /> */}

				{/* <link rel="icon" type="image/png" href="/images/icon-36x36.png" sizes="36x36" />
				<link rel="icon" type="image/png" href="/images/icon-96x96.png" sizes="96x96" />
				<link rel="icon" type="image/png" href="/images/icon-192.png" sizes="192x192" />

				<link rel="apple-touch-icon" href="/images/icon-192.png" sizes="192x192" />
				<meta name="msapplication-config" content="/iconx/browserconfig.xml" /> */}

				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
				/>
			</Head>

			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
