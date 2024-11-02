
declare namespace NodeJS{
  interface ProcessEnv {
    DATABASE_URL : string,
    JWT_SECERT : string,
    PORT : string,
    NODE_ENV : string,
    ACCESSTOKEN_SECERT : string,
    REFRESHTOKEN_SECERT : string,
    ACCESSTOKEN_EXPIRESIN : string,
    REFRESHTOKEN_EXPIRESIN : string
  }
}