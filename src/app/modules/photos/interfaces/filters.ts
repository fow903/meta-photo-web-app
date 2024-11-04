export interface Filters {
  title?: string;
  albumTitle?: string;
  userEmail?: string;
}

export interface MappedFilters {
  [key: string]: string;
}
