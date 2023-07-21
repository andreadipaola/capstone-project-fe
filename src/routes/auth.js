import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { IssuerGuard } from 'src/guards/issuer-guard';
import { GuestGuard } from 'src/guards/guest-guard';
import { Layout as AuthLayout } from 'src/layouts/auth/modern-layout';
import { Issuer } from 'src/utils/auth';

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));

export const authRoutes = [
  {
    element: (
      <IssuerGuard issuer={Issuer.JWT}>
        <GuestGuard>
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        </GuestGuard>
      </IssuerGuard>
    ),
    children: [
      {
        index: true,
        // path: 'login',
        element: <JwtLoginPage />
      },
      {
        path: 'register',
        element: <JwtRegisterPage />
      }
    ]
  }
];
