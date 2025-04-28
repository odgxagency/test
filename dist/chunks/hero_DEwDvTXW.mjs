const hero = new Proxy({"src":"/_astro/hero.Db6lu7Q_.png","width":778,"height":555,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/lukasz/Desktop/frfr/public/images/homepage/hero.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("/Users/lukasz/Desktop/frfr/public/images/homepage/hero.png");
							return target[name];
						}
					});

export { hero as default };
