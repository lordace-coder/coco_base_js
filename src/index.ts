import { Cocobase } from "./core/core";
import type { CocobaseConfig, Document, Collection } from "./types/types";
import {
  getFromLocalStorage,
  mergeUserData,
  setToLocalStorage,
} from "./utils/utils";

export { Cocobase, getFromLocalStorage, mergeUserData, setToLocalStorage };
export type { TokenResponse, AppUser,Query } from "./types/types";
export type { CocobaseConfig, Document, Collection };
