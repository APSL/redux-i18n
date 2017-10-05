declare module 'redux-i18n' {
    import * as React from 'react';
    import {Action} from 'redux';
    import {ThunkAction} from 'redux-thunk';

    export interface I18nProps {
        translations: ITranslations;
        useReducer?: boolean;
        initialLang?: string;
        fallbackLang?: string;
        initialized?: boolean;
    }

    export interface IreduxI18nState {
        lang: string;
        translations: ITranslations;
        forceRefresh: boolean;
    }

    export interface ISetLanguageAction extends Action {
        lang: string;
    }

    export interface ISetForceRefreshAction extends Action {
        force: boolean;
    }

    export interface IWrapWithLocalized {
        (WrappedComponent: React.Component): Function;
    }

    export interface IGetTranslateFunctionResponse {
        (textKey: string, params?: string[], comment?: string): string;
    }

    export interface ITranslation {
        [name: string]: string;
    }

    export interface ITranslations {
        [name: string]: ITranslation;
    }

    export interface IlanguageOrOptions {
        language?: string;
        preserveExisting?: boolean;
    }

    export function i18nState(state: IreduxI18nState, action: Action): IreduxI18nState

    export function setLanguage(lang: string): ISetLanguageAction

    export function setTranslations(translations: ITranslations, languageOrOptions?: IlanguageOrOptions | string): ThunkAction<any, IreduxI18nState, any>

    export function setForceRefresh(force: boolean): ISetForceRefreshAction

    export function localize(propName?: string): IWrapWithLocalized

    export function getTranslateFunction(translations: ITranslations, lang: string, fallbackLang?: string): IGetTranslateFunctionResponse

    export default class I18n extends React.Component<I18nProps, any> {
    }

}
