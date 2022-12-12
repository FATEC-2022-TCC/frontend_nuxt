import { ComplaintProjection } from "./Complaint";

export interface ComplaintDataChart {
    description: string,
    color: string,
    count: number,
    complaints: Array<ComplaintProjection>
}