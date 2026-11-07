const RESERVED_PATHS = new Set([
  "login",
  "register",
  "settings",
  "edit",
  "auth",
  "profile",
  "api",
]);

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/").filter(Boolean);

  if (
    request.method !== "GET" ||
    pathSegments.length !== 1 ||
    RESERVED_PATHS.has(pathSegments[0].toLowerCase()) ||
    pathSegments[0].includes(".")
  ) {
    return context.next();
  }

  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  let username;
  try {
    username = decodeURIComponent(pathSegments[0]);
  } catch {
    return response;
  }

  const title = `HeyItzMe ▸ ${username}`;
  const profileUrl = `https://heyitzme.com/${encodeURIComponent(username)}`;

  return new HTMLRewriter()
    .on("title", {
      element(element) {
        element.setInnerContent(title, { html: false });
      },
    })
    .on('meta[property="og:title"]', {
      element(element) {
        element.setAttribute("content", title);
      },
    })
    .on('meta[property="og:url"]', {
      element(element) {
        element.setAttribute("content", profileUrl);
      },
    })
    .transform(response);
}
