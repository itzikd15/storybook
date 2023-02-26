import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Meta, moduleMetadata, Story} from '@storybook/angular';
import {withDesign} from 'storybook-addon-designs';
import {BadgeComponent} from './badge.component';
import {BadgeModule} from './badge.module';
import {FlexModule} from '@angular/flex-layout';

const enum BadgeNames {
    AWS      = 'aws',
    GCP      = 'gcp',
    AZURE    = 'azure',
    ASSIGNED = 'assigned',
    NEW      = 'new',
    BETA     = 'beta',
    IDLE     = 'idle',
    PREVIEW  = 'preview'
}

const enum BadgeColor {
    ORANGE = 'orange',
    BLUE   = 'blue',
    VIOLET = 'violet',
    GREEN  = 'green',
    RED    = 'red'
}

export default {
    title:      'Components/Badge',
    component:  BadgeComponent,
    decorators: [
        withDesign,
        moduleMetadata({
            imports: [CommonModule, HttpClientModule, BadgeModule, FlexModule]
        })
    ],
    parameters: {
        design: {
            type: 'figma',
            url:  'https://www.figma.com/file/DLBx3NdKy2TPj7h8nWxv2H/Spotlight?node-id=1792%3A5'
        },
        docs:   {
            source: {
                type: 'code'
            }
        }
    }
} as Meta;

/**
 * Setting the template on the Story<Component> object and then passing the 'props' object allows for dynamic input
 * controls via the argsTable when interacting with the component.
 */

const BADGE_NAME_STORY: Story = (args) => ({
    props:    {
        ...args
    },
    template: `
<spt-badge [badgeName]="badgeName" [transparentBackground]="transparentBackground" >
</spt-badge>
`
});

export const iconBadge = BADGE_NAME_STORY.bind({});
iconBadge.args         = {
    badgeName:             BadgeNames.AWS,
    transparentBackground: true
};

const labelBadgeTemplate: Story = (args) => ({
    props:    {
        ...args
    },
    template: `
<div style="max-width:50px;">
<spt-badge [badgeName]="badgeName" >
</spt-badge>
</div>
`
});

export const badgesWithLabel = labelBadgeTemplate.bind({});
badgesWithLabel.args         = {
    badgeName: BadgeNames.IDLE
};

const customTextBadgeTemplate: Story<BadgeComponent> = (args) => ({
    props:    args,
    template: `
<div style="width:100px;">
<spt-badge [text]="text" [color]="color" >
</spt-badge>
</div>
`
});

export const badgesWithCustomText = customTextBadgeTemplate.bind({});
badgesWithCustomText.args         = {
    text: 'Custom Text',
    // @ts-ignore
    color: BadgeColor.BLUE // @ts-ignore

};
