import { Component, ChangeDetectorRef } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { TranslateService } from '../../app.shared/translate';
import { ChromeAPIService } from '../../app.main/app/services';

@Component({
    selector: 'app-install',
    templateUrl: 'install.component.html',
    styleUrls: ['install.component.scss'],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)'})),
            state('out_r', style({transform: 'translateX(200%)', display: 'none'})),
            state('out_l', style({transform: 'translateX(-200%)', display: 'none'})),
            transition('out_r => in', [
                style({transform: 'translateX(200%)'}),
                animate(300)
            ]),
            transition('out_l => in', [
                style({transform: 'translateX(-200%)'}),
                animate(300)
            ]),
            transition('in => out_r', [
                animate(300, style({transform: 'translateX(200%)'}))
            ]),
            transition('in => out_l', [
                animate(300, style({transform: 'translateX(-200%)'}))
            ])
        ])
    ]
})
export class InstallComponent {
    progress = 10;

    steps = [
        { name: 'step_auth', progress: 10, state: 'in'},
        { name: 'step_privacy', progress: 30, state: 'out_r'},
        { name: 'step_spy', progress: 50, state: 'out_r'},
        { name: 'step_last', progress: 100, state: 'out_r'},
    ];

    constructor(translate: TranslateService, private changeDetector: ChangeDetectorRef, private chromeapi: ChromeAPIService) {

        translate.setDefaultLang('en');
        translate.use('ru'); /** need to be initialized without delay caused by chrome.storage.sync.get */
        chrome.storage.sync.get({ 'settings': { 'currentLang': 'ru' } }, (items: any) => {
            console.log('got settings: ', items);
            translate.use(items.settings.currentLang);
        });
        chrome.storage.onChanged.addListener(function(changes, namespace) {
            if ('currentLang' in changes) {
                const change = changes['currentLang'];
                console.log(`detect language changing from ${change.oldValue} to ${change.newValue}`);
                translate.use(change.newValue);
            }
        });
    }

    authorize() {
        this.chromeapi.SendRequest({ name: 'authorize' }).subscribe(() => {
            console.log('authorization complete');
            this.next('step_auth');
            this.changeDetector.detectChanges();
        });
    }

    next(current) {
        this.changeFromToDelta(current, 1);
    }

    back(current) {
        this.changeFromToDelta(current, -1);
    }

    changeFromToDelta(current, delta: number) {
        const i = this.steps.findIndex(x => x.name === current);
        if (i < 0) {
            console.error('wrong step name');
            return;
        }
        this.steps[i].state = delta > 0 ? 'out_l' : 'out_r';
        this.steps[i + delta].state = 'in';
        this.progress = this.steps[i + delta].progress;
        console.dir(this.steps);
    }

    close() {
        chrome.tabs.getCurrent((tab) => {
            try {
                chrome.tabs.remove(tab.id);
            } catch (e) {}
        });
    }

    openFlags() {
        chrome.tabs.create({
            url: 'chrome://flags/#enable-panels',
            selected: true
        });
    }

    openOptions() {
        chrome.tabs.create({
            url: 'options.html',
            selected: true
        });
    }

    getStepState(name) {
        return this.steps.find(x => x.name === name).state;
    }
}
