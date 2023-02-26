export enum BadgeNames {
    AWS = 'aws',
    GCP = 'gcp',
    AZURE = 'azure',
    ASSIGNED = 'assigned',
    NEW = 'new',
    BETA = 'beta',
    IDLE = 'idle',
    PREVIEW = 'preview'
}

export enum BadgeTypes {
    ICON = 'icon',
    TEXT = 'text'
}

export interface Badge {
    name: BadgeNames;
    type: BadgeTypes;
    text?: string;
    svgIcon?: string;
}
