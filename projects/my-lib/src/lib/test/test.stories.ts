import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Meta, moduleMetadata, Story} from '@storybook/angular';
import {withDesign} from 'storybook-addon-designs';
import {TestComponent} from './test.component';
import {TestModule} from './test.module';
import {FlexModule} from '@angular/flex-layout';

export default {
    title:      'Components/Test',
    component:  TestComponent,
    decorators: [
        withDesign,
        moduleMetadata({
            imports: [CommonModule, HttpClientModule, TestModule, FlexModule]
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

const TEST_STORY: Story = (args) => ({
    props:    args    ,
    template: `
<test>
</test>
`
});

export const test = TEST_STORY.bind({});
test.args         = {};

