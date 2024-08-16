//This setup is useful if you want to protect specific routes from unauthenticated access.
//user will only see the dashboard page when he is authenticated.
export { default } from "next-auth/middleware";
export const config = { matcher: ["/dashboard"] };