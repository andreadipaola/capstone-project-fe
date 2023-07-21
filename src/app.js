import 'simplebar-react/dist/simplebar.min.css';
import { useRoutes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { Toaster } from 'src/components/toaster';
import { SettingsConsumer, SettingsProvider } from 'src/contexts/settings-context';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth/jwt-context';
import { routes } from 'src/routes';
import { store } from 'src/store';
import { createTheme } from 'src/theme';

import 'src/locales/i18n';

export const App = () => {
  const element = useRoutes(routes);

  return (
    <ReduxProvider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>
          <AuthConsumer>
            {(auth) => (
              <SettingsProvider>
                <SettingsConsumer>
                  {(settings) => {
                    if (!settings.isInitialized) {
                      // return null;
                    }

                    const theme = createTheme({
                      colorPreset: settings.colorPreset,
                      contrast: settings.contrast,
                      direction: settings.direction,
                      paletteMode: settings.paletteMode,
                      responsiveFontSizes: settings.responsiveFontSizes
                    });

                    return (
                      <ThemeProvider theme={theme}>
                        <Helmet>
                          <meta
                            name="color-scheme"
                            content={settings.paletteMode}
                          />
                          <meta
                            name="theme-color"
                            content={theme.palette.neutral[900]}
                          />
                        </Helmet>
                        <CssBaseline />
                        {element}
                        <Toaster />
                      </ThemeProvider>
                    );
                  }}
                </SettingsConsumer>
              </SettingsProvider>
            )}
          </AuthConsumer>
        </AuthProvider>
      </LocalizationProvider>
    </ReduxProvider>
  );
};
