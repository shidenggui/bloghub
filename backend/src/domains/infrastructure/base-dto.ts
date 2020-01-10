export class BaseDto {
  repr(): string {
    return JSON.stringify(this);
  }
}
