const _5 = new Proxy({"src":"/_astro/5.DQJDZkW-.png","width":145,"height":144,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/lukasz/Desktop/frfr/public/images/avatar/5.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/lukasz/Desktop/frfr/public/images/avatar/5.png");
							return target[name];
						}
					});

export { _5 as default };
