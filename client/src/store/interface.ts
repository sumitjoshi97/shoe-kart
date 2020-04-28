import { Reducer } from "react";

export interface Action {
  type: string;
  [args: string]: any;
}

export interface Reducers {
  [key: string]: Reducer<any, Action>;
}