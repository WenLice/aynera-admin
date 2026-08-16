export class ApiError extends Error {
  readonly statusCode: number;
  readonly errorCode: string;
  readonly errors: Record<string, string[]> | null;
  readonly correlationId: string | null;

  constructor(
    errorCode: string,
    statusCode: number,
    errors: Record<string, string[]> | null = null,
    correlationId: string | null = null
  ) {
    super(formatApiError(errorCode, errors));
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
    this.correlationId = correlationId;
  }
}

export function formatApiError(
  errorCode: string,
  errors: Record<string, string[]> | null
): string {
  const firstField = errors
    ? Object.values(errors).flat().find((line) => line.trim().length > 0)
    : undefined;
  if (firstField) {
    return firstField;
  }

  switch (errorCode) {
    case "password_invalid":
      return "Wrong password.";
    case "password_not_set":
      return "This account has no password yet.";
    case "user_not_found":
      return "No admin account matches that email or phone.";
    case "account_deactivated":
      return "This account is deactivated.";
    case "account_locked":
      return "This account is locked. Try again later.";
    case "validation_failed":
      return "Check the form and try again.";
    case "otp_invalid":
      return "That code is incorrect.";
    case "otp_expired":
      return "That code has expired. Request a new one.";
    case "otp_locked":
      return "Too many attempts. Request a new code later.";
    case "otp_rate_limited":
      return "Too many OTP requests. Try again later.";
    case "super_admin_required":
      return "Super-admin rights are required.";
    case "cannot_deactivate_self":
      return "You cannot deactivate your own account.";
    case "last_admin":
      return "The last active admin cannot be deactivated.";
    case "last_super_admin":
      return "The last active super-admin cannot be deactivated.";
    case "email_already_exists":
      return "An account with this email already exists.";
    case "early_access_city_exists":
      return "A city with that name already exists.";
    case "early_access_city_not_found":
      return "That city was not found.";
    default:
      return errorCode.replaceAll("_", " ");
  }
}
