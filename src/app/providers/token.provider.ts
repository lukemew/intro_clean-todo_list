export interface ITokenProvider {
	generate(payload: { sub: string }): string;
}
