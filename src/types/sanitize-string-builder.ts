import validator from 'validator';

import {
  ISanitizeStringBuilder,
  ISanitizeStringBuilderFactory,
} from '@/interfaces/sanitization/sanitize-string-builder';

export class ValidatorSanitizeStringBuilder implements ISanitizeStringBuilder {
  constructor(private input: string) {}

  trim(): ISanitizeStringBuilder {
    this.input = validator.trim(this.input);
    return this;
  }

  escapeHTML(): ISanitizeStringBuilder {
    this.input = validator.escape(this.input);
    return this;
  }

  removeControlChars(): ISanitizeStringBuilder {
    this.input = validator.stripLow(this.input);
    return this;
  }

  normalizeWhitespace(): ISanitizeStringBuilder {
    this.input = this.input.replace(/\s+/g, ' ');
    return this;
  }

  removeSpecialChars(): ISanitizeStringBuilder {
    this.input = this.input.replace(/[^a-zA-Z0-9\s]/g, '');
    return this;
  }

  toLowerCase(): ISanitizeStringBuilder {
    this.input = this.input.toLowerCase();
    return this;
  }

  toUpperCase(): ISanitizeStringBuilder {
    this.input = this.input.toUpperCase();
    return this;
  }

  build(): string {
    return this.input;
  }
}

export class ValidatorSanitizeStringBuilderFactory
  implements ISanitizeStringBuilderFactory
{
  create(input: string): ISanitizeStringBuilder {
    return new ValidatorSanitizeStringBuilder(input);
  }
}

export const sanitizeFactory: ISanitizeStringBuilderFactory =
  new ValidatorSanitizeStringBuilderFactory();

export const create = (input: string) => sanitizeFactory.create(input);
