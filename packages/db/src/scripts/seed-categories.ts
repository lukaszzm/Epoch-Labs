import { db } from "@/db";
import {
	type AgentHints,
	type BreadcrumbItem,
	type CategoryAttribute,
	type CategoryDraft,
	categories,
} from "@/schema";

type SeedNode = Omit<
	CategoryDraft,
	| "parentId"
	| "path"
	| "breadcrumb"
	| "level"
	| "isLeaf"
	| "createdAt"
	| "updatedAt"
> & {
	children?: SeedNode[];
};

function flattenTree(
	nodes: SeedNode[],
	parentId: string | null = null,
	parentPath = "",
	parentBreadcrumb: BreadcrumbItem[] = [],
	level = 0,
): CategoryDraft[] {
	const rows: CategoryDraft[] = [];

	for (const { children, ...node } of nodes) {
		const path = `${parentPath}/${node.slug}`;
		const breadcrumb: BreadcrumbItem[] = [
			...parentBreadcrumb,
			{ id: node.id, name: node.name, slug: node.slug, level },
		];
		const isLeaf = !children?.length;

		rows.push({
			...node,
			parentId: parentId ?? undefined,
			path,
			breadcrumb,
			level,
			isLeaf,
		});

		if (children?.length) {
			rows.push(...flattenTree(children, node.id, path, breadcrumb, level + 1));
		}
	}

	return rows;
}

const ATTR_SKIN_TYPE: CategoryAttribute = {
	key: "skin_type",
	label: "Skin Type",
	type: "multi-enum",
	options: ["all", "normal", "oily", "dry", "combination", "sensitive"],
	filterable: true,
	searchable: true,
	required: true,
	displayOrder: 1,
};

const ATTR_SKIN_CONCERN: CategoryAttribute = {
	key: "skin_concern",
	label: "Skin Concern",
	type: "multi-enum",
	options: [
		"hydration",
		"anti-aging",
		"acne",
		"brightening",
		"pores",
		"redness",
		"firmness",
		"dark-spots",
		"uneven-texture",
	],
	filterable: true,
	searchable: true,
	required: false,
	displayOrder: 2,
};

const ATTR_TEXTURE: CategoryAttribute = {
	key: "texture",
	label: "Texture",
	type: "enum",
	options: [
		"cream",
		"gel",
		"oil",
		"foam",
		"balm",
		"lotion",
		"serum",
		"mist",
		"powder",
		"butter",
	],
	filterable: true,
	searchable: true,
	required: false,
	displayOrder: 3,
};

const ATTR_FRAGRANCE_FREE: CategoryAttribute = {
	key: "fragrance_free",
	label: "Fragrance Free",
	type: "boolean",
	filterable: true,
	searchable: false,
	required: false,
	displayOrder: 5,
};

const ATTR_SIZE_ML: CategoryAttribute = {
	key: "size_ml",
	label: "Size (ml)",
	type: "range",
	unit: "ml",
	filterable: true,
	searchable: false,
	required: true,
	displayOrder: 6,
};

const ATTR_KEY_INGREDIENTS: CategoryAttribute = {
	key: "key_ingredients",
	label: "Key Ingredients",
	type: "text",
	filterable: false,
	searchable: true,
	required: false,
	displayOrder: 7,
};

const ATTR_SPF: CategoryAttribute = {
	key: "spf",
	label: "SPF",
	type: "range",
	unit: "SPF",
	filterable: true,
	searchable: true,
	required: true,
	displayOrder: 2,
};

const ATTR_HAIR_TYPE: CategoryAttribute = {
	key: "hair_type",
	label: "Hair Type",
	type: "multi-enum",
	options: [
		"straight",
		"wavy",
		"curly",
		"coily",
		"fine",
		"thick",
		"colour-treated",
		"damaged",
	],
	filterable: true,
	searchable: true,
	required: true,
	displayOrder: 1,
};

const ATTR_HAIR_CONCERN: CategoryAttribute = {
	key: "hair_concern",
	label: "Hair Concern",
	type: "multi-enum",
	options: [
		"volume",
		"hydration",
		"frizz",
		"dandruff",
		"hair-loss",
		"colour-protection",
		"repair",
		"scalp-care",
	],
	filterable: true,
	searchable: true,
	required: false,
	displayOrder: 2,
};

const ATTR_SULFATE_FREE: CategoryAttribute = {
	key: "sulfate_free",
	label: "Sulfate Free",
	type: "boolean",
	filterable: true,
	searchable: false,
	required: false,
	displayOrder: 3,
};

const BASE_SKIN_ATTRS: CategoryAttribute[] = [
	ATTR_SKIN_TYPE,
	ATTR_SKIN_CONCERN,
	ATTR_TEXTURE,
	ATTR_FRAGRANCE_FREE,
	ATTR_SIZE_ML,
	ATTR_KEY_INGREDIENTS,
];

const TREE: SeedNode[] = [
	{
		id: "cat_skincare",
		name: "Skincare",
		slug: "skincare",
		description:
			"Comprehensive skincare range covering face, body, hair, and sun protection — no colour cosmetics.",
		position: 1,
		tags: ["skincare", "beauty", "cosmetics"],
		agentHints: {
			synonyms: ["skin care", "beauty routine", "cosmetics", "beauty products"],
			intents: [
				"browse all skincare",
				"find a skincare routine",
				"start a skincare regimen",
			],
			complementaryCategories: [],
			typicalUseCases: ["daily routine", "gifting", "travel kit"],
		} satisfies AgentHints,
		attributes: [],

		children: [
			{
				id: "cat_face_care",
				name: "Face Care",
				slug: "face-care",
				description:
					"Complete face care range — from daily cleansing to targeted treatments.",
				position: 1,
				tags: ["face", "facial care"],
				agentHints: {
					synonyms: ["facial care", "face routine", "face products"],
					intents: ["face skincare", "build a face routine"],
					complementaryCategories: ["cat_sun_care"],
					typicalUseCases: [
						"morning routine",
						"evening routine",
						"weekly treatment",
					],
				} satisfies AgentHints,
				attributes: [],

				children: [
					{
						id: "cat_cleansers",
						name: "Cleansers & Face Wash",
						slug: "cleansers-face-wash",
						description:
							"Gentle and deep-cleansing formulas to remove impurities, pollution, and excess sebum without stripping the skin barrier.",
						position: 1,
						tags: ["cleanser", "face wash", "cleansing"],
						seoTitle: "Cleansers & Face Wash | Epoch Labs Skincare",
						seoDescription:
							"Shop gentle and effective face cleansers for every skin type — gel, balm, foam, and micellar water.",
						agentHints: {
							synonyms: [
								"face wash",
								"facial cleanser",
								"foaming cleanser",
								"cleansing gel",
								"cleansing balm",
								"micellar water",
								"oil cleanser",
							],
							intents: [
								"clean my face",
								"remove impurities",
								"morning cleanser",
								"evening cleanser",
								"double cleansing",
							],
							complementaryCategories: ["cat_toners", "cat_moisturisers"],
							targetAudience: [
								"all skin types",
								"oily skin",
								"dry skin",
								"sensitive skin",
							],
							typicalUseCases: [
								"morning routine",
								"evening routine",
								"double cleansing",
							],
							agentConfidenceThreshold: 0.7,
						} satisfies AgentHints,
						attributes: [
							ATTR_SKIN_TYPE,
							ATTR_SKIN_CONCERN,
							{
								key: "cleanser_format",
								label: "Format",
								type: "enum",
								options: [
									"gel",
									"foam",
									"balm",
									"oil",
									"micellar",
									"powder",
									"cream",
									"bar",
								],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 3,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},

					{
						id: "cat_toners",
						name: "Toners & Essences",
						slug: "toners-essences",
						description:
							"Hydrating and balancing toners and essences to prime skin for serums and moisturisers.",
						position: 2,
						tags: ["toner", "essence", "prep"],
						seoTitle: "Toners & Essences | Epoch Labs Skincare",
						seoDescription:
							"Hydrating and exfoliating toners and essences to prep and balance your skin after cleansing.",
						agentHints: {
							synonyms: [
								"facial toner",
								"essence",
								"hydrating toner",
								"exfoliating toner",
								"prep toner",
							],
							intents: [
								"balance skin pH",
								"prep skin",
								"hydrate after cleansing",
								"exfoliating toner",
							],
							complementaryCategories: ["cat_cleansers", "cat_serums_face"],
							excludeTerms: ["printer toner", "hair toner"],
							targetAudience: ["all skin types", "oily skin", "dry skin"],
							typicalUseCases: ["morning routine", "evening routine"],
							agentConfidenceThreshold: 0.75,
						} satisfies AgentHints,
						attributes: [
							ATTR_SKIN_TYPE,
							ATTR_SKIN_CONCERN,
							{
								key: "toner_type",
								label: "Type",
								type: "enum",
								options: [
									"hydrating",
									"exfoliating",
									"balancing",
									"brightening",
									"essence",
								],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 3,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
					{
						id: "cat_serums_face",
						name: "Serums & Concentrates",
						slug: "serums-concentrates",
						description:
							"High-potency targeted treatments for specific concerns — from Vitamin C brightening to retinol anti-ageing.",
						position: 3,
						tags: [
							"serum",
							"treatment",
							"concentrate",
							"vitamin c",
							"retinol",
							"niacinamide",
						],
						seoTitle: "Serums & Concentrates | Epoch Labs Skincare",
						seoDescription:
							"Targeted face serums and concentrates for brightening, anti-ageing, acne, and more.",
						agentHints: {
							synonyms: [
								"face serum",
								"vitamin c serum",
								"retinol serum",
								"niacinamide serum",
								"treatment serum",
								"concentrate",
								"ampoule",
							],
							intents: [
								"treat skin concerns",
								"anti-aging",
								"brightening serum",
								"acne treatment",
								"target dark spots",
							],
							complementaryCategories: [
								"cat_moisturisers",
								"cat_toners",
								"cat_face_spf",
							],
							targetAudience: [
								"all skin types",
								"mature skin",
								"oily skin",
								"acne-prone skin",
							],
							typicalUseCases: [
								"morning routine",
								"evening routine",
								"targeted treatment",
							],
							agentConfidenceThreshold: 0.7,
						} satisfies AgentHints,
						attributes: [
							ATTR_SKIN_TYPE,
							ATTR_SKIN_CONCERN,
							{
								key: "serum_type",
								label: "Active Type",
								type: "enum",
								options: [
									"vitamin-c",
									"retinol",
									"niacinamide",
									"hyaluronic-acid",
									"aha-bha",
									"peptide",
									"growth-factor",
									"other",
								],
								filterable: true,
								searchable: true,
								required: false,
								displayOrder: 3,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
					{
						id: "cat_moisturisers",
						name: "Moisturisers & Creams",
						slug: "moisturisers-creams",
						description:
							"Daily and intensive moisturisers to restore hydration, strengthen the barrier, and smooth skin.",
						position: 4,
						tags: [
							"moisturiser",
							"face cream",
							"day cream",
							"night cream",
							"hydration",
						],
						seoTitle: "Moisturisers & Face Creams | Epoch Labs Skincare",
						seoDescription:
							"Hydrating face creams and moisturisers for every skin type, from lightweight gels to rich night creams.",
						agentHints: {
							synonyms: [
								"face cream",
								"moisturizer",
								"day cream",
								"night cream",
								"face lotion",
								"hydrating cream",
								"barrier cream",
							],
							intents: [
								"moisturise face",
								"hydrate skin",
								"dry skin cream",
								"barrier repair",
								"face lotion",
							],
							complementaryCategories: [
								"cat_serums_face",
								"cat_face_oils",
								"cat_face_spf",
							],
							seasonality: ["winter", "autumn"],
							targetAudience: [
								"all skin types",
								"dry skin",
								"mature skin",
								"sensitive skin",
							],
							typicalUseCases: [
								"morning routine",
								"evening routine",
								"overnight treatment",
							],
							agentConfidenceThreshold: 0.65,
						} satisfies AgentHints,
						attributes: BASE_SKIN_ATTRS,
					},
					{
						id: "cat_face_oils",
						name: "Face Oils",
						slug: "face-oils",
						description:
							"Nourishing botanical and blended oils to seal in moisture and deliver essential fatty acids.",
						position: 5,
						tags: ["face oil", "facial oil", "dry oil", "botanical oil"],
						seoTitle: "Face Oils | Epoch Labs Skincare",
						seoDescription:
							"Nourishing facial oils — rosehip, marula, squalane, and more — for all skin types.",
						agentHints: {
							synonyms: [
								"facial oil",
								"dry oil",
								"rosehip oil",
								"marula oil",
								"jojoba oil",
								"botanical face oil",
								"face serum oil",
							],
							intents: [
								"nourish face",
								"lock in moisture",
								"face oil routine",
								"natural oil for face",
							],
							complementaryCategories: ["cat_moisturisers", "cat_serums_face"],
							seasonality: ["winter", "autumn"],
							targetAudience: ["dry skin", "mature skin", "normal skin"],
							typicalUseCases: [
								"evening routine",
								"overnight treatment",
								"dry skin boost",
							],
							agentConfidenceThreshold: 0.72,
						} satisfies AgentHints,
						attributes: [
							ATTR_SKIN_TYPE,
							ATTR_SKIN_CONCERN,
							{
								key: "oil_type",
								label: "Oil Type",
								type: "enum",
								options: [
									"rosehip",
									"marula",
									"jojoba",
									"squalane",
									"argan",
									"sea-buckthorn",
									"blend",
								],
								filterable: true,
								searchable: true,
								required: false,
								displayOrder: 3,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
					{
						id: "cat_eye_creams",
						name: "Eye Creams",
						slug: "eye-creams",
						description:
							"Delicate formulas targeting dark circles, puffiness, and fine lines around the eye contour.",
						position: 6,
						tags: ["eye cream", "eye care", "dark circles", "puffiness"],
						seoTitle: "Eye Creams | Epoch Labs Skincare",
						seoDescription:
							"Targeted eye creams and gels for dark circles, puffiness, and fine lines.",
						agentHints: {
							synonyms: [
								"eye cream",
								"under eye cream",
								"eye contour cream",
								"eye serum",
								"eye gel",
							],
							intents: [
								"reduce dark circles",
								"reduce puffiness",
								"eye anti-aging",
								"eye area care",
							],
							complementaryCategories: ["cat_serums_face", "cat_moisturisers"],
							targetAudience: ["all skin types", "mature skin", "tired skin"],
							typicalUseCases: ["morning routine", "evening routine"],
							agentConfidenceThreshold: 0.65,
						} satisfies AgentHints,
						attributes: [
							ATTR_SKIN_TYPE,
							{
								key: "eye_concern",
								label: "Eye Concern",
								type: "multi-enum",
								options: [
									"dark-circles",
									"puffiness",
									"fine-lines",
									"firmness",
									"hydration",
								],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 2,
							},
							{
								key: "texture",
								label: "Texture",
								type: "enum",
								options: ["cream", "gel", "serum", "balm", "oil"],
								filterable: true,
								searchable: true,
								required: false,
								displayOrder: 3,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
					{
						id: "cat_face_masks",
						name: "Face Masks",
						slug: "face-masks",
						description:
							"Intensive treatment masks for deep hydration, purifying, brightening, and anti-ageing.",
						position: 7,
						tags: [
							"face mask",
							"sheet mask",
							"clay mask",
							"hydrating mask",
							"sleeping mask",
						],
						seoTitle: "Face Masks | Epoch Labs Skincare",
						seoDescription:
							"Hydrating, purifying, and brightening face masks — sheet, clay, gel, and sleeping masks.",
						agentHints: {
							synonyms: [
								"face mask",
								"sheet mask",
								"clay mask",
								"gel mask",
								"sleeping mask",
								"overnight mask",
								"peel-off mask",
							],
							intents: [
								"weekly face treatment",
								"deep cleanse face",
								"hydrating mask",
								"brightening mask",
							],
							complementaryCategories: ["cat_serums_face", "cat_toners"],
							targetAudience: ["all skin types", "oily skin", "dry skin"],
							typicalUseCases: [
								"weekly treatment",
								"weekend routine",
								"event prep",
							],
							agentConfidenceThreshold: 0.7,
						} satisfies AgentHints,
						attributes: [
							ATTR_SKIN_TYPE,
							ATTR_SKIN_CONCERN,
							{
								key: "mask_type",
								label: "Mask Type",
								type: "enum",
								options: [
									"sheet",
									"clay",
									"gel",
									"cream",
									"peel-off",
									"sleeping",
								],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 3,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
					{
						id: "cat_exfoliants_face",
						name: "Exfoliants & Scrubs",
						slug: "exfoliants-scrubs",
						description:
							"Physical and chemical exfoliants to slough off dead cells and reveal brighter, smoother skin.",
						position: 8,
						tags: [
							"exfoliant",
							"scrub",
							"aha",
							"bha",
							"chemical exfoliant",
							"physical scrub",
						],
						seoTitle: "Face Exfoliants & Scrubs | Epoch Labs Skincare",
						seoDescription:
							"AHA, BHA, enzyme, and physical face exfoliants for brighter, clearer skin.",
						agentHints: {
							synonyms: [
								"face scrub",
								"exfoliating cream",
								"chemical exfoliant",
								"aha serum",
								"bha toner",
								"glycolic acid",
								"lactic acid",
							],
							intents: [
								"exfoliate face",
								"brighten skin",
								"remove dead skin cells",
								"unclog pores",
							],
							complementaryCategories: ["cat_toners", "cat_serums_face"],
							excludeTerms: ["body scrub"],
							targetAudience: ["all skin types", "oily skin", "dull skin"],
							typicalUseCases: ["weekly treatment", "evening routine"],
							agentConfidenceThreshold: 0.72,
						} satisfies AgentHints,
						attributes: [
							ATTR_SKIN_TYPE,
							ATTR_SKIN_CONCERN,
							{
								key: "exfoliant_type",
								label: "Exfoliant Type",
								type: "enum",
								options: [
									"aha",
									"bha",
									"pha",
									"enzyme",
									"physical",
									"combined",
								],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 3,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
				],
			},
			{
				id: "cat_sun_care",
				name: "Sun Care",
				slug: "sun-care",
				description:
					"Broad-spectrum sun protection and after-sun recovery for face and body.",
				position: 2,
				tags: ["spf", "sunscreen", "sun protection", "uv"],
				agentHints: {
					synonyms: [
						"sunscreen",
						"sun protection",
						"SPF products",
						"UV protection",
					],
					intents: ["protect from sun", "find SPF products", "buy sunscreen"],
					complementaryCategories: ["cat_face_care", "cat_body_care"],
					seasonality: ["spring", "summer", "june", "july", "august"],
					typicalUseCases: ["daily protection", "beach", "outdoor activities"],
				} satisfies AgentHints,
				attributes: [],
				children: [
					{
						id: "cat_face_spf",
						name: "Face SPF",
						slug: "face-spf",
						description:
							"Lightweight daily SPF formulas designed for facial skin — non-comedogenic and finish-friendly.",
						position: 1,
						tags: [
							"face spf",
							"facial sunscreen",
							"daily spf",
							"uv protection face",
						],
						seoTitle: "Face Sunscreen & SPF | Epoch Labs Skincare",
						seoDescription:
							"Lightweight SPF moisturisers and sunscreens for daily face protection — mineral, chemical, and tinted.",
						agentHints: {
							synonyms: [
								"facial sunscreen",
								"face sun cream",
								"daily SPF moisturiser",
								"tinted SPF",
								"SPF for face",
								"sun lotion face",
								"sunscreen moisturiser",
							],
							intents: [
								"protect face from sun",
								"daily SPF",
								"SPF moisturiser",
								"non-greasy sunscreen",
							],
							complementaryCategories: [
								"cat_moisturisers",
								"cat_serums_face",
								"cat_after_sun",
							],
							seasonality: ["spring", "summer", "all year"],
							targetAudience: ["all skin types", "oily skin"],
							typicalUseCases: [
								"morning routine",
								"outdoor activities",
								"daily protection",
							],
							agentConfidenceThreshold: 0.65,
						} satisfies AgentHints,
						attributes: [
							ATTR_SKIN_TYPE,
							ATTR_SPF,
							{
								key: "filter_type",
								label: "Filter Type",
								type: "enum",
								options: ["mineral", "chemical", "hybrid"],
								filterable: true,
								searchable: true,
								required: false,
								displayOrder: 3,
							},
							{
								key: "finish",
								label: "Finish",
								type: "enum",
								options: ["matte", "dewy", "natural", "tinted"],
								filterable: true,
								searchable: true,
								required: false,
								displayOrder: 4,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
					{
						id: "cat_body_spf",
						name: "Body SPF",
						slug: "body-spf",
						description:
							"Broad-spectrum sprays, lotions, and creams to shield body skin from UVA and UVB rays.",
						position: 2,
						tags: [
							"body sunscreen",
							"body spf",
							"sunscreen spray",
							"sun lotion",
						],
						seoTitle: "Body Sunscreen & SPF | Epoch Labs Skincare",
						seoDescription:
							"Broad-spectrum body sunscreen — lotions, sprays, and sticks in SPF 30, 50, and 50+.",
						agentHints: {
							synonyms: [
								"body sunscreen",
								"sun lotion",
								"sunscreen spray",
								"beach sunscreen",
								"SPF body lotion",
								"waterproof sunscreen",
							],
							intents: [
								"protect body from sun",
								"beach SPF",
								"waterproof sunscreen",
								"holiday sunscreen",
							],
							complementaryCategories: [
								"cat_after_sun",
								"cat_body_lotions",
								"cat_face_spf",
							],
							seasonality: ["spring", "summer", "june", "july", "august"],
							targetAudience: ["all skin types"],
							typicalUseCases: ["beach", "outdoor activities", "holiday"],
							agentConfidenceThreshold: 0.65,
						} satisfies AgentHints,
						attributes: [
							ATTR_SPF,
							{
								key: "application_format",
								label: "Format",
								type: "enum",
								options: ["lotion", "spray", "cream", "oil", "stick", "gel"],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 2,
							},
							{
								key: "water_resistant",
								label: "Water Resistant",
								type: "boolean",
								filterable: true,
								searchable: false,
								required: false,
								displayOrder: 3,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
						],
					},
					{
						id: "cat_after_sun",
						name: "After-Sun Care",
						slug: "after-sun-care",
						description:
							"Soothing, cooling, and repairing formulas to calm and restore sun-exposed skin.",
						position: 3,
						tags: ["after sun", "soothing", "cooling", "aloe vera", "sunburn"],
						seoTitle: "After-Sun Care | Epoch Labs Skincare",
						seoDescription:
							"Soothing after-sun lotions, gels, and sprays to cool and repair skin after sun exposure.",
						agentHints: {
							synonyms: [
								"after sun lotion",
								"soothing after sun",
								"aloe vera gel",
								"cooling sun care",
								"sunburn relief",
								"after sun gel",
							],
							intents: [
								"soothe sunburn",
								"after sun routine",
								"repair sun-exposed skin",
								"cool skin after sun",
							],
							complementaryCategories: ["cat_face_spf", "cat_body_spf"],
							seasonality: ["summer", "july", "august"],
							targetAudience: ["all skin types", "sensitive skin"],
							typicalUseCases: ["after beach", "after outdoor activities"],
							agentConfidenceThreshold: 0.7,
						} satisfies AgentHints,
						attributes: [
							{
								key: "application_area",
								label: "Application Area",
								type: "enum",
								options: ["face", "body", "face-and-body"],
								filterable: true,
								searchable: false,
								required: true,
								displayOrder: 1,
							},
							ATTR_TEXTURE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
				],
			},
			{
				id: "cat_body_care",
				name: "Body Care",
				slug: "body-care",
				description:
					"Head-to-toe body care — cleansing, moisturising, exfoliating, and treating body skin.",
				position: 3,
				tags: ["body", "body skincare", "body lotion", "body wash"],
				agentHints: {
					synonyms: [
						"body skincare",
						"body beauty",
						"body routine",
						"body moisturiser",
					],
					intents: [
						"body skincare routine",
						"moisturise body",
						"body care products",
					],
					complementaryCategories: ["cat_sun_care"],
					typicalUseCases: ["post-shower routine", "daily moisturising"],
				} satisfies AgentHints,
				attributes: [],
				children: [
					{
						id: "cat_body_lotions",
						name: "Body Lotions & Creams",
						slug: "body-lotions-creams",
						description:
							"Rich and lightweight formulas to deeply hydrate and soften skin from neck to toe.",
						position: 1,
						tags: [
							"body lotion",
							"body cream",
							"body moisturiser",
							"body butter",
						],
						seoTitle: "Body Lotions & Creams | Epoch Labs Skincare",
						seoDescription:
							"Deeply hydrating body lotions, creams, and butters for all skin types.",
						agentHints: {
							synonyms: [
								"body lotion",
								"body moisturiser",
								"body cream",
								"body butter",
								"dry skin body lotion",
							],
							intents: [
								"moisturise body",
								"dry body skin",
								"body hydration",
								"soft skin body",
							],
							complementaryCategories: [
								"cat_body_wash",
								"cat_body_scrubs",
								"cat_body_spf",
							],
							seasonality: ["winter", "autumn"],
							targetAudience: ["dry skin", "all skin types"],
							typicalUseCases: ["post-shower routine", "daily moisturising"],
							agentConfidenceThreshold: 0.65,
						} satisfies AgentHints,
						attributes: [
							{
								key: "skin_type",
								label: "Skin Type",
								type: "multi-enum",
								options: ["all", "normal", "dry", "very-dry", "sensitive"],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 1,
							},
							ATTR_TEXTURE,
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
					{
						id: "cat_body_wash",
						name: "Body Wash & Shower Gel",
						slug: "body-wash-shower-gel",
						description:
							"Luxurious and gentle body washes and shower gels for the daily cleanse.",
						position: 2,
						tags: ["body wash", "shower gel", "shower cream", "bath gel"],
						seoTitle: "Body Wash & Shower Gel | Epoch Labs Skincare",
						seoDescription:
							"Gentle, moisturising body washes and shower gels — sulfate-free options available.",
						agentHints: {
							synonyms: [
								"shower gel",
								"body wash",
								"shower cream",
								"bath gel",
								"soap-free wash",
							],
							intents: [
								"gentle body cleanse",
								"shower routine",
								"moisturising body wash",
							],
							complementaryCategories: ["cat_body_lotions", "cat_body_scrubs"],
							targetAudience: ["all skin types", "sensitive skin"],
							typicalUseCases: ["daily shower", "bath routine"],
							agentConfidenceThreshold: 0.7,
						} satisfies AgentHints,
						attributes: [
							{
								key: "skin_type",
								label: "Skin Type",
								type: "multi-enum",
								options: ["all", "normal", "dry", "sensitive"],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 1,
							},
							{
								key: "wash_format",
								label: "Format",
								type: "enum",
								options: ["gel", "cream", "foam", "oil", "bar"],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 2,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
						],
					},
					{
						id: "cat_body_scrubs",
						name: "Body Scrubs & Exfoliants",
						slug: "body-scrubs-exfoliants",
						description:
							"Physical and chemical exfoliants to buff away dry patches and reveal smooth, radiant skin.",
						position: 3,
						tags: [
							"body scrub",
							"body exfoliant",
							"sugar scrub",
							"salt scrub",
							"coffee scrub",
						],
						seoTitle: "Body Scrubs & Exfoliants | Epoch Labs Skincare",
						seoDescription:
							"Sugar, salt, coffee, and enzyme body scrubs for smoother, glowing skin.",
						agentHints: {
							synonyms: [
								"body scrub",
								"sugar scrub",
								"salt scrub",
								"exfoliating body wash",
								"body polish",
								"coffee scrub",
							],
							intents: [
								"exfoliate body",
								"smooth skin",
								"remove dry patches",
								"pre-tan exfoliant",
							],
							complementaryCategories: ["cat_body_lotions", "cat_body_wash"],
							targetAudience: ["all skin types", "dry skin"],
							typicalUseCases: [
								"weekly treatment",
								"pre-tan prep",
								"self-care day",
							],
							agentConfidenceThreshold: 0.7,
						} satisfies AgentHints,
						attributes: [
							{
								key: "exfoliant_type",
								label: "Exfoliant Type",
								type: "enum",
								options: [
									"sugar",
									"salt",
									"coffee",
									"chemical",
									"charcoal",
									"enzyme",
								],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 1,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
					{
						id: "cat_hand_creams",
						name: "Hand Creams & Treatments",
						slug: "hand-creams-treatments",
						description:
							"Nourishing and protective formulas for dry, cracked, or hard-working hands.",
						position: 4,
						tags: ["hand cream", "hand lotion", "hand treatment", "hand balm"],
						seoTitle: "Hand Creams & Treatments | Epoch Labs Skincare",
						seoDescription:
							"Intensive and everyday hand creams and treatments for soft, smooth hands.",
						agentHints: {
							synonyms: [
								"hand cream",
								"hand lotion",
								"hand salve",
								"hand moisturiser",
								"hand balm",
							],
							intents: [
								"moisturise hands",
								"dry hands",
								"cracked hands",
								"hand care",
							],
							complementaryCategories: ["cat_body_lotions"],
							targetAudience: ["dry skin", "all skin types"],
							typicalUseCases: [
								"throughout the day",
								"overnight treatment",
								"travel kit",
							],
							agentConfidenceThreshold: 0.65,
						} satisfies AgentHints,
						attributes: [
							ATTR_TEXTURE,
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
					{
						id: "cat_foot_care",
						name: "Foot Care",
						slug: "foot-care",
						description:
							"Intensive creams, scrubs, and masks to soften rough heels and keep feet smooth.",
						position: 5,
						tags: [
							"foot cream",
							"foot care",
							"heel balm",
							"foot mask",
							"cracked heels",
						],
						seoTitle: "Foot Care | Epoch Labs Skincare",
						seoDescription:
							"Heel balms, foot creams, scrubs, and masks for soft, smooth feet.",
						agentHints: {
							synonyms: [
								"foot cream",
								"heel balm",
								"foot balm",
								"foot scrub",
								"foot mask",
								"cracked heel cream",
							],
							intents: [
								"soften heels",
								"cracked heels",
								"foot moisturiser",
								"foot treatment",
							],
							complementaryCategories: ["cat_body_lotions"],
							targetAudience: ["dry skin", "all skin types"],
							typicalUseCases: [
								"overnight treatment",
								"weekly treatment",
								"self-care day",
							],
							agentConfidenceThreshold: 0.7,
						} satisfies AgentHints,
						attributes: [
							{
								key: "product_type",
								label: "Product Type",
								type: "enum",
								options: ["cream", "balm", "scrub", "mask", "oil", "spray"],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 1,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
				],
			},
			{
				id: "cat_hair_care",
				name: "Hair Care",
				slug: "hair-care",
				description:
					"Shampoos, conditioners, treatments, and scalp care for all hair types and concerns.",
				position: 4,
				tags: ["hair", "hair care", "shampoo", "conditioner", "scalp"],
				agentHints: {
					synonyms: [
						"hair products",
						"hair routine",
						"haircare",
						"hair washing",
					],
					intents: [
						"hair care routine",
						"find hair products",
						"wash day products",
					],
					complementaryCategories: [],
					typicalUseCases: ["wash day routine", "weekly treatment"],
				} satisfies AgentHints,
				attributes: [],
				children: [
					{
						id: "cat_shampoo",
						name: "Shampoo",
						slug: "shampoo",
						description:
							"Gentle and effective shampoos for all hair types — from volumising to moisturising and scalp-care focused.",
						position: 1,
						tags: ["shampoo", "hair wash", "sulfate-free shampoo"],
						seoTitle: "Shampoo | Epoch Labs Skincare",
						seoDescription:
							"Cleansing shampoos for all hair types — sulfate-free, moisturising, volumising, and dandruff care.",
						agentHints: {
							synonyms: [
								"hair shampoo",
								"cleansing shampoo",
								"moisturising shampoo",
								"sulfate-free shampoo",
								"volumising shampoo",
							],
							intents: [
								"wash hair",
								"cleanse scalp",
								"hydrating shampoo",
								"volumising shampoo",
							],
							complementaryCategories: ["cat_conditioners", "cat_scalp_care"],
							targetAudience: [
								"all hair types",
								"oily hair",
								"dry hair",
								"colour-treated hair",
							],
							typicalUseCases: ["wash day", "daily routine"],
							agentConfidenceThreshold: 0.65,
						} satisfies AgentHints,
						attributes: [
							ATTR_HAIR_TYPE,
							ATTR_HAIR_CONCERN,
							ATTR_SULFATE_FREE,
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
					{
						id: "cat_conditioners",
						name: "Conditioners",
						slug: "conditioners",
						description:
							"Rinse-out, leave-in, and co-wash conditioners to detangle, nourish, and smooth every hair type.",
						position: 2,
						tags: [
							"conditioner",
							"hair conditioner",
							"leave-in conditioner",
							"co-wash",
						],
						seoTitle: "Conditioners | Epoch Labs Skincare",
						seoDescription:
							"Rinse-out, leave-in, and co-wash conditioners for smooth, nourished, frizz-free hair.",
						agentHints: {
							synonyms: [
								"hair conditioner",
								"leave-in conditioner",
								"rinse-out conditioner",
								"deep conditioner",
								"co-wash",
							],
							intents: [
								"condition hair",
								"detangle hair",
								"smooth frizz",
								"nourish hair",
							],
							complementaryCategories: ["cat_shampoo", "cat_hair_masks"],
							targetAudience: [
								"all hair types",
								"dry hair",
								"damaged hair",
								"curly hair",
							],
							typicalUseCases: ["wash day", "daily routine"],
							agentConfidenceThreshold: 0.65,
						} satisfies AgentHints,
						attributes: [
							ATTR_HAIR_TYPE,
							{
								key: "conditioner_type",
								label: "Conditioner Type",
								type: "enum",
								options: ["rinse-out", "leave-in", "co-wash"],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 2,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
					{
						id: "cat_hair_masks",
						name: "Hair Masks & Treatments",
						slug: "hair-masks-treatments",
						description:
							"Intensive weekly masks and treatments for deep repair, hydration, protein restoration, and nourishment.",
						position: 3,
						tags: [
							"hair mask",
							"hair treatment",
							"deep conditioning",
							"protein treatment",
							"bond repair",
						],
						seoTitle: "Hair Masks & Treatments | Epoch Labs Skincare",
						seoDescription:
							"Deep conditioning hair masks and repair treatments for dry, damaged, and colour-treated hair.",
						agentHints: {
							synonyms: [
								"hair mask",
								"deep conditioning treatment",
								"protein treatment",
								"hair repair treatment",
								"bond repair mask",
							],
							intents: [
								"deep condition hair",
								"repair damaged hair",
								"weekly hair treatment",
								"strengthen hair",
							],
							complementaryCategories: ["cat_conditioners", "cat_scalp_care"],
							targetAudience: ["damaged hair", "dry hair", "all hair types"],
							typicalUseCases: ["weekly treatment", "self-care day"],
							agentConfidenceThreshold: 0.7,
						} satisfies AgentHints,
						attributes: [
							ATTR_HAIR_TYPE,
							{
								key: "treatment_focus",
								label: "Treatment Focus",
								type: "multi-enum",
								options: [
									"moisture",
									"protein",
									"repair",
									"scalp",
									"growth",
									"colour-protection",
								],
								filterable: true,
								searchable: true,
								required: false,
								displayOrder: 2,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
					{
						id: "cat_scalp_care",
						name: "Scalp Care",
						slug: "scalp-care",
						description:
							"Targeted scalp treatments, scrubs, and serums for dandruff, dryness, buildup, and hair growth.",
						position: 4,
						tags: [
							"scalp care",
							"scalp serum",
							"scalp treatment",
							"dandruff",
							"hair growth",
						],
						seoTitle: "Scalp Care | Epoch Labs Skincare",
						seoDescription:
							"Scalp serums, scrubs, and treatments for dandruff, dryness, oiliness, and hair growth.",
						agentHints: {
							synonyms: [
								"scalp serum",
								"scalp treatment",
								"scalp scrub",
								"anti-dandruff treatment",
								"hair growth serum",
								"scalp tonic",
							],
							intents: [
								"treat scalp",
								"reduce dandruff",
								"promote hair growth",
								"soothe itchy scalp",
							],
							complementaryCategories: ["cat_shampoo", "cat_hair_masks"],
							targetAudience: [
								"all hair types",
								"oily scalp",
								"dry scalp",
								"dandruff-prone scalp",
							],
							typicalUseCases: ["weekly treatment", "daily scalp routine"],
							agentConfidenceThreshold: 0.72,
						} satisfies AgentHints,
						attributes: [
							{
								key: "scalp_concern",
								label: "Scalp Concern",
								type: "multi-enum",
								options: [
									"dandruff",
									"dryness",
									"oiliness",
									"hair-loss",
									"sensitivity",
									"buildup",
								],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 1,
							},
							{
								key: "product_type",
								label: "Product Type",
								type: "enum",
								options: ["serum", "scrub", "tonic", "mask", "oil", "spray"],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 2,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
							ATTR_KEY_INGREDIENTS,
						],
					},
				],
			},
			{
				id: "cat_mens_skincare",
				name: "Men's Skincare",
				slug: "mens-skincare",
				description:
					"Skincare and grooming products formulated to meet the needs of men's skin.",
				position: 5,
				tags: ["men", "men's skincare", "grooming", "male"],
				agentHints: {
					synonyms: [
						"men's grooming",
						"skincare for men",
						"male skincare",
						"grooming routine",
						"men's face care",
					],
					intents: [
						"men's skincare routine",
						"grooming products for men",
						"skincare for men",
					],
					complementaryCategories: ["cat_face_care", "cat_sun_care"],
					targetAudience: ["men"],
					typicalUseCases: ["daily grooming", "morning routine"],
				} satisfies AgentHints,
				attributes: [],
				children: [
					{
						id: "cat_mens_moisturisers",
						name: "Face Moisturisers",
						slug: "mens-face-moisturisers",
						description:
							"Lightweight and fast-absorbing moisturisers formulated for men's typically thicker, oilier skin.",
						position: 1,
						tags: [
							"men's face cream",
							"men's moisturiser",
							"men's face lotion",
						],
						seoTitle: "Men's Face Moisturisers | Epoch Labs Skincare",
						seoDescription:
							"Fast-absorbing face moisturisers and creams formulated for men — daily, SPF, and post-shave.",
						agentHints: {
							synonyms: [
								"men's face cream",
								"men's moisturizer",
								"moisturiser for men",
								"male face cream",
								"men's face lotion",
							],
							intents: [
								"men moisturise face",
								"face cream for men",
								"daily moisturiser men",
								"post-shave moisturiser",
							],
							complementaryCategories: [
								"cat_shaving_care",
								"cat_moisturisers",
								"cat_face_spf",
							],
							targetAudience: ["men"],
							typicalUseCases: ["morning routine", "post-shave"],
							agentConfidenceThreshold: 0.7,
						} satisfies AgentHints,
						attributes: BASE_SKIN_ATTRS,
					},
					{
						id: "cat_shaving_care",
						name: "Shaving Care",
						slug: "shaving-care",
						description:
							"Pre-shave, shaving, and post-shave products for a comfortable, irritation-free shave.",
						position: 2,
						tags: [
							"shaving",
							"shave gel",
							"aftershave",
							"pre-shave",
							"shaving cream",
						],
						seoTitle: "Shaving Care | Epoch Labs Skincare",
						seoDescription:
							"Pre-shave oils, shaving gels, and aftershave balms for a smooth, irritation-free shave.",
						agentHints: {
							synonyms: [
								"shave gel",
								"shaving cream",
								"aftershave balm",
								"pre-shave oil",
								"razor burn relief",
								"shaving foam",
							],
							intents: [
								"shaving routine",
								"prevent razor burn",
								"aftershave",
								"shaving cream",
							],
							complementaryCategories: ["cat_mens_moisturisers"],
							targetAudience: ["men"],
							typicalUseCases: ["morning shave", "grooming routine"],
							agentConfidenceThreshold: 0.7,
						} satisfies AgentHints,
						attributes: [
							{
								key: "shave_step",
								label: "Shaving Step",
								type: "enum",
								options: ["pre-shave", "shave", "post-shave"],
								filterable: true,
								searchable: true,
								required: true,
								displayOrder: 1,
							},
							{
								key: "product_type",
								label: "Product Type",
								type: "enum",
								options: ["gel", "cream", "foam", "oil", "balm", "lotion"],
								filterable: true,
								searchable: true,
								required: false,
								displayOrder: 2,
							},
							ATTR_FRAGRANCE_FREE,
							ATTR_SIZE_ML,
						],
					},
				],
			},
			{
				id: "cat_lip_care",
				name: "Lip Care",
				slug: "lip-care",
				description:
					"Nourishing lip balms, masks, and treatments — skincare for the lips, no colour cosmetics.",
				position: 6,
				tags: [
					"lip balm",
					"lip care",
					"lip treatment",
					"lip mask",
					"lip butter",
				],
				seoTitle: "Lip Care | Epoch Labs Skincare",
				seoDescription:
					"Hydrating lip balms, overnight lip masks, and nourishing lip treatments for soft, smooth lips.",
				agentHints: {
					synonyms: [
						"lip balm",
						"lip treatment",
						"lip mask",
						"lip butter",
						"lip serum",
						"chapped lips",
					],
					intents: [
						"moisturise lips",
						"treat chapped lips",
						"lip hydration",
						"lip overnight treatment",
					],
					complementaryCategories: ["cat_moisturisers", "cat_face_masks"],
					excludeTerms: [
						"lipstick",
						"lip gloss",
						"lip liner",
						"lip colour",
						"lip tint",
					],
					targetAudience: ["all skin types", "dry lips"],
					typicalUseCases: [
						"daily protection",
						"overnight treatment",
						"travel kit",
					],
					agentConfidenceThreshold: 0.8,
				} satisfies AgentHints,
				attributes: [
					{
						key: "product_type",
						label: "Product Type",
						type: "enum",
						options: ["balm", "mask", "serum", "butter", "oil"],
						filterable: true,
						searchable: true,
						required: true,
						displayOrder: 1,
					},
					ATTR_FRAGRANCE_FREE,
					ATTR_SIZE_ML,
					ATTR_KEY_INGREDIENTS,
				],
			},
			{
				id: "cat_gift_sets",
				name: "Gift Sets",
				slug: "gift-sets",
				description:
					"Curated skincare gift sets and routine bundles — perfect for gifting or trialling new products.",
				position: 7,
				tags: ["gift set", "skincare bundle", "gifting", "kit", "routine set"],
				seoTitle: "Skincare Gift Sets | Epoch Labs Skincare",
				seoDescription:
					"Curated skincare gift sets for every budget and occasion — face, body, hair, and routine bundles.",
				agentHints: {
					synonyms: [
						"skincare gift",
						"beauty gift set",
						"skincare bundle",
						"gift box",
						"skincare kit",
						"routine set",
					],
					intents: [
						"buy skincare gift",
						"gift for someone",
						"skincare bundle",
						"starter kit",
					],
					complementaryCategories: [],
					seasonality: ["december", "february", "may"],
					typicalUseCases: ["gifting", "trying new brand", "travel kit"],
					agentConfidenceThreshold: 0.6,
				} satisfies AgentHints,
				attributes: [
					{
						key: "set_theme",
						label: "Set Theme",
						type: "enum",
						options: [
							"face-routine",
							"body-routine",
							"hair-routine",
							"anti-aging",
							"brightening",
							"hydration",
							"men",
							"starter",
						],
						filterable: true,
						searchable: true,
						required: false,
						displayOrder: 1,
					},
					{
						key: "occasion",
						label: "Occasion",
						type: "multi-enum",
						options: [
							"birthday",
							"christmas",
							"valentines",
							"mothers-day",
							"everyday",
						],
						filterable: true,
						searchable: true,
						required: false,
						displayOrder: 2,
					},
				],
			},
		],
	},
];

export async function seedCategories(): Promise<void> {
	const rows = flattenTree(TREE);

	console.log(`Seeding ${rows.length} categories…`);

	await db.insert(categories).values(rows).onConflictDoNothing();

	console.log("Category seed complete successfully.");
}

seedCategories()
	.then(() => process.exit(0))
	.catch((err: unknown) => {
		console.error("Category seed failed:", err);
		process.exit(1);
	});
