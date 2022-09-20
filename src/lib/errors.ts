export class ValidationError extends Error {
  constructor(public readonly messages: string[]) {
    super(messages.join('", "') + '"');
    this.name = "ValidationError";
  }
}
