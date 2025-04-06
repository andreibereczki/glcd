export interface PrerequisiteCheckResult {
  isSuccess: boolean;
  error?: Error;
}
export interface PrerequisiteCheck {
  readonly order: number;
  runChecks(): Promise<PrerequisiteCheckResult>;
}
