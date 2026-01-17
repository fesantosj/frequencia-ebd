import { createAction } from "@reduxjs/toolkit";

export const resetAll = createAction("RESET_ALL");
export const resetPersistedStates = createAction("RESET_PERSIST");
