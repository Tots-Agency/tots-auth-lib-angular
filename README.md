# Tots Auth Library for Angular

## Como empezar
1. Instalar libreria: npm install --save @tots/core @tots/auth
2. Importar modulos:
```
imports: [
    ...

    TotsCoreModule,
    TotsAuthModule,
    
    ...
  ],
```
3. Agregar provider para configuracion:
```
  providers: [
    {
      provide: TOTS_CORE_PROVIDER,
      useValue: {
        baseUrl: 'http://0.0.0.0:8000/'
      }
    },
    {
      provide: TOTS_AUTH_PROVIDER,
      useValue: {
        signInPath: 'oauth/token',
        changePasswordPath: 'users/me/password',
      } as TotsAuthConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TotsAuthInterceptor,
      multi: true
    },
  ],
```

## Realizar un login
1. Inyectar el servicio:
```
  constructor(
    protected authService: TotsAuthService,
  ) { }
```
2. Llamar al servicio:
```
  this.authService
    .signIn(email, password)
    .pipe(catchError(error => {
      // Usuario incorrecto
    }))
    .subscribe(user => {
      // Usuario logueado y ya guardado en el dispositivo.
    });
```

