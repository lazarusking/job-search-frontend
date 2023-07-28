export interface Pagination {
  count: number;
  next: any;
  previous: any;
  //   results: Result[];
}
export interface UserToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  username: string;
  email: string;
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}
export interface UserList extends Pagination {
  results: User[];
}

export interface UserProfile {
  user: User;
  slug: string;
  avatar: any;
  phone_number: string;
  description: string;
  country: string;
  created_at: string;
  gender: string;
  address: string;
  date_of_birth: any;
  looking_for: string;
  resume: any;
  updated_at: string;
  linkedin: string;
  facebook: string;
  github: string;
  website: string;
}

export interface Recruiter {
  id: number;
  user: User;
  slug: string;
  avatar: any;
  company: string;
  phone_number: string;
  description: string;
  country: string;
  created_at: string;
  location: string;
  updated_at: string;
  linkedin: string;
  facebook: string;
  github: string;
  website: string;
}
export interface RecruiterList extends Pagination {
  results: Recruiter[];
}
export interface Job {
  id: number;
  title: string;
  location: string;
  description: string;
  skills_required: string;
  job_type: string;
  link: string;
  slug: string;
  date_posted: string;
  deadline: string;
  recruiter: number;
}
export interface JobList extends Pagination {
  results: Job[];
}

export interface JobDetails {
  jobs: JobDetail[];
}

export interface JobDetail {
  id: number;
  title: string;
  user_count: number;
  new_users: number;
  job_type: string;
  location: string;
}

export type ApplicantList = ApplicantDetail[];

export interface ApplicantDetail {
  id: number;
  job: Job;
  applicant: Applicant;
  date_posted: string;
}

export interface Applicant {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

//
export interface Extra {
  name: string;
  description: string;
  renders: string[];
  parses: string[];
  actions: Actions;
}

export interface Actions {
  POST: Post;
}

export interface Post {
  url: Url;
  user: UserOption;
  slug: Slug;
  avatar: Avatar;
  phone_number: PhoneNumber;
  description: Description;
  country: Country;
  created_at: CreatedAt;
  gender: Gender;
  address: Address;
  date_of_birth: DateOfBirth;
  looking_for: LookingFor;
  resume: Resume;
  updated_at: UpdatedAt;
  linkedin: Linkedin;
  facebook: Facebook;
  github: Github;
  website: Website;
}

export interface Url {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
}

export interface UserOption {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  children: Children;
}

export interface Children {
  url: Url2;
  id: Id;
  username: Username;
  first_name: FirstName;
  last_name: LastName;
  email: Email;
}

export interface Url2 {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
}

export interface Id {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
}

export interface Username {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  help_text: string;
  max_length: number;
}

export interface FirstName {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  max_length: number;
}

export interface LastName {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  max_length: number;
}

export interface Email {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
}

export interface Slug {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
}

export interface Avatar {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  max_length: number;
}

export interface PhoneNumber {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  max_length: number;
}

export interface Description {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
}

export interface Country {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  choices: Choice[];
}

export interface Choice {
  value: string;
  display_name: string;
}

export interface CreatedAt {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
}

export interface Gender {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  choices: Choice[];
}

export interface Address {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  max_length: number;
}

export interface DateOfBirth {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
}

export interface LookingFor {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  choices: Choice[];
}

export interface Resume {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  max_length: number;
}

export interface UpdatedAt {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
}

export interface Linkedin {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  max_length: number;
}

export interface Facebook {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  max_length: number;
}

export interface Github {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  max_length: number;
}

export interface Website {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  max_length: number;
}
