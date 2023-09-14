export type IFishLocation =
  | 'River'
  | 'Pond'
  | 'River (clifftop)'
  | 'River (mouth)'
  | 'Sea'
  | 'Pier'
  | 'Sea (rainy days)';

export type IMonth =
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december';

export type IPeriodOfDay =
  | 'All day'
  | '9 AM - 4 PM'
  | '4 PM - 9 AM'
  | '9 PM - 4 AM'
  | '4 AM - 9 PM';

export type IAvailability<T extends IMonth, U extends IPeriodOfDay[]> = {
  [K in T]?: U;
};
export interface IQueryParams {
  hemisphere?: string;
  month?: string;
  time?: string;
}
