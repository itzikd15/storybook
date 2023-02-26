import {US_GOV_PREFIX, GOV_INDEX, REGULAR_ZONE_INDEX} from './constants';
import {includes, isEmpty} from 'lodash';


export function awsGetRegionFromZone(zone: string):string {
    let retVal: string = '';
    const isZoneEmpty: boolean = isEmpty(zone);
    const isInFormat : boolean = zone?.split('-').length >= REGULAR_ZONE_INDEX;

    if(isZoneEmpty === false && isInFormat === true) {
        const isUsGovCloudRegion: boolean = includes(zone, US_GOV_PREFIX);
        const regionLengthLimiter: number = isUsGovCloudRegion ? GOV_INDEX : REGULAR_ZONE_INDEX;
        const tokens: string[] = zone.split('-', regionLengthLimiter);

        tokens[regionLengthLimiter - 1] = tokens[regionLengthLimiter - 1]?.substring(0, 1);
        retVal = tokens.join('-');
    }

    return retVal;
}
