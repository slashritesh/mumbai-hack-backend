
declare namespace NodeJS{
  interface ProcessEnv {
    DATABASE_URL : string,
    JWT_SECERT : string,
    PORT : string,
    NODE_ENV : string,
    ACCESSTOKEN_SECERT : string,
    REFRESH_TOKEN_SECRET : string | undefined,
    ACCESSTOKEN_EXPIRESIN : string,
    REFRESHTOKEN_EXPIRESIN : string
  }
}