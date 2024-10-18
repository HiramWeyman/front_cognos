import { HttpHeaders } from '@angular/common/http';
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
		//Usando la APP solamente importante activar rutaAPI de Produccion al fusionar con MAIN
		rutaAPI: 'https://api.iescognos.com/api',
	    //rutaAPI: 'https://localhost:7161/api',
	

  getHeadersPOST(): HttpHeaders {
		const headers = new HttpHeaders({
			'Content-Type' : 'application/json'
		});
		return headers;
	},

	getHeadersGET(): HttpHeaders {
		const headers = new HttpHeaders({
			//'authorization': 'Basic ' + environment.autorizacion
			'Content-Type': 'application/json',
    		'Access-Control-Allow-Origin': '*',
    		'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
    		'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
    		'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
		});
		return headers;
  }
};

export const _TOKEN = 'tknCOGNOS';