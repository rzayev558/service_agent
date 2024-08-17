export interface Job {
  name: string;
  _id?: string;
  submissionDate: string;
  executionDate: string;
  status: string;
  header: string;
  favorite?: boolean;
  body: string;
  method: string;
  executed?: boolean;
  api: string;
}
