type RequestParams<Params> = Params;

interface RequestInfinityQuerySettings<Func = {}> {
  config?: import("axios").AxiosRequestConfig;
  options?: import("@tanstack/react-query").UseQueryOptions<
    Awaited<ReturnType<Func>>,
    any,
    Awaited<ReturnType<Func>>,
    Awaited<ReturnType<Func>>,
    any
  >;
}

interface RequestQuerySettings<Func = {}> {
  config?: import("axios").AxiosRequestConfig;
  options?: import("@tanstack/react-query").UseQueryOptions<
    Awaited<ReturnType<Func>>,
    any,
    Awaited<ReturnType<Func>>,
    any
  >;
}

interface RequestMutationSettings<Func = {}> {
  config?: import("axios").AxiosRequestConfig;
  options?: import("@tanstack/react-query").UseMutationOptions<
    Awaited<ReturnType<Func>>,
    any,
    any,
    any
  >;
}
