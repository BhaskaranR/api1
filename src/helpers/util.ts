import * as Joi from 'joi';

export const validate = (param: any, schema: any) => {
    return new Promise((resolve, reject) => {
        Joi.validate(param, schema, (err: any, data: any)=> {
            if (err) {
                return reject(err);
            }
            resolve(data);
        });
    });
}
