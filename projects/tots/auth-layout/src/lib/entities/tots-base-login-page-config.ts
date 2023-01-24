export class TotsBaseLoginPageConfig {

    pathHome: string = '/';
    pathSuccess: string = '/';
    pathRecovery?: string;
    pathRegister?: string;

    imageLogo?: string;
    imageRight?: string;

    hasRegister?: boolean = true;
    hasRecoveryPassword?: boolean = true;

    hasSavedUser?: boolean = true;

    textTitle?: string;
    textLoading?: string;
    textEmail?: string;
    textEmailPlaceholder?: string;
    textPassword?: string;
    textPasswordPlaceholder?: string;
    textForgotPassword?: string;
    textLoginButton?: string;
    textRegister?: string;
    textPhraseRight?: string;
    textErrorEmail?: string;
    textErrorPassword?: string;
}