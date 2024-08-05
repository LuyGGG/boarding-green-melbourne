// app/document.tsx
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';

export default function Document({ locale }: DocumentProps) {
  return (
    <Html lang={locale}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles/globals.css" />
        <link rel="icon" href="/favicon.ico" />
        <title>Create Next App</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
