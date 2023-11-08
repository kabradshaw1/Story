import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { DecodedJwt } from "../types";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  decodeToken<T>(token: string): DecodedJwt {
    return jwtDecode(token)
  }
}