import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

export const metadata = {
  title: 'Mantine Next.js Frontend Challenge',
  description: 'User list Code',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <ColorSchemeScript forceColorScheme="dark" />
        <MantineProvider forceColorScheme="dark">{children}</MantineProvider>
      </body>
    </html>
  );
}
