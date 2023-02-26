import {Badge, BadgeNames, BadgeTypes} from './models/badge.model';

export const BadgeList: Badge [] = [
    {
        name:    BadgeNames.AWS,
        type:    BadgeTypes.ICON,
        svgIcon: 'aws'
    },
    {
        name:    BadgeNames.AZURE,
        type:    BadgeTypes.ICON,
        svgIcon: 'azure'
    },
    {
        name:    BadgeNames.GCP,
        type:    BadgeTypes.ICON,
        svgIcon: 'gcp'
    },
    {
        name: BadgeNames.ASSIGNED,
        type: BadgeTypes.TEXT,
        text: 'assigned'
    },
    {
        name: BadgeNames.NEW,
        type: BadgeTypes.TEXT,
        text: 'new'
    },
    {
        name: BadgeNames.BETA,
        type: BadgeTypes.TEXT,
        text: 'beta'
    },
    {
        name: BadgeNames.IDLE,
        type: BadgeTypes.TEXT,
        text: 'idle'
    },
    {
        name: BadgeNames.PREVIEW,
        type: BadgeTypes.TEXT,
        text: 'preview'
    }
];
