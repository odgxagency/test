const _2 = new Proxy({"src":"/_astro/2.Cf6cLNtJ.png","width":780,"height":600,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/lukasz/Desktop/frfr/public/images/blog/2.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/lukasz/Desktop/frfr/public/images/blog/2.png");
							return target[name];
						}
					});

export { _2 as default };
