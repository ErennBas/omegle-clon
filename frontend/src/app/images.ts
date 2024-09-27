export const logos: Record<string, string> = {
	videoContainerOmegleLogo: "data:image/png;base64,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",
	headerLogo: "data:image/png;base64,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"
};
