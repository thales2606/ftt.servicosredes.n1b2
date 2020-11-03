import { HostConfigModel } from './host-config.model';
import { LabelsModel } from './labels.model';
import { NetworkSettingsModel } from './network-settings.model';
import { PortModel } from './port.model';

export class ContainerModel {
    Id: string;
    Hostname: string;
    Domainname: string;
    Names: string[];
    Image: string;
    ImageID: string;
    Command: string;
    Created: number;
    Ports: PortModel[];
    Labels: LabelsModel;
    State: string;
    Status: string;
    HostConfig: HostConfigModel;
    NetworkSettings: NetworkSettingsModel;
    Mounts: any[];
    Porta: string;
    PortaExposta: string;
    ExposedPorts: any;
}