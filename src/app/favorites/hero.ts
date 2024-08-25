export interface Comics {
  name?: string;
}
export interface Hero {
  id?: number;
  name?: string;
  description?: string;
  favorite?: boolean;
  thumbnail?: {
    path?: string;
    extension?: string;
  };
  comics?: {
    available?: number;
    items?: Comics[];
  };
}

export interface HeroResponse {
  data?: {
    offset?: number;
    total?: number;
    results?: Hero[];
  };
}
