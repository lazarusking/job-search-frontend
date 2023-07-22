export interface Pagination {
  count: number;
  next: any;
  previous: any;
  //   results: Result[];
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
