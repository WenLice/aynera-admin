export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  statusCode: number;
  errorCode: string | null;
  errors: Record<string, string[]> | null;
  correlationId: string | null;
};

export type AuthAccount = {
  id: string;
  phone: string | null;
  phoneConfirmed: boolean;
  email: string | null;
  emailConfirmed: boolean;
  accountKind: string;
  isActive: boolean;
  isDeleted: boolean;
  isSuperAdmin: boolean;
  isRestricted: boolean;
  roles: string[];
  profile: unknown | null;
};

export type TokenPayload = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresInSeconds: number;
  account: AuthAccount;
};

export type PagedResult<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type WaitlistRow = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  city: string;
  interest: string;
  isAdult: boolean;
  marketingConsent: boolean;
  isActive: boolean;
  createdAtUtc: string;
  updatedAtUtc: string | null;
};

export type SuggestionRow = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  createdAtUtc: string;
};

export type EarlyAccessCity = {
  id: string;
  name: string;
  wave: number;
  sortOrder: number;
  isActive: boolean;
};

export type VenueType = "Cafe" | "EventPlace";

export type Venue = {
  id: string;
  name: string;
  type: VenueType;
  cityId: string;
  cityName: string | null;
  area: string;
  address: string;
  photoUrls: string[];
  contactName: string;
  contactEmail: string;
  contactPhoneE164: string;
  capacity: number | null;
  notes: string | null;
  isActive: boolean;
  createdAtUtc: string;
  updatedAtUtc: string | null;
};

export type FeedbackRow = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  message: string;
  isExistingUser: boolean;
  memberId: string | null;
  createdAtUtc: string;
};

export type AuditEventRow = {
  id: string;
  occurredAtUtc: string;
  action: string;
  outcome: string;
  message: string;
  actorUserId: string | null;
  subjectUserId: string | null;
  changesJson: string | null;
  correlationId: string | null;
};

export type MemberAdminRow = {
  id: string;
  phone: string | null;
  phoneConfirmed: boolean;
  email: string | null;
  emailConfirmed: boolean;
  isActive: boolean;
  isRestricted: boolean;
  createdAtUtc: string;
  name: string | null;
  nickname: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  city: string | null;
  religion: string | null;
};

export type MemberPhoto = {
  id: string;
  sortOrder: number;
  contentType: string;
  byteSize: number;
  isReference: boolean;
  faceMatchStatus: string;
  faceMatchScore: number | null;
  createdAtUtc: string;
};

export type IntroductionVideo = {
  userId: string;
  contentType: string;
  byteSize: number;
  faceMatchStatus: string;
  faceMatchScore: number | null;
  guidelinePassed: boolean;
  guidelineDetail: string | null;
  createdAtUtc: string;
  updatedAtUtc: string | null;
};

export type MemberAdminDetail = MemberAdminRow & {
  photos: MemberPhoto[];
  introductionVideo: IntroductionVideo | null;
};
