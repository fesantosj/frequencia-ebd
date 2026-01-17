const environment = {
  baseURL: "http://192.168.1.108:8085/api/",
};

const env = import.meta.env.MODE;

if (env === "development") {
  environment.baseURL =
    import.meta.env.VITE_API_URL || "http://192.168.1.108:8085/api/";
}

if (env === "staging") {
  environment.baseURL = "https://hml-api-ieadpaebd.net/api/";
}

if (env === "production") {
  environment.baseURL =
    import.meta.env.VITE_API_URL || "https://api-ieadpaebd.net/api/";
}

export default environment;
