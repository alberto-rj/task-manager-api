export interface ISanitizeStringBuilder {
  trim(): ISanitizeStringBuilder;
  escapeHTML(): ISanitizeStringBuilder;
  removeControlChars(): ISanitizeStringBuilder;
  normalizeWhitespace(): ISanitizeStringBuilder;
  removeSpecialChars(): ISanitizeStringBuilder;
  toLowerCase(): ISanitizeStringBuilder;
  toUpperCase(): ISanitizeStringBuilder;
  build(): string;
}

export interface ISanitizeStringBuilderFactory {
  create(input: string): ISanitizeStringBuilder;
}
