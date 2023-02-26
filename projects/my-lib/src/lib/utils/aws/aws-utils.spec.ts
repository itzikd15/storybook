import {awsGetRegionFromZone} from './aws-utils';

describe('awsGetRegionFromZone', () => {
    it('should return region from az', () => {
        const az = 'us-east-2a';
        const az2 = 'ap-northeast-1a';
        const expectedRegion = 'us-east-2';
        const expectedRegion2 = 'ap-northeast-1';

        const region = awsGetRegionFromZone(az);
        const region2 = awsGetRegionFromZone(az2);

        expect(region).toEqual(expectedRegion);
        expect(region2).toEqual(expectedRegion2);
    });

    it('should return region from local zone', () => {
        const az = 'us-east-1-atl-1a';
        const az2 = 'eu-central-1-muc-1a';
        const expectedRegion = 'us-east-1';
        const expectedRegion2 = 'eu-central-1';

        const region = awsGetRegionFromZone(az);
        const region2 = awsGetRegionFromZone(az2);

        expect(region).toEqual(expectedRegion);
        expect(region2).toEqual(expectedRegion2);
    });

    it('should return region from gov az', () => {
        const az = 'us-gov-east-1a';
        const expectedRegion = 'us-gov-east-1';

        const region = awsGetRegionFromZone(az);

        expect(region).toEqual(expectedRegion);
    });

    describe('unhappy path', () => {
        it('should return undefined from string not in format', () => {
            const region = awsGetRegionFromZone('us-east');

            expect(region).toBeUndefined();
        });

        it('should return undefined from empty string', () => {
            const region = awsGetRegionFromZone('');

            expect(region).toBeUndefined();
        });
    });
});
