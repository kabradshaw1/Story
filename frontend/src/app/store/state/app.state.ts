import { ApiState } from "./api.state";
import { AuthState } from "./auth.state";

export default interface AppState {
  auth: AuthState;
  api: ApiState;
}