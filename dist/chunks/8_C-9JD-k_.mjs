const _8 = new Proxy({"src":"/_astro/8.CXI-2c7y.png","width":512,"height":341,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/lukasz/Desktop/frfr/public/images/team/8.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/lukasz/Desktop/frfr/public/images/team/8.png");
							return target[name];
						}
					});

export { _8 as default };
