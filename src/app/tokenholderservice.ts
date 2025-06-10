import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private token: string | null = null;
  private idToken: string | null = null;
  public getToken(): string | null {
    return this.token;
  }
  public setToken(token: string): void {
    this.token = token;
  }
  public getIdToken(): string | null {
    return this.idToken;
  }
  public setIdToken(token: string): void {
    this.idToken = token;
  }
  parseJwt(token: string) {
    if (!token) {
      return null;
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error(
        'Invalid JWT format. A JWT must have three parts separated by dots.'
      );
      return null;
    }

    try {
      const payload = parts[1];
      let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }

      const decodedPayload = atob(base64);
      const parsedObject = JSON.parse(decodedPayload);
      console.log(parsedObject);
      return parsedObject;
    } catch (error) {
      console.error('Error parsing JWT payload:', error);
      return null;
    }
  }
}
