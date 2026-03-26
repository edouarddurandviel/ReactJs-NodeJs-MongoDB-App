import { createContext } from 'react';
import type { UserConnected } from "../stores/auth/interfaces";

// theme context provider
export const userContext = createContext<UserConnected | null>(null);