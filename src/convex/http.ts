import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { auth } from "./auth";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
  pathPrefix: "/api/storage/",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const storageId = pathParts[pathParts.length - 1] as Id<"_storage">;

    if (!storageId) {
      return new Response("Missing storageId", { status: 400 });
    }

    const fileUrl = await ctx.storage.getUrl(storageId);
    if (!fileUrl) {
      return new Response("Image not found", { status: 404 });
    }

    return Response.redirect(fileUrl);
  }),
});

export default http;