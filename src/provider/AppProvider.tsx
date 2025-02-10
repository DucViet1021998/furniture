"use client";

import { AppStore, makeStore } from "@/redux-store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { useServerInsertedHTML } from "next/navigation";
import { setupListeners } from "@reduxjs/toolkit/query";
import { SnackbarProvider } from "notistack";
import {
  AppSnackbarError,
  AppSnackbarSuccess,
  AppSnackbarWarning,
} from "@/components/common";
import { useEffect, useRef, useState } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme, { createEmotionCache } from "@/material";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ cache, flush }] = useState(() => {
    const cache = createEmotionCache();
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: `${styles}
          `,
        }}
      />
    );
  });
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return (
    <Provider store={storeRef.current}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <SnackbarProvider
            maxSnack={4}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
            TransitionProps={{
              direction: "left",
            }}
            Components={{
              error: AppSnackbarError,
              warning: AppSnackbarWarning,
              success: AppSnackbarSuccess,
            }}
          >
            <main>{children}</main>
          </SnackbarProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </Provider>
  );
};

export default AppProvider;
