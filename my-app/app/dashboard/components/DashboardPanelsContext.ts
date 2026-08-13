"use client";

import { createContext, useContext } from "react";

export interface DashboardPanelsContextValue {
  activePanel: string | null;
  panelArg?: string;
  isModal: boolean;
  openPanel: (id: string, arg?: string) => void;
  closePanel: () => void;
}

export const DashboardPanelsContext = createContext<DashboardPanelsContextValue>({
  activePanel: null,
  panelArg: undefined,
  isModal: false,
  openPanel: () => {},
  closePanel: () => {},
});

export function useDashboardPanels() {
  return useContext(DashboardPanelsContext);
}
