import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { C as NOOP_MIDDLEWARE_HEADER, D as decodeKey } from './chunks/astro/server_J33BWFXo.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/lukasz/Desktop/frfr/","cacheDir":"file:///Users/lukasz/Desktop/frfr/node_modules/.astro/","outDir":"file:///Users/lukasz/Desktop/frfr/dist/","srcDir":"file:///Users/lukasz/Desktop/frfr/src/","publicDir":"file:///Users/lukasz/Desktop/frfr/public/","buildClientDir":"file:///Users/lukasz/Desktop/frfr/dist/client/","buildServerDir":"file:///Users/lukasz/Desktop/frfr/dist/server/","adapterName":"","routes":[{"file":"file:///Users/lukasz/Desktop/frfr/dist/404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://sapick-astro.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/lib/contentParser.astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/layouts/components/Faq.astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/pages/[...lang]/contact.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...lang]/contact@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/pages/[...lang]/demo.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...lang]/demo@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/pages/[...lang]/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...lang]/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/pages/[...lang]/pricing.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...lang]/pricing@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/pages/[...lang]/review.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...lang]/review@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/layouts/partials/Footer.astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/layouts/Base.astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/pages/[...lang]/[regular].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...lang]/[regular]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/pages/[...lang]/about.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...lang]/about@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/pages/[...lang]/blog/[single].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...lang]/blog/[single]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/pages/[...lang]/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...lang]/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/pages/[...lang]/changelog.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...lang]/changelog@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/pages/[...lang]/features.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...lang]/features@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/lukasz/Desktop/frfr/src/pages/[...lang]/integration.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/[...lang]/integration@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/[...lang]/about@_@astro":"pages/_---lang_/about.astro.mjs","\u0000@astro-page:src/pages/[...lang]/blog/[single]@_@astro":"pages/_---lang_/blog/_single_.astro.mjs","\u0000@astro-page:src/pages/[...lang]/blog/index@_@astro":"pages/_---lang_/blog.astro.mjs","\u0000@astro-page:src/pages/[...lang]/changelog@_@astro":"pages/_---lang_/changelog.astro.mjs","\u0000@astro-page:src/pages/[...lang]/contact@_@astro":"pages/_---lang_/contact.astro.mjs","\u0000@astro-page:src/pages/[...lang]/demo@_@astro":"pages/_---lang_/demo.astro.mjs","\u0000@astro-page:src/pages/[...lang]/features@_@astro":"pages/_---lang_/features.astro.mjs","\u0000@astro-page:src/pages/[...lang]/integration@_@astro":"pages/_---lang_/integration.astro.mjs","\u0000@astro-page:src/pages/[...lang]/pricing@_@astro":"pages/_---lang_/pricing.astro.mjs","\u0000@astro-page:src/pages/[...lang]/review@_@astro":"pages/_---lang_/review.astro.mjs","\u0000@astro-page:src/pages/[...lang]/strategie@_@astro":"pages/_---lang_/strategie.astro.mjs","\u0000@astro-page:src/pages/[...lang]/[regular]@_@astro":"pages/_---lang_/_regular_.astro.mjs","\u0000@astro-page:src/pages/[...lang]/index@_@astro":"pages/_---lang_.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_Ujy1e1PQ.mjs","/Users/lukasz/Desktop/frfr/public/images/404.svg":"chunks/404_CH8ENddC.mjs","/Users/lukasz/Desktop/frfr/public/images/about/1.png":"chunks/1_BS_Bi2BG.mjs","/Users/lukasz/Desktop/frfr/public/images/about/2.png":"chunks/2_BDyMjIsG.mjs","/Users/lukasz/Desktop/frfr/public/images/about/exp_1.png":"chunks/exp_1_D5EB6kjK.mjs","/Users/lukasz/Desktop/frfr/public/images/about/exp_2.png":"chunks/exp_2_BUq1R0jT.mjs","/Users/lukasz/Desktop/frfr/public/images/about/exp_3.png":"chunks/exp_3_Bn9VTUPO.mjs","/Users/lukasz/Desktop/frfr/public/images/about/value_1.svg":"chunks/value_1_C2WizyYn.mjs","/Users/lukasz/Desktop/frfr/public/images/about/value_2.svg":"chunks/value_2_BnZ6WOJ8.mjs","/Users/lukasz/Desktop/frfr/public/images/about/value_3.svg":"chunks/value_3_Ddz8jbnc.mjs","/Users/lukasz/Desktop/frfr/public/images/avatar/1.png":"chunks/1_BM3fz1T1.mjs","/Users/lukasz/Desktop/frfr/public/images/avatar/2.png":"chunks/2_CTPOv0m8.mjs","/Users/lukasz/Desktop/frfr/public/images/avatar/3.png":"chunks/3_BSDGEYzJ.mjs","/Users/lukasz/Desktop/frfr/public/images/avatar/4.png":"chunks/4_CS0xXCz8.mjs","/Users/lukasz/Desktop/frfr/public/images/avatar/5.png":"chunks/5_DU_sdTCA.mjs","/Users/lukasz/Desktop/frfr/public/images/avatar/6.png":"chunks/6_nDSRvmpc.mjs","/Users/lukasz/Desktop/frfr/public/images/avatar/7.png":"chunks/7_By76WvKm.mjs","/Users/lukasz/Desktop/frfr/public/images/avatar/8.png":"chunks/8_ByLTrYjP.mjs","/Users/lukasz/Desktop/frfr/public/images/avatar/9.png":"chunks/9_CpELE66w.mjs","/Users/lukasz/Desktop/frfr/public/images/blog/1.png":"chunks/1_CERj-Ehn.mjs","/Users/lukasz/Desktop/frfr/public/images/blog/2.png":"chunks/2_CoBzITEr.mjs","/Users/lukasz/Desktop/frfr/public/images/blog/3.png":"chunks/3_DKnEhGi8.mjs","/Users/lukasz/Desktop/frfr/public/images/blog/4.png":"chunks/4_BEwS1huQ.mjs","/Users/lukasz/Desktop/frfr/public/images/blog/5.png":"chunks/5_Bu1lLGYb.mjs","/Users/lukasz/Desktop/frfr/public/images/blog/6.png":"chunks/6_DdrV5-0k.mjs","/Users/lukasz/Desktop/frfr/public/images/blog/7.png":"chunks/7_BQVL-wPf.mjs","/Users/lukasz/Desktop/frfr/public/images/blog/8.png":"chunks/8_B6000_xU.mjs","/Users/lukasz/Desktop/frfr/public/images/blog/9.png":"chunks/9_PSNl29ct.mjs","/Users/lukasz/Desktop/frfr/public/images/card-pattern-1.png":"chunks/card-pattern-1_LJcoSnX4.mjs","/Users/lukasz/Desktop/frfr/public/images/card-pattern-2.png":"chunks/card-pattern-2_Bn2_NbXq.mjs","/Users/lukasz/Desktop/frfr/public/images/deal.svg":"chunks/deal_DCaWOA6z.mjs","/Users/lukasz/Desktop/frfr/public/images/favicon.png":"chunks/favicon_BXDUZooa.mjs","/Users/lukasz/Desktop/frfr/public/images/features/1.png":"chunks/1_DvZyL9ot.mjs","/Users/lukasz/Desktop/frfr/public/images/features/2.png":"chunks/2_BBhOgAFO.mjs","/Users/lukasz/Desktop/frfr/public/images/features/3.png":"chunks/3_CgNKxG0N.mjs","/Users/lukasz/Desktop/frfr/public/images/features/4.png":"chunks/4_ClwzcQeq.mjs","/Users/lukasz/Desktop/frfr/public/images/features/5.png":"chunks/5_C_MiATEm.mjs","/Users/lukasz/Desktop/frfr/public/images/features/6.png":"chunks/6_D4X8DdVO.mjs","/Users/lukasz/Desktop/frfr/public/images/features/7.png":"chunks/7_DGEIH5N5.mjs","/Users/lukasz/Desktop/frfr/public/images/features/arrow.svg":"chunks/arrow_Bs1gAQY8.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/1.png":"chunks/1_JejMFmbb.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/2.png":"chunks/2_DQbasgud.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/3.png":"chunks/3_CWcaO6jy.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/clients/1.svg":"chunks/1_3TqxiVNZ.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/clients/2.svg":"chunks/2_CKgnCSMB.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/clients/3.svg":"chunks/3_hXgKpIqv.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/clients/4.svg":"chunks/4_CkAk0V30.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/clients/5.svg":"chunks/5_ChcG4NP-.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/feature/1.png":"chunks/1_Cj7aYKRd.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/feature/2.png":"chunks/2_BuCY741d.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/feature/3.png":"chunks/3_BRXVVU2R.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/feature/4.png":"chunks/4_CHMbP_ev.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/feature/5.png":"chunks/5_CToWTlf2.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/hero-org.png":"chunks/hero-org_B7Sp4fjR.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/hero.png":"chunks/hero_DEwDvTXW.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/patternBg.png":"chunks/patternBg_CZNvhW_G.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/patternBg.svg":"chunks/patternBg_BvIJjVUy.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/reasons/1.png":"chunks/1_B_RyReKu.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/reasons/2.png":"chunks/2_CTEGocR_.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/reasons/3.png":"chunks/3_CPpjJGEu.mjs","/Users/lukasz/Desktop/frfr/public/images/homepage/video/video-cover.png":"chunks/video-cover_DGWJ21J4.mjs","/Users/lukasz/Desktop/frfr/public/images/image-placeholder.png":"chunks/image-placeholder_BxYAfuX2.mjs","/Users/lukasz/Desktop/frfr/public/images/integration/1.svg":"chunks/1_regtNuV0.mjs","/Users/lukasz/Desktop/frfr/public/images/integration/2.svg":"chunks/2_CVSljgdn.mjs","/Users/lukasz/Desktop/frfr/public/images/integration/3.svg":"chunks/3_BeqC6-Yq.mjs","/Users/lukasz/Desktop/frfr/public/images/integration/4.svg":"chunks/4_DVu9jVEI.mjs","/Users/lukasz/Desktop/frfr/public/images/integration/5.svg":"chunks/5_ZgbtJA7B.mjs","/Users/lukasz/Desktop/frfr/public/images/integration/6.svg":"chunks/6_Dc3e3YEJ.mjs","/Users/lukasz/Desktop/frfr/public/images/integration/7.svg":"chunks/7_Xc5f-UZL.mjs","/Users/lukasz/Desktop/frfr/public/images/integration/8.svg":"chunks/8_Be6k8fHG.mjs","/Users/lukasz/Desktop/frfr/public/images/integration/9.svg":"chunks/9_DkCRGHa-.mjs","/Users/lukasz/Desktop/frfr/public/images/logo.svg":"chunks/logo_C-gNQ0iQ.mjs","/Users/lukasz/Desktop/frfr/public/images/og-image.png":"chunks/og-image_DQ1t-9uW.mjs","/Users/lukasz/Desktop/frfr/public/images/team/1.png":"chunks/1_NlkZLCEW.mjs","/Users/lukasz/Desktop/frfr/public/images/team/2.png":"chunks/2_DAaw23-P.mjs","/Users/lukasz/Desktop/frfr/public/images/team/3.png":"chunks/3_CTlrj_Bm.mjs","/Users/lukasz/Desktop/frfr/public/images/team/4.png":"chunks/4_BfhochB3.mjs","/Users/lukasz/Desktop/frfr/public/images/team/5.png":"chunks/5_BjHOlhnH.mjs","/Users/lukasz/Desktop/frfr/public/images/team/6.png":"chunks/6_5M22Cac2.mjs","/Users/lukasz/Desktop/frfr/public/images/team/7.png":"chunks/7_Dy6CDW93.mjs","/Users/lukasz/Desktop/frfr/public/images/team/8.png":"chunks/8_C-9JD-k_.mjs","/Users/lukasz/Desktop/frfr/public/images/testimonial/10.svg":"chunks/10_BntIZAga.mjs","/Users/lukasz/Desktop/frfr/public/images/testimonial/11.svg":"chunks/11_mVmKXouD.mjs","/Users/lukasz/Desktop/frfr/public/images/testimonial/8.svg":"chunks/8_DMi7jV9m.mjs","/Users/lukasz/Desktop/frfr/public/images/testimonial/9.svg":"chunks/9_BTTsVOst.mjs","/Users/lukasz/Desktop/frfr/src/config/menu.de.json":"_astro/menu.de.1UQT1CDB.js","/Users/lukasz/Desktop/frfr/src/config/menu.en.json":"_astro/menu.en.KkUH-Ukc.js","/Users/lukasz/Desktop/frfr/src/i18n/de.json":"_astro/de.Dd2HVkcq.js","/Users/lukasz/Desktop/frfr/src/i18n/en.json":"_astro/en.8Fa-mfFO.js","/Users/lukasz/Desktop/frfr/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C_9Lu-GI.mjs","/Users/lukasz/Desktop/frfr/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/lukasz/Desktop/frfr/.astro/content-modules.mjs":"chunks/content-modules_5VjL1fAX.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_U0XCMBB-.mjs","/Users/lukasz/Desktop/frfr/src/content/pages/english/elements.mdx?astroPropagatedAssets":"chunks/elements_LftGBvIu.mjs","/Users/lukasz/Desktop/frfr/src/content/pages/german/elements.mdx?astroPropagatedAssets":"chunks/elements_5jNLwr3Q.mjs","/Users/lukasz/Desktop/frfr/src/content/pages/english/elements.mdx":"chunks/elements_BqTRlQal.mjs","/Users/lukasz/Desktop/frfr/src/content/pages/german/elements.mdx":"chunks/elements_BvZWREvs.mjs","@/shortcodes/Tabs":"_astro/Tabs.bq78K_Ri.js","@/shortcodes/Accordion":"_astro/Accordion.7GrVdfgO.js","/Users/lukasz/Desktop/frfr/src/layouts/components/Faq.astro?astro&type=script&index=0&lang.ts":"_astro/Faq.astro_astro_type_script_index_0_lang.D7tSyAtO.js","/Users/lukasz/Desktop/frfr/src/layouts/components/home/Video.astro?astro&type=script&index=0&lang.ts":"_astro/Video.astro_astro_type_script_index_0_lang.z05ie1qf.js","/Users/lukasz/Desktop/frfr/src/layouts/partials/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.CF2WtWys.js","/Users/lukasz/Desktop/frfr/src/layouts/components/home/ReasonSlide.astro?astro&type=script&index=0&lang.ts":"_astro/ReasonSlide.astro_astro_type_script_index_0_lang.CGNC9y7x.js","/Users/lukasz/Desktop/frfr/src/layouts/components/AnnouncementBar.astro?astro&type=script&index=0&lang.ts":"_astro/AnnouncementBar.astro_astro_type_script_index_0_lang.Ri6hBn-7.js","@/shortcodes/Youtube":"_astro/Youtube.CxKNjyWT.js","@/components/pricing/Plan":"_astro/Plan.H1dET0z2.js","/Users/lukasz/Desktop/frfr/src/layouts/components/features/Feature":"_astro/Feature.DnQRf6sa.js","@/helpers/LanguageSwitcher":"_astro/LanguageSwitcher.ChyuWLEq.js","/Users/lukasz/Desktop/frfr/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.Cainpjm5.js","/Users/lukasz/Desktop/frfr/src/layouts/Base.astro?astro&type=script&index=0&lang.ts":"_astro/Base.astro_astro_type_script_index_0_lang.d58Nn7aK.js","@astrojs/react/client.js":"_astro/client.CAEipf92.js","@/helpers/Counter":"_astro/Counter.d4YrpKZg.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/lukasz/Desktop/frfr/src/layouts/components/Faq.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"astro:page-load\",()=>{const t=document.querySelector(\".accordion-container\");document.querySelectorAll(\"[data-accordion]\").forEach(e=>{e.addEventListener(\"click\",()=>{const c=e.parentElement;t?.querySelectorAll(\".accordion\")?.forEach(o=>{o!==c&&o.classList.contains(\"active\")&&o.classList.remove(\"active\")}),c&&c.classList.toggle(\"active\")})})});"],["/Users/lukasz/Desktop/frfr/src/layouts/components/home/Video.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"astro:page-load\",()=>{const e=document.querySelector(\".video-container\"),o=document.querySelector(\".play-button\"),t=document.querySelector(\".video-player\");o?.addEventListener(\"click\",()=>{t.style.display=\"block\",e.style.backgroundImage=\"none\"})});"],["/Users/lukasz/Desktop/frfr/src/layouts/partials/Header.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"theme-toggle\"),n=localStorage.getItem(\"theme\")||\"light\";n===\"dark\"&&(document.documentElement.classList.add(\"dark\"),e.textContent=\"☀️\");e.addEventListener(\"click\",()=>{document.documentElement.classList.toggle(\"dark\");const t=document.documentElement.classList.contains(\"dark\")?\"dark\":\"light\";localStorage.setItem(\"theme\",t),e.textContent=t===\"dark\"?\"☀️\":\"🌙\"});"],["/Users/lukasz/Desktop/frfr/src/layouts/components/home/ReasonSlide.astro?astro&type=script&index=0&lang.ts","function L(){const r=document.querySelectorAll(\"[data-tab-trigger]\"),u=document.querySelectorAll(\"[data-tab-content]\");let c=0;d(),i(),r.forEach(t=>{t.addEventListener(\"click\",()=>{c=Number(t.getAttribute(\"data-tab-trigger\")),d(),i()})});function d(){u.forEach((t,e)=>{const a=t.querySelector(\"div\");e===c?a?.classList.remove(\"opacity-0\",\"pointer-events-none\"):a?.classList.add(\"opacity-0\",\"pointer-events-none\")})}function i(){r.forEach(o=>{const s=o.querySelector(\"[data-card-content]\"),l=o.querySelector(\"[data-title]\"),b=o.querySelector(\"[data-description]\");s?.classList.remove(\"border-green-600\"),s?.classList.add(\"border-border\"),s?.classList.remove(\"bg-light\"),s?.classList.add(\"bg-body\"),l?.classList.add(\"text-text/60\"),l?.classList.remove(\"text-text\"),b?.classList.add(\"text-text/50\"),b?.classList.remove(\"text-text/70\")});const t=document.querySelector(`[data-tab-trigger=\"${c}\"]`),e=t?.querySelector(\"[data-card-content]\"),a=t?.querySelector(\"[data-title]\"),n=t?.querySelector(\"[data-description]\");e?.classList.remove(\"border-border\"),e?.classList.add(\"border-green-600\"),e?.classList.remove(\"bg-body\"),e?.classList.add(\"bg-light\"),a?.classList.remove(\"text-text/60\"),a?.classList.add(\"text-text\"),n?.classList.remove(\"text-text/50\"),n?.classList.add(\"text-text/70\")}}document.addEventListener(\"DOMContentLoaded\",L);"],["/Users/lukasz/Desktop/frfr/src/layouts/components/AnnouncementBar.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"astro:page-load\",()=>{const e=document.querySelector(\".announcement-bar\");document.querySelector(\".announcement-bar button\")?.addEventListener(\"click\",()=>{e?.classList.add(\"hidden\")})});"]],"assets":["/file:///Users/lukasz/Desktop/frfr/dist/404.html"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-other-locales","locales":["de","en"],"defaultLocale":"de","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"W0mZWsRzwMxBn0OPI2CaihTzDJdtRLW2MlWoXb4zLnc="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
