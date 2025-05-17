import { CommonUtils, ServerUtils } from "@/utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import jsCookie from "js-cookie";
import { ApiConst, AppConstant } from "@/const";

export type IParams = {
  [key: string]: string | number | boolean | undefined | any;
};

export type ApiResponse<T> = {
  status: number;
  payload: T;
};

type CustomOptions = Omit<RequestInit, "method" | "signal"> & {
  baseUrl?: string;
  timeout?: number;
  params?: IParams;
  controller?: AbortController;
  accessToken?: string;
  cache?: RequestCache;
  revalidate?: number | false;
};

const request = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  endpoint: string,
  options?: CustomOptions
): Promise<ApiResponse<T>> => {
  try {
    const controller = options?.controller ?? new AbortController();
    const timeout = options?.timeout ?? AppConstant.TIMEOUT;

    const {
      body: rawBody,
      baseUrl,
      cache,
      revalidate,
      headers: customHeaders,
      ...restOptions
    } = options ?? {};

    let body = rawBody;
    if (body && !(body instanceof FormData)) {
      body = JSON.stringify(body);
    }

    const baseHeaders: Record<string, string> = {
      ...AppConstant.HEADER_DEFAULT,
    };

    if (body instanceof FormData || method === "GET") {
      delete baseHeaders["Content-Type"];
    }

    let accessToken: string | undefined;

    if (options?.accessToken !== undefined) {
      accessToken = options.accessToken;
    } else if (CommonUtils.isClient()) {
      // accessToken = jsCookie.get(GlobalsConst.COOKIE_STORAGE.AccessToken);
    } else {
      // session = await ServerUtils.getSessionAction();
      // accessToken = session?.accessToken;
    }

    if (accessToken) {
      baseHeaders.authorization = `Bearer ${accessToken}`;
    }

    let fullUrl = endpoint.startsWith("/")
      ? `${baseUrl ?? process.env.NEXT_PUBLIC_API_URL}${endpoint}`
      : `${baseUrl ?? process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;

    if (options?.params) {
      fullUrl = CommonUtils.createUrlWithParams(fullUrl, options.params);
    }

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const res = await fetch(fullUrl, {
      method,
      signal: controller.signal,
      cache: cache ?? "no-store",
      ...(typeof revalidate === "number" || revalidate === false
        ? { next: { revalidate } }
        : {}),
      headers: {
        ...baseHeaders,
        ...customHeaders,
      },
      ...(body && method !== "GET" ? { body } : {}),
      ...restOptions,
    });

    clearTimeout(timeoutId);

    const contentType = res.headers.get("content-type");
    let payload: T;
    if (contentType?.includes("application/json")) {
      payload = await res.json();
    } else {
      payload = (await res.text()) as T;
    }

    const data: ApiResponse<T> = { status: res.status, payload };

    if (!res.ok) {
      if (res.status === ApiConst.STT_BAD_REQUEST) {
        // TODO: handle 400
      } else if (res.status === ApiConst.STT_FORBIDDEN) {
        // TODO: handle 403
      } else if (res.status === ApiConst.STT_UNAUTHORIZED) {
        // TODO: handle 401
      }
    }

    return data;
  } catch (errors) {
    if (isRedirectError(errors)) throw errors;

    return {
      status: ApiConst.STT_INTERNAL_SERVER,
      payload: errors as T,
    };
  }
};

const apiRequester = {
  async get<T>(
    url: string,
    params?: IParams,
    options?: Omit<CustomOptions, "body" | "params">
  ): Promise<ApiResponse<T>> {
    return request<T>("GET", url, { params, ...options });
  },

  async post<T>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body">
  ): Promise<ApiResponse<T>> {
    return request<T>("POST", url, { body, ...options });
  },

  async put<T>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body">
  ): Promise<ApiResponse<T>> {
    return request<T>("PUT", url, { body, ...options });
  },

  async patch<T>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body">
  ): Promise<ApiResponse<T>> {
    return request<T>("PATCH", url, { body, ...options });
  },

  async delete<T>(
    url: string,
    body?: any,
    params?: IParams,
    options?: Omit<CustomOptions, "body" | "params">
  ): Promise<ApiResponse<T>> {
    return request<T>("DELETE", url, { body, params, ...options });
  },
};

export default apiRequester;
