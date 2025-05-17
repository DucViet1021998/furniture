// export async function refreshAccessToken() {
//   try {
//     const refreshToken = Cookie.get("refreshToken");
//     if (!refreshToken) {
//       throw new Error("No refresh token available");
//     }

//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_REFRESH_TOKEN}`,
//       {
//         refreshToken,
//       }
//     );

//     const { accessToken } = response.data;
//     localStorage.setItem("accessToken", accessToken);

//     return accessToken;
//   } catch (error: any) {
//     if (
//       error.response?.status === ApiConstant.STT_UNAUTHORIZED ||
//       error.response?.status === ApiConstant.STT_FORBIDDEN
//     ) {
//       // Xóa refreshToken và accessToken
//       Cookie.remove("refreshToken");
//       localStorage.removeItem("accessToken");

//       // Chuyển hướng người dùng về trang login
//       Router.push(PathConstant.LOGIN);
//     }

//     throw error;
//   }
// }

export const getPaginationInfo = (
  take: number,
  skip: number,
  totalData: number
) => {
  const currentPage = Math.ceil(take + skip) / take;
  const totalPage = Math.ceil(totalData / take) || 1;
  return {
    currentPage,
    pageSize: take,
    totalPage,
  };
};

export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

// export const convertBase64ToFile = (base64String: string, fileName: string) => {
//   const base64Arr = base64String.split(",");
//   if (base64Arr.length === 0)
//     throw new Error("base64String type không xác định");
//   const mimeMatch = base64Arr[0].match(/:(.*?);/);
//   if (!mimeMatch) {
//     throw new Error("Mime type không xác định");
//   }
//   const mime = mimeMatch[1];
//   const byteString = atob(base64Arr[1]);
//   const ab = new ArrayBuffer(byteString.length);
//   const ia = new Uint8Array(ab);

//   for (let i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }

//   return new File([ab], fileName, { type: mime });
// };

export const extractErrorMessages = (error: any): string => {
  if (error?.response?.data?.errors) {
    return error.response.data.errors
      .flatMap((item: any) => item.errors)
      .join(", ");
  }
  if (error?.response?.data?.message) {
    return error?.response?.data?.message;
  }

  return "An unexpected error occurred.";
};

export const isClient = () => typeof window !== "undefined";

export const createUrlWithParams = (
  baseUrl: string,
  params: { [key: string]: string | number | boolean }
): string => {
  const url = new URL(baseUrl);

  if (params) {
    Object.keys(params).forEach((key) => {
      if (
        params[key] !== undefined &&
        params[key] !== null &&
        params[key] !== ""
      ) {
        url.searchParams.append(key, params[key].toString());
      }
    });
  }
  return url.toString();
};
