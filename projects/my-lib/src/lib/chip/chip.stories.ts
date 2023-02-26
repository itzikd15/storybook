import {componentWrapperDecorator, Meta, moduleMetadata, Story} from '@storybook/angular';
import {action} from '@storybook/addon-actions';
import {withDesign} from 'storybook-addon-designs';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {ChipModule} from './chip.module';
import {ChipComponent} from './chip.component';

export default {
    title:      'Components/Chip',
    component:  ChipComponent,
    decorators: [
        withDesign,
        moduleMetadata({
            imports:      [ChipModule, CommonModule, HttpClientModule, MatIconModule, FlexModule]
        }),
        /**
         * Decorator function allows us to wrap our story in a flex container.
         * https://github.com/storybookjs/storybook/issues/2817
         */
        componentWrapperDecorator(story => `<div fxLayout="row" fxLayoutAlign="center center">${story}</div>`)
    ],
    argTypes:   {
        label: {
            name:        'Label',
            description: `Label for the Chip. A ':' is automatically appended to the end of the passed in string for the label.`,
            table:       {
                type: {
                    summary: 'string'
                }
            }
        },
        isRemovable: {
            name:        'Is Removable',
            description: `Boolean property that determines if the chip is in a dismissible state. Dismissible in this 
            state just in appearance only. When true the chip will display the close mat-icon. An event handler will need
            to handle what happens when the close icon is clicked.`,
            table:       {
                type:         {summary: 'boolean'},
                defaultValue: {summary: true}
            }
        },
        isDisabled: {
            name:        'Is Disabled',
            description: `Boolean property that determines if the chip is in a disabled state.`,
            table:       {
                type:         {summary: 'boolean'},
                defaultValue: {summary: false}
            }
        },
        isReadOnly: {
            name:        'Is Read Only',
            description: `Boolean property that determines if the chip is in a read only state.`,
            table:       {
                type:         {summary: 'boolean'},
                defaultValue: {summary: false}
            }
        }
    },
    parameters: {
        design: {
            type: 'figma',
            url:  'https://www.figma.com/file/DLBx3NdKy2TPj7h8nWxv2H/Spotlight?node-id=1047%3A617'
        },
        docs: {
            source: {
                type: 'code'
            }
        }
    }
} as Meta;

enum ChipStoryNames {
    REMOVABLE_CHIP = 'Removable',
    DOUBLE_CLICK = 'Double-Click',
    NON_REMOVABLE = 'Non-Removable',
    DISABLED = 'Disabled',
    NO_LABEL = 'No Label',
    READ_ONLY = 'Read Only'
}

const PROJECTED_CONTENT = 'Content';

/**
 * Defining this actionsData object and action fn's allow for us to still register the events in SB even when using the
 * template property for things like transclusion (content projection). See the RemovableChipTemplate and
 * NonRemovableChipTemplate stories.
 *
 * Register the actions object and any custom functions within the Story template.
 */
const actionsData = {
    deleteClick: action('onDeleteClick'),
    doubleClick: action('onDoubleClick')
};

function hideChip() {
    // @ts-ignore
    document.querySelector('spt-chip').parentElement.style.visibility = 'hidden';
}

function onDeleteClick() {
    actionsData.deleteClick(); // When using template, we need to call the actions object to trigger
    hideChip();
}

function onDoubleClick() {
    actionsData.doubleClick(); // When using template, we need to call the actions object to trigger
    hideChip();
}

/**
 * Here is an example of using the template property to define our component, and also passing dynamic input properties
 * for the user to interact with the projected content and change what string is projected.
 * Note:
 * - We are passing the actionsData object in the template of the story in the props object
 * - Also passing any custom defined functions to be used in the template here through the props object
 * - We define a custom input 'projectedContent' using Ng template interpolation '{{ }}' and in the exported story we
 * define the said new custom input.
 *
 * Should also be able to use this for named slots transclusion. For example:
 * <spt-chip>
 *     <div slot1>{{slot1Content}}</div>
 *     <div slot2>{{slot2Content}}</div>
 *     <div slot3>{{slot3Content}}</div>
 * </spt-chip>`
 */
const RemovableChipTemplate: Story<ChipComponent> = (args) => ({
    props:    {
        ...args,
        actionsData,
        onDeleteClick
    },
    template: `
<spt-chip
    label="${ChipStoryNames.REMOVABLE_CHIP}"
    (deleteClick)="onDeleteClick()"
    (doubleClick)="actionsData.doubleClick()">
        {{projectedContent}}
</spt-chip>`
});

export const removableChip = RemovableChipTemplate.bind({});
removableChip.args = {
    label:            `${ChipStoryNames.REMOVABLE_CHIP}`,
    // @ts-ignore
    projectedContent: `${PROJECTED_CONTENT}`
};

const DoubleClickChipTemplate: Story<ChipComponent> = (args) => ({
    props:    {
        ...args,
        actionsData,
        onDoubleClick
    },
    template: `
<spt-chip 
    label="${ChipStoryNames.DOUBLE_CLICK}"
    (doubleClick)="onDoubleClick()"
    (deleteClick)="actionsData.deleteClick()">
        {{projectedContent}}
</spt-chip>`
});

export const doubleClickChip = DoubleClickChipTemplate.bind({});
doubleClickChip.args = {
    label:            `${ChipStoryNames.DOUBLE_CLICK}`,
    // @ts-ignore
    projectedContent: `${PROJECTED_CONTENT}`
};

const NonRemovableChipTemplate: Story<ChipComponent> = (args) => ({
    props:    {
        ...args,
        actionsData
    },
    template: `
<spt-chip
    label="${ChipStoryNames.NON_REMOVABLE}"
    [isRemovable]="false"
    (deleteClick)="actionsData.deleteClick()"
    (doubleClick)="actionsData.doubleClick()">
        {{projectedContent}}
</spt-chip>`
});

export const nonRemovableChip = NonRemovableChipTemplate.bind({});
nonRemovableChip.args = {
    label:            `${ChipStoryNames.NON_REMOVABLE}`,
    isRemovable:      false,
    // @ts-ignore
    projectedContent: `${PROJECTED_CONTENT}`
};

const DisabledChipTemplate: Story<ChipComponent> = (args) => ({
    props:    {
        ...args,
        actionsData
    },
    template: `
<spt-chip
    label="${ChipStoryNames.DISABLED}"
    [isDisabled]="true"
    (deleteClick)="actionsData.deleteClick()"
    (doubleClick)="actionsData.doubleClick()">
        {{projectedContent}}
</spt-chip>`
});

export const disabledChip = DisabledChipTemplate.bind({});
disabledChip.args = {
    label:            `${ChipStoryNames.DISABLED}`,
    isDisabled:       true,
    // @ts-ignore
    projectedContent: `${PROJECTED_CONTENT}`
};

const NoLabelTemplate: Story<ChipComponent> = (args) => ({
    props:    {
        ...args,
        actionsData
    },
    template: `
<spt-chip
    (deleteClick)="actionsData.deleteClick()"
    (doubleClick)="actionsData.doubleClick()">
        {{projectedContent}}
</spt-chip>`
});

export const NoLabelChip = NoLabelTemplate.bind({});
NoLabelChip.args = {
    // @ts-ignore
    projectedContent: `${PROJECTED_CONTENT}`
};

const ReadOnlyTemplate: Story<ChipComponent> = (args) => ({
    props:    {
        ...args,
        actionsData
    },
    template: `
<spt-chip    
    label="${ChipStoryNames.READ_ONLY}"
    [isReadOnly]="true"
    (deleteClick)="actionsData.deleteClick()"
    (doubleClick)="actionsData.doubleClick()">
        {{projectedContent}}
</spt-chip>`
});

export const ReadOnlyChip = ReadOnlyTemplate.bind({});
ReadOnlyChip.args = {
    label:            `${ChipStoryNames.READ_ONLY}`,
    isReadOnly:       true,
    // @ts-ignore
    projectedContent: `${PROJECTED_CONTENT}`
};
