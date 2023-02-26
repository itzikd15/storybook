import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BadgeList} from './badge-list';
import {Badge, BadgeNames} from './models/badge.model';
import {BadgeColor} from './models/badge-color.model';

@Component({
    selector:        'spt-badge',
    templateUrl:     './badge.component.html',
    styleUrls:       ['./badge.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
class BadgeComponent implements OnInit {
    @Input() badgeName: BadgeNames | undefined;

    @Input() text: string | undefined;

    @Input() color: BadgeColor | undefined;

    @Input() noLeftMargin = false;

    @Input() noRightMargin = false;

    @Input() transparentBackground = false;

    badge: Badge = {
        // @ts-ignore
        name: null,
        // @ts-ignore
        type: null
    };

    public displayText: string | undefined = '';

    public badgeClass = '';

    hasLeftMargin: boolean | undefined;

    hasRightMargin: boolean | undefined;

    ngOnInit(): void {
        this.initBadge();
    }

    initBadge(): void {
        const badge = BadgeList.find(badge => badge.name === this.badgeName);

        if(badge != null) {
            this.badge = badge;
            this.displayText = this.badge.text;

            switch (badge.name) {
                case BadgeNames.ASSIGNED: {
                    this.badgeClass = BadgeColor.GREEN;
                    break;
                }

                case BadgeNames.NEW: {
                    this.badgeClass = BadgeColor.BLUE;
                    break;
                }

                case BadgeNames.IDLE: {
                    this.badgeClass = BadgeColor.ORANGE;
                    break;
                }

                case BadgeNames.BETA: {
                    this.badgeClass = BadgeColor.VIOLET;
                    break;
                }

                case BadgeNames.PREVIEW: {
                    this.badgeClass = BadgeColor.BLUE;
                    break;
                }

                default: {
                    this.badgeClass = '';
                    break;
                }
            }
        }

        this.initCustomBadge();

        this.hasLeftMargin = this.noLeftMargin === false;
        this.hasRightMargin = this.noRightMargin === false;
    }

    initCustomBadge(): void {
        if(this.text != null) {
            this.displayText = `${this.displayText}${this.text}`;
        }

        if(this.color != null) {
            this.badgeClass = this.color;
        }
    }
}

export {BadgeComponent};
