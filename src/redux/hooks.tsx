import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export const useAppDispatch = () => useDispatch<any>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppHelpers = () => {
  const dispatch = useAppDispatch();

  return { dispatch };
};