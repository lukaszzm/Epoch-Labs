import { db } from "../db";
import { type ProductDraft, type ProductImage, products } from "../schema";

function img(text: string): ProductImage[] {
	return [
		{
			url: `https://placehold.co/600x600?text=${encodeURIComponent(text)}`,
			alt: text,
			isPrimary: true,
			displayOrder: 1,
		},
	];
}

const PRODUCTS: ProductDraft[] = [
	{
		id: "prod_cleanser_001",
		categoryId: "cat_cleansers",
		name: "Purelab Hydrating Gel Cleanser",
		slug: "purelab-hydrating-gel-cleanser",
		brand: "Purelab",
		shortDescription:
			"A soap-free gel cleanser that melts away impurities while maintaining the skin barrier.",
		description:
			"Formulated with niacinamide and ceramides, this gentle gel cleanser is ideal for sensitive and combination skin. Rinses clean without tightness.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Purelab Hydrating Gel Cleanser"),
		tags: ["cleanser", "gel", "fragrance-free", "sensitive skin"],
		attributes: {
			skin_type: ["sensitive", "normal", "combination"],
			skin_concern: ["hydration"],
			cleanser_format: "gel",
			fragrance_free: true,
			size_ml: 150,
			key_ingredients: "Niacinamide, Ceramides, Panthenol",
		},
		lowestPriceInCents: 1495,
		currency: "USD",
		agentSummary:
			"Purelab Hydrating Gel Cleanser is a fragrance-free gel face wash for sensitive and combination skin. Key ingredients: niacinamide, ceramides, panthenol. 150ml. 14.95 USD.",
		seoTitle: "Purelab Hydrating Gel Cleanser 150ml | Epoch Labs",
		seoDescription:
			"Gentle soap-free gel cleanser with ceramides and niacinamide. Perfect for sensitive skin. 150ml.",
	},
	{
		id: "prod_cleanser_002",
		categoryId: "cat_cleansers",
		name: "Verdant Clarifying Foam Wash",
		slug: "verdant-clarifying-foam-wash",
		brand: "Verdant",
		shortDescription:
			"A deep-cleansing foam that removes excess sebum and unclogs pores without over-drying.",
		description:
			"Enriched with salicylic acid and green tea extract, this foam wash is designed for oily and acne-prone skin. Leaves skin feeling clean, balanced, and refreshed.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Verdant Clarifying Foam Wash"),
		tags: ["cleanser", "foam", "oily skin", "acne", "pore care"],
		attributes: {
			skin_type: ["oily", "combination"],
			skin_concern: ["acne", "pores"],
			cleanser_format: "foam",
			fragrance_free: false,
			size_ml: 120,
			key_ingredients: "Salicylic Acid, Green Tea Extract, Zinc PCA",
		},
		lowestPriceInCents: 1295,
		currency: "USD",
		agentSummary:
			"Verdant Clarifying Foam Wash is a foam face wash for oily and combination skin. Key ingredients: salicylic acid, green tea extract, zinc PCA. 120ml. 12.95 USD",
		seoTitle: "Verdant Clarifying Foam Wash 120ml | Epoch Labs",
		seoDescription:
			"Deep-cleansing foam wash with salicylic acid for oily and acne-prone skin. 120ml.",
	},
	{
		id: "prod_toner_001",
		categoryId: "cat_toners",
		name: "Lumière Hydrating Rose Toner",
		slug: "lumiere-hydrating-rose-toner",
		brand: "Lumière",
		shortDescription:
			"A deeply hydrating toner that preps skin to absorb serums and moisturisers more effectively.",
		description:
			"Infused with rose water, hyaluronic acid, and glycerin, this hydrating toner replenishes moisture levels and soothes redness after cleansing.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Lumière Hydrating Rose Toner"),
		tags: ["toner", "hydrating", "rose water", "all skin types"],
		attributes: {
			skin_type: ["all", "dry", "sensitive"],
			skin_concern: ["hydration", "redness"],
			toner_type: "hydrating",
			fragrance_free: false,
			size_ml: 200,
			key_ingredients: "Rose Water, Hyaluronic Acid, Glycerin",
		},
		lowestPriceInCents: 1695,
		currency: "USD",
		agentSummary:
			"Lumière Hydrating Rose Toner is a hydrating toner for dry and sensitive skin. Key ingredients: rose water, hyaluronic acid, glycerin. 200ml. 16.95 USD.",
		seoTitle: "Lumière Hydrating Rose Toner 200ml | Epoch Labs",
		seoDescription:
			"Hydrating toner with rose water and hyaluronic acid to prep and balance skin after cleansing.",
	},
	{
		id: "prod_toner_002",
		categoryId: "cat_toners",
		name: "Purelab AHA Glow Toner",
		slug: "purelab-aha-glow-toner",
		brand: "Purelab",
		shortDescription:
			"A gentle AHA exfoliating toner that resurfaces skin and boosts radiance with continued use.",
		description:
			"Formulated with glycolic acid and lactic acid, this exfoliating toner dissolves dead skin cells, minimises the appearance of pores, and evens skin tone over time.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Purelab AHA Glow Toner"),
		tags: ["toner", "exfoliating", "aha", "glycolic acid", "brightening"],
		attributes: {
			skin_type: ["normal", "oily", "combination"],
			skin_concern: ["brightening", "uneven-texture", "pores"],
			toner_type: "exfoliating",
			fragrance_free: true,
			size_ml: 150,
			key_ingredients: "Glycolic Acid 5%, Lactic Acid, Aloe Vera",
		},
		lowestPriceInCents: 1895,
		currency: "USD",
		agentSummary:
			"Purelab AHA Glow Toner is a fragrance-free exfoliating toner for normal and oily skin. Key ingredients: glycolic acid, lactic acid, aloe vera. 150ml. 18.95 USD.",
		seoTitle: "Purelab AHA Glow Toner 150ml | Epoch Labs",
		seoDescription:
			"Gentle AHA exfoliating toner with glycolic acid for brighter, smoother skin. 150ml.",
	},
	{
		id: "prod_serum_001",
		categoryId: "cat_serums_face",
		name: "Verdant Vitamin C Brightening Serum",
		slug: "verdant-vitamin-c-brightening-serum",
		brand: "Verdant",
		shortDescription:
			"A potent Vitamin C serum that visibly fades dark spots and boosts skin radiance.",
		description:
			"Powered by 15% stable Vitamin C (ascorbyl glucoside), ferulic acid, and Vitamin E, this serum protects against oxidative stress and evens skin tone with daily use.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Verdant Vitamin C Brightening Serum"),
		tags: ["serum", "vitamin c", "brightening", "antioxidant", "dark spots"],
		attributes: {
			skin_type: ["all", "normal", "dry", "combination"],
			skin_concern: ["brightening", "dark-spots", "anti-aging"],
			serum_type: "vitamin-c",
			fragrance_free: true,
			size_ml: 30,
			key_ingredients: "Vitamin C 15%, Ferulic Acid, Vitamin E",
		},
		lowestPriceInCents: 3495,
		currency: "USD",
		agentSummary:
			"Verdant Vitamin C Brightening Serum is a fragrance-free antioxidant serum for all skin types. Key ingredients: vitamin C 15%, ferulic acid, vitamin E. 30ml. 34.95 USD.",
		seoTitle: "Verdant Vitamin C Brightening Serum 30ml | Epoch Labs",
		seoDescription:
			"Potent 15% Vitamin C serum with ferulic acid to fade dark spots and boost radiance.",
	},
	{
		id: "prod_serum_002",
		categoryId: "cat_serums_face",
		name: "Lumière Hyaluronic Acid Plumping Serum",
		slug: "lumiere-hyaluronic-acid-plumping-serum",
		brand: "Lumière",
		shortDescription:
			"A multi-weight hyaluronic acid serum that delivers intense hydration to all skin layers.",
		description:
			"Combining low-, medium-, and high-molecular-weight hyaluronic acid with pro-vitamin B5, this serum plumps fine lines and leaves skin visibly smoother and more supple.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Lumière Hyaluronic Acid Plumping Serum"),
		tags: ["serum", "hyaluronic acid", "hydration", "plumping"],
		attributes: {
			skin_type: ["all", "dry", "sensitive"],
			skin_concern: ["hydration", "anti-aging"],
			serum_type: "hyaluronic-acid",
			fragrance_free: true,
			size_ml: 30,
			key_ingredients: "3-weight Hyaluronic Acid, Pro-Vitamin B5, Allantoin",
		},
		lowestPriceInCents: 2895,
		currency: "USD",
		agentSummary:
			"Lumière Hyaluronic Acid Plumping Serum is a fragrance-free hydrating serum for all skin types. Key ingredients: 3-weight hyaluronic acid, pro-vitamin B5, allantoin. 30ml. 28.95 USD.",
		seoTitle: "Lumière Hyaluronic Acid Plumping Serum 30ml | Epoch Labs",
		seoDescription:
			"Multi-weight hyaluronic acid serum for intense hydration and visible plumping. 30ml.",
	},
	{
		id: "prod_moisturiser_001",
		categoryId: "cat_moisturisers",
		name: "Purelab Barrier Repair Day Cream",
		slug: "purelab-barrier-repair-day-cream",
		brand: "Purelab",
		shortDescription:
			"A rich, nourishing day cream that rebuilds the skin barrier and locks in moisture all day.",
		description:
			"Formulated with ceramides, shea butter, and squalane, this cream is ideal for dry and sensitive skin types. Absorbs well and leaves a comfortable, non-greasy finish.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Purelab Barrier Repair Day Cream"),
		tags: ["moisturiser", "day cream", "ceramides", "dry skin", "barrier"],
		attributes: {
			skin_type: ["dry", "sensitive", "normal"],
			skin_concern: ["hydration", "redness"],
			texture: "cream",
			fragrance_free: true,
			size_ml: 50,
			key_ingredients: "Ceramides, Shea Butter, Squalane",
		},
		lowestPriceInCents: 2295,
		currency: "USD",
		agentSummary:
			"Purelab Barrier Repair Day Cream is a fragrance-free cream moisturiser for dry and sensitive skin. Key ingredients: ceramides, shea butter, squalane. 50ml. 22.95 USD.",
		seoTitle: "Purelab Barrier Repair Day Cream 50ml | Epoch Labs",
		seoDescription:
			"Rich ceramide day cream for dry and sensitive skin. Rebuilds the skin barrier. 50ml.",
	},
	{
		id: "prod_moisturiser_002",
		categoryId: "cat_moisturisers",
		name: "Verdant Matte Control Gel Moisturiser",
		slug: "verdant-matte-control-gel-moisturiser",
		brand: "Verdant",
		shortDescription:
			"A lightweight gel moisturiser that hydrates without shine — perfect for oily skin.",
		description:
			"Infused with niacinamide, zinc, and sodium hyaluronate, this oil-free gel moisturiser mattifies, minimises pores, and keeps oily skin balanced throughout the day.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Verdant Matte Control Gel Moisturiser"),
		tags: ["moisturiser", "gel", "oil-free", "matte", "oily skin"],
		attributes: {
			skin_type: ["oily", "combination"],
			skin_concern: ["pores", "acne"],
			texture: "gel",
			fragrance_free: true,
			size_ml: 50,
			key_ingredients: "Niacinamide 5%, Zinc PCA, Sodium Hyaluronate",
		},
		lowestPriceInCents: 1995,
		currency: "USD",
		agentSummary:
			"Verdant Matte Control Gel Moisturiser is a fragrance-free oil-free gel for oily and combination skin. Key ingredients: niacinamide 5%, zinc PCA, sodium hyaluronate. 50ml. 19.95 USD.",
		seoTitle: "Verdant Matte Control Gel Moisturiser 50ml | Epoch Labs",
		seoDescription:
			"Lightweight oil-free gel moisturiser with niacinamide for oily and combination skin. 50ml.",
	},
	{
		id: "prod_face_oil_001",
		categoryId: "cat_face_oils",
		name: "Lumière Rosehip Regenerating Oil",
		slug: "lumiere-rosehip-regenerating-oil",
		brand: "Lumière",
		shortDescription:
			"A 100% pure rosehip oil rich in omega fatty acids to brighten and regenerate skin overnight.",
		description:
			"Cold-pressed from Chilean rosehip seeds, this regenerating oil delivers high concentrations of omega-3, omega-6, and naturally occurring retinoids to visibly improve skin texture and tone.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Lumière Rosehip Regenerating Oil"),
		tags: ["face oil", "rosehip", "brightening", "anti-aging", "natural"],
		attributes: {
			skin_type: ["dry", "normal", "sensitive"],
			skin_concern: ["anti-aging", "brightening", "dark-spots"],
			oil_type: "rosehip",
			fragrance_free: true,
			size_ml: 30,
			key_ingredients: "Cold-Pressed Rosehip Seed Oil, Vitamin E",
		},
		lowestPriceInCents: 2695,
		currency: "USD",
		agentSummary:
			"Lumière Rosehip Regenerating Oil is a fragrance-free rosehip face oil for dry and normal skin. Key ingredients: cold-pressed rosehip seed oil, vitamin E. 30ml. 26.95 USD.",
		seoTitle: "Lumière Rosehip Regenerating Oil 30ml | Epoch Labs",
		seoDescription:
			"100% pure cold-pressed rosehip oil to brighten and regenerate skin. 30ml.",
	},
	{
		id: "prod_face_oil_002",
		categoryId: "cat_face_oils",
		name: "Purelab Squalane Balancing Oil",
		slug: "purelab-squalane-balancing-oil",
		brand: "Purelab",
		shortDescription:
			"A featherlight squalane oil that mimics the skin's natural sebum for perfect balance.",
		description:
			"Derived from sugarcane, this 100% plant-based squalane oil is non-comedogenic and suitable for all skin types including oily. It absorbs instantly, leaving skin soft and nourished without greasiness.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Purelab Squalane Balancing Oil"),
		tags: ["face oil", "squalane", "lightweight", "non-comedogenic"],
		attributes: {
			skin_type: ["all", "oily", "combination"],
			skin_concern: ["hydration"],
			oil_type: "squalane",
			fragrance_free: true,
			size_ml: 30,
			key_ingredients: "100% Plant-Derived Squalane",
		},
		lowestPriceInCents: 1895,
		currency: "USD",
		agentSummary:
			"Purelab Squalane Balancing Oil is a fragrance-free lightweight face oil for all skin types. Key ingredient: plant-derived squalane. 30ml. 18.95 USD.",
		seoTitle: "Purelab Squalane Balancing Oil 30ml | Epoch Labs",
		seoDescription:
			"Non-comedogenic plant-derived squalane oil for balanced, soft skin. Suitable for all skin types. 30ml.",
	},
	{
		id: "prod_eye_cream_001",
		categoryId: "cat_eye_creams",
		name: "Verdant Brightening Eye Cream",
		slug: "verdant-brightening-eye-cream",
		brand: "Verdant",
		shortDescription:
			"A targeted eye cream that visibly reduces dark circles and brightens the under-eye area.",
		description:
			"Formulated with Vitamin C, caffeine, and kojic acid, this rich eye cream diminishes discolouration and firms delicate skin around the eye contour over time.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Verdant Brightening Eye Cream"),
		tags: ["eye cream", "dark circles", "brightening", "vitamin c"],
		attributes: {
			skin_type: ["all", "normal", "dry"],
			eye_concern: ["dark-circles", "hydration"],
			texture: "cream",
			fragrance_free: true,
			size_ml: 15,
			key_ingredients: "Vitamin C, Caffeine, Kojic Acid",
		},
		lowestPriceInCents: 2895,
		currency: "USD",
		agentSummary:
			"Verdant Brightening Eye Cream is a fragrance-free cream for dark circles around the eye. Key ingredients: vitamin C, caffeine, kojic acid. 15ml. 28.95 USD.",
		seoTitle: "Verdant Brightening Eye Cream 15ml | Epoch Labs",
		seoDescription:
			"Targeted eye cream with vitamin C and caffeine to reduce dark circles. 15ml.",
	},
	{
		id: "prod_eye_cream_002",
		categoryId: "cat_eye_creams",
		name: "Lumière De-Puff Eye Gel",
		slug: "lumiere-de-puff-eye-gel",
		brand: "Lumière",
		shortDescription:
			"A cooling eye gel that instantly de-puffs and soothes tired eyes.",
		description:
			"This lightweight gel combines hyaluronic acid, cucumber extract, and peptides to reduce morning puffiness and hydrate the under-eye area, leaving a visibly refreshed look.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Lumière De-Puff Eye Gel"),
		tags: ["eye gel", "puffiness", "cooling", "peptides"],
		attributes: {
			skin_type: ["all", "oily", "sensitive"],
			eye_concern: ["puffiness", "fine-lines", "hydration"],
			texture: "gel",
			fragrance_free: true,
			size_ml: 15,
			key_ingredients: "Hyaluronic Acid, Cucumber Extract, Tetrapeptide-5",
		},
		lowestPriceInCents: 2495,
		currency: "USD",
		agentSummary:
			"Lumière De-Puff Eye Gel is a fragrance-free eye gel to reduce puffiness and fine lines. Key ingredients: hyaluronic acid, cucumber extract, tetrapeptide-5. 15ml. 24.95 USD.",
		seoTitle: "Lumière De-Puff Eye Gel 15ml | Epoch Labs",
		seoDescription:
			"Cooling eye gel with peptides and cucumber to de-puff and refresh tired eyes. 15ml.",
	},
	{
		id: "prod_face_mask_001",
		categoryId: "cat_face_masks",
		name: "Purelab Hydra-Boost Sheet Mask",
		slug: "purelab-hydra-boost-sheet-mask",
		brand: "Purelab",
		shortDescription:
			"An intensely hydrating sheet mask that delivers a concentrated dose of moisture in 20 minutes.",
		description:
			"This bio-cellulose sheet mask is soaked in a serum-level essence of hyaluronic acid, aloe vera, and beta-glucan. Skin feels plump, soothed, and radiant immediately after use.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Purelab Hydra-Boost Sheet Mask"),
		tags: ["face mask", "sheet mask", "hydrating", "bio-cellulose"],
		attributes: {
			skin_type: ["all", "dry", "sensitive"],
			skin_concern: ["hydration", "redness"],
			mask_type: "sheet",
			fragrance_free: true,
			size_ml: 25,
			key_ingredients: "Hyaluronic Acid, Aloe Vera, Beta-Glucan",
		},
		lowestPriceInCents: 595,
		currency: "USD",
		agentSummary:
			"Purelab Hydra-Boost Sheet Mask is a fragrance-free bio-cellulose sheet mask for all skin types. Key ingredients: hyaluronic acid, aloe vera, beta-glucan. 25ml. 5.95 USD.",
		seoTitle: "Purelab Hydra-Boost Sheet Mask | Epoch Labs",
		seoDescription:
			"Bio-cellulose sheet mask with hyaluronic acid for intense hydration in 20 minutes.",
	},
	{
		id: "prod_face_mask_002",
		categoryId: "cat_face_masks",
		name: "Verdant Purifying Clay Mask",
		slug: "verdant-purifying-clay-mask",
		brand: "Verdant",
		shortDescription:
			"A deep-cleansing clay mask that draws out impurities and minimises the appearance of pores.",
		description:
			"Combining kaolin and bentonite clays with activated charcoal and tea tree extract, this weekly mask clears congestion, absorbs excess oil, and refines skin texture.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Verdant Purifying Clay Mask"),
		tags: ["face mask", "clay mask", "purifying", "pores", "oily skin"],
		attributes: {
			skin_type: ["oily", "combination", "normal"],
			skin_concern: ["pores", "acne"],
			mask_type: "clay",
			fragrance_free: false,
			size_ml: 75,
			key_ingredients: "Kaolin, Bentonite Clay, Activated Charcoal, Tea Tree",
		},
		lowestPriceInCents: 1695,
		currency: "USD",
		agentSummary:
			"Verdant Purifying Clay Mask is a clay mask for oily and combination skin. Key ingredients: kaolin, bentonite clay, activated charcoal. 75ml. 16.95 USD.",
		seoTitle: "Verdant Purifying Clay Mask 75ml | Epoch Labs",
		seoDescription:
			"Deep-cleansing clay mask with charcoal to purify pores and control oil. 75ml.",
	},
	{
		id: "prod_exfoliant_001",
		categoryId: "cat_exfoliants_face",
		name: "Lumière Glycolic Acid Resurfacing Peel",
		slug: "lumiere-glycolic-acid-resurfacing-peel",
		brand: "Lumière",
		shortDescription:
			"A leave-on AHA peel that resurfaces and brightens skin while you sleep.",
		description:
			"Formulated with 10% glycolic acid and lactic acid, this nightly resurfacing treatment accelerates cell turnover, smooths texture, and fades hyperpigmentation over time.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Lumière Glycolic Acid Resurfacing Peel"),
		tags: ["exfoliant", "aha", "glycolic acid", "resurfacing", "brightening"],
		attributes: {
			skin_type: ["normal", "dry", "combination"],
			skin_concern: ["uneven-texture", "brightening", "dark-spots"],
			exfoliant_type: "aha",
			fragrance_free: true,
			size_ml: 30,
			key_ingredients: "Glycolic Acid 10%, Lactic Acid, Aloe Vera",
		},
		lowestPriceInCents: 2295,
		currency: "USD",
		agentSummary:
			"Lumière Glycolic Acid Resurfacing Peel is a fragrance-free AHA treatment for normal and combination skin. Key ingredients: glycolic acid 10%, lactic acid. 30ml. 22.95 USD.",
		seoTitle: "Lumière Glycolic Acid Resurfacing Peel 30ml | Epoch Labs",
		seoDescription:
			"Leave-on 10% glycolic acid peel to resurface, brighten, and smooth skin texture. 30ml.",
	},
	{
		id: "prod_exfoliant_002",
		categoryId: "cat_exfoliants_face",
		name: "Purelab BHA Pore Refining Serum",
		slug: "purelab-bha-pore-refining-serum",
		brand: "Purelab",
		shortDescription:
			"A 2% salicylic acid serum that unclogs pores and reduces blemishes without irritation.",
		description:
			"With oil-soluble salicylic acid penetrating deep into pores, this BHA serum breaks down sebum and dead skin cells to visibly reduce blackheads, blemishes, and enlarged pores.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Purelab BHA Pore Refining Serum"),
		tags: ["exfoliant", "bha", "salicylic acid", "pores", "acne"],
		attributes: {
			skin_type: ["oily", "combination"],
			skin_concern: ["acne", "pores"],
			exfoliant_type: "bha",
			fragrance_free: true,
			size_ml: 30,
			key_ingredients: "Salicylic Acid 2%, Niacinamide, Witch Hazel",
		},
		lowestPriceInCents: 1995,
		currency: "USD",
		agentSummary:
			"Purelab BHA Pore Refining Serum is a fragrance-free salicylic acid serum for oily skin. Key ingredients: salicylic acid 2%, niacinamide, witch hazel. 30ml. 19.95 USD.",
		seoTitle: "Purelab BHA Pore Refining Serum 30ml | Epoch Labs",
		seoDescription:
			"2% salicylic acid serum to unclog pores, reduce blackheads and blemishes. 30ml.",
	},
	{
		id: "prod_face_spf_001",
		categoryId: "cat_face_spf",
		name: "Verdant Invisible SPF 50 Fluid",
		slug: "verdant-invisible-spf-50-fluid",
		brand: "Verdant",
		shortDescription:
			"An ultra-lightweight SPF 50 fluid with a matte finish — no white cast, no greasiness.",
		description:
			"Combining mineral zinc oxide with a hybrid filter system, this daily facial SPF provides broad-spectrum UVA/UVB protection while leaving a fresh, matte finish suitable for all skin tones.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Verdant Invisible SPF 50 Fluid"),
		tags: ["spf", "sunscreen", "spf50", "matte", "daily spf"],
		attributes: {
			skin_type: ["all", "oily", "combination"],
			spf: 50,
			filter_type: "hybrid",
			finish: "matte",
			fragrance_free: true,
			size_ml: 50,
			key_ingredients: "Zinc Oxide, Tinosorb S, Niacinamide",
		},
		lowestPriceInCents: 2695,
		currency: "USD",
		agentSummary:
			"Verdant Invisible SPF 50 Fluid is a fragrance-free hybrid SPF for all skin types with a matte finish. Key ingredients: zinc oxide, tinosorb S, niacinamide. 50ml. 26.95 USD.",
		seoTitle: "Verdant Invisible SPF 50 Fluid 50ml | Epoch Labs",
		seoDescription:
			"Lightweight SPF 50 face fluid with matte finish — no white cast. Hybrid UV filters. 50ml.",
	},
	{
		id: "prod_face_spf_002",
		categoryId: "cat_face_spf",
		name: "Lumière Tinted SPF 30 Moisturiser",
		slug: "lumiere-tinted-spf-30-moisturiser",
		brand: "Lumière",
		shortDescription:
			"A tinted SPF 30 moisturiser that evens skin tone while protecting against UV damage.",
		description:
			"This 2-in-1 tinted moisturiser with SPF 30 combines broad-spectrum chemical UV filters with hyaluronic acid and iron oxides for a natural, dewy coverage that suits a wide range of skin tones.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Lumière Tinted SPF 30 Moisturiser"),
		tags: ["spf", "tinted spf", "moisturiser", "spf30", "dewy"],
		attributes: {
			skin_type: ["all", "normal", "dry"],
			spf: 30,
			filter_type: "chemical",
			finish: "tinted",
			fragrance_free: false,
			size_ml: 50,
			key_ingredients: "Avobenzone, Octinoxate, Hyaluronic Acid, Iron Oxides",
		},
		lowestPriceInCents: 2295,
		currency: "USD",
		agentSummary:
			"Lumière Tinted SPF 30 Moisturiser provides broad-spectrum protection with a dewy tinted finish for all skin types. 50ml. 22.95 USD.",
		seoTitle: "Lumière Tinted SPF 30 Moisturiser 50ml | Epoch Labs",
		seoDescription:
			"Tinted SPF 30 moisturiser with hyaluronic acid for natural coverage and UV protection. 50ml.",
	},
	{
		id: "prod_body_spf_001",
		categoryId: "cat_body_spf",
		name: "Purelab SPF 50 Body Lotion",
		slug: "purelab-spf-50-body-lotion",
		brand: "Purelab",
		shortDescription:
			"A rich SPF 50 body lotion that protects and moisturises in one step.",
		description:
			"Enriched with broad-spectrum UVA/UVB filters and aloe vera, this water-resistant body lotion provides reliable sun protection while keeping skin hydrated throughout the day.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Purelab SPF 50 Body Lotion"),
		tags: ["body spf", "spf50", "body lotion", "water resistant"],
		attributes: {
			spf: 50,
			application_format: "lotion",
			water_resistant: true,
			fragrance_free: false,
			size_ml: 200,
		},
		lowestPriceInCents: 1895,
		currency: "USD",
		agentSummary:
			"Purelab SPF 50 Body Lotion is a water-resistant lotion for broad-spectrum body sun protection. 200ml. 18.95 USD.",
		seoTitle: "Purelab SPF 50 Body Lotion 200ml | Epoch Labs",
		seoDescription:
			"Water-resistant SPF 50 body lotion for daily and beach sun protection. 200ml.",
	},
	{
		id: "prod_body_spf_002",
		categoryId: "cat_body_spf",
		name: "Verdant SPF 30 Beach Spray",
		slug: "verdant-spf-30-beach-spray",
		brand: "Verdant",
		shortDescription:
			"A quick-dry SPF 30 spray for effortless full-body sun protection on the go.",
		description:
			"This lightweight, quick-drying spray formula makes reapplication easy at the beach or outdoors. Broad-spectrum SPF 30 with water resistance for up to 80 minutes.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Verdant SPF 30 Beach Spray"),
		tags: ["body spf", "spf30", "spray", "beach", "water resistant"],
		attributes: {
			spf: 30,
			application_format: "spray",
			water_resistant: true,
			fragrance_free: false,
			size_ml: 200,
		},
		lowestPriceInCents: 1595,
		currency: "USD",
		agentSummary:
			"Verdant SPF 30 Beach Spray is a water-resistant spray sunscreen for body protection. 200ml. 15.95 USD.",
		seoTitle: "Verdant SPF 30 Beach Spray 200ml | Epoch Labs",
		seoDescription:
			"Quick-dry SPF 30 spray sunscreen — ideal for beach and outdoor activities. 200ml.",
	},
	{
		id: "prod_after_sun_001",
		categoryId: "cat_after_sun",
		name: "Lumière Cooling Aloe Vera Gel",
		slug: "lumiere-cooling-aloe-vera-gel",
		brand: "Lumière",
		shortDescription:
			"An instantly cooling 99% aloe vera gel to soothe and calm sun-exposed skin.",
		description:
			"Formulated with pure aloe vera and menthol, this gel absorbs rapidly to reduce heat, redness, and discomfort after sun exposure. Suitable for face and body.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Lumière Cooling Aloe Vera Gel"),
		tags: ["after sun", "aloe vera", "cooling", "soothing", "sunburn"],
		attributes: {
			application_area: "face-and-body",
			texture: "gel",
			size_ml: 200,
			key_ingredients: "Aloe Vera 99%, Menthol, Allantoin",
		},
		lowestPriceInCents: 1095,
		currency: "USD",
		agentSummary:
			"Lumière Cooling Aloe Vera Gel soothes and cools sun-exposed face and body skin. Key ingredients: aloe vera 99%, menthol. 200ml. 10.95 USD.",
		seoTitle: "Lumière Cooling Aloe Vera Gel 200ml | Epoch Labs",
		seoDescription:
			"99% aloe vera cooling gel for face and body after sun exposure. 200ml.",
	},
	{
		id: "prod_after_sun_002",
		categoryId: "cat_after_sun",
		name: "Purelab Soothing After-Sun Body Lotion",
		slug: "purelab-soothing-after-sun-body-lotion",
		brand: "Purelab",
		shortDescription:
			"A replenishing after-sun lotion that restores moisture and prevents skin peeling.",
		description:
			"Enriched with hyaluronic acid, vitamin E, and coconut oil, this after-sun lotion calms inflammation and deeply hydrates skin to extend your tan and prevent peeling.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Purelab Soothing After-Sun Body Lotion"),
		tags: ["after sun", "body lotion", "soothing", "moisturising"],
		attributes: {
			application_area: "body",
			texture: "lotion",
			size_ml: 250,
			key_ingredients: "Hyaluronic Acid, Vitamin E, Coconut Oil, Aloe Vera",
		},
		lowestPriceInCents: 1295,
		currency: "USD",
		agentSummary:
			"Purelab Soothing After-Sun Body Lotion restores moisture and calms skin after sun. Key ingredients: hyaluronic acid, vitamin E, coconut oil. 250ml. 12.95 USD.",
		seoTitle: "Purelab Soothing After-Sun Body Lotion 250ml | Epoch Labs",
		seoDescription:
			"Replenishing after-sun lotion with hyaluronic acid to hydrate and prevent peeling. 250ml.",
	},
	{
		id: "prod_body_lotion_001",
		categoryId: "cat_body_lotions",
		name: "Verdant Deep Moisture Body Cream",
		slug: "verdant-deep-moisture-body-cream",
		brand: "Verdant",
		shortDescription:
			"A luxuriously rich body cream that intensely hydrates dry skin for up to 48 hours.",
		description:
			"Packed with shea butter, cocoa butter, and ceramides, this thick body cream provides lasting hydration for very dry skin. Absorbs without greasiness, leaving skin silky smooth.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Verdant Deep Moisture Body Cream"),
		tags: ["body cream", "dry skin", "shea butter", "intensive hydration"],
		attributes: {
			skin_type: ["dry", "very-dry"],
			texture: "cream",
			fragrance_free: false,
			size_ml: 300,
			key_ingredients: "Shea Butter, Cocoa Butter, Ceramides",
		},
		lowestPriceInCents: 1695,
		currency: "USD",
		agentSummary:
			"Verdant Deep Moisture Body Cream is a rich body cream for dry and very dry skin. Key ingredients: shea butter, cocoa butter, ceramides. 300ml. 16.95 USD.",
		seoTitle: "Verdant Deep Moisture Body Cream 300ml | Epoch Labs",
		seoDescription:
			"Intensive body cream with shea butter and ceramides for 48-hour hydration. 300ml.",
	},
	{
		id: "prod_body_lotion_002",
		categoryId: "cat_body_lotions",
		name: "Lumière Everyday Body Lotion",
		slug: "lumiere-everyday-body-lotion",
		brand: "Lumière",
		shortDescription:
			"A lightweight daily body lotion that absorbs quickly and leaves skin soft all day.",
		description:
			"Blended with glycerin, aloe vera, and vitamin E, this fast-absorbing lotion is ideal for daily use on normal to dry skin. Non-sticky and refreshing after every shower.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Lumière Everyday Body Lotion"),
		tags: ["body lotion", "daily moisturiser", "lightweight", "all skin types"],
		attributes: {
			skin_type: ["all", "normal", "dry"],
			texture: "lotion",
			fragrance_free: false,
			size_ml: 400,
			key_ingredients: "Glycerin, Aloe Vera, Vitamin E",
		},
		lowestPriceInCents: 1095,
		currency: "USD",
		agentSummary:
			"Lumière Everyday Body Lotion is a lightweight daily lotion for normal to dry skin. Key ingredients: glycerin, aloe vera, vitamin E. 400ml. 10.95 USD.",
		seoTitle: "Lumière Everyday Body Lotion 400ml | Epoch Labs",
		seoDescription:
			"Fast-absorbing daily body lotion with aloe vera and vitamin E. 400ml.",
	},
	{
		id: "prod_body_wash_001",
		categoryId: "cat_body_wash",
		name: "Purelab Sensitive Skin Shower Cream",
		slug: "purelab-sensitive-skin-shower-cream",
		brand: "Purelab",
		shortDescription:
			"A soap-free, fragrance-free shower cream that cleanses without irritating sensitive skin.",
		description:
			"Formulated with oat extract and glycerin, this creamy body wash maintains the skin's natural moisture barrier while providing a thorough yet gentle cleanse. Dermatologist tested.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Purelab Sensitive Skin Shower Cream"),
		tags: ["body wash", "shower cream", "sensitive skin", "fragrance-free"],
		attributes: {
			skin_type: ["sensitive", "dry"],
			wash_format: "cream",
			fragrance_free: true,
			size_ml: 300,
		},
		lowestPriceInCents: 1095,
		currency: "USD",
		agentSummary:
			"Purelab Sensitive Skin Shower Cream is a fragrance-free soap-free shower cream for sensitive and dry skin. 300ml. 10.95 USD.",
		seoTitle: "Purelab Sensitive Skin Shower Cream 300ml | Epoch Labs",
		seoDescription:
			"Fragrance-free shower cream with oat extract for sensitive and dry skin. 300ml.",
	},
	{
		id: "prod_body_wash_002",
		categoryId: "cat_body_wash",
		name: "Verdant Energising Citrus Shower Gel",
		slug: "verdant-energising-citrus-shower-gel",
		brand: "Verdant",
		shortDescription:
			"A refreshing citrus shower gel that invigorates the senses and leaves skin clean.",
		description:
			"With natural citrus extracts and a pH-balanced formula, this everyday shower gel lathers richly, cleanses thoroughly, and leaves a fresh, light fragrance on the skin.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Verdant Energising Citrus Shower Gel"),
		tags: ["body wash", "shower gel", "citrus", "energising"],
		attributes: {
			skin_type: ["all", "normal"],
			wash_format: "gel",
			fragrance_free: false,
			size_ml: 300,
		},
		lowestPriceInCents: 895,
		currency: "USD",
		agentSummary:
			"Verdant Energising Citrus Shower Gel is a daily gel body wash for all skin types. 300ml. 8.95 USD.",
		seoTitle: "Verdant Energising Citrus Shower Gel 300ml | Epoch Labs",
		seoDescription:
			"Invigorating citrus shower gel for a refreshing daily cleanse. 300ml.",
	},
	{
		id: "prod_body_scrub_001",
		categoryId: "cat_body_scrubs",
		name: "Lumière Brown Sugar Body Scrub",
		slug: "lumiere-brown-sugar-body-scrub",
		brand: "Lumière",
		shortDescription:
			"A gentle brown sugar scrub that polishes and softens skin in one step.",
		description:
			"Blended with brown sugar crystals, sweet almond oil, and vitamin E, this body scrub buffs away dry patches and leaves skin feeling silky smooth and deeply moisturised.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Lumière Brown Sugar Body Scrub"),
		tags: ["body scrub", "sugar scrub", "exfoliant", "softening"],
		attributes: {
			exfoliant_type: "sugar",
			fragrance_free: false,
			size_ml: 250,
			key_ingredients: "Brown Sugar, Sweet Almond Oil, Vitamin E",
		},
		lowestPriceInCents: 1395,
		currency: "USD",
		agentSummary:
			"Lumière Brown Sugar Body Scrub polishes skin with sugar crystals and sweet almond oil. 250ml. 13.95 USD.",
		seoTitle: "Lumière Brown Sugar Body Scrub 250ml | Epoch Labs",
		seoDescription:
			"Softening brown sugar body scrub with sweet almond oil. Gentle enough for weekly use. 250ml.",
	},
	{
		id: "prod_body_scrub_002",
		categoryId: "cat_body_scrubs",
		name: "Verdant Coffee & Coconut Body Polish",
		slug: "verdant-coffee-coconut-body-polish",
		brand: "Verdant",
		shortDescription:
			"An invigorating coffee scrub that stimulates circulation and reveals smooth, glowing skin.",
		description:
			"Ground Arabica coffee combined with coconut oil and sea salt creates a powerful, skin-stimulating scrub that reduces the appearance of cellulite and leaves skin radiant.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Verdant Coffee & Coconut Body Polish"),
		tags: ["body scrub", "coffee scrub", "cellulite", "glow"],
		attributes: {
			exfoliant_type: "coffee",
			fragrance_free: false,
			size_ml: 250,
			key_ingredients: "Ground Arabica Coffee, Coconut Oil, Sea Salt",
		},
		lowestPriceInCents: 1495,
		currency: "USD",
		agentSummary:
			"Verdant Coffee & Coconut Body Polish is a stimulating coffee scrub for circulation and smooth skin. 250ml. 14.95 USD.",
		seoTitle: "Verdant Coffee & Coconut Body Polish 250ml | Epoch Labs",
		seoDescription:
			"Invigorating coffee and coconut body scrub to stimulate circulation and smooth skin. 250ml.",
	},
	{
		id: "prod_hand_cream_001",
		categoryId: "cat_hand_creams",
		name: "Purelab Intensive Hand Repair Cream",
		slug: "purelab-intensive-hand-repair-cream",
		brand: "Purelab",
		shortDescription:
			"A concentrated hand cream that heals dry, cracked hands overnight.",
		description:
			"Formulated with 20% urea, shea butter, and allantoin, this intensive hand cream deeply repairs cracked skin and provides long-lasting moisture that holds through hand washing.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Purelab Intensive Hand Repair Cream"),
		tags: ["hand cream", "dry hands", "intensive", "cracked hands", "urea"],
		attributes: {
			texture: "cream",
			fragrance_free: true,
			size_ml: 75,
			key_ingredients: "Urea 20%, Shea Butter, Allantoin",
		},
		lowestPriceInCents: 1295,
		currency: "USD",
		agentSummary:
			"Purelab Intensive Hand Repair Cream is a fragrance-free concentrated cream for dry and cracked hands. Key ingredients: urea 20%, shea butter, allantoin. 75ml. 12.95 USD.",
		seoTitle: "Purelab Intensive Hand Repair Cream 75ml | Epoch Labs",
		seoDescription:
			"Intensive hand cream with urea and shea butter to heal dry and cracked hands. 75ml.",
	},
	{
		id: "prod_hand_cream_002",
		categoryId: "cat_hand_creams",
		name: "Lumière Rose & Vitamin E Hand Cream",
		slug: "lumiere-rose-vitamin-e-hand-cream",
		brand: "Lumière",
		shortDescription:
			"A luxurious everyday hand cream that softens and protects with a delicate rose scent.",
		description:
			"Blended with rose extract, vitamin E, and glycerin, this daily hand cream absorbs quickly to soften, moisturise, and protect hands throughout the day.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Lumière Rose & Vitamin E Hand Cream"),
		tags: ["hand cream", "rose", "everyday", "softening"],
		attributes: {
			texture: "cream",
			fragrance_free: false,
			size_ml: 75,
			key_ingredients: "Rose Extract, Vitamin E, Glycerin",
		},
		lowestPriceInCents: 895,
		currency: "USD",
		agentSummary:
			"Lumière Rose & Vitamin E Hand Cream is an everyday softening hand cream. Key ingredients: rose extract, vitamin E, glycerin. 75ml. 8.95 USD.",
		seoTitle: "Lumière Rose & Vitamin E Hand Cream 75ml | Epoch Labs",
		seoDescription:
			"Daily hand cream with rose and vitamin E for soft, moisturised hands. 75ml.",
	},
	{
		id: "prod_foot_care_001",
		categoryId: "cat_foot_care",
		name: "Verdant Cracked Heel Repair Balm",
		slug: "verdant-cracked-heel-repair-balm",
		brand: "Verdant",
		shortDescription:
			"An ultra-rich heel balm that visibly repairs cracked heels within 3 days.",
		description:
			"Combining urea 25%, salicylic acid, and shea butter, this targeted heel balm softens hard skin, fills in cracks, and promotes rapid regeneration for smooth, comfortable heels.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Verdant Cracked Heel Repair Balm"),
		tags: ["foot care", "heel balm", "cracked heels", "urea"],
		attributes: {
			product_type: "balm",
			fragrance_free: true,
			size_ml: 60,
			key_ingredients: "Urea 25%, Salicylic Acid, Shea Butter",
		},
		lowestPriceInCents: 1095,
		currency: "USD",
		agentSummary:
			"Verdant Cracked Heel Repair Balm is a fragrance-free intensive heel balm for cracked and rough heels. Key ingredients: urea 25%, salicylic acid, shea butter. 60ml. 10.95 USD.",
		seoTitle: "Verdant Cracked Heel Repair Balm 60ml | Epoch Labs",
		seoDescription:
			"Ultra-rich heel balm with urea 25% for fast cracked heel repair. 60ml.",
	},
	{
		id: "prod_foot_care_002",
		categoryId: "cat_foot_care",
		name: "Purelab Overnight Foot Mask",
		slug: "purelab-overnight-foot-mask",
		brand: "Purelab",
		shortDescription:
			"An intensive overnight foot mask that transforms rough, dry feet while you sleep.",
		description:
			"Applied before bed and left on overnight under socks, this rich mask delivers a concentrated dose of shea butter, glycerin, and tea tree to deeply soften and deodorise feet.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Purelab Overnight Foot Mask"),
		tags: ["foot care", "foot mask", "overnight", "dry feet"],
		attributes: {
			product_type: "mask",
			fragrance_free: false,
			size_ml: 100,
			key_ingredients: "Shea Butter, Glycerin, Tea Tree Oil",
		},
		lowestPriceInCents: 1195,
		currency: "USD",
		agentSummary:
			"Purelab Overnight Foot Mask transforms rough feet with shea butter and glycerin. 100ml. 11.95 USD.",
		seoTitle: "Purelab Overnight Foot Mask 100ml | Epoch Labs",
		seoDescription:
			"Intensive overnight foot mask with shea butter for soft, smooth feet. 100ml.",
	},
	{
		id: "prod_shampoo_001",
		categoryId: "cat_shampoo",
		name: "Lumière Volume Lift Shampoo",
		slug: "lumiere-volume-lift-shampoo",
		brand: "Lumière",
		shortDescription:
			"A sulfate-free volumising shampoo that lifts fine hair without weighing it down.",
		description:
			"Formulated with biotin, hydrolysed wheat protein, and panthenol, this lightweight shampoo thickens each strand from root to tip for lasting volume and body.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Lumière Volume Lift Shampoo"),
		tags: ["shampoo", "volume", "fine hair", "sulfate-free", "biotin"],
		attributes: {
			hair_type: ["fine", "straight", "wavy"],
			hair_concern: ["volume"],
			sulfate_free: true,
			fragrance_free: false,
			size_ml: 300,
			key_ingredients: "Biotin, Hydrolysed Wheat Protein, Panthenol",
		},
		lowestPriceInCents: 1595,
		currency: "USD",
		agentSummary:
			"Lumière Volume Lift Shampoo is a sulfate-free volumising shampoo for fine hair. Key ingredients: biotin, hydrolysed wheat protein, panthenol. 300ml. 15.95 USD.",
		seoTitle: "Lumière Volume Lift Shampoo 300ml | Epoch Labs",
		seoDescription:
			"Sulfate-free volumising shampoo with biotin for fine, flat hair. 300ml.",
	},
	{
		id: "prod_shampoo_002",
		categoryId: "cat_shampoo",
		name: "Verdant Moisture Revival Shampoo",
		slug: "verdant-moisture-revival-shampoo",
		brand: "Verdant",
		shortDescription:
			"A deeply moisturising shampoo for dry, damaged, and colour-treated hair.",
		description:
			"Enriched with argan oil, keratin, and glycerin, this nourishing shampoo cleanses gently while restoring moisture and strength to dry, brittle, or chemically treated hair.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Verdant Moisture Revival Shampoo"),
		tags: [
			"shampoo",
			"moisturising",
			"dry hair",
			"argan oil",
			"colour-treated",
		],
		attributes: {
			hair_type: ["dry", "damaged", "colour-treated", "curly"],
			hair_concern: ["hydration", "repair", "colour-protection"],
			sulfate_free: true,
			fragrance_free: false,
			size_ml: 300,
			key_ingredients: "Argan Oil, Keratin, Glycerin",
		},
		lowestPriceInCents: 1695,
		currency: "USD",
		agentSummary:
			"Verdant Moisture Revival Shampoo is a sulfate-free nourishing shampoo for dry and colour-treated hair. Key ingredients: argan oil, keratin, glycerin. 300ml. 16.95 USD.",
		seoTitle: "Verdant Moisture Revival Shampoo 300ml | Epoch Labs",
		seoDescription:
			"Sulfate-free moisturising shampoo with argan oil for dry and colour-treated hair. 300ml.",
	},
	{
		id: "prod_conditioner_001",
		categoryId: "cat_conditioners",
		name: "Purelab Smooth & Detangle Conditioner",
		slug: "purelab-smooth-detangle-conditioner",
		brand: "Purelab",
		shortDescription:
			"A rinse-out conditioner that instantly detangles and leaves hair silky smooth.",
		description:
			"With avocado oil, silk proteins, and amino acids, this rinse-out conditioner seals the cuticle, eliminates frizz, and makes hair easier to comb — suitable for all hair types.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Purelab Smooth & Detangle Conditioner"),
		tags: ["conditioner", "rinse-out", "detangling", "frizz", "all hair types"],
		attributes: {
			hair_type: ["straight", "wavy", "curly", "fine"],
			conditioner_type: "rinse-out",
			fragrance_free: false,
			size_ml: 300,
			key_ingredients: "Avocado Oil, Silk Proteins, Amino Acids",
		},
		lowestPriceInCents: 1495,
		currency: "USD",
		agentSummary:
			"Purelab Smooth & Detangle Conditioner is a rinse-out conditioner for frizz control and easy detangling. Key ingredients: avocado oil, silk proteins. 300ml. 14.95 USD.",
		seoTitle: "Purelab Smooth & Detangle Conditioner 300ml | Epoch Labs",
		seoDescription:
			"Rinse-out conditioner with avocado oil and silk proteins for smooth, frizz-free hair. 300ml.",
	},
	{
		id: "prod_conditioner_002",
		categoryId: "cat_conditioners",
		name: "Lumière Curl-Defining Leave-In Conditioner",
		slug: "lumiere-curl-defining-leave-in-conditioner",
		brand: "Lumière",
		shortDescription:
			"A leave-in conditioner that defines curls, reduces frizz, and adds lasting moisture.",
		description:
			"Formulated with shea butter, coconut oil, and flaxseed extract, this lightweight leave-in conditioner enhances natural curl pattern while providing 24-hour frizz protection.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Lumière Curl-Defining Leave-In Conditioner"),
		tags: ["conditioner", "leave-in", "curly hair", "curl definition", "frizz"],
		attributes: {
			hair_type: ["curly", "coily", "wavy"],
			conditioner_type: "leave-in",
			fragrance_free: false,
			size_ml: 250,
			key_ingredients: "Shea Butter, Coconut Oil, Flaxseed Extract",
		},
		lowestPriceInCents: 1795,
		currency: "USD",
		agentSummary:
			"Lumière Curl-Defining Leave-In Conditioner defines curls and reduces frizz for curly and coily hair. Key ingredients: shea butter, coconut oil, flaxseed extract. 250ml. 17.95 USD.",
		seoTitle: "Lumière Curl-Defining Leave-In Conditioner 250ml | Epoch Labs",
		seoDescription:
			"Leave-in conditioner with shea butter and coconut oil to define curls and fight frizz. 250ml.",
	},
	{
		id: "prod_hair_mask_001",
		categoryId: "cat_hair_masks",
		name: "Verdant Bond Repair Hair Mask",
		slug: "verdant-bond-repair-hair-mask",
		brand: "Verdant",
		shortDescription:
			"An intensive bond-repair treatment that rebuilds damaged hair from the inside out.",
		description:
			"Powered by a bis-aminopropyl diglycol dimaleate complex (bond-building technology), this weekly hair mask reconstructs broken disulphide bonds to restore strength and elasticity to bleached or over-processed hair.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Verdant Bond Repair Hair Mask"),
		tags: ["hair mask", "bond repair", "damaged hair", "bleached hair"],
		attributes: {
			hair_type: ["damaged", "colour-treated", "curly"],
			treatment_focus: ["repair", "protein"],
			fragrance_free: false,
			size_ml: 250,
			key_ingredients: "Bond-Building Complex, Hydrolysed Keratin, Argan Oil",
		},
		lowestPriceInCents: 2695,
		currency: "USD",
		agentSummary:
			"Verdant Bond Repair Hair Mask rebuilds broken bonds in damaged and bleached hair. Key ingredients: bond-building complex, hydrolysed keratin, argan oil. 250ml. 26.95 USD.",
		seoTitle: "Verdant Bond Repair Hair Mask 250ml | Epoch Labs",
		seoDescription:
			"Bond-building hair mask for intense repair of bleached and over-processed hair. 250ml.",
	},
	{
		id: "prod_hair_mask_002",
		categoryId: "cat_hair_masks",
		name: "Purelab Moisture Surge Hair Mask",
		slug: "purelab-moisture-surge-hair-mask",
		brand: "Purelab",
		shortDescription:
			"A weekly deep-conditioning mask that floods dry hair with lasting moisture.",
		description:
			"Infused with hyaluronic acid, honey extract, and jojoba oil, this rich mask penetrates the hair shaft to restore moisture balance and restore manageability to dry, brittle hair.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Purelab Moisture Surge Hair Mask"),
		tags: ["hair mask", "moisturising", "dry hair", "hyaluronic acid"],
		attributes: {
			hair_type: ["dry", "coily", "thick"],
			treatment_focus: ["moisture", "repair"],
			fragrance_free: false,
			size_ml: 300,
			key_ingredients: "Hyaluronic Acid, Honey Extract, Jojoba Oil",
		},
		lowestPriceInCents: 1995,
		currency: "USD",
		agentSummary:
			"Purelab Moisture Surge Hair Mask is a deep-conditioning mask for dry hair. Key ingredients: hyaluronic acid, honey extract, jojoba oil. 300ml. 19.95 USD.",
		seoTitle: "Purelab Moisture Surge Hair Mask 300ml | Epoch Labs",
		seoDescription:
			"Deep-conditioning hair mask with hyaluronic acid and honey for dry, brittle hair. 300ml.",
	},
	{
		id: "prod_scalp_001",
		categoryId: "cat_scalp_care",
		name: "Lumière Anti-Dandruff Scalp Serum",
		slug: "lumiere-anti-dandruff-scalp-serum",
		brand: "Lumière",
		shortDescription:
			"A targeted scalp serum that eliminates dandruff flakes and soothes an itchy scalp.",
		description:
			"Combining piroctone olamine, salicylic acid, and zinc, this serum directly addresses the root causes of dandruff, reducing flaking, irritation, and scalp odour with consistent use.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Lumière Anti-Dandruff Scalp Serum"),
		tags: ["scalp care", "dandruff", "scalp serum", "flaking"],
		attributes: {
			scalp_concern: ["dandruff", "oiliness"],
			product_type: "serum",
			fragrance_free: true,
			size_ml: 100,
			key_ingredients: "Piroctone Olamine, Salicylic Acid, Zinc",
		},
		lowestPriceInCents: 2295,
		currency: "USD",
		agentSummary:
			"Lumière Anti-Dandruff Scalp Serum is a fragrance-free serum to eliminate dandruff and soothe the scalp. Key ingredients: piroctone olamine, salicylic acid, zinc. 100ml. 22.95 USD.",
		seoTitle: "Lumière Anti-Dandruff Scalp Serum 100ml | Epoch Labs",
		seoDescription:
			"Targeted anti-dandruff scalp serum with piroctone olamine and zinc. 100ml.",
	},
	{
		id: "prod_scalp_002",
		categoryId: "cat_scalp_care",
		name: "Verdant Hair Growth Scalp Tonic",
		slug: "verdant-hair-growth-scalp-tonic",
		brand: "Verdant",
		shortDescription:
			"A clinically inspired scalp tonic that stimulates dormant follicles and promotes thicker hair growth.",
		description:
			"Formulated with 5% minoxidil-alternative peptides (Capixyl), caffeine, and saw palmetto extract, this daily scalp tonic helps reduce hair shedding and supports visibly denser hair over 90 days.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Verdant Hair Growth Scalp Tonic"),
		tags: ["scalp care", "hair growth", "hair loss", "scalp tonic"],
		attributes: {
			scalp_concern: ["hair-loss", "dryness"],
			product_type: "tonic",
			fragrance_free: true,
			size_ml: 100,
			key_ingredients: "Capixyl Peptides, Caffeine, Saw Palmetto Extract",
		},
		lowestPriceInCents: 3295,
		currency: "USD",
		agentSummary:
			"Verdant Hair Growth Scalp Tonic is a fragrance-free tonic to stimulate hair follicles and reduce shedding. Key ingredients: Capixyl peptides, caffeine, saw palmetto. 100ml. 32.95 USD.",
		seoTitle: "Verdant Hair Growth Scalp Tonic 100ml | Epoch Labs",
		seoDescription:
			"Daily scalp tonic with Capixyl and caffeine to support hair growth and reduce shedding. 100ml.",
	},
	{
		id: "prod_mens_moist_001",
		categoryId: "cat_mens_moisturisers",
		name: "Epoch Labs Men's Daily Face Cream",
		slug: "epoch-labs-mens-daily-face-cream",
		brand: "Epoch Labs",
		shortDescription:
			"A fast-absorbing daily moisturiser formulated for men's thicker, oilier skin.",
		description:
			"Enriched with niacinamide, hyaluronic acid, and green tea extract, this lightweight cream hydrates, controls shine, and protects skin throughout the day without feeling heavy.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Epoch Labs Men's Daily Face Cream"),
		tags: ["men's skincare", "face cream", "daily moisturiser", "oil-control"],
		attributes: {
			skin_type: ["normal", "oily", "combination"],
			skin_concern: ["hydration", "pores"],
			texture: "cream",
			fragrance_free: false,
			size_ml: 50,
			key_ingredients: "Niacinamide 5%, Hyaluronic Acid, Green Tea Extract",
		},
		lowestPriceInCents: 1895,
		currency: "USD",
		agentSummary:
			"Epoch Labs Men's Daily Face Cream is a lightweight moisturiser for men's normal to oily skin. Key ingredients: niacinamide 5%, hyaluronic acid. 50ml. 18.95 USD.",
		seoTitle: "Epoch Labs Men's Daily Face Cream 50ml | Epoch Labs",
		seoDescription:
			"Fast-absorbing daily moisturiser with niacinamide for men's oily and combination skin. 50ml.",
	},
	{
		id: "prod_mens_moist_002",
		categoryId: "cat_mens_moisturisers",
		name: "Purelab Men's Post-Shave Moisturiser",
		slug: "purelab-mens-post-shave-moisturiser",
		brand: "Purelab",
		shortDescription:
			"A calming, non-greasy moisturiser that soothes razor burn and hydrates post-shave.",
		description:
			"Formulated with allantoin, aloe vera, and panthenol, this fast-absorbing post-shave moisturiser reduces redness and irritation immediately after shaving, leaving skin smooth and refreshed.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Purelab Men's Post-Shave Moisturiser"),
		tags: ["men's skincare", "post-shave", "razor burn", "soothing"],
		attributes: {
			skin_type: ["all", "sensitive"],
			skin_concern: ["redness"],
			texture: "lotion",
			fragrance_free: true,
			size_ml: 75,
			key_ingredients: "Allantoin, Aloe Vera, Panthenol",
		},
		lowestPriceInCents: 1595,
		currency: "USD",
		agentSummary:
			"Purelab Men's Post-Shave Moisturiser is a fragrance-free lotion to soothe razor burn and hydrate skin after shaving. Key ingredients: allantoin, aloe vera. 75ml. 15.95 USD.",
		seoTitle: "Purelab Men's Post-Shave Moisturiser 75ml | Epoch Labs",
		seoDescription:
			"Soothing fragrance-free post-shave moisturiser with aloe vera and allantoin. 75ml.",
	},
	{
		id: "prod_shaving_001",
		categoryId: "cat_shaving_care",
		name: "Verdant Precision Shave Gel",
		slug: "verdant-precision-shave-gel",
		brand: "Verdant",
		shortDescription:
			"A clear shave gel that provides a close, comfortable shave and prevents razor burn.",
		description:
			"This transparent, glycerin-rich shave gel allows for precise razor guidance while creating a protective cushion over the skin. Infused with menthol for a refreshing, irritation-free shave.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Verdant Precision Shave Gel"),
		tags: ["shaving", "shave gel", "razor burn", "precision"],
		attributes: {
			shave_step: "shave",
			product_type: "gel",
			fragrance_free: false,
			size_ml: 150,
		},
		lowestPriceInCents: 1095,
		currency: "USD",
		agentSummary:
			"Verdant Precision Shave Gel is a clear glycerin shave gel for a close and comfortable shave. 150ml. 10.95 USD.",
		seoTitle: "Verdant Precision Shave Gel 150ml | Epoch Labs",
		seoDescription:
			"Clear precision shave gel with glycerin for a close, irritation-free shave. 150ml.",
	},
	{
		id: "prod_shaving_002",
		categoryId: "cat_shaving_care",
		name: "Lumière Soothing Aftershave Balm",
		slug: "lumiere-soothing-aftershave-balm",
		brand: "Lumière",
		shortDescription:
			"A lightweight aftershave balm that instantly calms irritation and moisturises post-shave skin.",
		description:
			"Free from alcohol and artificial fragrance, this aftershave balm combines bisabolol, witch hazel, and shea butter to reduce redness, tighten pores, and leave a smooth, comfortable finish.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Lumière Soothing Aftershave Balm"),
		tags: ["shaving", "aftershave", "post-shave", "soothing"],
		attributes: {
			shave_step: "post-shave",
			product_type: "balm",
			fragrance_free: true,
			size_ml: 75,
		},
		lowestPriceInCents: 1495,
		currency: "USD",
		agentSummary:
			"Lumière Soothing Aftershave Balm is a fragrance-free, alcohol-free post-shave balm to calm irritation. Key ingredients: bisabolol, witch hazel, shea butter. 75ml. 14.95 USD.",
		seoTitle: "Lumière Soothing Aftershave Balm 75ml | Epoch Labs",
		seoDescription:
			"Alcohol-free aftershave balm with bisabolol and witch hazel to soothe post-shave skin. 75ml.",
	},
	{
		id: "prod_lip_001",
		categoryId: "cat_lip_care",
		name: "Purelab Intensive Repair Lip Balm",
		slug: "purelab-intensive-repair-lip-balm",
		brand: "Purelab",
		shortDescription:
			"A fragrance-free lip balm that heals chapped lips and provides lasting moisture.",
		description:
			"Packed with beeswax, shea butter, and vitamin E, this intensive lip balm creates a protective barrier to lock in moisture and heal cracked, dry lips throughout the day.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Purelab Intensive Repair Lip Balm"),
		tags: ["lip balm", "lip care", "chapped lips", "fragrance-free"],
		attributes: {
			product_type: "balm",
			fragrance_free: true,
			size_ml: 10,
			key_ingredients: "Beeswax, Shea Butter, Vitamin E",
		},
		lowestPriceInCents: 695,
		currency: "USD",
		agentSummary:
			"Purelab Intensive Repair Lip Balm is a fragrance-free lip balm to heal chapped and dry lips. Key ingredients: beeswax, shea butter, vitamin E. 10ml. 6.95 USD.",
		seoTitle: "Purelab Intensive Repair Lip Balm 10ml | Epoch Labs",
		seoDescription:
			"Fragrance-free intensive lip balm with shea butter and vitamin E for chapped lips. 10ml.",
	},
	{
		id: "prod_lip_002",
		categoryId: "cat_lip_care",
		name: "Lumière Overnight Lip Mask",
		slug: "lumiere-overnight-lip-mask",
		brand: "Lumière",
		shortDescription:
			"A nourishing sleeping lip mask that plumps and softens lips overnight.",
		description:
			"Applied as the last step of your evening routine, this thick lip mask combines hyaluronic acid, ceramides, and honey to repair, plump, and deeply condition lips while you sleep.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Lumière Overnight Lip Mask"),
		tags: ["lip mask", "sleeping mask", "lip care", "overnight"],
		attributes: {
			product_type: "mask",
			fragrance_free: false,
			size_ml: 15,
			key_ingredients: "Hyaluronic Acid, Ceramides, Honey Extract",
		},
		lowestPriceInCents: 1195,
		currency: "USD",
		agentSummary:
			"Lumière Overnight Lip Mask plumps and conditions lips with hyaluronic acid and ceramides. 15ml. 11.95 USD.",
		seoTitle: "Lumière Overnight Lip Mask 15ml | Epoch Labs",
		seoDescription:
			"Nourishing overnight lip mask with hyaluronic acid and ceramides for plump, soft lips. 15ml.",
	},
	{
		id: "prod_gift_001",
		categoryId: "cat_gift_sets",
		name: "Lumière Glow Starter Face Set",
		slug: "lumiere-glow-starter-face-set",
		brand: "Lumière",
		shortDescription:
			"A curated face routine gift set featuring cleanser, serum, and moisturiser for radiant skin.",
		description:
			"This beginner-friendly face set includes the Lumière Hydrating Rose Toner (50ml), Vitamin C Brightening Serum (15ml), and Barrier Repair Day Cream (30ml) — everything needed to start a glowing skincare routine.",
		status: "active",
		position: 1,
		isFeatured: true,
		isIndexed: true,
		images: img("Lumière Glow Starter Face Set"),
		tags: ["gift set", "face routine", "starter kit", "brightening"],
		attributes: {
			set_theme: "brightening",
			occasion: ["birthday", "everyday"],
		},
		lowestPriceInCents: 4995,
		currency: "USD",
		agentSummary:
			"Lumière Glow Starter Face Set is a curated face routine gift set with toner, vitamin C serum, and day cream. 49.95 USD.",
		seoTitle: "Lumière Glow Starter Face Set | Epoch Labs",
		seoDescription:
			"Curated brightening face gift set with toner, vitamin C serum, and day cream. Perfect birthday gift.",
	},
	{
		id: "prod_gift_002",
		categoryId: "cat_gift_sets",
		name: "Verdant Spa Day Body Gift Set",
		slug: "verdant-spa-day-body-gift-set",
		brand: "Verdant",
		shortDescription:
			"A luxurious body care gift set for an at-home spa experience.",
		description:
			"This indulgent gift set includes the Verdant Energising Citrus Shower Gel (300ml), Coffee & Coconut Body Polish (250ml), and Deep Moisture Body Cream (300ml) — the perfect treat or gift.",
		status: "active",
		position: 2,
		isFeatured: false,
		isIndexed: true,
		images: img("Verdant Spa Day Body Gift Set"),
		tags: ["gift set", "body routine", "spa", "self-care"],
		attributes: {
			set_theme: "body-routine",
			occasion: ["mothers-day", "birthday", "everyday"],
		},
		lowestPriceInCents: 3995,
		currency: "USD",
		agentSummary:
			"Verdant Spa Day Body Gift Set is a luxurious body care gift set with shower gel, body scrub, and body cream. 39.95 USD.",
		seoTitle: "Verdant Spa Day Body Gift Set | Epoch Labs",
		seoDescription:
			"Luxurious body care gift set with shower gel, coffee scrub, and rich body cream. Perfect Mother's Day gift.",
	},
];

export async function seedProducts(): Promise<void> {
	console.log(`Seeding ${PRODUCTS.length} products…`);

	await db.insert(products).values(PRODUCTS).onConflictDoNothing();

	console.log("Product seed complete successfully.");
}

seedProducts()
	.then(() => process.exit(0))
	.catch((err: unknown) => {
		console.error("Product seed failed:", err);
		process.exit(1);
	});
