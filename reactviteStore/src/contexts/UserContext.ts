import { createContext } from 'react';
import type { UserConnected } from "../stores/auth/interfaces";

// theme context provider
export const UserContext = createContext<UserConnected | null>(null);