
declare namespace NodeJS{
  interface ProcessEnv {
    DATABASE_URL : string,
    JWT_SECERT : string,
    PORT : string,
    NODE_ENV : string
  }
}