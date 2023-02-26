import {Meta, moduleMetadata, Story} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {ButtonComponent} from './button.component';

/**
 * This default export determines where your story goes in the story list
 * The 'default' object contains meta-data about the story including
 * The 'title' and 'component' are required
 * To show Figma private embedded IFrame, pass the 'withDesign' const inside of the decorator object and pass design
 *    object in the parameters.
 * The 'moduleMetadata' object allows to import any needed Modules or declare components
 * The 'argTypes' object allows us to override the Doc Tab argTable to provide descriptions, defaultValues, and more.
 *  - argTypes by default uses jsDoc comments to build the table from sourceCode however, we can override it on the
 *  story level.
 */
export default {
    title:      'Components/Banner',
    component:  ButtonComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule, HttpClientModule],
            declarations: [ButtonComponent]
        })
    ],
    argTypes:   {
        bannerTitle: {
            name:        'Banner Title',
            description: `Title for the Banner Component. Appears above Banner Text. Can be set through component API 
                via Input Binding or projected into the Banner component using slot attribute - "[spt-banner-title]"`,
            table:       {
                type: {
                    summary: 'string',
                    detail:  'Content projection using slot attribute - [spt-banner-title]'
                }
            }
        },
        text: {
            name:        'Banner Text',
            description: `Text for the Banner Component. Appears below Banner Title. Can be set through component API via 
                input binding or projected into the Banner component using slot attribute - "[spt-banner-text]".`,
            table: {
                type: {
                    summary: 'string',
                    detail:  'Content projection using slot attribute - [spt-banner-text]'
                }
            }
        },
        isCentered: {
            name:        'Banner Center Toggle',
            description: `Option to center the content of the Banner. Toggling this option on will cause the following to happen: 
                Any present Banner Icon will disappear when centered, however dismissIcon on right will still be available if 
                toggled to True. Banner Title and Banner Text will also become text-justified to center.`,
            table: {
                type:         {summary: 'boolean'},
                defaultValue: {summary: false}
            }
        },
        isDismissible: {
            name:        'Banner Dismissible Toggle',
            description: `Option to toggle the Banner Dismiss Icon to show or hide. When Banner Dismiss Icon is hidden the 
                Banner can not be dismissed.`,
            table: {
                type: {
                    summary: 'boolean',
                    detail:  'Toggles Banner dismiss icon.'
                },
                defaultValue: {
                    summary: true,
                    detail:  'By default, Banners unless otherwise specified are dismissible.'
                }
            }
        },
        type: {
            name:        'Banner Type',
            description: `Option to specify the type of Banner. Banner Types have their own background color and icon 
                associated with them.`
        }
    },
    parameters: {
        design: {
            type: 'figma',
            url:  'https://www.figma.com/file/DLBx3NdKy2TPj7h8nWxv2H/Spotlight?node-id=1075%3A524'
        }
    }
} as Meta;

/**
 * Note that Template.bind({}) is a standard JavaScript technique for making a copy of a function.
 * We copy the Template so each exported story can set its own properties on it.
 *
 * When a story is written like the 'Template' example below we are using the Args (@Inputs) to set the API for the
 * component. The 'typedBanner' story is an example of how we can set the components properties through the args object
 *
 * @see 'PROJECTED_CONTENT_STORY' for an example of how we can create a story via the template and leverage template
 * projection.
 */
const BANNER_PROPS_STORY: Story<ButtonComponent> = (args) => ({
    props: args
});

export const typedBanner = BANNER_PROPS_STORY.bind({});
typedBanner.args         = {
    text:        'aaaaaaa'
};

