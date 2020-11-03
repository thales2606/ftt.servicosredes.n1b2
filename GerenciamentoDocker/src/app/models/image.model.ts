import { LabelsModel } from './labels.model';

export class ImageModel {
    Containers: number;
    Created: number;
    Id: string;
    Labels: LabelsModel;
    ParentId: string;
    RepoDigests: string[];
    RepoTags: string[];
    SharedSize: number;
    Size: number;
    VirtualSize: number;
}