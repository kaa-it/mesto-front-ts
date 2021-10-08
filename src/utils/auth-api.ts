import axios, {AxiosInstance} from 'axios';

export type AuthSignData = {
  email: string,
  password: string,
}

export type AuthUser = {
  email: string,
  _id?: string
}

export type AuthToken = {
  token: string
}

class AuthApi {
  client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      responseType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  register(data: AuthSignData) {
    return this.client.post<AuthUser>('/signup', data)
  };
  
  login(data: AuthSignData) {
    return this.client.post<AuthToken>('/signin', data)
  };
  
  checkToken(token: string) {
    return this.client.get<{data: AuthUser}>('/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }).then(res => res.data.data)
    
  }
}

export default AuthApi; 