/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from 'tsoa';
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  import { CompaniesController } from './../../../api/Companies/CompaniesController';
  import { iocContainer } from './../../tsoa/TsoaIoC';
  import type { IocContainer, IocContainerFactory } from 'tsoa';
import type { RequestHandler, Router } from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  "CompanyDto": {
    "dataType": "refObject",
    "properties": {
      "name": {"dataType":"string","required":true},
      "exchange": {"dataType":"string","required":true},
      "ticker": {"dataType":"string","required":true},
      "isin": {"dataType":"string","required":true},
      "website": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
      "id": {"dataType":"double","required":true},
    },
    "additionalProperties": false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
// ###########################################################################################################
//  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
//      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
// ###########################################################################################################
    app.get('/companies',
    ...(fetchMiddlewares<RequestHandler>(CompaniesController)),
      ...(fetchMiddlewares<RequestHandler>(CompaniesController.prototype.getAll)),

    async function CompaniesController_getAll(request: any, response: any, next: any) {
      const args = {
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
      validatedArgs = getValidatedArgs(args, request, response);

        const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

        const controller: any = await container.get<CompaniesController>(CompaniesController);
        if (typeof controller['setStatus'] === 'function') {
        controller.setStatus(undefined);
        }


      const promise = controller.getAll.apply(controller, validatedArgs as any);
      promiseHandler(controller, promise, response, 200, next);
      } catch (err) {
      return next(err);
      }
      });
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
  return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
  return Promise.resolve(promise)
  .then((data: any) => {
  let statusCode = successStatus;
  let headers;
  if (isController(controllerObj)) {
  headers = controllerObj.getHeaders();
  statusCode = controllerObj.getStatus() || statusCode;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  returnHandler(response, statusCode, data, headers)
  })
  .catch((error: any) => next(error));
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
  if (response.headersSent) {
  return;
  }
  Object.keys(headers).forEach((name: string) => {
  response.set(name, headers[name]);
  });
  if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
  response.status(statusCode || 200)
  data.pipe(response);
  } else if (data !== null && data !== undefined) {
  response.status(statusCode || 200).json(data);
  } else {
  response.status(statusCode || 204).end();
  }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
  return function(status, data, headers) {
  returnHandler(response, status, data, headers);
  };
  };

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, request: any, response: any): any[] {
  const fieldErrors: FieldErrors  = {};
  const values = Object.keys(args).map((key) => {
  const name = args[key].name;
  switch (args[key].in) {
  case 'request':
  return request;
  case 'query':
  return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});
  case 'queries':
  return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});
  case 'path':
  return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});
  case 'header':
  return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});
  case 'body':
  return request.body;
  case 'body-prop':
  return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});
  case 'formData':
  if (args[key].dataType === 'file') {
  return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});
  } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
  return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});
  } else {
  return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});
  }
  case 'res':
  return responder(response);
  }
  });

  if (Object.keys(fieldErrors).length > 0) {
  throw new ValidateError(fieldErrors, '');
  }
  return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
