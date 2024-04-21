import.meta.env;
export const getEnvVariables = () => {
  return {
    ...import.meta.env,
  }
}