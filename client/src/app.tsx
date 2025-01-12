import 'src/global.css';

import { NextUIProvider } from '@nextui-org/react';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import { ThemeProvider } from 'src/theme/theme-provider';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <NextUIProvider id="root">
        <Router />
      </NextUIProvider>
    </ThemeProvider>
  );
}
