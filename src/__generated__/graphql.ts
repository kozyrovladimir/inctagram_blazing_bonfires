/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Avatar = {
  __typename?: 'Avatar';
  fileSize: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export enum BlockStatus {
  Blocked = 'blocked'
}

export enum CurrencyType {
  Eur = 'EUR',
  Usd = 'USD'
}

export type ImagePost = {
  __typename?: 'ImagePost';
  fileSize: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type LoginAdmin = {
  __typename?: 'LoginAdmin';
  logged: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  banUser: Scalars['Boolean']['output'];
  loginAdmin: LoginAdmin;
  removeUser: Scalars['Boolean']['output'];
  unbanUser: Scalars['Boolean']['output'];
};


export type MutationBanUserArgs = {
  banReason: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationLoginAdminArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationUnbanUserArgs = {
  userId: Scalars['Int']['input'];
};

export type PaginationModel = {
  __typename?: 'PaginationModel';
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  currency: CurrencyType;
  id: Scalars['Int']['output'];
  userId: Scalars['Int']['output'];
};

export enum PaymentMethod {
  CreditCard = 'CREDIT_CARD',
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE'
}

export type PaymentPaginationModel = {
  __typename?: 'PaymentPaginationModel';
  items: Array<Subscription>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type PaymentsPaginationModel = {
  __typename?: 'PaymentsPaginationModel';
  items: Array<SubscriptionPaymentsModel>;
  page: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images: Array<ImagePost>;
  /** ownerId is the userId */
  ownerId: Scalars['Int']['output'];
};

export type PostImages = {
  __typename?: 'PostImages';
  images: Array<ImagePost>;
};

export type PostsPaginationModel = {
  __typename?: 'PostsPaginationModel';
  items: Array<Post>;
  pageSize: Scalars['Int']['output'];
  pagesCount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  aboutMe?: Maybe<Scalars['String']['output']>;
  avatars?: Maybe<Array<Avatar>>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type ProfileInfoModel = {
  __typename?: 'ProfileInfoModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  posts: Array<PostImages>;
  profile: Profile;
  userName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllPayments: PaymentsPaginationModel;
  getListPaymentsById: PaymentPaginationModel;
  getPosts: PostsPaginationModel;
  getProfileInfo: ProfileInfoModel;
  getUsers: UsersPaginationModel;
};


export type QueryGetAllPaymentsArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
};


export type QueryGetListPaymentsByIdArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  userId: Scalars['Int']['input'];
};


export type QueryGetPostsArgs = {
  endCursorPostId?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
};


export type QueryGetProfileInfoArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetUsersArgs = {
  blockStatus?: InputMaybe<BlockStatus>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum StatusSubscriptionType {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Finished = 'FINISHED',
  Pending = 'PENDING'
}

export type Subscription = {
  __typename?: 'Subscription';
  businessAccountId: Scalars['Int']['output'];
  dateOfPayment?: Maybe<Scalars['DateTime']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  paymentType?: Maybe<PaymentMethod>;
  payments: Array<Payment>;
  price: Scalars['Int']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status: StatusSubscriptionType;
  type: SubscriptionType;
};

export type SubscriptionPaymentsModel = {
  __typename?: 'SubscriptionPaymentsModel';
  amount: Scalars['Int']['output'];
  avatars?: Maybe<Array<Avatar>>;
  createdAt: Scalars['String']['output'];
  currency: CurrencyType;
  id: Scalars['Int']['output'];
  paymentMethod: PaymentMethod;
  type: SubscriptionType;
  userId: Scalars['Int']['output'];
  userName: Scalars['String']['output'];
};

export enum SubscriptionType {
  Day = 'DAY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  profile: Profile;
  userBan?: Maybe<UserBan>;
  userName: Scalars['String']['output'];
};

export type UserBan = {
  __typename?: 'UserBan';
  createdAt: Scalars['DateTime']['output'];
  reason: Scalars['String']['output'];
};

export type UsersPaginationModel = {
  __typename?: 'UsersPaginationModel';
  pagination: PaginationModel;
  users: Array<User>;
};

export type LoginAdminMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginAdminMutation = { __typename?: 'Mutation', loginAdmin: { __typename?: 'LoginAdmin', logged: boolean } };

export type AvatarsFragmentFragment = { __typename?: 'Avatar', url: string, width: number, height: number, fileSize: number } & { ' $fragmentName'?: 'AvatarsFragmentFragment' };

export type ProfileFragmentFragment = { __typename?: 'Profile', id: number, userName?: string | null, firstName?: string | null, lastName?: string | null, city?: string | null, dateOfBirth?: any | null, aboutMe?: string | null, createdAt: any, avatars?: Array<(
    { __typename?: 'Avatar' }
    & { ' $fragmentRefs'?: { 'AvatarsFragmentFragment': AvatarsFragmentFragment } }
  )> | null } & { ' $fragmentName'?: 'ProfileFragmentFragment' };

export type UserFragmentFragment = { __typename?: 'User', id: number, userName: string, email: string, createdAt: any, profile: (
    { __typename?: 'Profile' }
    & { ' $fragmentRefs'?: { 'ProfileFragmentFragment': ProfileFragmentFragment } }
  ), userBan?: { __typename?: 'UserBan', reason: string, createdAt: any } | null } & { ' $fragmentName'?: 'UserFragmentFragment' };

export type GetUsersQueryVariables = Exact<{
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortDirection?: InputMaybe<SortDirection>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  blockStatus?: InputMaybe<BlockStatus>;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'UsersPaginationModel', users: Array<{ __typename?: 'User', id: number, userName: string, email: string, createdAt: any, profile: { __typename?: 'Profile', id: number, userName?: string | null, firstName?: string | null, lastName?: string | null, city?: string | null, dateOfBirth?: any | null, aboutMe?: string | null, createdAt: any, avatars?: Array<{ __typename?: 'Avatar', url: string, width: number, height: number, fileSize: number }> | null }, userBan?: { __typename?: 'UserBan', reason: string, createdAt: any } | null }>, pagination: { __typename?: 'PaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number } } };

export const AvatarsFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AvatarsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Avatar"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"}}]}}]} as unknown as DocumentNode<AvatarsFragmentFragment, unknown>;
export const ProfileFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProfileFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"aboutMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AvatarsFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AvatarsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Avatar"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"}}]}}]} as unknown as DocumentNode<ProfileFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProfileFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userBan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AvatarsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Avatar"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProfileFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Profile"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"aboutMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AvatarsFragment"}}]}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const LoginAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logged"}}]}}]}}]} as unknown as DocumentNode<LoginAdminMutation, LoginAdminMutationVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SortDirection"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"blockStatus"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BlockStatus"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageNumber"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageNumber"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"blockStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"blockStatus"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"aboutMe"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"avatars"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"userBan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;