export interface Data {
    token: string;
    base_domain: string;
  }
  
export interface ArrayAmo {
    id: number;
    name: string;
    request_id: string;
  }


//не требуется, как я выяснил методом проб и ошибок
export interface PreArrayAmo {
    id: number;
    request_id: string;
}

export interface CompObject {
    id: number;
    name: string;
    request_id: string;
  }

export interface Response {
    id: Number,
    request_id: String
}