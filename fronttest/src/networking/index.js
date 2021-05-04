import workerNetworking from "./worker";
import authNetworking from "./auth";

export default {
  ...workerNetworking,
  ...authNetworking,
}