//src/server/context/AuthProvider.jsx
'use client';

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
    return <SessionProvider>{children}</SessionProvider>;
}