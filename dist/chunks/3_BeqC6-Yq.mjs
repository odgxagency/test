const _3 = new Proxy({"src":"/_astro/3.Bwe7YS2b.svg","width":40,"height":40,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/lukasz/Desktop/frfr/public/images/integration/3.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/lukasz/Desktop/frfr/public/images/integration/3.svg");
							return target[name];
						}
					});

export { _3 as default };
